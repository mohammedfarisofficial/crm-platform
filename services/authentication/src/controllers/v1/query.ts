import { Request, Response } from 'express';
import { authStore } from '../../redis/auth-store';
import { usersServiceClient } from '../../services/users-service-client';
import { brandsServiceClient } from '../../services/brands-service-client';
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

    // Fetch the user's brands and encrypt the first brand_id
    let encryptedBrandId: string | null = null;
    try {
      const brands = await brandsServiceClient.getBrandsByUser(id);
      if (brands && brands.length > 0) {
        encryptedBrandId = cryptoUtils.encryptID(brands[0].id);
      }
    } catch (err) {
      // Non-critical — continue without brand_id
      console.error('[getMe] Failed to fetch brand:', err);
    }
    const responseData = {
      id: encryptedId,
      role,
      email,
      first_name,
      last_name,
      profile_url,
      brand: {
        brand_id: encryptedBrandId
      }
    }
    JSON200(res, responseData);
  })
};
