import { usersRepository } from '../../repository';
import type { Request, Response } from 'express';
import { RegisterUserSchema } from '@crm/utils/schemas/users';
import { asyncHandler, JSON200, parseBody } from '@crm/http-server';
import { ROLES } from '@crm/utils';

export const mutateFunctions = {
    registerUser: asyncHandler(async (req: Request, res: Response) => {
        const postData = parseBody(RegisterUserSchema, req, res);
        if (!postData) return;
        const updatedData = {
            ...postData,
            role: ROLES.ORGANIZATION,
        }
        const user = await usersRepository.createUser(updatedData);
        JSON200(res, user);
    }),
};