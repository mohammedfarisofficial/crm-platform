import crypto from 'node:crypto';

export const passwordUtils = {
  async hash(password: string): Promise<string> {
    const pepper = process.env.PASSWORD_PEPPER;
    
    if (!pepper) {
      throw new Error('PASSWORD_PEPPER environment variable is missing.');
    }

    const hmac = crypto.createHmac('sha256', pepper).update(password).digest('hex');
    return Bun.password.hash(hmac);
  },

  async verify(password: string, hash: string): Promise<boolean> {
    const pepper = process.env.PASSWORD_PEPPER;
    
    if (!pepper) {
      throw new Error('PASSWORD_PEPPER environment variable is missing.');
    }

    const hmac = crypto.createHmac('sha256', pepper).update(password).digest('hex');
    return Bun.password.verify(hmac, hash);
  }
};
