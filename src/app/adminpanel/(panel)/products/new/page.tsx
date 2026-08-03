import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-playfair text-2xl uppercase tracking-wide">Add product</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Create a new product. It will appear on the storefront immediately.
      </p>
      <div className="mt-8 border border-zinc-200 bg-white p-6 md:p-8">
        <ProductForm />
      </div>
    </div>
  );
}
