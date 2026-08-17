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
} as const;

export type RoutingKey =
  | typeof ROUTING_KEYS.USERS[keyof typeof ROUTING_KEYS.USERS]
  | typeof ROUTING_KEYS.AUTHENTICATION[keyof typeof ROUTING_KEYS.AUTHENTICATION];
