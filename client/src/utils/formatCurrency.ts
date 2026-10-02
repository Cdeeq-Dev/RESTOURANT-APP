/**
 * Converts integer money in KOBO (1 NGN = 100 kobo) into formatted Nigerian Naira string.
 * Example: 750000 kobo -> "₦7,500"
 */
export function formatNaira(koboPrice: number): string {
  if (typeof koboPrice !== 'number' || isNaN(koboPrice)) {
    return '₦0';
  }
  const naira = Math.round(koboPrice / 100);
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(naira);
}
