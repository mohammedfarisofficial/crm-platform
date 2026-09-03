/**
 * Centralized Routing Keys for all events published to RabbitMQ.
 * Structured by the service that emits the event.
 */
export const ROUTING_KEYS = {
  USERS: {
    CREATED: 'users.created',
    UPDATED: 'users.updated',
    DELETED: 'users.deleted',
  },
  AUTHENTICATION: {
    LOGIN_SUCCESS: 'authentication.login_success',
    LOGIN_FAILED: 'authentication.login_failed',
  },
  BRANDS: {
    CREATED: 'brands.created',
    UPDATED: 'brands.updated',
    DELETED: 'brands.deleted',
  },
  RPC: {
    USERS: {
      CREATE: 'rpc.users.create',
      GET_BY_EMAIL: 'rpc.users.get_by_email',
      GET_BY_ID: 'rpc.users.get_by_id',
      VERIFY: 'rpc.users.verify',
    },
    BRANDS: {
      CREATE: 'rpc.brands.create',
      GET_BY_USER: 'rpc.brands.get_by_user',
      GET_BY_ID: 'rpc.brands.get_by_id',
    },
  }
} as const;

export type RoutingKey =
  | typeof ROUTING_KEYS.USERS[keyof typeof ROUTING_KEYS.USERS]
  | typeof ROUTING_KEYS.AUTHENTICATION[keyof typeof ROUTING_KEYS.AUTHENTICATION]
  | typeof ROUTING_KEYS.BRANDS[keyof typeof ROUTING_KEYS.BRANDS]
  | typeof ROUTING_KEYS.RPC.USERS[keyof typeof ROUTING_KEYS.RPC.USERS]
  | typeof ROUTING_KEYS.RPC.BRANDS[keyof typeof ROUTING_KEYS.RPC.BRANDS];
