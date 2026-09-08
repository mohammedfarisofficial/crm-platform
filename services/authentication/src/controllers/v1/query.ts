import { Request, Response } from 'express';
import { authStore } from '../../redis/auth-store';
import { usersServiceClient } from '../../services/users-service-client';
import { JSON200, JSON404, asyncHandler } from '@crm/http-server';
import { cryptoUtils } from '@crm/utils';

export const queryFunctions = {
  getSessions: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const sessions = await authStore.getActiveSessions(user.sub);
    res.status(200).json({ sessions });
  }),
  
  getMe: asyncHandler(async (req: Request, res: Response) => {
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
    
    const { id, role, email, first_name, last_name, profile_url } = userDetails;
    const encryptedId = cryptoUtils.encryptID(id);
    JSON200(res, { id: encryptedId, role, email, first_name, last_name, profile_url });
  })
};
