import crypto from 'node:crypto';

// Use ID_CRYPTO_SECRET, fallback to a default 32-byte key for local dev if missing
const rawSecret = process.env.ID_CRYPTO_SECRET || 'changeme-id-crypto-secret-local!!';

// Ensure the secret is exactly 32 bytes for aes-256-gcm
const SECRET_KEY = crypto.scryptSync(rawSecret, 'salt', 32);
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

export const cryptoUtils = {
  encryptID(id: string): string {
    if (!id) return id;
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
      let encrypted = cipher.update(id, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      const authTag = cipher.getAuthTag().toString('hex');
      return `${iv.toString('hex')}:${encrypted}:${authTag}`;
    } catch (err) {
      console.error('Failed to encrypt ID', err);
      return id; // fallback to plain ID on error to avoid breaking the app
    }
  },

  decryptID(encryptedId: string): string {
    if (!encryptedId) return encryptedId;
    if (!encryptedId.includes(':')) return encryptedId; // assume it's not encrypted
    
    try {
      const parts = encryptedId.split(':');
      if (parts.length !== 3) return encryptedId;
      
      const [ivHex, encryptedHex, authTagHex] = parts;
      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');
      
      const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
      decipher.setAuthTag(authTag);
      
      let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (err) {
      console.error('Failed to decrypt ID', err);
      return encryptedId; // return original string if decryption fails
    }
  }
};
