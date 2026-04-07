import { createSpritesClient, getSpriteName } from "@/lib/sprites";
import { NextResponse } from "next/server";

/**
 * Server-only check that Sprites credentials and sprite name work.
 * GET /api/sprite/status
 */
export async function GET() {
  const name = getSpriteName();
  if (!name) {
    return NextResponse.json(
      {
        ok: false,
        error: "SPRITE_NAME is not set (use the name from `sprite list`).",
      },
      { status: 503 },
    );
  }

  try {
    const client = createSpritesClient();
    const sprite = await client.getSprite(name);
    return NextResponse.json({
      ok: true,
      name: sprite.name,
      status: sprite.status,
      organization: sprite.organizationName,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 502 },
    );
  }
}
