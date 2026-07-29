import { ProductCategory, OrderStatus, StockStatus } from "@prisma/client";

export type { ProductCategory, OrderStatus, StockStatus };

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  MOBILYA: "Mobilya",
  AYDINLATMA: "Aydınlatma",
  TEKSTIL: "Tekstil",
  OBJE: "Obje",
  SET: "Set",
};

export const STOCK_STATUS_LABELS: Record<StockStatus, string> = {
  IN_STOCK: "Stokta",
  MADE_TO_ORDER: "Sipariş üzerine",
  OUT_OF_STOCK: "Tükendi",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: "Yeni",
  CONFIRMED: "Onaylandı",
  PREPARING: "Hazırlanıyor",
  SHIPPED: "Kargoda",
  DELIVERED: "Teslim Edildi",
  CANCELLED: "İptal",
};

export const MAX_ACTIVE_PRODUCTS = 24;

export interface ProductDTO {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  material: string;
  dimensions: string;
  colors: string[];
  stockStatus: StockStatus;
  deliveryTime: string;
  images: string[];
  featured: boolean;
  active: boolean;
  sortOrder: number;
  projectNote: string | null;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  quantity: number;
  stockStatus: StockStatus;
}

export interface SiteConfig {
  shippingFee: number;
  freeShippingMinimum: number;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  city: string;
  shippingNote: string;
}

export const BRAND = {
  name: "Barış Öker",
  logoText: "BARIŞ ÖKER",
  tagline: "İç mimarlık · Kürasyon · Seçilmiş parçalar",
  heroSubtitle:
    "Konut ve ticari mekânlarda keşiften teslimata; ölçülü tasarım ve şeffaf süreç.",
  description:
    "Barış Öker, iç mimarlık projeleri ve özenle seçilmiş mobilya, aydınlatma, tekstil ve obje koleksiyonu sunar. Danışmanlık, uygulama ve seçilmiş parçalar tek çatı altında.",
  discoverLabel: "Barış Öker'i Keşfet",
  whyLabel: "Neden Barış Öker?",
  hashtag: "#BarisOkerDesign",
  email: "barsokrr@gmail.com",
  adminEmail: "admin@barisoker.com",
  fromEmail: "noreply@barisoker.com",
  instagram: "barisoker.studio",
  /** Floating button & genel iletişim WhatsApp metni */
  whatsappMessage:
    "Merhaba, danışmanlık, projelendirme ve ürünler hakkında bilgi almak istiyorum.",
};
