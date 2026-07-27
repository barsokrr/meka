import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, createSession, destroySession } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Geçersiz veri" },
        { status: 400 }
      );
    }

    const admin = await verifyAdmin(parsed.data.email, parsed.data.password);
    if (!admin) {
      return NextResponse.json({ error: "E-posta veya şifre hatalı" }, { status: 401 });
    }

    await createSession(admin);
    return NextResponse.json({ success: true, admin: { name: admin.name, email: admin.email } });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Giriş yapılamadı" }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ success: true });
}
