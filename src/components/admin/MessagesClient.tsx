"use client";

import { useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  spaceType: string | null;
  areaBand: string | null;
  budgetBand: string | null;
  source: string | null;
  read: boolean;
  createdAt: string | Date;
};

export function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);

  const markRead = async (id: string, read: boolean) => {
    const res = await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    if (!res.ok) return;
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
  };

  if (messages.length === 0) {
    return <p className="text-sm text-muted">Henüz mesaj yok.</p>;
  }

  return (
    <ul className="space-y-4">
      {messages.map((m) => (
        <li
          key={m.id}
          className={`border border-border bg-white p-5 ${m.read ? "opacity-70" : ""}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium">{m.subject}</p>
              <p className="mt-1 text-sm text-muted">
                {m.name} · {m.email}
                {m.phone ? ` · ${m.phone}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span>{new Date(m.createdAt).toLocaleString("tr-TR")}</span>
              <button
                type="button"
                onClick={() => markRead(m.id, !m.read)}
                className="underline hover:text-charcoal"
              >
                {m.read ? "Okunmadı işaretle" : "Okundu"}
              </button>
            </div>
          </div>
          {(m.spaceType || m.areaBand || m.budgetBand || m.source) && (
            <p className="mt-3 text-xs text-muted">
              {[m.source && `Kaynak: ${m.source}`, m.spaceType, m.areaBand, m.budgetBand]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{m.message}</p>
        </li>
      ))}
    </ul>
  );
}
