import { NextResponse } from "next/server";
import { insertVisit } from "@/lib/join-db";

export const runtime = "nodejs";

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0];
    if (first) return first.trim();
  }
  return req.headers.get("x-real-ip")?.trim() ?? "";
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

  const { path, referrer } = body as Record<string, unknown>;
  const p = typeof path === "string" ? path.trim() : "";
  if (!p || p.length > 2048 || !p.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const ref =
    typeof referrer === "string" && referrer.length <= 2048 ? referrer.trim().slice(0, 2048) : "";

  const ua = (req.headers.get("user-agent") ?? "").slice(0, 2000);
  const ip = clientIp(req).slice(0, 100);

  try {
    insertVisit({
      path: p,
      ip,
      userAgent: ua,
      referrer: ref,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not save visit" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
