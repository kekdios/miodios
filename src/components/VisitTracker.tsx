"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Logs each client-side navigation (and initial load) to POST /api/visit.
 * Non-JavaScript clients are not recorded.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !pathname.startsWith("/")) return;
    if (lastSent.current === pathname) return;
    lastSent.current = pathname;

    const referrer =
      typeof document !== "undefined" && document.referrer
        ? document.referrer
        : "";

    void fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
