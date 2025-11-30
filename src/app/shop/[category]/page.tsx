import prisma from "@/lib/prisma";

interface PageProps {
  params: Record<string, string>; // <- Generic mapping for dynamic params
}

export default async function CategoryPage({ params }: PageProps) {
  const category = params.category; // still accessible

  const products = await prisma.product.findMany({
    where: {
      category: category
    }
  });

  return (
    <div>
      <h1>{category}</h1>
      {/* Display products */}
    </div>
  );
}
