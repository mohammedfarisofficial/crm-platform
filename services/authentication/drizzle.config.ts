import { createDrizzleConfig } from '@crm/drizzle/config';

export default createDrizzleConfig({
  schema_path:       './src/database/schema/authentication.ts',
  migrations_folder: './src/database/migrations',
  db_url: process.env.DATABASE_DIRECT_URL!,
});
