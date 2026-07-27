import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)} €`;
}

export function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calculateShipping(subtotal: number, settings: { shippingFee: number; freeShippingMinimum: number }) {
  if (subtotal >= settings.freeShippingMinimum) return 0;
  return settings.shippingFee;
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!message?.trim()) {
    return `https://wa.me/${digits}`;
  }
  return `https://api.whatsapp.com/send?phone=${digits}&text=${encodeURIComponent(message.trim())}`;
}
