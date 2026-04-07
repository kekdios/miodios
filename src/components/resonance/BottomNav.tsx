"use client";

import { AlignCenter, Radio, Wind } from "lucide-react";

export type TabId = "rhythm" | "release" | "alignment";

const tabs: { id: TabId; label: string; icon: typeof Radio }[] = [
  { id: "rhythm", label: "Rhythm", icon: Radio },
  { id: "release", label: "Release", icon: Wind },
  { id: "alignment", label: "Alignment", icon: AlignCenter },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe">
      <div className="mx-auto mb-4 flex w-[min(100%,28rem)] justify-center px-4">
        <div className="flex w-full max-w-sm items-center justify-around gap-1 rounded-2xl border border-violet-500/20 bg-slate-950/85 px-2 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                className="relative z-10 flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium transition-colors"
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl bg-violet-600/25"
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  <Icon
                    className={`h-5 w-5 ${isActive ? "text-amber-200" : "text-stone-500"}`}
                    strokeWidth={isActive ? 2.25 : 1.75}
                  />
                  <span
                    className={
                      isActive ? "text-amber-100/90" : "text-stone-500"
                    }
                  >
                    {label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
