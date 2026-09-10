import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { brands } from './brands';

export const leads = pgTable('leads', {
  id:         uuid('id').primaryKey().defaultRandom(),
  first_name: text('first_name').notNull(),
  last_name:  text('last_name').notNull(),
  email:      text('email').notNull(),
  phone:      text('phone').notNull(),
  status:     integer('status').notNull().default(1),
  source:     integer('source').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
  created_by: uuid('created_by').notNull(), // Soft FK to users db
  brand_id:   uuid('brand_id').notNull().references(() => brands.id),
});

export type Lead    = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
