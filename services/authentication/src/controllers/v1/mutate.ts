import { passwordUtils } from '@crm/utils';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db } from '@/database/client';
import { Request, Response } from 'express';
import { authStore } from '@/redis/auth-store';
import { loginAttempts } from '@/database/schema/authentication';
import { usersServiceClient } from '@/services/users-service-client';
import { SignupSchema, LoginSchema, VerifyOtpSchema, ResendOtpSchema } from '@/validations/v1/mutate';
import { asyncHandler, parseBody, JSON200, JSON400, JSON401, JSON403, JSON404 } from '@crm/http-server';
import { cryptoUtils } from '@crm/utils';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'changeme-access-secret-at-least-32-characters!!';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const mutateFunctions = {
  signup: asyncHandler(async (req: Request, res: Response) => {
    const postData = parseBody(SignupSchema, req, res);
    if (!postData) return;

    const {
      email = "",
      password = "",
      first_name = "",
      last_name = ""
    } = postData;

    const existingUser = await usersServiceClient.getUserByEmail(email);
    if (existingUser) {
      JSON400(res, 'Email already registered');
      return;
    }
    const createUserData = {
      email,
      password,
      first_name,
      last_name,
      is_verified: false
    }
    await usersServiceClient.createUser(createUserData);

    const otp = generateOTP();
    await authStore.storeOTP(email, otp);

    JSON200(res, { message: 'User created. Please verify your email with the OTP.' });
  }),

  verifyOtp: asyncHandler(async (req: Request, res: Response) => {
    const postData = parseBody(VerifyOtpSchema, req, res);
    if (!postData) return;

    const { email, code } = postData;

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
  }),

  resendOtp: asyncHandler(async (req: Request, res: Response) => {
    const postData = parseBody(ResendOtpSchema, req, res);
    if (!postData) return;

    const { email } = postData;

    const user = await usersServiceClient.getUserByEmail(email);
    if (!user) {
      JSON404(res, 'User not found');
      return;
    }

    const otp = generateOTP();
    await authStore.storeOTP(email, otp);

    console.log(`[DEV] New OTP for ${email} is ${otp}`);
    JSON200(res, { message: 'OTP resent.' });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const postData = parseBody(LoginSchema, req, res);
    if (!postData) return;

    const { email, password } = postData;

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

    const isValid = await passwordUtils.verify(password, user.password);
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
    const encId = cryptoUtils.encryptID(user.id);
    const accessToken = jwt.sign({ sub: user.id, encId, email: user.email, jti: crypto.randomUUID() }, ACCESS_SECRET, { expiresIn: '15m' });
    const rawRefreshToken = crypto.randomBytes(32).toString('hex');

    await authStore.storeRefreshToken(user.id, sessionId, rawRefreshToken);

    const cookieValue = `${rawRefreshToken}.${sessionId}.${user.id}`;
    res.cookie('refreshToken', cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    JSON200(res, { accessToken });
  }),

  refresh: asyncHandler(async (req: Request, res: Response) => {
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
      res.clearCookie('refreshToken', { path: '/' });
      JSON401(res, 'Invalid or expired refresh token');
      return;
    }

    await authStore.revokeSession(userId, sessionId);

    const newSessionId = crypto.randomUUID();
    const encId = cryptoUtils.encryptID(userId);
    const newAccessToken = jwt.sign({ sub: userId, encId, jti: crypto.randomUUID() }, ACCESS_SECRET, { expiresIn: '15m' });
    const newRawRefreshToken = crypto.randomBytes(32).toString('hex');

    await authStore.storeRefreshToken(userId, newSessionId, newRawRefreshToken);

    const newCookieValue = `${newRawRefreshToken}.${newSessionId}.${userId}`;
    res.cookie('refreshToken', newCookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    JSON200(res, { accessToken: newAccessToken });
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const cookie = req.cookies?.refreshToken;
    if (cookie) {
      const parts = cookie.split('.');
      if (parts.length === 3) {
        await authStore.revokeSession(user.sub, parts[1]);
      }
    }
    res.clearCookie('refreshToken', { path: '/' });
    JSON200(res, { message: 'Logged out' });
  }),

  logoutAll: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    await authStore.revokeAllSessions(user.sub);
    res.clearCookie('refreshToken', { path: '/' });
    JSON200(res, { message: 'Logged out of all sessions' });
  })
};
