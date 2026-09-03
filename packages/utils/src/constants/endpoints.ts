export const API_BASE = "/api";

export const SERVICES = {
  AUTHENTICATION: "/authenticate",
  USERS: "/users",
  BRANDS: "/brands",
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
  ME: "/me",
};

export const VERSION = {
  V1: "/v1",
  V2: "/v2",
};

const USERS_ENDPOINTS = {
  REGISTER_USER: "/register-user",
};

const BRANDS_ENDPOINTS = {
  CREATE: "/",
  GET_ALL: "/",
  GET_BY_ID: "/:id",
  UPDATE: "/:id",
  DELETE: "/:id",
};

export const ENDPOINTS = {
  AUTHENTICATION: AUTHENTICATION_ENDPOINTS,
  USERS: USERS_ENDPOINTS,
  BRANDS: BRANDS_ENDPOINTS,
};
