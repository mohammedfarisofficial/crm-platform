import { handleRpcRequest, ROUTING_KEYS, QUEUES } from '@crm/rabbitmq';
import { brandsRepository } from '../repository';

export const startRpcConsumers = () => {
  console.log('[Brands RPC] Starting RPC consumers...');

  handleRpcRequest<any, any>(
    QUEUES.BRANDS.RPC_CREATE,
    ROUTING_KEYS.RPC.BRANDS.CREATE,
    async (payload) => {
      try {
        console.log(`[Brands RPC] Creating brand ${payload.name}`);
        const brand = await brandsRepository.createBrand(payload);
        return { data: brand };
      } catch (error: any) {
        return { error: error.message };
      }
    }
  );

  handleRpcRequest<{ user_id: string }, any>(
    QUEUES.BRANDS.RPC_GET_BY_USER,
    ROUTING_KEYS.RPC.BRANDS.GET_BY_USER,
    async (payload) => {
      try {
        const brands = await brandsRepository.getBrandsByUser(payload.user_id);
        return { data: brands };
      } catch (error: any) {
        return { error: error.message };
      }
    }
  );

  handleRpcRequest<{ id: string }, any>(
    QUEUES.BRANDS.RPC_GET_BY_ID,
    ROUTING_KEYS.RPC.BRANDS.GET_BY_ID,
    async (payload) => {
      try {
        const brand = await brandsRepository.getBrandById(payload.id);
        if (!brand) {
          return { error: 'Brand not found', status: 404 };
        }
        return { data: brand };
      } catch (error: any) {
        return { error: error.message };
      }
    }
  );
};
