import { db } from '../database/client';
import { passwordUtils } from '@crm/utils';
import { users } from '../database/schema/users';
import { utils as dbUtils } from '@crm/drizzle/utils';
import type { RegisterUserInput } from '@crm/utils/schemas/users';

export const usersRepository = {
    createUser: async (args: RegisterUserInput) => {
        const { password, ...restArgs } = args;
        const hashedPassword = await passwordUtils.hash(password);
        const [user] = await dbUtils.insertQuery(db, users, {
            ...restArgs,
            password: hashedPassword,
        });

        return user;
    },
};