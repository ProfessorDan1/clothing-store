// src/app/shop/[category]/page.tsx
import prisma from "@/lib/prisma";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await prisma.product.findMany({
    where: {
      category: params.category // e.g., "Hoodies"
    }
  });

  return (
    <div>
      <h1>{params.category}</h1>
      {/* Display products */}
    </div>
  );
}