import { redis } from "./index";

export class RedisUtil {
  /**
   * Get a parsed JSON value from Redis
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`[RedisUtil] Failed to get key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set a JSON value in Redis with an optional TTL (in seconds)
   */
  static async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      if (ttlSeconds) {
        await redis.set(key, stringValue, "EX", ttlSeconds);
      } else {
        await redis.set(key, stringValue);
      }
    } catch (error) {
      console.error(`[RedisUtil] Failed to set key ${key}:`, error);
    }
  }

  /**
   * Delete a key from Redis
   */
  static async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      console.error(`[RedisUtil] Failed to delete key ${key}:`, error);
    }
  }

  /**
   * Fetch data from Redis if it exists, otherwise execute the fetcher function, cache the result, and return it.
   */
  static async fetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const freshData = await fetcher();
    await this.set(key, freshData, ttlSeconds);
    
    return freshData;
  }
}
