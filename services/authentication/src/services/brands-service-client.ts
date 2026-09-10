import { requestReply, ROUTING_KEYS } from '@crm/rabbitmq';

export const brandsServiceClient = {
  async getBrandsByUser(userId: string) {
    try {
      const response = await requestReply<any>(
        ROUTING_KEYS.RPC.BRANDS.GET_BY_USER,
        { user_id: userId }
      );
      if (response.error) {
        if (response.status === 404) return [];
        throw new Error(response.error);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch brands by user over RPC: ${error.message}`);
    }
  },
};
