import { NextResponse } from "next/server";
import { insertJoinSignup } from "@/lib/join-db";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(s: string): string {
  return s.trim();
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { name, phone, email } = body as Record<string, unknown>;
  const n = typeof name === "string" ? name.trim() : "";
  const p = typeof phone === "string" ? normalizePhone(phone) : "";
  const e = typeof email === "string" ? email.trim() : "";

  if (!n || n.length > 200) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!p || p.length > 40) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (p.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Please enter a phone number with at least 7 digits." }, { status: 400 });
  }
  if (!e || !EMAIL_RE.test(e) || e.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    insertJoinSignup({ name: n, phone: p, email: e });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
