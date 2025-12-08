// src/app/api/admin/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json();

    if (secret === process.env.ADMIN_SECRET) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}