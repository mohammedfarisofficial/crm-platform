/* eslint-disable no-var */
declare var process: { env: Record<string, string | undefined> };

import { ENDPOINTS } from "@crm/utils/constants/endpoints";
import { authUrl } from "../config";
import type {
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
  /** If true, automatically extracts and attaches the accessToken from cookies. */
  secure?: boolean;
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

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

// ---------------------------------------------------------------------------
// Silent token refresh with deduplication
// ---------------------------------------------------------------------------

let activeRefreshPromise: Promise<string> | null = null;

function setAccessTokenCookie(token: string): void {
  if (typeof document === "undefined") return;
  // 14 minutes — slightly under the 15-min JWT lifetime so we refresh early
  document.cookie = `accessToken=${encodeURIComponent(token)}; path=/; max-age=840; SameSite=Lax`;
}

async function refreshAccessToken(): Promise<string> {
  // Deduplicate: if a refresh is already in-flight, piggyback on it
  if (activeRefreshPromise) return activeRefreshPromise;

  activeRefreshPromise = (async () => {
    try {
      const { accessToken } = await refresh();
      setAccessTokenCookie(accessToken);
      return accessToken;
    } finally {
      activeRefreshPromise = null;
    }
  })();

  return activeRefreshPromise;
}

// ---------------------------------------------------------------------------
// Generic fetch client
// ---------------------------------------------------------------------------

async function doFetch<T = unknown>(
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

/**
 * Fetch client with automatic token refresh.
 *
 * When an authenticated request receives a 401, the client silently refreshes
 * the access token via the refresh-token cookie and retries the request once.
 */
export async function fetchClient<T = unknown>(
  url: string,
  options: FetchClientOptions = {},
): Promise<T> {
  if (options.secure && !options.accessToken) {
    const token = getCookie("accessToken");
    if (token) options.accessToken = token;
  }

  try {
    return await doFetch<T>(url, options);
  } catch (error) {
    // Only auto-refresh for authenticated requests (ones that carried an accessToken)
    if (
      error instanceof ApiError &&
      error.status === 401 &&
      options.accessToken
    ) {
      const newToken = await refreshAccessToken();
      return doFetch<T>(url, { ...options, accessToken: newToken });
    }
    throw error;
  }
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
