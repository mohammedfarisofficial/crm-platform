import { connection } from './connection';
import crypto from 'crypto';
import { RoutingKey } from './constants';

export const requestReply = async <TResponse>(
  routingKey: RoutingKey | (string & {}),
  payload: any,
  timeoutMs: number = 10000
): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    let resolved = false;

    // Create an independent channel for the RPC client
    const rpcChannelWrapper = connection.createChannel({
      setup: async (channel: any) => {
        try {
          // 1. Create a temporary, exclusive queue for the reply
          const q = await channel.assertQueue('', { exclusive: true, autoDelete: true });
          const replyTo = q.queue;
          const correlationId = crypto.randomUUID();

          // 2. Consume from the reply queue
          await channel.consume(
            replyTo,
            (msg: any) => {
              if (msg && msg.properties.correlationId === correlationId) {
                if (!resolved) {
                  resolved = true;
                  const responseData = JSON.parse(msg.content.toString());
                  resolve(responseData);
                  
                  // Cleanup: close the temporary channel after receiving the response
                  rpcChannelWrapper.close().catch(() => {});
                }
              }
            },
            { noAck: true }
          );

          // 3. Publish the request
          await channel.publish('crm_events_exchange', routingKey, Buffer.from(JSON.stringify(payload)), {
            correlationId,
            replyTo,
            persistent: false, // RPC is typically transient
          });

          // 4. Setup timeout
          setTimeout(() => {
            if (!resolved) {
              resolved = true;
              reject(new Error(`RPC request to ${routingKey} timed out after ${timeoutMs}ms`));
              rpcChannelWrapper.close().catch(() => {});
            }
          }, timeoutMs);

        } catch (error) {
          if (!resolved) {
            resolved = true;
            reject(error);
          }
        }
      },
    });
  });
};
