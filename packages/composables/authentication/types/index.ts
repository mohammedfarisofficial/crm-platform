// ---------------------------------------------------------------------------
// API envelope types (mirrors the backend's standard response shape)
// ---------------------------------------------------------------------------

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; errors: ApiErrorDetail[] };

// ---------------------------------------------------------------------------
// ApiError — throwable error with status + structured errors array
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  public readonly status: number;
  public readonly errors: ApiErrorDetail[];

  constructor(status: number, errors: ApiErrorDetail[]) {
    const firstMessage = errors[0]?.message ?? "Unknown error";
    super(firstMessage);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

// ---------------------------------------------------------------------------
// Authentication request / response types
// ---------------------------------------------------------------------------

export interface SignupParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface VerifyOtpParams {
  email: string;
  code: string;
}

export interface ResendOtpParams {
  email: string;
}

export interface MessageResponse {
  message: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_url: string | null;
  role: number;
}
