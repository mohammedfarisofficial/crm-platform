import { runMigrations } from '@crm/drizzle/migrate';
import path from 'node:path';

// DATABASE_DIRECT_URL is read inside @crm/drizzle
// Run via: bun run db:migrate
await runMigrations(path.join(import.meta.dir, 'migrations'));
process.exit(0);
