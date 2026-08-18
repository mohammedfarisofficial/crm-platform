import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { SignupSchema, LoginSchema, VerifyOtpSchema, ResendOtpSchema } from '../../validations/v1/mutate';
import { parseBody, JSON200, JSON400, JSON401, JSON403, JSON404, JSON500 } from '@crm/http-server';
import { authStore } from '../../redis/auth-store';
import { usersServiceClient } from '../../services/users-service-client';
import { db } from '../../database/client';
import { loginAttempts } from '../../database/schema/authentication';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'changeme-access-secret-at-least-32-characters!!';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
}

export const mutateFunctions = {
  signup: async (req: Request, res: Response): Promise<void> => {
    try {
      const body = parseBody(SignupSchema, req, res);
      if (!body) return;

      const { email, password, first_name, last_name } = body;

      const existingUser = await usersServiceClient.getUserByEmail(email);
      if (existingUser) {
        JSON400(res, 'Email already registered');
        return;
      }

      // Call Users Service to create user
      await usersServiceClient.createUser({
        email,
        password: password,
        first_name,
        last_name,
        is_verified: false
      });

      // Generate and store OTP
      const otp = generateOTP();
      await authStore.storeOTP(email, otp);

      // In a real app, send OTP via email/SMS here.
      console.log(`[DEV] OTP for ${email} is ${otp}`);

      JSON200(res, { message: 'User created. Please verify your email with the OTP.' });
    } catch (error: any) {
      console.error('[Auth] Signup error:', error);
      JSON400(res, error.message || 'Signup failed');
    }
  },

  verifyOtp: async (req: Request, res: Response): Promise<void> => {
    try {
      const body = parseBody(VerifyOtpSchema, req, res);
      if (!body) return;

      const { email, code } = body;

      const status = await authStore.validateOTP(email, code);

      if (status === 'success') {
        const user = await usersServiceClient.getUserByEmail(email);
        if (!user) {
          JSON404(res, 'User not found');
          return;
        }

        await usersServiceClient.verifyUser(user.id);
        JSON200(res, { message: 'Email verified successfully.' });
        return;
      }

      JSON400(res, `OTP Verification failed: ${status}`);
    } catch (error: any) {
      console.error('[Auth] Verify OTP error:', error);
      JSON500(res, 'Internal server error');
    }
  },

  resendOtp: async (req: Request, res: Response): Promise<void> => {
    try {
      const body = parseBody(ResendOtpSchema, req, res);
      if (!body) return;

      const { email } = body;

      const user = await usersServiceClient.getUserByEmail(email);
      if (!user) {
        JSON404(res, 'User not found');
        return;
      }

      const otp = generateOTP();
      await authStore.storeOTP(email, otp);

      console.log(`[DEV] New OTP for ${email} is ${otp}`);
      JSON200(res, { message: 'OTP resent.' });
    } catch (error) {
      console.error('[Auth] Resend OTP error:', error);
      JSON500(res, 'Internal server error');
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    try {
      const body = parseBody(LoginSchema, req, res);
      if (!body) return;

      const { email, password } = body;

      const user = await usersServiceClient.getUserByEmail(email);
      if (!user) {
        await authStore.recordLoginFailure(ip);
        await db.insert(loginAttempts).values({ email, ip_address: ip, success: false, reason: 'invalid_credentials' });
        JSON401(res, 'Invalid credentials');
        return;
      }

      if (!user.is_verified) {
        await db.insert(loginAttempts).values({ user_id: user.id, email, ip_address: ip, success: false, reason: 'not_verified' });
        JSON403(res, 'Please verify your email first.');
        return;
      }

      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        const failures = await authStore.recordLoginFailure(ip);
        if (failures >= 5) {
          await authStore.blockIP(ip);
        }
        await db.insert(loginAttempts).values({ user_id: user.id, email, ip_address: ip, success: false, reason: 'invalid_credentials' });
        JSON401(res, 'Invalid credentials');
        return;
      }

      await authStore.resetLoginFailures(ip);
      await db.insert(loginAttempts).values({ user_id: user.id, email, ip_address: ip, success: true });

      const sessionId = crypto.randomUUID();
      const accessToken = jwt.sign({ sub: user.id, email: user.email, jti: crypto.randomUUID() }, ACCESS_SECRET, { expiresIn: '15m' });
      const rawRefreshToken = crypto.randomBytes(32).toString('hex');

      await authStore.storeRefreshToken(user.id, sessionId, rawRefreshToken);

      const cookieValue = `${rawRefreshToken}.${sessionId}.${user.id}`;
      res.cookie('refreshToken', cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/v1/authenticate/refresh',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      JSON200(res, { accessToken });
    } catch (error) {
      console.error('[Auth] Login error:', error);
      JSON500(res, 'Internal server error');
    }
  },

  refresh: async (req: Request, res: Response): Promise<void> => {
    try {
      const cookie = req.cookies?.refreshToken;
      if (!cookie) {
        JSON401(res, 'No refresh token');
        return;
      }

      const parts = cookie.split('.');
      if (parts.length !== 3) {
        JSON401(res, 'Invalid token format');
        return;
      }

      const [rawToken, sessionId, userId] = parts;

      const isValid = await authStore.validateRefreshToken(userId, sessionId, rawToken);
      if (!isValid) {
        res.clearCookie('refreshToken', { path: '/api/v1/authenticate/refresh' });
        JSON401(res, 'Invalid or expired refresh token');
        return;
      }

      await authStore.revokeSession(userId, sessionId);

      const newSessionId = crypto.randomUUID();
      const newAccessToken = jwt.sign({ sub: userId, jti: crypto.randomUUID() }, ACCESS_SECRET, { expiresIn: '15m' });
      const newRawRefreshToken = crypto.randomBytes(32).toString('hex');

      await authStore.storeRefreshToken(userId, newSessionId, newRawRefreshToken);

      const newCookieValue = `${newRawRefreshToken}.${newSessionId}.${userId}`;
      res.cookie('refreshToken', newCookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/v1/authenticate/refresh',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      JSON200(res, { accessToken: newAccessToken });
    } catch (error) {
      console.error('[Auth] Refresh error:', error);
      JSON500(res, 'Internal error');
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      const cookie = req.cookies?.refreshToken;
      if (cookie) {
        const parts = cookie.split('.');
        if (parts.length === 3) {
          await authStore.revokeSession(user.sub, parts[1]);
        }
      }
      res.clearCookie('refreshToken', { path: '/api/v1/authenticate/refresh' });
      JSON200(res, { message: 'Logged out' });
    } catch (error) {
      JSON500(res, 'Internal error');
    }
  },

  logoutAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      await authStore.revokeAllSessions(user.sub);
      res.clearCookie('refreshToken', { path: '/api/v1/authenticate/refresh' });
      JSON200(res, { message: 'Logged out of all sessions' });
    } catch (error) {
      JSON500(res, 'Internal error');
    }
  }
};
