import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { ToastProvider } from "@/components/ui/Toast";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { BRAND } from "@/types";

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://barisoker.com";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — İç Mimarlık & Kürasyon`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    title: `${BRAND.name} — İç Mimarlık & Kürasyon`,
    description: BRAND.description,
    locale: "tr_TR",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="flex min-h-screen flex-col">
        <OrganizationJsonLd />
        <ToastProvider>
          <SiteShell>{children}</SiteShell>
        </ToastProvider>
      </body>
    </html>
  );
}
