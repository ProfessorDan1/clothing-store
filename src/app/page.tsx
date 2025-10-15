import Link from "next/link";
import Partners from "@/components/Partners";
import { Mail, Phone, ShoppingBag, Star, Users } from "lucide-react";

export default function Home() {
  const products = [
    { id: "1", name: "Illusion", price: 15000.0, imageUrl: "/sample1.jpg" },
    { id: "2", name: "Tee Shirt", price: 20000.0, imageUrl: "/sample2.jpg" },
    { id: "3", name: "Jade's Wrld", price: 39000.0, imageUrl: "/sample3.jpg" },
    { id: "4", name: "Armless Tees", price: 17500.0, imageUrl: "/sample4.jpg" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 space-y-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-20">
        <div className="space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-yellow-300">
            Welcome to <span className="text-pink-500">JFS World</span> — Your Style. Your Future.
          </h1>
          <p className="text-slate-300 max-w-xl">
            Step into the future of fashion. JFS World brings you premium streetwear designed with personality, boldness, and purpose.
          </p>

          <div className="flex gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-black font-semibold shadow-lg hover:scale-[1.03] transition"
            >
              <ShoppingBag size={18} /> Shop Now
            </Link>
            <Link
              href="/contact"
              className="inline-block px-5 py-3 rounded-full border border-white/10 text-slate-200 hover:bg-white/5 transition"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8">
            <Partners />
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img src="/hero-model.png" alt="Hero" className="w-full h-[420px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </section>

      {/* About / Values Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Why Choose JFS?</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Every piece we design is crafted with sustainability and expression in mind — because style should make a statement that lasts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Star className="w-10 h-10 text-pink-400 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
            <p className="text-slate-400">Made from the best materials for lasting comfort and bold looks.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Users className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
            <p className="text-slate-400">We grow with our tribe of creators, dreamers, and fashion lovers.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Mail className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-slate-400">Always here to help — just drop us a message or call.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:scale-[1.02] transition">
              <img src={p.imageUrl} alt={p.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-slate-400">₦{p.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
  

      {/* Newsletter Section */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-700/20 via-pink-700/10 to-yellow-500/10 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Join Our Style Tribe</h2>
        <p className="text-slate-400 mb-6">Get exclusive drops, deals, and fashion insights delivered weekly.</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-3 rounded-l-full bg-white/10 text-white border border-white/20 focus:outline-none"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-yellow-500 rounded-r-full text-black font-semibold">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
