// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const list = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  // simple admin protection
  const secret = request.headers.get("x-admin-secret") ?? "";
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description, price, imageUrl, meta } = body;

  if (!name || !price || !imageUrl) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // create a simple slug
  const slugBase = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const slug = `${slugBase}-${Date.now().toString(36)}`;

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description: description ?? null,
      price: Number(price),
      imageUrl,
      meta: meta ?? null,
    },
  });

  return NextResponse.json(product);
}
