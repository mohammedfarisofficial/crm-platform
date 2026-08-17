import { z } from 'zod';
import { connection, EXCHANGE_NAME, DLX_EXCHANGE_NAME } from './connection';
import { RoutingKey, QueueName } from './constants';

/**
 * Subscribe to events matching a routing key from the topic exchange.
 * Sets up a dedicated queue with Dead-Lettering.
 *
 * @param queueName Unique queue name for the consuming service
 * @param routingKey Pattern to listen to
 * @param schema Zod schema to validate incoming payloads
 * @param handler Callback to handle validated data
 */
export const subscribeToEvent = <T>(
  queueName: QueueName | (string & {}), // Allows arbitrary queue names but gives autocomplete
  routingKey: RoutingKey | (string & {}), // Allows arbitrary routing keys but gives autocomplete for exact matches
  schema: z.ZodSchema<T>,
  handler: (data: T) => Promise<void>
) => {
  // We create a new channel wrapper just for this consumer 
  // so it handles its own setup and reconnects independently.
  const consumerChannel = connection.createChannel({
    setup: async (channel: any) => {
      // 1. Setup DLQ (Dead Letter Queue)
      const dlqName = `${queueName}_dlq`;
      await channel.assertQueue(dlqName, { durable: true });
      await channel.bindQueue(dlqName, DLX_EXCHANGE_NAME, routingKey);

      // 2. Setup the main consumer queue with DLX arguments
      await channel.assertQueue(queueName, {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': DLX_EXCHANGE_NAME,
          'x-dead-letter-routing-key': routingKey,
        },
      });

      // 3. Bind the main queue to the main exchange
      await channel.bindQueue(queueName, EXCHANGE_NAME, routingKey);

      // 4. Set prefetch (concurrency limit)
      await channel.prefetch(10);

      // 5. Consume messages
      await channel.consume(queueName, async (msg: any) => {
        if (!msg) return;

        try {
          // Parse JSON
          const rawData = JSON.parse(msg.content.toString());
          
          // Validate using Zod
          const validData = schema.parse(rawData);

          // Call the user's handler
          await handler(validData);

          // Acknowledge message on success
          channel.ack(msg);
        } catch (error) {
          console.error(`[RabbitMQ] Consumer Error on queue ${queueName}:`, error);
          // Negative Acknowledge, sending it to the DLX (requeue=false)
          channel.nack(msg, false, false);
        }
      });
    },
  });

  return consumerChannel;
};
