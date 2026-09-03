import type { Request, Response } from 'express';
import { CreateBrandSchema, UpdateBrandSchema } from '@crm/utils/schemas/brands';
import { asyncHandler, JSON200, JSON404, parseBody } from '@crm/http-server';
import { brandsRepository } from '../../repository';

export const mutateFunctions = {
  createBrand: asyncHandler(async (req: Request, res: Response) => {
    const postData = parseBody(CreateBrandSchema, req, res);
    if (!postData) return;
    const brand = await brandsRepository.createBrand(postData);
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
