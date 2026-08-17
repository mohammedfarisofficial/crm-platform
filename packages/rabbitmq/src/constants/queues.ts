/**
 * Centralized Queue names for RabbitMQ consumers.
 * Structured by the service that consumes the events.
 */
export const QUEUES = {
  AUTHENTICATION: {
    USER_EVENTS: 'auth_service_user_events_queue',
  },
  USERS: {
    // Add queues for the users service here as needed
  },
} as const;

export type QueueName =
  | typeof QUEUES.AUTHENTICATION[keyof typeof QUEUES.AUTHENTICATION];
