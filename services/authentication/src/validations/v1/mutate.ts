import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string({
    message: 'Email is required and must be a string',
  }).email('Invalid email format'),
  password: z.string({
    message: 'Password is required and must be a string',
  }).min(8, 'Password must be at least 8 characters'),
  first_name: z.string({
    message: 'First name is required and must be a string',
  }).min(1, 'First name is required'),
  last_name: z.string({
    message: 'Last name is required and must be a string',
  }).min(1, 'Last name is required'),
});

export const LoginSchema = z.object({
  email: z.string({
    message: 'Email is required and must be a string',
  }).email('Invalid email format'),
  password: z.string({
    message: 'Password is required and must be a string',
  }).min(1, 'Password is required'),
});

export const VerifyOtpSchema = z.object({
  email: z.string({
    message: 'Email is required and must be a string',
  }).email('Invalid email format'),
  code: z.string({
    message: 'OTP is required and must be a string',
  }).min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
});

export const ResendOtpSchema = z.object({
  email: z.string({
    message: 'Email is required and must be a string',
  }).email('Invalid email format'),
});
