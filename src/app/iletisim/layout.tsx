import type { Metadata } from "next";
import { BRAND } from "@/types";

export const metadata: Metadata = {
  title: "Danışmanlık & İletişim",
  description: `${BRAND.name} ile iç mimarlık danışmanlığı ve proje talebi. Kısa brief bırakın, 24 saat içinde dönüş yapalım.`,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
