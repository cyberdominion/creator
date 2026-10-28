import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentSession } from "@/lib/auth";
import { db } from "@/lib/db";

const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  timezone: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.string().default("USD"),
  capacity: z.number().nonnegative().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  refundPolicy: z.string().optional(),
  checkoutType: z.enum(["integrated", "external"]).optional(),
  checkoutUrl: z.string().url().optional(),
});

export async function GET() {
  const session = await getCurrentSession();
  if (!session || (session.role !== "OWNER" && session.role !== "ADMINISTRATOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const events = await db.event.findMany({
      orderBy: { startsAt: "desc" },
      include: {
        orders: { where: { status: "PAID" }, select: { id: true, amount: true } },
      },
    });
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getCurrentSession();
  if (!session || (session.role !== "OWNER" && session.role !== "ADMINISTRATOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = createEventSchema.parse(body);

    const creator = await db.creator.findUnique({ where: { userId: session.userId } });
    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }

    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const event = await db.event.create({
      data: {
        slug,
        title: data.title,
        description: data.description,
        startsAt: new Date(data.startsAt),
        endsAt: new Date(data.endsAt),
        timezone: data.timezone,
        price: data.price,
        currency: data.currency,
        capacity: data.capacity ?? null,
        status: data.status,
        refundPolicy: data.refundPolicy ?? null,
        checkoutType: data.checkoutType ?? null,
        checkoutUrl: data.checkoutUrl ?? null,
        creatorId: creator.id,
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 400 });
  }
}