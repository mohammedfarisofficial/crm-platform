import { redis } from '@crm/redis';
import crypto from 'crypto';

export const authStore = {
  // 30 days in seconds
  REFRESH_TTL: 30 * 24 * 60 * 60,
  
  // 5 mins in seconds
  OTP_TTL: 5 * 60,
  OTP_COOLDOWN: 60,
  
  LOGIN_FAIL_TTL: 15 * 60,

  // --- Refresh Tokens ---

  /**
   * Stores a refresh token hash in Redis and adds the session to the user's active sessions set.
   */
  async storeRefreshToken(userId: string, sessionId: string, rawToken: string): Promise<void> {
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const key = `refresh:${userId}:${sessionId}`;
    
    // Store the hash with 30-day TTL
    await redis.set(key, hash, 'EX', this.REFRESH_TTL);
    // Add to user's active sessions
    await redis.sadd(`user_sessions:${userId}`, sessionId);
  },

  /**
   * Validates a refresh token against Redis. Returns true if valid.
   */
  async validateRefreshToken(userId: string, sessionId: string, rawToken: string): Promise<boolean> {
    const key = `refresh:${userId}:${sessionId}`;
    const storedHash = await redis.get(key);
    
    if (!storedHash) return false;

    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    return hash === storedHash;
  },

  /**
   * Deletes a specific session.
   */
  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const key = `refresh:${userId}:${sessionId}`;
    await redis.del(key);
    await redis.srem(`user_sessions:${userId}`, sessionId);
  },

  /**
   * Revokes all sessions for a user.
   */
  async revokeAllSessions(userId: string): Promise<void> {
    const sessionIds = await redis.smembers(`user_sessions:${userId}`);
    if (sessionIds.length > 0) {
      const keys = sessionIds.map((sid) => `refresh:${userId}:${sid}`);
      await redis.del(...keys);
    }
    await redis.del(`user_sessions:${userId}`);
  },

  /**
   * Gets all active session IDs for a user.
   */
  async getActiveSessions(userId: string): Promise<string[]> {
    return redis.smembers(`user_sessions:${userId}`);
  },

  // --- OTP Management ---

  async storeOTP(email: string, code: string): Promise<void> {
    const payload = JSON.stringify({ code, attempts: 0 });
    await redis.set(`otp:${email}`, payload, 'EX', this.OTP_TTL);
    await redis.set(`otp_cooldown:${email}`, '1', 'EX', this.OTP_COOLDOWN);
  },

  async checkOTPCooldown(email: string): Promise<boolean> {
    const exists = await redis.exists(`otp_cooldown:${email}`);
    return exists === 1;
  },

  /**
   * Validates OTP. Returns 'success', 'invalid', 'expired', or 'max_attempts'.
   */
  async validateOTP(email: string, code: string): Promise<'success' | 'invalid' | 'expired' | 'max_attempts'> {
    const key = `otp:${email}`;
    const dataStr = await redis.get(key);
    if (!dataStr) return 'expired';

    const data = JSON.parse(dataStr);
    
    if (data.attempts >= 5) {
      return 'max_attempts';
    }

    if (data.code === code) {
      await redis.del(key);
      return 'success';
    }

    // Increment attempts
    data.attempts += 1;
    await redis.set(key, JSON.stringify(data), 'KEEPTTL'); // Keep existing TTL
    return 'invalid';
  },

  // --- Rate Limiting & IP Blocking ---

  async recordLoginFailure(ip: string): Promise<number> {
    const key = `login_fail:${ip}`;
    const failures = await redis.incr(key);
    if (failures === 1) {
      await redis.expire(key, this.LOGIN_FAIL_TTL);
    }
    return failures;
  },

  async blockIP(ip: string, ttlHours: number = 1): Promise<void> {
    await redis.set(`blocked_ip:${ip}`, '1', 'EX', ttlHours * 60 * 60);
  },

  async isIPBlocked(ip: string): Promise<boolean> {
    const blocked = await redis.exists(`blocked_ip:${ip}`);
    return blocked === 1;
  },

  async resetLoginFailures(ip: string): Promise<void> {
    await redis.del(`login_fail:${ip}`);
  },

  // --- Blacklist (Access Tokens) ---

  async blacklistToken(jti: string, remainingTtlSeconds: number): Promise<void> {
    if (remainingTtlSeconds > 0) {
      await redis.set(`blacklist_at:${jti}`, '1', 'EX', remainingTtlSeconds);
    }
  },

  async isTokenBlacklisted(jti: string): Promise<boolean> {
    const exists = await redis.exists(`blacklist_at:${jti}`);
    return exists === 1;
  }
}
