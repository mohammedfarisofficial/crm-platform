export const API_BASE = "/api";

export const SERVICES = {
  AUTHENTICATION: "/authenticate",
  USERS: "/users",
};

const AUTHENTICATION_ENDPOINTS = {
  SIGN_IN: "/login",
  SIGN_UP: "/signup",
  VERIFY_OTP: "/verify-otp",
  RESEND_OTP: "/resend-otp",
  REFRESH: "/refresh",
  LOGOUT: "/logout",
  LOGOUT_ALL: "/logout-all",
  SESSIONS: "/sessions",
};

export const VERSION = {
  V1: "/v1",
  V2: "/v2",
};

const USERS_ENDPOINTS = {
  REGISTER_USER: "/register-user",
};

export const ENDPOINTS = {
  AUTHENTICATION: AUTHENTICATION_ENDPOINTS,
  USERS: USERS_ENDPOINTS,
};
