import { channelWrapper, EXCHANGE_NAME } from './connection';
import { RoutingKey } from './constants';

/**
 * Publish an event to the main topic exchange.
 * 
 * @param routingKey The routing key (e.g. ROUTING_KEYS.USERS.CREATED)
 * @param data The payload data to send
 */
export const publishEvent = async <T>(routingKey: RoutingKey, data: T): Promise<boolean> => {
  try {
    const success = await channelWrapper.publish(
      EXCHANGE_NAME, 
      routingKey, 
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );
    return success;
  } catch (error) {
    console.error(`[RabbitMQ] Failed to publish event with routing key: ${routingKey}`, error);
    throw error;
  }
};
