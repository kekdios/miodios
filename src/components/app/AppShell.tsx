"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/app", label: "Practice" },
  { href: "/app/prayer", label: "Prayer" },
  { href: "/app/explanation", label: "Explanation" },
  { href: "/app/frequencies", label: "Frequencies" },
  { href: "/app/369", label: "369" },
  { href: "/app/join", label: "Join Us" },
  { href: "/app/visitors", label: "Visitors" },
  { href: "/app/settings", label: "Settings" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <header className="relative z-[60] grid h-14 shrink-0 grid-cols-[2.75rem_1fr_2.75rem] items-center border-b border-violet-500/15 bg-slate-950/90 px-2 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-amber-100/90 transition-colors hover:bg-violet-600/20 hover:text-amber-50"
          aria-expanded={open}
          aria-controls="app-slide-menu"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" strokeWidth={1.75} />
        </button>
        <span className="text-center text-sm font-medium uppercase tracking-[0.2em] text-amber-200/75">
          Mio Dios
        </span>
        <span aria-hidden className="justify-self-end" />
      </header>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="menu-backdrop"
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <motion.nav
              key="menu-drawer"
              id="app-slide-menu"
              role="dialog"
              aria-modal="true"
              aria-label="App menu"
              className="fixed inset-y-0 left-0 z-[80] flex w-[min(100%,18rem)] flex-col border-r border-violet-500/20 bg-slate-950/98 py-4 shadow-2xl shadow-black/50 backdrop-blur-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="flex items-center justify-between border-b border-violet-500/10 px-4 pb-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 hover:bg-violet-600/15 hover:text-stone-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-2 pt-4">
                {MENU_LINKS.map(({ href, label }) => {
                  const active =
                    href === "/"
                      ? pathname === "/"
                      : href === "/app"
                        ? pathname === "/app"
                        : pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-colors ${
                          active
                            ? "bg-violet-600/25 text-amber-100"
                            : "text-stone-300 hover:bg-violet-600/10 hover:text-stone-100"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
