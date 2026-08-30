import { requestReply, ROUTING_KEYS } from '@crm/rabbitmq';

export const usersServiceClient = {
  async createUser(userData: any) {
    try {
      const response = await requestReply<any>(
        ROUTING_KEYS.RPC.USERS.CREATE,
        userData
      );
      if (response.error) throw new Error(response.error);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create user over RPC: ${error.message}`);
    }
  },

  async getUserByEmail(email: string) {
    try {
      const response = await requestReply<any>(
        ROUTING_KEYS.RPC.USERS.GET_BY_EMAIL,
        { email }
      );
      if (response.error) {
        if (response.status === 404) return null;
        throw new Error(response.error);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch user by email over RPC: ${error.message}`);
    }
  },

  async getUserById(id: string) {
    try {
      const response = await requestReply<any>(
        ROUTING_KEYS.RPC.USERS.GET_BY_ID,
        { id }
      );
      if (response.error) {
        if (response.status === 404) return null;
        throw new Error(response.error);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch user by ID over RPC: ${error.message}`);
    }
  },

  async verifyUser(userId: string) {
    try {
      const response = await requestReply<any>(
        ROUTING_KEYS.RPC.USERS.VERIFY,
        { userId }
      );
      if (response.error) throw new Error(response.error);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to verify user over RPC: ${error.message}`);
    }
  }
};
