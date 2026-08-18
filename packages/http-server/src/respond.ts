import type { Response } from 'express';
import { ok, fail } from './async-handler';
import type { ApiError } from './async-handler';

/**
 * Send a 200 success response with the standard envelope.
 *
 *   JSON200(res, user)
 *   // → 200  { success: true, data: user }
 */
export function JSON200<T>(res: Response, data: T): void {
  res.status(200).json(ok(data));
}

/**
 * Send a 400 failure response with the standard envelope.
 *
 *   JSON400(res, [{ field: 'email', message: 'Required' }])
 *   // → 400  { success: false, errors: [...] }
 *
 *   // shorthand — pass a plain string for a single message:
 *   JSON400(res, 'Something went wrong')
 *   // → 400  { success: false, errors: [{ message: 'Something went wrong' }] }
 */
export function JSON400(res: Response, errors: ApiError[] | string): void {
  const normalized: ApiError[] =
    typeof errors === 'string' ? [{ message: errors }] : errors;

  res.status(400).json(fail(normalized));
}

export function JSON401(res: Response, message: string): void {
  res.status(401).json(fail([{ message }]));
}

export function JSON403(res: Response, message: string): void {
  res.status(403).json(fail([{ message }]));
}

export function JSON404(res: Response, message: string): void {
  res.status(404).json(fail([{ message }]));
}

export function JSON500(res: Response, message: string = 'Internal server error'): void {
  res.status(500).json(fail([{ message }]));
}

