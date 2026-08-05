import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Standard API response envelope.
 * Every route MUST respond through this shape — no other format is permitted.
 *
 * Success:  { success: true,  data: T }
 * Failure:  { success: false, errors: ApiError[] }
 */
export interface ApiError {
  field?: string;
  message: string;
}

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; errors: ApiError[] };

/**
 * Type-safe handler signature that controllers must implement.
 */
export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

/**
 * Wraps an async route handler so that:
 *  - Unhandled promise rejections are forwarded to Express error middleware.
 *  - Any error caught here is formatted as the standard failure envelope
 *    and sent with HTTP 500 before calling `next(error)` for logging.
 *
 * Usage:
 *   router.post('/endpoint', asyncHandler(myController))
 */
export function asyncHandler(fn: AsyncRequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch((error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'Internal server error';

      const body: ApiResponse<never> = {
        success: false,
        errors: [{ message }],
      };

      res.status(500).json(body);
      next(error);
    });
  };
}

/**
 * Convenience helpers controllers use to build compliant response bodies.
 *
 *   res.status(201).json(ok(user))
 *   res.status(400).json(fail([{ field: 'email', message: 'Required' }]))
 */
export function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

export function fail(errors: ApiError[]): ApiResponse<never> {
  return { success: false, errors };
}
