import type { SiteConfig } from "@/types";
import { BRAND } from "@/types";

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  note?: string | null;
  items: { name: string; price: number; quantity: number }[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export type EmailSendResult = {
  sent: boolean;
  mode: "smtp" | "console";
  adminEmail: string;
  fromEmail: string;
};

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Prepares order emails. Real SMTP transport can be wired when SMTP_* env vars are set.
 * Until then, logs to console and reports sent: false so UI stays honest.
 */
export async function sendOrderEmails(
  order: OrderEmailData,
  settings: SiteConfig
): Promise<EmailSendResult> {
  const adminEmail = process.env.ADMIN_EMAIL || settings.email;
  const fromEmail = process.env.FROM_EMAIL || BRAND.fromEmail;

  const itemsList = order.items
    .map((i) => `- ${i.name} x${i.quantity}: ${i.price * i.quantity} €`)
    .join("\n");

  const adminBody = `
Yeni Sipariş: ${order.orderNumber}

Müşteri: ${order.customerName}
Telefon: ${order.phone}
E-posta: ${order.email}
Adres: ${order.district}, ${order.city}
${order.address}
${order.note ? `Not: ${order.note}` : ""}

Ürünler:
${itemsList}

Ara Toplam: ${order.subtotal} €
Kargo: ${order.shippingFee} €
Toplam: ${order.total} €
`.trim();

  const customerBody = `
Merhaba ${order.customerName},

Sipariş talebiniz alındı. Sipariş numaranız: ${order.orderNumber}

Sipariş Özeti:
${itemsList}

Ara Toplam: ${order.subtotal} €
Kargo: ${order.shippingFee === 0 ? "Ücretsiz" : `${order.shippingFee} €`}
Toplam: ${order.total} €

En kısa sürede sizinle iletişime geçeceğiz.

Teşekkürler,
${BRAND.name} — ${BRAND.tagline}
`.trim();

  console.log("\n========== ADMIN E-POSTA ==========");
  console.log(`Kime: ${adminEmail}`);
  console.log(`Konu: Yeni Sipariş — ${order.orderNumber}`);
  console.log(adminBody);
  console.log("\n========== MÜŞTERİ E-POSTA ==========");
  console.log(`Kime: ${order.email}`);
  console.log(`Konu: Siparişiniz Alındı — ${order.orderNumber}`);
  console.log(customerBody);
  console.log("====================================\n");

  if (isSmtpConfigured()) {
    // Hook point for nodemailer / Resend — not yet connected.
    console.log("[Email] SMTP env present; delivery still console-only until transport is wired.");
    return { sent: false, mode: "console", adminEmail, fromEmail };
  }

  return { sent: false, mode: "console", adminEmail, fromEmail };
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  spaceType?: string | null;
  areaBand?: string | null;
  budgetBand?: string | null;
  source?: string | null;
}): Promise<EmailSendResult> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_EMAIL || BRAND.email;
  const fromEmail = process.env.FROM_EMAIL || BRAND.fromEmail;

  console.log("\n========== İLETİŞİM FORMU ==========");
  console.log(`Gönderen: ${data.name} <${data.email}>`);
  if (data.phone) console.log(`Telefon: ${data.phone}`);
  console.log(`Konu: ${data.subject}`);
  if (data.spaceType) console.log(`Mekân: ${data.spaceType}`);
  if (data.areaBand) console.log(`m²: ${data.areaBand}`);
  if (data.budgetBand) console.log(`Bütçe: ${data.budgetBand}`);
  if (data.source) console.log(`Kaynak: ${data.source}`);
  console.log(data.message);
  console.log("====================================\n");

  return { sent: false, mode: "console", adminEmail, fromEmail };
}
