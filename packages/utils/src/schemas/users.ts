import { z } from 'zod';

export const RegisterUserSchema = z.object({
  first_name:  z.string().min(1, 'First name is required'),
  last_name:   z.string().min(1, 'Last name is required'),
  email:       z.string().email('Invalid email address'),
  password:    z.string().min(8, 'Password must be at least 8 characters'),
  phone:       z.string().optional(),
  profile_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

// Inferred TypeScript types — import these instead of defining your own
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
