'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { FormElements } from '@crm/interface';
import { URLS } from '@crm/utils/constants/urls';
import { ApiError } from '@crm/composables/authenticate/types';
import { useSignIn } from '@crm/composables/authenticate/hooks';
import { SIGN_IN_FORM_CONFIG, FormFieldConfig } from '../../config/forms';
import { setTokenCookie } from '../../actions';

export function SignInPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { signIn, isPending, error } = useSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const apiError = error instanceof ApiError ? error : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const result = await signIn(formData);
      if (result?.accessToken) {
        await setTokenCookie(result.accessToken);
      }
      window.location.href = URLS.PLATFORM_BASE_URL;
    } catch {
      // Error is captured in the hook's error state
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div 
        className="hidden lg:block lg:w-[65%] bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/auth-image.png')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Right side form */}
      <div className="flex w-full lg:w-[35%] items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xs space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {apiError && (
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4">
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  {apiError.message}
                </p>
              </div>
            )}

            {SIGN_IN_FORM_CONFIG.map((item, index) => {
              if ('fields' in item) return null; // sign in form doesn't use rows
              const field = item as FormFieldConfig;
              return (
                <FormElements.Input
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  autoComplete={field.autoComplete}
                />
              );
            })}

            <FormElements.Button
              type="submit"
              variant="primary"
              isPending={isPending}
              className="w-full shadow-sm"
            >
              Sign in
            </FormElements.Button>
          </form>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link
              href={`${URLS.AUTH_DOMAIN_BASE_URL}/sign-up`}
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}