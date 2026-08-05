import { createDbClient } from '@crm/drizzle/client';
import * as schema from './schema/users';

export const db = createDbClient(schema);

export type UsersDb = typeof db;