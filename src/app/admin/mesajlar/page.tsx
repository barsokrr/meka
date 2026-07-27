import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { MessagesClient } from "@/components/admin/MessagesClient";

export default async function AdminMessagesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl font-light">Mesajlar</h1>
      <p className="mt-2 text-sm text-muted">
        İletişim ve danışmanlık talepleri ({messages.filter((m) => !m.read).length} okunmamış)
      </p>
      <div className="mt-8">
        <MessagesClient initialMessages={messages} />
      </div>
    </div>
  );
}
