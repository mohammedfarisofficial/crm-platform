import { connection, EXCHANGE_NAME } from './connection';
import { RoutingKey } from './constants';

export const handleRpcRequest = <TRequest, TResponse>(
  queueName: string,
  routingKey: RoutingKey | (string & {}),
  handler: (data: TRequest) => Promise<TResponse>
) => {
  const consumerChannel = connection.createChannel({
    setup: async (channel: any) => {
      // Setup the queue
      await channel.assertQueue(queueName, { durable: true });
      await channel.bindQueue(queueName, EXCHANGE_NAME, routingKey);
      await channel.prefetch(10);

      await channel.consume(queueName, async (msg: any) => {
        if (!msg) return;

        try {
          // Parse request
          const rawData = JSON.parse(msg.content.toString()) as TRequest;

          // Process logic
          const responsePayload = await handler(rawData);

          // Reply if replyTo is provided
          if (msg.properties.replyTo && msg.properties.correlationId) {
            // We publish directly to the default exchange ("") using the replyTo queue name as the routing key
            await channel.publish(
              '', 
              msg.properties.replyTo, 
              Buffer.from(JSON.stringify(responsePayload)), 
              {
                correlationId: msg.properties.correlationId,
              }
            );
          }

          channel.ack(msg);
        } catch (error) {
          console.error(`[RabbitMQ RPC] Error handling request on ${queueName}:`, error);
          // Nack the message without requeueing to avoid infinite loops on bad payloads
          channel.nack(msg, false, false);
        }
      });
    },
  });

  return consumerChannel;
};
