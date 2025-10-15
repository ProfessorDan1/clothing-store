import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JFS World",
  description: "JFS World — redefining modern streetwear with futuristic elegance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-100 bg-gradient-to-b from-[#040407] via-[#0b0a10] to-[#07060a] scroll-smooth">
        <div className="min-h-screen relative overflow-x-hidden">
          {/* Decorative gradients */}
          <div className="absolute inset-0 -z-20 pointer-events-none">
            <div className="absolute -left-32 -top-16 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#7c3aed] via-[#c026d3] to-[#fb7185] opacity-20 blur-3xl animate-blob" />
            <div className="absolute -right-32 -bottom-16 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-[#06b6d4] via-[#7c3aed] to-[#f97316] opacity-20 blur-3xl animate-blob animation-delay-2000" />
          </div>

          <Navbar />
          <main className="pt-20 min-h-[calc(100vh-200px)]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
