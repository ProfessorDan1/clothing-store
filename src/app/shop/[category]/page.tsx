// src/app/shop/[category]/page.tsx
import prisma from "@/lib/prisma";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // Fetch products from the database
  const products = await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">{category}</h1>

      {products.length === 0 ? (
        <p className="text-slate-400">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 bg-white/5">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold">{product.name}</h2>
              <p className="text-purple-400 font-bold mt-1">
                ₦{product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
