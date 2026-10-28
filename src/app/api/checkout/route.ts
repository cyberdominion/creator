import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentSession } from "@/lib/auth";
import { db } from "@/lib/db";

const checkoutSchema = z.object({
  eventId: z.string(),
  buyerEmail: z.string().email(),
  buyerName: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await getCurrentSession();

  try {
    const body = await req.json();
    const { eventId, buyerEmail, buyerName } = checkoutSchema.parse(body);

    const event = await db.event.findUnique({ where: { id: eventId } });
    if (!event || event.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Event not available" }, { status: 404 });
    }

    const orderRef = `ORD-${Date.now().toString(36).toUpperCase()}`;

    const order = await db.order.create({
      data: {
        orderRef,
        amount: event.price,
        currency: event.currency,
        status: "PENDING",
        buyerEmail,
        buyerName,
        eventId,
        userId: session?.userId ?? null,
      },
    });

    // If external checkout, redirect to external URL
    if (event.checkoutType === "external" && event.checkoutUrl) {
      return NextResponse.json({
        order,
        checkoutUrl: event.checkoutUrl,
        external: true,
      });
    }

    // For integrated checkout, we would normally redirect to payment provider
    // For MVP, return the order with a pending status
    return NextResponse.json({
      order,
      external: false,
      message: "Order created. Proceed to payment.",
    });
  } catch (err) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 400 });
  }
}