import { db } from '../database/client';
import { brands } from '../database/schema/brands';
import { leads } from '../database/schema/leads';
import { utils as dbUtils } from '@crm/drizzle/utils';
import type { CreateBrandInput, UpdateBrandInput, CreateLeadSInput } from '@crm/utils/schemas/brands';
import { eq, desc, count } from 'drizzle-orm';
import { MySqlTimestampString } from 'drizzle-orm/mysql-core';

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

  createLead: async (id: string, args: CreateLeadSInput) => {
    const [lead] = await dbUtils.insertQuery(db, leads, { ...args, created_by: id });
    return lead;
  },

  getLeads: async (brandId: string, limit: number, offset: number) => {
    return db.select().from(leads)
      .where(eq(leads.brand_id, brandId as any))
      .orderBy(desc(leads.created_at))
      .limit(limit)
      .offset(offset);
  },

  getLeadsCount: async (brandId: string) => {
    const [result] = await db.select({ value: count() }).from(leads)
      .where(eq(leads.brand_id, brandId as any));
    return result.value;
  }
};
