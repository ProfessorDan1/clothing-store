// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = 0;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-500 shadow-lg">
                <Image src="/logo.png" alt="TrendWear" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200">
                JFS World
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            <Link href="#" className="text-sm hover:text-pink-300 transition">Home</Link>
            <Link href="/shop" className="text-sm hover:text-purple-300 transition">Shop</Link>
            <Link href="#" className="text-sm hover:text-indigo-300 transition">About</Link>
            <Link href="#" className="text-sm hover:text-sky-300 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-white/5 rounded-full px-3 py-1 gap-2">
              <Search size={16} className="text-slate-200" />
              <input placeholder="Search products" className="bg-transparent text-sm outline-none placeholder:text-slate-400" />
            </div>

            <button className="p-2 rounded-full bg-white/5 hover:bg-white/7 transition" aria-label="Cart">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="ml-1 text-xs inline-block bg-pink-500 px-1 rounded-full">{cartCount}</span>}
            </button>

            <button className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/7" onClick={() => setSearchOpen(s => !s)} aria-label="Mobile search">
              <Search size={18} />
            </button>

            <button className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/7" onClick={() => setOpen(s => !s)} aria-label="Mobile menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="md:hidden">
            <div className="mx-6 mt-3 mb-2 bg-black/60 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2">
              <Search size={16} />
              <input autoFocus placeholder="Search products" className="bg-transparent w-full outline-none placeholder:text-slate-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="md:hidden">
            <div className="mx-6 mt-3 mb-4 bg-black/55 backdrop-blur rounded-xl p-4 flex flex-col gap-3">
              <Link href="#" onClick={() => setOpen(false)} className="py-2 px-3 rounded hover:bg-white/3">Home</Link>
              <Link href="/shop" onClick={() => setOpen(false)} className="py-2 px-3 rounded hover:bg-white/3">Shop</Link>
              <Link href="#" onClick={() => setOpen(false)} className="py-2 px-3 rounded hover:bg-white/3">About</Link>
              <Link href="#" onClick={() => setOpen(false)} className="py-2 px-3 rounded hover:bg-white/3">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
