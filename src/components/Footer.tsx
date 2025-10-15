// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/6 bg-gradient-to-t from-black/20 to-transparent">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-md overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-500">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            </div>
            <div>
              <h3 className="font-bold">TrendWear</h3>
              <p className="text-sm text-slate-400">Futuristic clothing — bold, premium, curated.</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-300">
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2">
            <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="text-sm text-slate-300">
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-slate-400">hello@trendwear.example</p>
          <p className="mt-2 text-xs text-slate-500">© {new Date().getFullYear()} TrendWear — All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
