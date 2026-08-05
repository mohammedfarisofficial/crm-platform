import type { Request, Response } from 'express';
import type { ZodTypeAny, z } from 'zod';
import { JSON400 } from './respond';

/**
 * Parse and validate `req.body` against a Zod schema inside a controller.
 *
 * Returns the typed, parsed data on success.
 * On failure, sends a JSON400 response and returns `null` — the controller
 * should return immediately when null is received.
 *
 * Usage inside an asyncHandler:
 *
 *   const body = parseBody(RegisterUserSchema, req, res);
 *   if (!body) return;
 *   // body is fully typed here
 */
export function parseBody<T extends ZodTypeAny>(
  schema: T,
  req: Request,
  res: Response,
): z.infer<T> | null {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    JSON400(res, errors);
    return null;
  }

  return result.data;
}
