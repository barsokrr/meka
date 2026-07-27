import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { BRAND } from "@/types";

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });

  return (
    <div>
      <h1 className="font-serif text-3xl font-light">Ayarlar</h1>
      <p className="mt-2 text-sm text-muted">Kargo, iletişim ve site bilgileri</p>
      <div className="mt-8 max-w-xl">
        <SettingsForm
          initial={{
            shippingFee: settings?.shippingFee ?? 150,
            freeShippingMinimum: settings?.freeShippingMinimum ?? 5000,
            phone: settings?.phone ?? "",
            email: settings?.email ?? BRAND.email,
            whatsapp: settings?.whatsapp ?? "",
            instagram: settings?.instagram ?? BRAND.instagram,
            city: settings?.city ?? "İstanbul",
            shippingNote:
              settings?.shippingNote ?? "5.000 ₺ ve üzeri siparişlerde kargo ücretsizdir.",
          }}
        />
      </div>
    </div>
  );
}
