import { runMigrations } from '@crm/drizzle/migrate';
import path from 'node:path';

await runMigrations(path.join(import.meta.dir, 'migrations'));
process.exit(0);
