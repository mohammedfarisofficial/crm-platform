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
  RPC: {
    USERS: {
      CREATE: 'rpc.users.create',
      GET_BY_EMAIL: 'rpc.users.get_by_email',
      GET_BY_ID: 'rpc.users.get_by_id',
      VERIFY: 'rpc.users.verify',
    }
  }
} as const;

export type RoutingKey =
  | typeof ROUTING_KEYS.USERS[keyof typeof ROUTING_KEYS.USERS]
  | typeof ROUTING_KEYS.AUTHENTICATION[keyof typeof ROUTING_KEYS.AUTHENTICATION]
  | typeof ROUTING_KEYS.RPC.USERS[keyof typeof ROUTING_KEYS.RPC.USERS];
