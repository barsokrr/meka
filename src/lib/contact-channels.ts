/** Placeholder numbers that must never be shown as real contact channels. */
const PLACEHOLDER_WHATSAPP = new Set(["905320000000", "5320000000", "05320000000"]);
const PLACEHOLDER_PHONE = new Set([
  "+90 532 000 00 00",
  "+905320000000",
  "905320000000",
  "0532 000 00 00",
]);

export function normalizeDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isConfiguredWhatsApp(value?: string | null): value is string {
  if (!value?.trim()) return false;
  const digits = normalizeDigits(value);
  if (digits.length < 10) return false;
  return !PLACEHOLDER_WHATSAPP.has(digits);
}

export function isConfiguredPhone(value?: string | null): value is string {
  if (!value?.trim()) return false;
  const trimmed = value.trim();
  if (PLACEHOLDER_PHONE.has(trimmed)) return false;
  const digits = normalizeDigits(trimmed);
  if (digits.length < 10) return false;
  return !PLACEHOLDER_WHATSAPP.has(digits);
}

export function getPublicWhatsApp(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP;
  return isConfiguredWhatsApp(fromEnv) ? fromEnv.trim() : null;
}

export function getPublicPhone(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_PHONE;
  return isConfiguredPhone(fromEnv) ? fromEnv.trim() : null;
}

export function resolveWhatsApp(preferred?: string | null): string | null {
  if (isConfiguredWhatsApp(preferred)) return preferred.trim();
  return getPublicWhatsApp();
}

export function resolvePhone(preferred?: string | null): string | null {
  if (isConfiguredPhone(preferred)) return preferred.trim();
  return getPublicPhone();
}
