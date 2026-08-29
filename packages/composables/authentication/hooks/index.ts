'use client';

import { useCallback } from "react";
import { useLoginMutation, useSignupMutation } from "../mutations";
import type { LoginParams, SignupParams } from "../types";
import { ApiError } from "../types";

// ---------------------------------------------------------------------------
// useSignIn — higher-level hook for the sign-in flow
// ---------------------------------------------------------------------------

export function useSignIn() {
  const mutation = useLoginMutation();

  const signIn = useCallback(
    (params: LoginParams) => mutation.mutateAsync(params),
    [mutation],
  );

  return {
    signIn,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error as ApiError | null,
    data: mutation.data,
    reset: mutation.reset,
  };
}

// ---------------------------------------------------------------------------
// useSignUp — higher-level hook for the sign-up flow
// ---------------------------------------------------------------------------

export function useSignUp() {
  const mutation = useSignupMutation();

  const signUp = useCallback(
    (params: SignupParams) => mutation.mutateAsync(params),
    [mutation],
  );

  return {
    signUp,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error as ApiError | null,
    data: mutation.data,
    reset: mutation.reset,
  };
}
