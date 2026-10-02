import crypto from 'crypto';

/**
 * Generates a human-readable, unique, and unpredictable reservation number.
 * Format: RES-YYYYMMDD-XXXXXX (e.g. RES-20261005-9F3A12)
 */
export function generateReservationNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomBytes = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `RES-${dateStr}-${randomBytes}`;
}
