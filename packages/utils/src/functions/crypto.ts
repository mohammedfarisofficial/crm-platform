import crypto from 'node:crypto';

// Use ID_CRYPTO_SECRET, fallback to a default 32-byte key for local dev if missing
const rawSecret = process.env.ID_CRYPTO_SECRET || 'changeme-id-crypto-secret-local!!';

// Ensure the secret is exactly 32 bytes for aes-256-gcm
const SECRET_KEY = crypto.scryptSync(rawSecret, 'salt', 32);
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

// ---------------------------------------------------------------------------
// Email encryption — separate key + stronger KDF + HMAC integrity
// ---------------------------------------------------------------------------

const rawEmailSecret = process.env.EMAIL_CRYPTO_SECRET || 'changeme-email-crypto-secret-local!!';
// Stronger scrypt parameters: N=16384 (2^14), r=8, p=1
const EMAIL_KEY = crypto.scryptSync(rawEmailSecret, 'email-encryption-salt', 32, { N: 16384, r: 8, p: 1 });
const HMAC_KEY = crypto.scryptSync(rawEmailSecret, 'email-hmac-salt', 32, { N: 16384, r: 8, p: 1 });
const EMAIL_VERSION = 'v1'; // version prefix for future migration

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
  },

  encryptEmail(email: string): string {
    if (!email) return email;
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(ALGORITHM, EMAIL_KEY, iv);
      let encrypted = cipher.update(email, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      const authTag = cipher.getAuthTag().toString('hex');

      // Payload before HMAC: version:iv:ciphertext:gcmTag
      const payload = `${EMAIL_VERSION}:${iv.toString('hex')}:${encrypted}:${authTag}`;

      // HMAC-SHA512 over the entire payload for additional tamper detection
      const hmac = crypto.createHmac('sha512', HMAC_KEY).update(payload).digest('hex');

      return `${payload}:${hmac}`;
    } catch (err) {
      console.error('Failed to encrypt email', err);
      return email;
    }
  },

  decryptEmail(encryptedEmail: string): string {
    if (!encryptedEmail) return encryptedEmail;
    if (!encryptedEmail.includes(':')) return encryptedEmail;

    try {
      const parts = encryptedEmail.split(':');
      if (parts.length !== 5) return encryptedEmail;

      const [version, ivHex, encryptedHex, authTagHex, hmacHex] = parts;

      if (version !== EMAIL_VERSION) {
        console.error('Unknown email encryption version:', version);
        return encryptedEmail;
      }

      // Verify HMAC first — reject tampered data before attempting decryption
      const payload = `${version}:${ivHex}:${encryptedHex}:${authTagHex}`;
      const expectedHmac = crypto.createHmac('sha512', HMAC_KEY).update(payload).digest('hex');
      if (!crypto.timingSafeEqual(Buffer.from(hmacHex, 'hex'), Buffer.from(expectedHmac, 'hex'))) {
        console.error('Email HMAC verification failed — data may be tampered');
        return encryptedEmail;
      }

      const iv = Buffer.from(ivHex, 'hex');
      const authTag = Buffer.from(authTagHex, 'hex');

      const decipher = crypto.createDecipheriv(ALGORITHM, EMAIL_KEY, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (err) {
      console.error('Failed to decrypt email', err);
      return encryptedEmail;
    }
  }
};
