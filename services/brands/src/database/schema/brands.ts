import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const brands = pgTable('brands', {
  id:      uuid('id').primaryKey().defaultRandom(),
  name:    text('name').notNull(),
  user_id: uuid('user_id').notNull(),
});

export type Brand    = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
