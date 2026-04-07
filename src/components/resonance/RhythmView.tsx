"use client";

import { motion } from "framer-motion";
import { useAmbientLoop } from "@/hooks/useAmbientLoop";
import { AmbientSoundToggle } from "./AmbientSoundToggle";

/** Local copy of: rythm.mp3 */
const RHYTHM_AUDIO_SRC = "/audio/rhythm.mp3";
const RHYTHM_VOLUME = 0.48;

/** One full inhale + exhale (seconds) — slow, meditative */
const BREATH_DURATION = 10;
const breathTransition = {
  duration: BREATH_DURATION,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export type RhythmPeriod = "morning" | "midday" | "evening";

export type RhythmProfile = {
  period: RhythmPeriod;
  greeting: string;
  line: string;
};

/** Time-of-day copy for the rhythm screen */
export function getRhythmProfile(): RhythmProfile {
  const h = new Date().getHours();
  if (h < 12) {
    return {
      period: "morning",
      greeting: "Morning Attunement",
      line: "As light returns, may your breath remember the source of all rhythm.",
    };
  }
  if (h < 17) {
    return {
      period: "midday",
      greeting: "Midday Remembrance",
      line: "May our individual will merge with the cosmic pattern.",
    };
  }
  return {
    period: "evening",
    greeting: "Evening Surrender",
    line: "Release the day into stillness; the pattern holds you as you rest.",
  };
}

export function RhythmView() {
  const profile = getRhythmProfile();
  const { greeting, line } = profile;
  const { soundOn, toggleSound } = useAmbientLoop(RHYTHM_AUDIO_SRC, RHYTHM_VOLUME);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col px-5 pb-app-bottom pt-8 [overflow-x:clip]">
      <header className="relative mb-4 shrink-0 text-center">
        <AmbientSoundToggle soundOn={soundOn} onToggle={toggleSound} />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/70">
          The Rhythm
        </p>
        <h1 className="mt-2 font-semibold text-xl tracking-tight text-stone-100">
          {greeting}
        </h1>
      </header>

      <div className="app-scroll flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-min flex-1 flex-col items-center justify-center gap-6 py-2 sm:gap-8">
          <div
            className="relative isolate flex aspect-square w-[min(80vw,18.5rem)] max-w-[min(100%,296px)] items-center justify-center"
            aria-hidden
          >
            <motion.div
              className="pointer-events-none absolute inset-[-18%] rounded-full bg-gradient-to-br from-violet-500/35 via-indigo-600/25 to-transparent blur-2xl"
              animate={{
                scale: [0.88, 1.14, 0.88],
                opacity: [0.35, 0.72, 0.35],
              }}
              transition={breathTransition}
            />
            <motion.div
              className="pointer-events-none absolute inset-[-8%] rounded-full bg-violet-500/20 blur-xl"
              animate={{
                scale: [0.94, 1.1, 0.94],
                opacity: [0.4, 0.85, 0.4],
              }}
              transition={breathTransition}
            />
            <motion.div
              className="pointer-events-none relative z-10 flex aspect-square w-[78%] items-center justify-center rounded-full border border-amber-200/25 bg-gradient-to-b from-violet-950/90 to-slate-950/95"
              animate={{
                scale: [1, 1.13, 1],
                boxShadow: [
                  "0 0 48px -8px rgba(139, 92, 246, 0.4)",
                  "0 0 88px 4px rgba(167, 139, 250, 0.55)",
                  "0 0 48px -8px rgba(139, 92, 246, 0.4)",
                ],
              }}
              transition={breathTransition}
            >
              <motion.div
                className="pointer-events-none absolute inset-[10%] rounded-full border border-amber-200/20"
                animate={{
                  opacity: [0.35, 0.85, 0.35],
                }}
                transition={breathTransition}
              />
            </motion.div>
          </div>

          <motion.p
            className="max-w-[280px] text-center text-sm leading-relaxed text-stone-300/90"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {line}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
