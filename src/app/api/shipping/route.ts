import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/settings";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({
    shippingFee: settings.shippingFee,
    freeShippingMinimum: settings.freeShippingMinimum,
    shippingNote: settings.shippingNote,
  });
}

export const dynamic = "force-dynamic";
