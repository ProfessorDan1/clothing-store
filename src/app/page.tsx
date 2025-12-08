"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";

// Placeholder for your Partners component - assuming it exists or using a simple version here
const Partners = () => (
  <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
    {/* Replace these with your actual partner logos/component */}
    <h3 className="text-2xl font-bold tracking-tighter">NIKE</h3>
    <h3 className="text-2xl font-bold tracking-tighter">ADIDAS</h3>
    <h3 className="text-2xl font-bold tracking-tighter">SUPREME</h3>
    <h3 className="text-2xl font-bold tracking-tighter">OFF-WHITE</h3>
  </div>
);

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. DATA: Hero Images (Replace with your actual tall/wide hero images)
  const heroSlides = [
    {
      id: 1,
      image: "/hero.jpg", // Replace with real path
      title: "JFS WORLD",
      subtitle: "The Future of Streetwear",
    },
    {
      id: 2,
      image: "/IMG_5340-1.JPG", // Replace with real path
      title: "NEW SEASON",
      subtitle: "Collection 01: Awakening",
    },
    {
      id: 3,
      image: "/IMG_4750.JPG", // Replace with real path
      title: "LIMITED RUN",
      subtitle: "Once they're gone, they're gone.",
    },
  ];

  // 2. DATA: Collections
  const collections = [
    { id: 1, name: "Men Collection", image: "/men.jpg", link: "/collections/men" },
    { id: 2, name: "Women Collection", image: "/women.jpg", link: "/collections/women" },
    { id: 3, name: "Accessories", image: "/accessories.jpg", link: "/collections/accessories" },
  ];

  // 3. LOGIC: Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 4. LOGIC: Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 8)); // Get first 8 products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* --- SECTION 1: HERO SLIDESHOW --- */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover scale-105 animate-slow-zoom" 
            />
            
            {/* Text Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
              <p className="text-sm md:text-lg uppercase tracking-[0.4em] mb-4 text-zinc-300 animate-fade-in-up">
                {slide.subtitle}
              </p>
              <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-none animate-fade-in-up delay-100">
                {slide.title}
              </h1>
              
              <Link
                href="/shop"
                className="group flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors animate-fade-in-up delay-200"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}

        {/* Slide Indicators (Dots) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-white" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 right-8 z-30 animate-bounce hidden md:block">
            <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

      {/* --- SECTION 2: COLLECTIONS (Scroll Format) --- */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Curated <span className="text-zinc-500">Series</span>
            </h2>
            <Link href="/shop" className="hidden md:block text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors">
                View All Categories
            </Link>
        </div>

        {/* Grid Layout that feels like a scrollable gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          {collections.map((col, idx) => (
            <Link 
                href={col.link} 
                key={col.id}
                className="group relative h-[400px] md:h-full overflow-hidden border border-white/10"
            >
              <img
                src={col.image}
                alt={col.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold uppercase italic">{col.name}</h3>
                <div className="h-[2px] w-0 bg-white mt-2 group-hover:w-full transition-all duration-700 ease-in-out" />
                <p className="mt-2 text-sm text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Explore Collection &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: QUICK SHOPPING --- */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            LATEST <span className="text-zinc-500">DRIPS</span>
          </h2>
          <Link href="/shop" className="hidden md:block text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors">
            View All Products
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
      </section>

      {/* --- SECTION 4: PARTNERS (Marquee Style) --- */}
      <section className="py-20 border-t border-white/10 bg-zinc-900">
        <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Trusted By The Best</p>
        </div>
        
        {/* We use a simple flex container here, or the marquee animation if you added the CSS */}
        <div className="w-full overflow-hidden">
             {/* If you want a moving ticker, add 'animate-marquee' class defined below */}
             <div className="flex justify-center">
                 <Partners />
             </div>
        </div>
      </section>

      {/* --- FOOTER SIMPLIFIED --- */}
      <footer className="py-12 border-t border-white/10 text-center">
          <h2 className="text-5xl md:text-9xl font-black text-zinc-800 tracking-tighter select-none break-all">JFS WORLD</h2>
          <div className="flex justify-center gap-6 mt-[-20px] relative z-10">
              <Link href="#" className="text-zinc-400 hover:text-white uppercase text-sm">Instagram</Link>
              <Link href="#" className="text-zinc-400 hover:text-white uppercase text-sm">Twitter</Link>
              <Link href="#" className="text-zinc-400 hover:text-white uppercase text-sm">TikTok</Link>
          </div>
          <p className="text-zinc-600 text-xs mt-12">&copy; 2024 JFS World. All Rights Reserved.</p>
      </footer>

    </div>
  );
}