// src/app/shop/page.tsx
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ShopPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-8">Shop</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
       {products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}

      </div>
    </div>
  );
}
