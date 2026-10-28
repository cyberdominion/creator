import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();
    const sessions = await db.session.findMany({
      where: {
        status: "SCHEDULED",
        endsAt: { gt: now },
      },
      orderBy: { startsAt: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        startsAt: true,
        endsAt: true,
        timezone: true,
        visibility: true,
        streamingUrl: true,
        status: true,
      },
    });

    return NextResponse.json({ sessions });
  } catch {
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}