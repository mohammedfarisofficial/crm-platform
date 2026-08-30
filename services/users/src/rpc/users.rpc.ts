import { handleRpcRequest, ROUTING_KEYS, QUEUES } from '@crm/rabbitmq';
import { usersRepository } from '../repository';

export const startRpcConsumers = () => {
  console.log('[Users RPC] Starting RPC consumers...');

  handleRpcRequest<any, any>(
    QUEUES.USERS.RPC_CREATE,
    ROUTING_KEYS.RPC.USERS.CREATE,
    async (payload) => {
      try {
        console.log(`[Users RPC] Creating user ${payload.email}`);
        const user = await usersRepository.createUser(payload);
        return { data: user };
      } catch (error: any) {
        return { error: error.message };
      }
    }
  );

  handleRpcRequest<{ email: string }, any>(
    QUEUES.USERS.RPC_GET_BY_EMAIL,
    ROUTING_KEYS.RPC.USERS.GET_BY_EMAIL,
    async (payload) => {
      try {
        const user = await usersRepository.getUserByEmail(payload.email);
        if (!user) {
          return { error: 'User not found', status: 404 };
        }
        return { data: user };
      } catch (error: any) {
        return { error: error.message };
      }
    }
  );

  handleRpcRequest<{ id: string }, any>(
    QUEUES.USERS.RPC_GET_BY_ID,
    ROUTING_KEYS.RPC.USERS.GET_BY_ID,
    async (payload) => {
      try {
        const user = await usersRepository.getUserById(payload.id);
        if (!user) {
          return { error: 'User not found', status: 404 };
        }
        return { data: user };
      } catch (error: any) {
        return { error: error.message };
      }
    }
  );

  handleRpcRequest<{ userId: string }, any>(
    QUEUES.USERS.RPC_VERIFY,
    ROUTING_KEYS.RPC.USERS.VERIFY,
    async (payload) => {
      try {
        const user = await usersRepository.verifyUser(payload.userId);
        return { data: user };
      } catch (error: any) {
        return { error: error.message };
      }
    }
  );
};
