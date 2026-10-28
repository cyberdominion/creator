import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const event = await db.event.findUnique({
      where: { slug: params.slug },
      include: {
        creator: { select: { displayName: true, imageUrl: true } },
        orders: { where: { status: "PAID" }, select: { id: true } },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}