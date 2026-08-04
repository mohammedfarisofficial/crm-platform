import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

/**
 * Runs pending Drizzle migrations from the given folder.
 * Reads DATABASE_DIRECT_URL from env — must be a direct Postgres connection
 * (not PgBouncer), as migrations require session mode for DDL locks.
 */
export async function runMigrations(migrationsFolder: string): Promise<void> {
  const url = process.env.DATABASE_DIRECT_URL;
  if (!url) throw new Error('DATABASE_DIRECT_URL is not set');

  const migration_client = postgres(url, { max: 1 });

  try {
    await migrate(drizzle(migration_client), { migrationsFolder });
    console.log(`✅ Migrations applied from: ${migrationsFolder}`);
  } finally {
    await migration_client.end();
  }
}
