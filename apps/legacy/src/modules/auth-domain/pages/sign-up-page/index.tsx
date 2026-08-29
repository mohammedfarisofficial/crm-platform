'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useSignUp } from '@crm/composables/authenticate/hooks';
import { ApiError } from '@crm/composables/authenticate/types';
import { FormElements } from '@crm/interface';
import { URLS } from '@crm/utils/constants/urls';
import { SIGN_UP_FORM_CONFIG, FormFieldConfig } from '../../config/forms';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const { signUp, isPending, isSuccess, error } = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const apiError = error instanceof ApiError ? error : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await signUp(formData);
    } catch {
      // Error is captured in the hook's error state
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen">
        {/* Left side image */}
        <div 
          className="hidden lg:block lg:w-[65%] bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/auth-image.png')" }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Right side success message */}
        <div className="flex w-full lg:w-[35%] items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-xs space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Account created
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400">
              We&apos;ve sent a verification code to <strong>{formData.email}</strong>. Please check your email and verify your account.
            </p>
            <FormElements.Button
              as={Link}
              href={`${URLS.AUTH_DOMAIN_BASE_URL}/sign-in`}
              variant="primary"
              className="w-full shadow-sm"
            >
              Go to Sign in
            </FormElements.Button>
          </div>
        </div>
      </div>
    );
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
              Create an account
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Get started with Dadad CRM
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

            {SIGN_UP_FORM_CONFIG.map((item, index) => {
              if ('fields' in item) {
                return (
                  <div key={`row-${index}`} className="grid grid-cols-2 gap-4">
                    {item.fields.map((field) => (
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
                        minLength={field.minLength}
                      />
                    ))}
                  </div>
                );
              }
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
                  minLength={field.minLength}
                />
              );
            })}

            <FormElements.Button
              type="submit"
              variant="primary"
              isPending={isPending}
              className="w-full shadow-sm"
            >
              Create account
            </FormElements.Button>
          </form>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link
              href={`${URLS.AUTH_DOMAIN_BASE_URL}/sign-in`}
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}