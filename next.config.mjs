import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  turbopack: {
    root: projectRoot,
  },
  allowedDevOrigins: ["resonance-bm3jf.sprites.app"],
  /** Hides the floating “N / N issues” Next.js dev toolbar on public URLs (still use `next start` for production). */
  devIndicators: false,
  /**
   * Avoid aggressive HTML caching so clients never keep stale HTML that references old
   * /_next/static/* chunk names (missing chunks return 500).
   */
  async headers() {
    const noStoreHtml = [
      { key: "Cache-Control", value: "private, no-cache, no-store, max-age=0, must-revalidate" },
    ];
    return [
      { source: "/", headers: noStoreHtml },
      { source: "/app", headers: noStoreHtml },
    ];
  },
};

export default nextConfig;
