import { SpritesClient } from "@fly/sprites";

/**
 * Resolves the Sprites API bearer token.
 * @see https://sprites.dev/api — env names vary across docs (SPRITE_TOKEN, SPRITES_TOKEN).
 */
export function getSpriteToken(): string | undefined {
  return (
    process.env.SPRITE_API_KEY?.trim() ||
    process.env.SPRITE_TOKEN?.trim() ||
    process.env.SPRITES_TOKEN?.trim() ||
    undefined
  );
}

export function getSpritesApiBaseUrl(): string {
  const raw =
    process.env.SPRITES_API_BASE_URL?.trim() ||
    process.env.SPRITE_API_BASE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return "https://api.sprites.dev";
}

export function getSpriteName(): string | undefined {
  const explicit = process.env.SPRITE_NAME?.trim();
  if (explicit) return explicit;

  const appUrl = process.env.SPRITE_APP_URL?.trim();
  if (!appUrl) return undefined;
  try {
    const segments = new URL(appUrl).pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    return last || undefined;
  } catch {
    return undefined;
  }
}

export function createSpritesClient(): SpritesClient {
  const token = getSpriteToken();
  if (!token) {
    throw new Error(
      "Missing Sprites token: set SPRITE_API_KEY, SPRITE_TOKEN, or SPRITES_TOKEN",
    );
  }
  return new SpritesClient(token, { baseURL: getSpritesApiBaseUrl() });
}
