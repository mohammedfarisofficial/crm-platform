import amqp from 'amqp-connection-manager';

export const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
export const EXCHANGE_NAME = 'crm_events_exchange';
export const DLX_EXCHANGE_NAME = 'crm_events_dlx';

// Create a connection manager
export const connection = amqp.connect([RABBITMQ_URL]);

connection.on('connect', () => {
  console.log('[RabbitMQ] Connected to cluster!');
});

connection.on('disconnect', (err) => {
  console.error('[RabbitMQ] Disconnected:', err);
});

// A core channel wrapper that ensures our topology is always present
export const channelWrapper = connection.createChannel({
  setup: async (channel: any) => {
    // 1. Setup Dead Letter Exchange
    await channel.assertExchange(DLX_EXCHANGE_NAME, 'topic', { durable: true });
    
    // 2. Setup the Main Exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
  },
});
