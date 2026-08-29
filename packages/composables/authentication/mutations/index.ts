'use client';

import { useMutation } from "@tanstack/react-query";
import { AUTH_MUTATION_KEYS } from "../config";
import * as authApi from "../functions";
import type {
  SignupParams,
  LoginParams,
  VerifyOtpParams,
  ResendOtpParams,
  MessageResponse,
  LoginResponse,
} from "../types";

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------

export function useSignupMutation() {
  return useMutation<MessageResponse, Error, SignupParams>({
    mutationKey: AUTH_MUTATION_KEYS.signup,
    mutationFn: (params) => authApi.signup(params),
  });
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginParams>({
    mutationKey: AUTH_MUTATION_KEYS.login,
    mutationFn: (params) => authApi.login(params),
  });
}

// ---------------------------------------------------------------------------
// Verify OTP
// ---------------------------------------------------------------------------

export function useVerifyOtpMutation() {
  return useMutation<MessageResponse, Error, VerifyOtpParams>({
    mutationKey: AUTH_MUTATION_KEYS.verifyOtp,
    mutationFn: (params) => authApi.verifyOtp(params),
  });
}

// ---------------------------------------------------------------------------
// Resend OTP
// ---------------------------------------------------------------------------

export function useResendOtpMutation() {
  return useMutation<MessageResponse, Error, ResendOtpParams>({
    mutationKey: AUTH_MUTATION_KEYS.resendOtp,
    mutationFn: (params) => authApi.resendOtp(params),
  });
}

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------

export function useLogoutMutation() {
  return useMutation<MessageResponse, Error, string>({
    mutationKey: AUTH_MUTATION_KEYS.logout,
    mutationFn: (accessToken) => authApi.logout(accessToken),
  });
}

// ---------------------------------------------------------------------------
// Logout All
// ---------------------------------------------------------------------------

export function useLogoutAllMutation() {
  return useMutation<MessageResponse, Error, string>({
    mutationKey: AUTH_MUTATION_KEYS.logoutAll,
    mutationFn: (accessToken) => authApi.logoutAll(accessToken),
  });
}
