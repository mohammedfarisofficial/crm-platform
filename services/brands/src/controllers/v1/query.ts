import type { Request, Response } from 'express';
import { asyncHandler, JSON200, JSON400, JSON404 } from '@crm/http-server';
import { brandsRepository } from '../../repository';

export const queryFunctions = {
  getBrands: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.query.user_id as string;
    if (!userId) {
      JSON400(res, 'user_id query parameter is required');
      return;
    }
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
