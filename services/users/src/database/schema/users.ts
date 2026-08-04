import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id:            uuid('id').primaryKey().defaultRandom(),
  email:         text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  role:          integer('role').default(3).notNull(),
  first_name:    text('first_name').notNull(),
  last_name:     text('last_name').notNull(),
  profile_url:   text('profile_url'),
  phone:         text('phone'),
  created_at:    timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at:    timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type User    = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
