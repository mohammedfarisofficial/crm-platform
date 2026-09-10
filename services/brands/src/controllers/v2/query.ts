import { asyncHandler, JSON200, JSON400, JSON404 } from "@crm/http-server";
import { Request, Response } from "express";
import { brandsRepository } from "../../repository";
import { cryptoUtils } from "@crm/utils";

export const queryFunctions = {
    getLeads: asyncHandler(async (req: Request, res: Response) => {
        const user = (req as any).user;
        if (!user || !user.encId) {
            return JSON404(res, 'Unauthorized or missing user context');
        }

        const rawBrandId = req.query.brand_id as string;
        if (!rawBrandId) {
            return JSON400(res, 'brand_id is required as a query parameter');
        }

        const brandID = cryptoUtils.decryptID(rawBrandId);

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const [leads, totalCount] = await Promise.all([
            brandsRepository.getLeads(brandID, limit, offset),
            brandsRepository.getLeadsCount(brandID)
        ]);

        // Decrypt emails before sending to client
        const decryptedLeads = leads.map(lead => ({
            ...lead,
            email: cryptoUtils.decryptEmail(lead.email)
        }));

        JSON200(res, {
            data: decryptedLeads,
            meta: {
                page,
                limit,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        });
    })
};
