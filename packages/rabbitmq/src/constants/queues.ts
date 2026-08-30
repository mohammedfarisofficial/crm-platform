/**
 * Centralized Queue names for RabbitMQ consumers.
 * Structured by the service that consumes the events.
 */
export const QUEUES = {
  AUTHENTICATION: {
    USER_EVENTS: 'auth_service_user_events_queue',
  },
  USERS: {
    RPC_CREATE: 'users_rpc_create',
    RPC_GET_BY_EMAIL: 'users_rpc_get_by_email',
    RPC_GET_BY_ID: 'users_rpc_get_by_id',
    RPC_VERIFY: 'users_rpc_verify',
  },
} as const;

export type QueueName =
  | typeof QUEUES.AUTHENTICATION[keyof typeof QUEUES.AUTHENTICATION]
  | typeof QUEUES.USERS[keyof typeof QUEUES.USERS];
