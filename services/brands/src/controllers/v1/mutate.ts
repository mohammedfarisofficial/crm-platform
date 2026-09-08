import type { Request, Response } from 'express';
import { brandsRepository } from '../../repository';
import { asyncHandler, JSON200, JSON404, parseBody } from '@crm/http-server';
import { CreateBrandSchema, UpdateBrandSchema } from '@crm/utils/schemas/brands';
import { cryptoUtils } from '@crm/utils';

export const mutateFunctions = {
  createBrand: asyncHandler(async (req: Request, res: Response) => {
    const postData = parseBody(CreateBrandSchema, req, res);
    if (!postData) return;
    const user = (req as any).user;
    if (!user || !user.encId) {
      return JSON404(res, 'Unauthorized or missing user context');
    }
    
    const userId = cryptoUtils.decryptID(user.encId);
    
    const brand = await brandsRepository.createBrand({ ...postData, user_id: userId } as any);
    JSON200(res, brand);
  }),

  updateBrand: asyncHandler(async (req: Request, res: Response) => {
    const postData = parseBody(UpdateBrandSchema, req, res);
    if (!postData) return;
    const brand = await brandsRepository.updateBrand(req.params.id, postData);
    if (!brand) {
      return JSON404(res, 'Brand not found');
    }
    JSON200(res, brand);
  }),

  deleteBrand: asyncHandler(async (req: Request, res: Response) => {
    const brand = await brandsRepository.deleteBrand(req.params.id);
    if (!brand) {
      return JSON404(res, 'Brand not found');
    }
    JSON200(res, brand);
  }),
};
