import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/encryption";
import { signSession, setSessionCookie } from "@/lib/auth";
import { db } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await (await import("bcryptjs")).default.compare(
      password,
      user.password
    );
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json({ error: "Account is not active" }, { status: 401 });
    }

    const token = await signSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
    setSessionCookie(res, token);
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
}