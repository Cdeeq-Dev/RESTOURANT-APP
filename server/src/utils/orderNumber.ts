import crypto from 'crypto';

/**
 * Generates a human-readable, unique, and unpredictable order number.
 * Format: ORD-YYYYMMDD-XXXXXX (e.g. ORD-20261002-8F3A21)
 */
export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomBytes = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `ORD-${dateStr}-${randomBytes}`;
}
