import type { Request, Response, NextFunction } from 'express';
import type { ZodTypeAny } from 'zod';
import { JSON400 } from '@crm/http-server';

/**
 * Express middleware factory that validates `req.body` against a Zod schema.
 *
 * On success  → the parsed (and coerced) data replaces `req.body` and the
 *               next handler is called.
 * On failure  → responds 400 with the standard failure envelope:
 *               { success: false, errors: [{ field, message }] }
 *
 * Usage:
 *   router.post('/register-user', validateBody(RegisterUserSchema), asyncHandler(controller))
 */
export function validateBody<T extends ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      JSON400(res, errors);
      return;
    }

    req.body = result.data;
    next();
  };
}
