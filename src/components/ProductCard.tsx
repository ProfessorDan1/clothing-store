// src/components/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductMinimal {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: ProductMinimal }) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-gradient-to-b from-white/3 to-black/5 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition transform">
        <div className="relative w-full h-64 bg-gray-900">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h4 className="font-semibold">{product.name}</h4>
          <p className="mt-2 font-medium text-pink-400">₦{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
