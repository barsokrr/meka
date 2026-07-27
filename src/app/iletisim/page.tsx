"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AREA_BANDS,
  BUDGET_BANDS,
  SPACE_TYPES,
  contactSchema,
  type ContactInput,
} from "@/lib/validations";
import { getWhatsAppLink } from "@/lib/utils";
import { getPublicPhone, getPublicWhatsApp } from "@/lib/contact-channels";
import { BRAND } from "@/types";

function ContactForm() {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const phone = getPublicPhone();
  const email = process.env.NEXT_PUBLIC_EMAIL || BRAND.email;
  const whatsapp = getPublicWhatsApp();

  const defaultSubject =
    searchParams.get("konu") ||
    (searchParams.get("proje")
      ? `${searchParams.get("proje")} — benzer proje talebi`
      : searchParams.get("kaynak") === "proje-bedeli"
        ? "Proje bedeli hesabı sonrası görüşme"
        : "Danışmanlık talebi");

  const defaultMessage = searchParams.get("ozet")
    ? `Hesap özeti:\n${searchParams.get("ozet")}\n\n`
    : "";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: defaultSubject,
      message: defaultMessage,
      source: searchParams.get("kaynak") || "iletisim",
      spaceType: searchParams.get("mekan") || "",
      areaBand: searchParams.get("alan") || "",
    },
  });

  useEffect(() => {
    setValue("subject", defaultSubject);
    if (defaultMessage) setValue("message", defaultMessage);
    const kaynak = searchParams.get("kaynak");
    if (kaynak) setValue("source", kaynak);
  }, [defaultSubject, defaultMessage, searchParams, setValue]);

  const onSubmit = async (data: ContactInput) => {
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setSuccess(true);
      reset({
        name: "",
        email: "",
        phone: "",
        subject: "Danışmanlık talebi",
        message: "",
        spaceType: "",
        areaBand: "",
        budgetBand: "",
        source: "iletisim",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mesaj gönderilemedi");
    }
  };

  const contactItems = [
    phone
      ? { label: "Telefon", content: phone, href: `tel:${phone.replace(/\s/g, "")}` }
      : null,
    { label: "E-posta", content: email, href: `mailto:${email}` },
    whatsapp
      ? {
          label: "WhatsApp",
          content: "WhatsApp ile yazın",
          href: getWhatsAppLink(whatsapp, "Merhaba, danışmanlık hakkında bilgi almak istiyorum."),
          external: true,
        }
      : null,
    { label: "Konum", content: "Türkiye" },
  ].filter(Boolean) as {
    label: string;
    content: string;
    href?: string;
    external?: boolean;
  }[];

  return (
    <div>
      <div className="border-b border-border bg-surface">
        <div className="container-site py-12 md:py-16">
          <p className="section-label">İletişim</p>
          <h1 className="section-title mt-3">Danışmanlık talebi</h1>
          <p className="mt-4 max-w-2xl text-muted">
            Kısa bir brief bırakın — genelde 24 saat içinde dönüş yapıyoruz. Online ödeme yoktur;
            önce ihtiyacınızı netleştiririz.
          </p>
        </div>
      </div>

      <div className="container-site grid gap-16 py-12 md:py-16 lg:grid-cols-2">
        <div className="space-y-8">
          {contactItems.map((item) => (
            <div key={item.label}>
              <h3 className="text-[10px] uppercase tracking-luxury text-muted">{item.label}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="mt-2 block hover:opacity-60"
                >
                  {item.content}
                </a>
              ) : (
                <p className="mt-2">{item.content}</p>
              )}
            </div>
          ))}
          <p className="border border-border bg-surface p-4 text-sm text-muted">
            Yanıt süresi hedefi: iş günlerinde 24 saat içinde ilk dönüş.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {success && (
            <p className="border border-olive/30 bg-olive/5 p-4 text-sm text-olive">
              Talebiniz kaydedildi. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
          )}
          <input type="hidden" {...register("source")} />

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
              Ad Soyad *
            </label>
            <input {...register("name")} className="input-field" />
            {errors.name && <p className="mt-1 text-xs text-accent">{errors.name.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
                Telefon *
              </label>
              <input {...register("phone")} placeholder="05XX XXX XX XX" className="input-field" />
              {errors.phone && <p className="mt-1 text-xs text-accent">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
                E-posta *
              </label>
              <input {...register("email")} type="email" className="input-field" />
              {errors.email && <p className="mt-1 text-xs text-accent">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
              Konu *
            </label>
            <input {...register("subject")} className="input-field" />
            {errors.subject && (
              <p className="mt-1 text-xs text-accent">{errors.subject.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
                Mekân tipi
              </label>
              <select {...register("spaceType")} className="input-field">
                <option value="">Seçin</option>
                {SPACE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
                Alan
              </label>
              <select {...register("areaBand")} className="input-field">
                <option value="">Seçin</option>
                {AREA_BANDS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
                Bütçe bandı
              </label>
              <select {...register("budgetBand")} className="input-field">
                <option value="">Seçin</option>
                {BUDGET_BANDS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-luxury text-muted">
              Mesaj *
            </label>
            <textarea
              {...register("message")}
              rows={5}
              className="input-field"
              placeholder="Mekânınız, zaman planınız veya sorularınız..."
            />
            {errors.message && (
              <p className="mt-1 text-xs text-accent">{errors.message.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-accent">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
            {isSubmitting ? "Gönderiliyor..." : "Talebi Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container-site py-16 text-center">Yükleniyor...</div>}>
      <ContactForm />
    </Suspense>
  );
}
