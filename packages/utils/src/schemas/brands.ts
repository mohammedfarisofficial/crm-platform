import { z } from 'zod';

export const CreateBrandSchema = z.object({
  name:    z.string().min(1, 'Brand name is required'),
});

export const UpdateBrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
});

// Inferred TypeScript types — import these instead of defining your own
export type CreateBrandInput = z.infer<typeof CreateBrandSchema>;
export type UpdateBrandInput = z.infer<typeof UpdateBrandSchema>;
