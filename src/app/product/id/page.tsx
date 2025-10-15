// src/app/product/[id]/page.tsx
import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return notFound();

  const sizes = Array.isArray(product.meta?.sizes) ? product.meta.sizes : [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="w-full h-96 relative rounded-xl overflow-hidden shadow-lg">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-100 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-300 mb-6">{product.description}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Size</label>
              <div className="flex gap-2">
                {sizes.length ? sizes.map((s: string) => (
                  <button key={s} className="px-3 py-1 border rounded text-sm text-gray-200">{s}</button>
                )) : ["S","M","L"].map((s) => (
                  <button key={s} className="px-3 py-1 border rounded text-sm text-gray-200">{s}</button>
                ))}
              </div>
            </div>

            <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
