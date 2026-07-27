import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div>
      <h1 className="font-serif text-3xl font-light">Yeni Ürün</h1>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
