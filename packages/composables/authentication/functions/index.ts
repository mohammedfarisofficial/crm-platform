/* eslint-disable no-var */
declare var process: { env: Record<string, string | undefined> };

import { ENDPOINTS } from "@crm/utils/constants/endpoints";
import { authUrl } from "../config";
import type {
  ApiResponse,
  SignupParams,
  LoginParams,
  VerifyOtpParams,
  ResendOtpParams,
  MessageResponse,
  LoginResponse,
  RefreshResponse,
} from "../types";
import { ApiError } from "../types";

// ---------------------------------------------------------------------------
// Fetch client options
// ---------------------------------------------------------------------------

export interface FetchClientOptions extends Omit<RequestInit, "body"> {
  /** JSON body — will be serialised automatically. */
  body?: unknown;
  /** Bearer token to attach to the Authorization header. */
  accessToken?: string;
}

// ---------------------------------------------------------------------------
// Base URL resolution
// ---------------------------------------------------------------------------

import { URLS } from "@crm/utils/constants/urls";

/**
 * Returns the absolute URL to the gateway for both client and server,
 * bypassing the need for Next.js rewrites.
 */
function getBaseUrl(): string {
  return URLS.GATEWAY_BASE_URL || "http://localhost:6060";
}

// ---------------------------------------------------------------------------
// Generic fetch client
// ---------------------------------------------------------------------------

export async function fetchClient<T = unknown>(
  url: string,
  options: FetchClientOptions = {},
): Promise<T> {
  const { body, accessToken, headers: customHeaders, ...rest } = options;

  const headers = new Headers(customHeaders);

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const baseUrl = getBaseUrl();
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    if (!response.ok) {
      throw new ApiError(response.status, [
        { message: response.statusText || `Request failed with status ${response.status}` },
      ]);
    }
    return {} as T;
  }

  const json = (await response.json()) as any;

  if (json.success) {
    return json.data as T;
  }

  // Handle standard ApiResponse errors
  let errors = json.errors;

  // Fallback for legacy/malformed error responses
  if (!errors && json.error) {
    errors = [{ message: json.error }];
  } else if (!errors) {
    errors = [{ message: response.statusText || `Request failed with status ${response.status}` }];
  }

  throw new ApiError(response.status, errors);
}

// ---------------------------------------------------------------------------
// Auth API functions
// ---------------------------------------------------------------------------

export async function signup(params: SignupParams): Promise<MessageResponse> {
  return fetchClient<MessageResponse>(authUrl(ENDPOINTS.AUTHENTICATION.SIGN_UP), {
    method: "POST",
    body: params,
  });
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  return fetchClient<LoginResponse>(authUrl(ENDPOINTS.AUTHENTICATION.SIGN_IN), {
    method: "POST",
    body: params,
    credentials: "include",
  });
}

export async function verifyOtp(params: VerifyOtpParams): Promise<MessageResponse> {
  return fetchClient<MessageResponse>(authUrl(ENDPOINTS.AUTHENTICATION.VERIFY_OTP), {
    method: "POST",
    body: params,
  });
}

export async function resendOtp(params: ResendOtpParams): Promise<MessageResponse> {
  return fetchClient<MessageResponse>(authUrl(ENDPOINTS.AUTHENTICATION.RESEND_OTP), {
    method: "POST",
    body: params,
  });
}

export async function refresh(): Promise<RefreshResponse> {
  return fetchClient<RefreshResponse>(authUrl(ENDPOINTS.AUTHENTICATION.REFRESH), {
    method: "POST",
    credentials: "include",
  });
}

export async function logout(accessToken: string): Promise<MessageResponse> {
  return fetchClient<MessageResponse>(authUrl(ENDPOINTS.AUTHENTICATION.LOGOUT), {
    method: "POST",
    accessToken,
    credentials: "include",
  });
}

export async function logoutAll(accessToken: string): Promise<MessageResponse> {
  return fetchClient<MessageResponse>(authUrl(ENDPOINTS.AUTHENTICATION.LOGOUT_ALL), {
    method: "POST",
    accessToken,
    credentials: "include",
  });
}

import type { User } from "../types";

export async function getMe(accessToken: string): Promise<User> {
  return fetchClient<User>(authUrl(ENDPOINTS.AUTHENTICATION.ME), {
    method: "GET",
    accessToken,
  });
}
