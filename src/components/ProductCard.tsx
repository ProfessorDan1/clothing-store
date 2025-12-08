"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  imageUrl: string;
  showCategory?: boolean;
  showDescription?: boolean;
  compact?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  category,
  imageUrl,
  showCategory = true,
  showDescription = true,
  compact = false,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="group cursor-pointer block">
      <Link href={`/product/${id}`} className="block">
        <div className="relative overflow-hidden bg-white/5 aspect-[3/4] mb-3 rounded-lg">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className={`${compact ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'} bg-white text-black font-medium rounded-lg`}>
              View Details
            </div>
          </div>
          
          {/* Category Badge */}
          {showCategory && (
            <div className={`absolute ${compact ? 'top-2 left-2' : 'top-4 left-4'}`}>
              <span className={`${compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'} bg-black/60 backdrop-blur-sm font-medium rounded-full border border-white/20`}>
                {category}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className={compact ? 'space-y-1' : 'space-y-2'}>
        <Link href={`/product/${id}`}>
          <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold group-hover:text-purple-400 transition-colors line-clamp-1`}>
            {name}
          </h3>
        </Link>
        
        {showDescription && description && (
          <p className={`text-sm text-slate-400 line-clamp-2 ${compact ? 'hidden' : 'block'}`}>
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between gap-2">
          <p className={`${compact ? 'text-base' : 'text-xl'} font-bold text-white`}>
            ₦{price.toLocaleString()}
          </p>
          
          <button
            onClick={handleAddToCart}
            className={`${compact ? 'p-2' : 'p-2.5'} bg-white/10 hover:bg-white hover:text-black border border-white/20 rounded-lg transition-all group/btn`}
            title="Add to cart"
          >
            <ShoppingCart size={compact ? 16 : 18} />
          </button>
        </div>
      </div>
    </div>
  );
}