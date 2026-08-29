import {
  API_BASE,
  VERSION,
  SERVICES,
} from "@crm/utils/constants/endpoints";

// ---------------------------------------------------------------------------
// Auth base path — e.g. "/api/v1/authenticate"
// ---------------------------------------------------------------------------

export const AUTH_BASE = `${API_BASE}${VERSION.V1}${SERVICES.AUTHENTICATION}`;

export function authUrl(endpoint: string): string {
  return `${AUTH_BASE}${endpoint}`;
}

// ---------------------------------------------------------------------------
// TanStack Query key factory
// ---------------------------------------------------------------------------

export const AUTH_QUERY_KEYS = {
  all: ["authentication"] as const,
  sessions: () => [...AUTH_QUERY_KEYS.all, "sessions"] as const,
} as const;

// ---------------------------------------------------------------------------
// Mutation keys (used for deduplication / optimistic updates)
// ---------------------------------------------------------------------------

export const AUTH_MUTATION_KEYS = {
  signup: ["authentication", "signup"] as const,
  login: ["authentication", "login"] as const,
  verifyOtp: ["authentication", "verify-otp"] as const,
  resendOtp: ["authentication", "resend-otp"] as const,
  refresh: ["authentication", "refresh"] as const,
  logout: ["authentication", "logout"] as const,
  logoutAll: ["authentication", "logout-all"] as const,
} as const;
