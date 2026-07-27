import { prisma } from "./db";
import type { SiteConfig } from "@/types";
import { BRAND } from "@/types";
import { resolvePhone, resolveWhatsApp } from "./contact-channels";

const DEFAULT_SHIPPING_FEE = 150;
const DEFAULT_FREE_SHIPPING_MIN = 5000;

export async function getSiteSettings(): Promise<SiteConfig> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  if (!settings) {
    return {
      shippingFee: DEFAULT_SHIPPING_FEE,
      freeShippingMinimum: DEFAULT_FREE_SHIPPING_MIN,
      phone: resolvePhone(process.env.NEXT_PUBLIC_PHONE) || "",
      email: process.env.NEXT_PUBLIC_EMAIL || BRAND.email,
      whatsapp: resolveWhatsApp(process.env.NEXT_PUBLIC_WHATSAPP) || "",
      instagram: process.env.NEXT_PUBLIC_INSTAGRAM || BRAND.instagram,
      city: "İstanbul",
      shippingNote: "5.000 ₺ ve üzeri siparişlerde kargo ücretsizdir.",
    };
  }

  return {
    shippingFee: settings.shippingFee,
    freeShippingMinimum: settings.freeShippingMinimum,
    phone: resolvePhone(settings.phone) || resolvePhone(process.env.NEXT_PUBLIC_PHONE) || "",
    email: settings.email || process.env.NEXT_PUBLIC_EMAIL || BRAND.email,
    whatsapp:
      resolveWhatsApp(settings.whatsapp) ||
      resolveWhatsApp(process.env.NEXT_PUBLIC_WHATSAPP) ||
      "",
    instagram: settings.instagram || process.env.NEXT_PUBLIC_INSTAGRAM || BRAND.instagram,
    city: settings.city,
    shippingNote: settings.shippingNote,
  };
}
