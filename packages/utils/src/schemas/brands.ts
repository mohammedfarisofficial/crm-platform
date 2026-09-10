import { z } from 'zod';

export const CreateBrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
});

export const UpdateBrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
});

export const CreateLeadSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name:  z.string().min(1, 'Last name is required'),
  email:      z.string().email('Invalid email address'),
  phone:      z.string().min(1, 'Phone number is required'),
  status:     z.number().int().optional().default(1),
  source:     z.number().int().optional().default(1),
  brand_id:   z.string().min(1, 'Brand ID is required'),
});

export type CreateBrandInput = z.infer<typeof CreateBrandSchema>;
export type UpdateBrandInput = z.infer<typeof UpdateBrandSchema>;
export type CreateLeadSInput = z.infer<typeof CreateLeadSchema>;
