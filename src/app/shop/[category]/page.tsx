// src/app/shop/[category]/page.tsx
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ category: string }>; // Changed to Promise
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params; // Await the params
  
  const products = await prisma.product.findMany({
    where: {
      category: decodeURIComponent(category), // Decode URL-encoded category
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Link 
            href="/shop" 
            className="text-sm text-slate-400 hover:text-white mb-4 inline-block"
          >
            ← Back to Shop
          </Link>
          <h1 className="text-5xl font-bold mb-4">{category}</h1>
          <p className="text-slate-400 text-lg">
            {products.length} {products.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-4">
              No products in this category yet.
            </p>
            <Link 
              href="/shop"
              className="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                category={product.category}
                imageUrl={product.imageUrl}
                compact={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}