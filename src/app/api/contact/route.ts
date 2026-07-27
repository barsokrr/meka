import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { prisma } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Geçersiz veri" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        spaceType: data.spaceType || null,
        areaBand: data.areaBand || null,
        budgetBand: data.budgetBand || null,
        source: data.source || null,
      },
    });

    await sendContactNotification(data);

    return NextResponse.json({ success: true, emailSent: false });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Mesaj gönderilemedi" }, { status: 500 });
  }
}
