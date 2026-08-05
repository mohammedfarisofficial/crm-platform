import type { Request, Response, NextFunction } from "express"

export const mutateFunctions = {
    registerUser: (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json({ message: "User registration endpoint hit successfully (v2)" });
        } catch (error) {
            next(error);
        }
    }
}