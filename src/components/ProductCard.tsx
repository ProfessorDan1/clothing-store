// src/components/ProductCard.tsx
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  imageUrl: string;
  showCategory?: boolean;
  showDescription?: boolean;
  compact?: boolean; // For smaller card size
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
  return (
    <Link href={`/product/${id}`} className="group cursor-pointer block">
      <div className="relative overflow-hidden bg-white/5 aspect-[3/4] mb-3 rounded-lg">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className={`${compact ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'} bg-white text-black font-medium rounded-lg`}>
            View Details
          </button>
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

      <div className={compact ? 'space-y-1' : 'space-y-2'}>
        <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold group-hover:text-purple-400 transition-colors line-clamp-1`}>
          {name}
        </h3>
        
        {showDescription && description && (
          <p className={`text-sm text-slate-400 line-clamp-2 ${compact ? 'hidden' : 'block'}`}>
            {description}
          </p>
        )}
        
        <p className={`${compact ? 'text-base' : 'text-xl'} font-bold text-white`}>
          ₦{price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}