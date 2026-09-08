import type { Request, Response } from 'express';
import { asyncHandler, JSON200, JSON400, JSON404 } from '@crm/http-server';
import { brandsRepository } from '../../repository';
import { cryptoUtils } from '@crm/utils';

export const queryFunctions = {
  getBrands: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    if (!user || !user.encId) {
      return JSON404(res, 'Unauthorized or missing user context');
    }
    
    const userId = cryptoUtils.decryptID(user.encId);
    
    const brands = await brandsRepository.getBrandsByUser(userId);
    JSON200(res, brands);
  }),

  getBrandById: asyncHandler(async (req: Request, res: Response) => {
    const brand = await brandsRepository.getBrandById(req.params.id);
    if (!brand) {
      JSON404(res, 'Brand not found');
      return;
    }
    JSON200(res, brand);
  }),
};
