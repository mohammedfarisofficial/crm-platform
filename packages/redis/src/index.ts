import { Redis } from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Pre-configured Redis client instance
export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null, // Required for some job queues like BullMQ if used later
  retryStrategy: (times) => {
    // Reconnect after
    return Math.min(times * 50, 2000);
  },
});

redis.on("error", (err) => {
  console.error("[Redis] Client Error:", err);
});

redis.on("connect", () => {
  console.log("[Redis] Connected successfully to", REDIS_URL);
});

export * from "ioredis";
export * from "./redis-util";
