import { asyncHandler, JSON200, JSON404, parseBody } from "@crm/http-server";
import { Request, Response } from "express"
import { brandsRepository } from "../../repository";
import { CreateLeadSchema } from "@crm/utils/schemas/brands";
import { cryptoUtils } from "@crm/utils";

export const mutateFunctions = {
    createLead: asyncHandler(async (req: Request, res: Response) => {
        const postData = parseBody(CreateLeadSchema, req, res);
        if (!postData) return;

        const user = (req as any).user;
        if (!user || !user.encId) {
            return JSON404(res, 'Unauthorized or missing user context');
        }

        const userID = cryptoUtils.decryptID(user.encId);
        const brandID = cryptoUtils.decryptID(postData.brand_id);
        const encryptedEmail = cryptoUtils.encryptEmail(postData.email);

        const updatedLead = {
            ...postData,
            brand_id: brandID,
            email: encryptedEmail
        };
        const newLead = await brandsRepository.createLead(userID, updatedLead);
        JSON200(res, newLead);
    })
}