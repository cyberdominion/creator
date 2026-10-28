import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const creator = await db.creator.findFirst({
      include: {
        links: { where: { isActive: true } },
        wishlistLinks: { where: { isActive: true } },
      },
    });

    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }

    return NextResponse.json({ creator });
  } catch {
    return NextResponse.json({ error: "Failed to fetch creator" }, { status: 500 });
  }
}