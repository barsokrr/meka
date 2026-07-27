import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/validations";
import { getSiteSettings } from "@/lib/settings";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSiteSettings();
  const raw = await prisma.siteSettings.findUnique({ where: { id: "default" } });

  return NextResponse.json({
    ...settings,
    phone: raw?.phone ?? settings.phone,
    whatsapp: raw?.whatsapp ?? settings.whatsapp,
  });
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = siteSettingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message || "Geçersiz veri" },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...data },
    update: data,
  });

  return NextResponse.json(settings);
}

export const dynamic = "force-dynamic";
