import type { Config } from 'drizzle-kit';

export interface DrizzleConfigOptions {
  schema_path: string;
  migrations_folder: string;
  db_url: string;
}

/**
 * Returns a base Drizzle config object.
 * Each service extends this via their own drizzle.config.ts.
 * Uses DATABASE_DIRECT_URL (not PgBouncer) for drizzle-kit introspection.
 */
export function createDrizzleConfig(options: DrizzleConfigOptions): Config {
  return {
    dialect: 'postgresql',
    schema: options.schema_path,
    out: options.migrations_folder,
    dbCredentials: { url: options.db_url },
    // Enforces snake_case for all generated SQL identifiers
    casing: 'snake_case',
    verbose: true,
    strict: true,
  };
}
