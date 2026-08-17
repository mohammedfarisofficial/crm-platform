import { Request, Response } from 'express';
import { authStore } from '../../redis/auth-store';

export const queryFunctions = {
  getSessions: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      const sessions = await authStore.getActiveSessions(user.sub);
      res.status(200).json({ sessions });
    } catch (error) {
      res.status(500).json({ error: 'Internal error' });
    }
  }
};
