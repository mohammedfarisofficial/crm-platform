import { Request, Response } from 'express';
import { authStore } from '../../redis/auth-store';
import { usersServiceClient } from '../../services/users-service-client';
import { JSON200, JSON404, JSON500 } from '@crm/http-server';

export const queryFunctions = {
  getSessions: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      const sessions = await authStore.getActiveSessions(user.sub);
      res.status(200).json({ sessions });
    } catch (error) {
      res.status(500).json({ error: 'Internal error' });
    }
  },
  getMe: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      if (!user?.sub) {
        JSON404(res, 'User not found in request');
        return;
      }
      const userDetails = await usersServiceClient.getUserById(user.sub);
      if (!userDetails) {
        JSON404(res, 'User not found');
        return;
      }
      if (!userDetails.is_verified) {
        JSON200(res, null);
        return;
      }
      
      const { email, first_name, last_name, profile_url } = userDetails;
      JSON200(res, { email, first_name, last_name, profile_url });
    } catch (error) {
      JSON500(res, 'Internal error');
    }
  }
};
