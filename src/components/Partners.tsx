// src/components/Partners.tsx
import Image from "next/image";

const partners = [
  { name: "Google", src: "/partners/google.svg" },
  { name: "Shopify", src: "/partners/shopify.svg" },
  { name: "Vercel", src: "/partners/shopifi.svg" },
  { name: "Cloudinary", src: "/partners/instagram.svg" },
];

export default function Partners() {
  return (
    <div className="w-full">
      <h3 className="text-sm text-slate-300 mb-3">Partners</h3>
      <div className="flex flex-wrap items-center gap-4">
        {partners.map((p) => (
          <div key={p.name} className="bg-white/5 rounded px-3 py-2">
            <Image src={p.src} alt={p.name} width={120} height={36} className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
