import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'changeme-access-secret-at-least-32-characters!!';

/**
 * Middleware to verify access token (stateless signature and expiration check).
 * Attach decoded payload to req.user.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid Bearer token.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, ACCESS_SECRET) as jwt.JwtPayload;
      
      // Attach user payload to request
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
};
