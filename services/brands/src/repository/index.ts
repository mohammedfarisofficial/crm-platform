import { db } from '../database/client';
import { brands } from '../database/schema/brands';
import { utils as dbUtils } from '@crm/drizzle/utils';
import type { CreateBrandInput, UpdateBrandInput } from '@crm/utils/schemas/brands';
import { eq } from 'drizzle-orm';

export const brandsRepository = {
  createBrand: async (args: CreateBrandInput) => {
    const [brand] = await dbUtils.insertQuery(db, brands, args);
    return brand;
  },

  getBrandsByUser: async (userId: string) => {
    return db.select().from(brands).where(eq(brands.user_id, userId as any));
  },

  getBrandById: async (id: string) => {
    const [brand] = await db.select().from(brands).where(eq(brands.id, id as any));
    return brand;
  },

  updateBrand: async (id: string, args: UpdateBrandInput) => {
    const [brand] = await db.update(brands).set(args).where(eq(brands.id, id as any)).returning();
    return brand;
  },

  deleteBrand: async (id: string) => {
    const [brand] = await db.delete(brands).where(eq(brands.id, id as any)).returning();
    return brand;
  },
};
