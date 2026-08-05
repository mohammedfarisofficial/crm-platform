import type { PgTable } from 'drizzle-orm/pg-core';
import type { DrizzleClient } from './client';

/**
 * Generic insert helper for Drizzle tables.
 * Returns the newly inserted row(s).
 *
 * Usage:
 *   const [user] = await insertQuery(db, users, { email, first_name, ... });
 */
async function insertQuery<
  TTable extends PgTable,
  TInsert extends TTable['$inferInsert'],
>(
  db: DrizzleClient<Record<string, unknown>>,
  table: TTable,
  values: TInsert,
): Promise<TTable['$inferSelect'][]> {
  return (db as any)
    .insert(table)
    .values(values)
    .returning();
}

export const utils = {
  insertQuery,
};
