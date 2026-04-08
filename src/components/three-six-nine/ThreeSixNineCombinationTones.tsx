"use client";

import { useSineSample } from "@/hooks/useSineSample";
import { Volume2 } from "lucide-react";
import { useCallback, useState } from "react";

/** All six permutations of digits 3, 6, 9 as frequency values in Hz. */
const COMBINATIONS_HZ = [369, 396, 639, 693, 936, 963] as const;

export function ThreeSixNineCombinationTones() {
  const [activeHz, setActiveHz] = useState<number | null>(null);
  const onPlaybackEnded = useCallback(() => setActiveHz(null), []);
  const { play, stop } = useSineSample(onPlaybackEnded);

  const toggle = (hz: number) => {
    if (activeHz === hz) {
      stop();
      setActiveHz(null);
      return;
    }
    stop();
    play(hz);
    setActiveHz(hz);
  };

  return (
    <section
      className="min-w-0 rounded-2xl border border-amber-200/15 bg-violet-950/25 p-4 shadow-inner shadow-black/25 sm:p-5"
      aria-label="Tone samples for digit combinations"
    >
      <h2 className="text-base font-semibold text-amber-100/95">Combination tones</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-400">
        Every order of the digits 3, 6, and 9, played as a sine tone at that value in Hz (e.g. 369 → 369
        Hz). Use headphones at a comfortable volume; stop if it feels uncomfortable.
      </p>
      <ul className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
        {COMBINATIONS_HZ.map((hz) => {
          const isPlaying = activeHz === hz;
          return (
            <li
              key={hz}
              className="flex min-w-0 flex-col gap-2 rounded-xl border border-violet-500/20 bg-slate-900/40 p-3"
            >
              <span className="min-w-0 font-mono text-lg font-medium tabular-nums text-amber-200/95">
                {hz} Hz
              </span>
              <button
                type="button"
                onClick={() => toggle(hz)}
                className={`flex w-full min-w-0 max-w-full items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors sm:px-3 ${
                  isPlaying
                    ? "border-amber-300/50 bg-amber-500/20 text-amber-50"
                    : "border-amber-200/30 bg-violet-800/50 text-amber-100/95 hover:bg-violet-700/55"
                }`}
                aria-pressed={isPlaying}
              >
                <Volume2 className="h-4 w-4" strokeWidth={2} aria-hidden />
                {isPlaying ? "Stop" : "Hear sample"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
