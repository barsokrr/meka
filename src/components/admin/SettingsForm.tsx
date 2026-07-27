"use client";

import { useState } from "react";
import type { SiteSettingsInput } from "@/lib/validations";

export function SettingsForm({ initial }: { initial: SiteSettingsInput }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const update = (key: keyof SiteSettingsInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          shippingFee: Number(form.shippingFee),
          freeShippingMinimum: Number(form.freeShippingMinimum),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kaydedilemedi");
      setMessage("Ayarlar kaydedildi.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kaydedilemedi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">
            Kargo ücreti (₺)
          </label>
          <input
            type="number"
            className="input-field"
            value={form.shippingFee}
            onChange={(e) => update("shippingFee", Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">
            Ücretsiz kargo alt limiti (₺)
          </label>
          <input
            type="number"
            className="input-field"
            value={form.freeShippingMinimum}
            onChange={(e) => update("freeShippingMinimum", Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">
          Kargo notu
        </label>
        <input
          className="input-field"
          value={form.shippingNote}
          onChange={(e) => update("shippingNote", e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">Telefon</label>
        <input
          className="input-field"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="+90 5XX XXX XX XX"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">
          WhatsApp (905xxxxxxxxx)
        </label>
        <input
          className="input-field"
          value={form.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          placeholder="905xxxxxxxxx"
        />
        <p className="mt-1 text-xs text-muted">
          Placeholder numaralar sitede gösterilmez. Tercihen NEXT_PUBLIC_WHATSAPP env kullanın.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">E-posta</label>
        <input
          type="email"
          className="input-field"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">
            Instagram
          </label>
          <input
            className="input-field"
            value={form.instagram}
            onChange={(e) => update("instagram", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-luxury text-muted">Şehir</label>
          <input
            className="input-field"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
          />
        </div>
      </div>

      {message && <p className="text-sm text-olive">{message}</p>}
      {error && <p className="text-sm text-accent">{error}</p>}

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
