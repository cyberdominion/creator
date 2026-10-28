import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();
    const events = await db.event.findMany({
      where: {
        status: "PUBLISHED",
        endsAt: { gt: now },
      },
      orderBy: { startsAt: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        startsAt: true,
        endsAt: true,
        timezone: true,
        price: true,
        currency: true,
        capacity: true,
        checkoutType: true,
        checkoutUrl: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}