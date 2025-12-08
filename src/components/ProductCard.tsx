"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  imageUrl: string;
  compact?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  category,
  imageUrl,
  compact = false,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    addToCart({
      id,
      name,
      price,
      imageUrl,
      quantity: 1,
    });

    // Reset button state after 1 second
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="group relative flex flex-col bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10">
      
      {/* 1. IMAGE SECTION */}
      <Link href={`/product/${id}`} className="relative aspect-[4/5] overflow-hidden bg-zinc-800">
        <div className="relative h-full w-full">
  <Image 
    src={imageUrl} 
    alt={name}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover transition-transform duration-500 group-hover:scale-110"
    loading="lazy" 
  />
</div>
        
        {/* Wishlist Button (Top Right) */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-red-500 transition-colors z-10">
          <Heart size={18} />
        </button>

        {/* Category Badge (Top Left) */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md text-white rounded-md border border-white/10">
          {category}
        </span>
      </Link>

      {/* 2. CONTENT SECTION */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/product/${id}`} className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
            {name}
          </h3>
          {description && !compact && (
            <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
              {description}
            </p>
          )}
        </Link>

        {/* 3. PRICE & ACTION */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5 gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase font-medium">Price</span>
            <span className="text-lg font-bold text-white">
              ₦{price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95
              ${isAdding 
                ? "bg-green-600 text-white cursor-default" 
                : "bg-white text-black hover:bg-zinc-200"
              }
            `}
          >
            {isAdding ? (
              <span>Added ✓</span>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}