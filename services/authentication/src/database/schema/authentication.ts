import { pgTable, uuid, text, inet, boolean, timestamp } from 'drizzle-orm/pg-core';


export const loginAttempts = pgTable('login_attempts', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id'),
  email: text('email'),
  ip_address: inet('ip_address'),
  success: boolean('success'),
  reason: text('reason'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
