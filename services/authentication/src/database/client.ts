import { createDbClient } from '@crm/drizzle/client';
import * as schema from './schema/authentication';

export const db = createDbClient(schema);

export type AuthenticationDb = typeof db;
