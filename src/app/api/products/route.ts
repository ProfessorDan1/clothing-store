// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const list = await prisma.product.findMany({ 
      orderBy: { createdAt: "desc" } 
    });
    return NextResponse.json(list);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Simple admin protection
    const secret = request.headers.get("x-admin-secret") ?? "";
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, category, imageUrl, meta } = body;

    if (!name || !price || !imageUrl || !category) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, category, imageUrl" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description ?? null,
        price: Number(price),
        category,
        imageUrl,
        meta: meta ?? null,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}