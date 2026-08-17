import { Request, Response, NextFunction } from 'express';
import { authStore } from '../redis/auth-store';
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'changeme-access-secret-at-least-32-characters!!';

/**
 * Middleware to block IPs that are in the redis blocklist.
 */
export const authMiddleware = {
  ipBlockCheck: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const isBlocked = await authStore.isIPBlocked(ip);
    
    if (isBlocked) {
      res.status(429).json({ error: 'Too many failed login attempts. IP blocked.' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
  },

  /**
   * Middleware to check OTP cooldown before allowing resend.
   */
  otpRateLimiter: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(400).json({ error: 'Email is required.' });
      return;
    }

    const inCooldown = await authStore.checkOTPCooldown(email);
    if (inCooldown) {
      res.status(429).json({ error: 'Please wait 60 seconds before requesting another OTP.' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
  },

  /**
   * Middleware to verify access token and check blacklist.
   */
  verifyAccessToken: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid Bearer token.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, ACCESS_SECRET) as jwt.JwtPayload;

      // Check if token (jti) is blacklisted
      if (decoded.jti) {
        const isBlacklisted = await authStore.isTokenBlacklisted(decoded.jti);
        if (isBlacklisted) {
          res.status(401).json({ error: 'Unauthorized: Token has been revoked.' });
          return;
        }
      }

      // Attach user to request
      (req as any).user = decoded;
      next();
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'Unauthorized: Token expired.' });
        return;
      }
      res.status(401).json({ error: 'Unauthorized: Invalid token.' });
      return;
    }
  } catch (error) {
    next(error);
  }
  }
};
