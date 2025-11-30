// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ folder: "trendwear" }, (error, result) => {
        if (error || !result) {
          resolve(
            NextResponse.json(
              { error: error?.message ?? "Upload failed" },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({ url: result.secure_url }, { status: 200 })
          );
        }
      })
      .end(buffer);
  });
}
