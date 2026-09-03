import { createDbClient } from '@crm/drizzle/client';
import * as schema from './schema/brands';

export const db = createDbClient(schema);

export type BrandsDb = typeof db;
