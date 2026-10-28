import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { provider: string } }
) {
  try {
    const body = await req.text();

    // Check idempotency - parse webhook event ID from provider
    // This is provider-specific; for MVP, we acknowledge receipt
    // In production, verify signature and check webhook_events table for duplicates

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 400 });
  }
}