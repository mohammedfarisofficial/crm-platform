import { db } from '../database/client';
import { passwordUtils } from '@crm/utils';
import { users } from '../database/schema/users';
import { utils as dbUtils } from '@crm/drizzle/utils';
import type { RegisterUserInput } from '@crm/utils/schemas/users';

import { eq } from 'drizzle-orm';

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
    
    getUserByEmail: async (email: string) => {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user;
    },

    getUserById: async (id: string) => {
        const [user] = await db.select({
            email: users.email,
            first_name: users.first_name,
            last_name: users.last_name,
            profile_url: users.profile_url,
            is_verified: users.is_verified
        }).from(users).where(eq(users.id, id as any));
        return user;
    },

    verifyUser: async (id: string) => {
        const [user] = await db.update(users).set({ is_verified: true }).where(eq(users.id, id as any)).returning();
        return user;
    }
};