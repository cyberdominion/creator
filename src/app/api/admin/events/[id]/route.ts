import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentSession } from "@/lib/auth";
import { db } from "@/lib/db";

const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional(),
  timezone: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  currency: z.string().optional(),
  capacity: z.number().nonnegative().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "COMPLETED", "CANCELLED"]).optional(),
  refundPolicy: z.string().optional(),
  checkoutType: z.enum(["integrated", "external"]).optional(),
  checkoutUrl: z.string().url().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentSession();
  if (!session || (session.role !== "OWNER" && session.role !== "ADMINISTRATOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateEventSchema.parse(body);

    const event = await db.event.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to update event" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentSession();
  if (!session || session.role !== "OWNER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.event.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 400 });
  }
}