// src/app/collections/accessories/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AccessoriesCollectionPage() {
  const accessoryCategories = [
    {
      name: "Accessories",
      image: "/api/placeholder/800/600",
      description: "Bags, hats, jewelry & more",
      link: "/shop/Accessories",
    },
    {
      name: "Footwear",
      image: "/api/placeholder/800/600",
      description: "Sneakers that complete the fit",
      link: "/shop/Footwear",
    },
    {
      name: "Hoodies",
      image: "/api/placeholder/800/600",
      description: "Layering essentials",
      link: "/shop/Hoodies",
    },
    {
      name: "T-Shirts",
      image: "/api/placeholder/800/600",
      description: "Graphic tees & basics",
      link: "/shop/T-Shirts",
    },
    {
      name: "Jackets",
      image: "/api/placeholder/800/600",
      description: "Outerwear for all seasons",
      link: "/shop/Jackets",
    },
    {
      name: "Other",
      image: "/api/placeholder/800/600",
      description: "Explore unique finds",
      link: "/shop/Other",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-block text-sm uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            Accessories <span className="text-zinc-500">& More</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
            The finishing touches that make the outfit. Explore our collection of accessories and essentials.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessoryCategories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative h-[400px] overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-3xl font-bold uppercase tracking-tight mb-2 group-hover:text-zinc-300 transition-colors">
                  {category.name}
                </h2>
                <p className="text-sm text-zinc-400 mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold">
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}