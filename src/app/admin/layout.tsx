import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream-light">
      <AdminMobileNav />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
