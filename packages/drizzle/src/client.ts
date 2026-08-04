import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export interface DbClientOptions {
  max?: number;
  idleTimeout?: number;
  pgBouncer?: boolean;
}

export function createDbClient<TSchema extends Record<string, unknown>>(
  schema: TSchema,
  options: DbClientOptions = {}
) {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');

  const { max = 10, idleTimeout = 30, pgBouncer = true } = options;

  const client = postgres(url, {
    max,
    idle_timeout: idleTimeout,
    // Must be false for PgBouncer transaction mode
    // (prepared statements are not supported in transaction pooling mode)
    prepare: !pgBouncer,
  });

  return drizzle(client, { schema });
}

export type DrizzleClient<TSchema extends Record<string, unknown>> =
  ReturnType<typeof createDbClient<TSchema>>;
