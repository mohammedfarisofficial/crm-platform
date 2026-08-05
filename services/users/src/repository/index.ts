import { insertQuery } from '@crm/utils/query-utils';
import type { RegisterUserInput } from '@crm/utils/schemas/users';
import { db } from '../database/client';
import { users } from '../database/schema/users';

export const usersRepository = {
    createUser: async (args: RegisterUserInput) => {
        const { password, ...rest } = args;

        // TODO: Replace with bcrypt / argon2 once auth package is in place
        const password_hash = Buffer.from(password).toString('base64');

        const [user] = await insertQuery(db, users, {
            ...rest,
            password_hash,
        });

        return user;
    },
};