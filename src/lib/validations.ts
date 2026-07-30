import { z } from "zod";

export const SPACE_TYPES = [
  "Konut",
  "Ofis",
  "Mağaza / Showroom",
  "Otel / Konaklama",
  "Diğer",
] as const;

export const AREA_BANDS = [
  "0–50 m²",
  "50–100 m²",
  "100–200 m²",
  "200–400 m²",
  "400 m²+",
] as const;

export const BUDGET_BANDS = [
  "Henüz belirlemedim",
  "100.000 ₺ altı",
  "100.000 – 300.000 ₺",
  "300.000 – 750.000 ₺",
  "750.000 ₺+",
] as const;

export const orderSchema = z.object({
  customerName: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası girin")
    .regex(/^(\+90|0)?[0-9\s\-()]{10,}$/, "Geçerli bir Türkiye telefon numarası girin"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  city: z.string().min(1, "İl seçin"),
  district: z.string().min(1, "İlçe seçin"),
  address: z.string().min(10, "Adres en az 10 karakter olmalıdır"),
  note: z.string().optional(),
  kvkkAccepted: z.literal(true, {
    errorMap: () => ({ message: "KVKK metnini onaylamanız gerekmektedir" }),
  }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string().optional(),
        price: z.number().optional(),
        quantity: z.number().min(1),
      })
    )
    .min(1, "Sepetiniz boş"),
});

/** Checkout form fields only — cart items are attached at submit time. */
export const checkoutFormSchema = orderSchema.omit({ items: true });

export const contactSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası girin")
    .regex(/^(\+90|0)?[0-9\s\-()]{10,}$/, "Geçerli bir Türkiye telefon numarası girin"),
  subject: z.string().min(3, "Konu en az 3 karakter olmalıdır"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
  spaceType: z.string().optional(),
  areaBand: z.string().optional(),
  budgetBand: z.string().optional(),
  source: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional().nullable(),
  category: z.enum(["MOBILYA", "AYDINLATMA", "TEKSTIL", "OBJE", "SET"]),
  material: z.string().min(2),
  dimensions: z.string().min(2),
  colors: z.array(z.string()).default([]),
  stockStatus: z.enum(["IN_STOCK", "MADE_TO_ORDER", "OUT_OF_STOCK"]),
  deliveryTime: z.string().min(2),
  images: z.array(z.string().min(1)).min(1),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  projectNote: z.string().optional().nullable(),
});

export const siteSettingsSchema = z.object({
  shippingFee: z.number().min(0),
  freeShippingMinimum: z.number().min(0),
  phone: z.string().min(0),
  email: z.string().email(),
  whatsapp: z.string().min(0),
  instagram: z.string().min(1),
  city: z.string().min(1),
  shippingNote: z.string().min(1),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
