import type { Request, Response, NextFunction } from "express"

export const queryFunctions = {
    registerUser: (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            next(error);
        }
    }
}