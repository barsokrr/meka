"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { BRAND } from "@/types";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş yapılamadı");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-light p-4">
    <div className="w-full max-w-md rounded-sm bg-white p-8 shadow-sm">
      <h1 className="font-serif text-2xl tracking-widest">{BRAND.name}</h1>
      <p className="mt-1 text-sm text-charcoal/60">Admin Girişi</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-earth">E-posta</label>
          <input {...register("email")} type="email" className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-earth">Şifre</label>
          <input {...register("password")} type="password" className="input-field" />
        </div>
        {error && <p className="text-sm text-terracotta">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
    </div>
  );
}
