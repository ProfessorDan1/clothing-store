// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs"; // ensure Node runtime

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as any | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // convert uploaded File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ folder: "trendwear" }, (error: any, result: any) => {
        if (error) {
          resolve(NextResponse.json({ error: error.message || error }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ url: result.secure_url }));
        }
      })
      .end(buffer);
  });
}
