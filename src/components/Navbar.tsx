"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = 1;
  const { itemCount } = useCart();

  return (
    <>
      {/* Backdrop when mobile menu is open */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-xl group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="JFS World"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-white">
                  JEDIS
                </span>
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase group-hover:text-white transition-colors">
                  FASHION SENSE
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-white hover:text-purple-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 gap-2 hover:bg-white/10 transition-colors group">
                <Search
                  size={16}
                  className="text-slate-400 group-hover:text-white transition-colors"
                />
                <input
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none placeholder:text-slate-500 text-white w-32 focus:w-48 transition-all"
                />
              </div>

              {/* Mobile Search Toggle */}
              <button
                className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} className="text-white" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-lg hover:bg-white/10 transition-colors group"
                aria-label="Cart"
              >
                <ShoppingCart size={20} className="text-white" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:block p-2.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Account"
              >
                <User size={20} className="text-white" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors ml-1"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
              >
                {open ? (
                  <X size={22} className="text-white" />
                ) : (
                  <Menu size={22} className="text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pb-4">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-3 gap-3">
                    <Search size={18} className="text-slate-400" />
                    <input
                      autoFocus
                      placeholder="Search products..."
                      className="bg-transparent text-sm outline-none placeholder:text-slate-500 text-white w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 z-40"
            >
              <nav className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Shop
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Contact
                </Link>

                <div className="h-px bg-white/10 my-2" />

                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                >
                  <User size={18} />
                  Account
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
