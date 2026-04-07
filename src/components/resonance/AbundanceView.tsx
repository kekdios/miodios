"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const PLACEHOLDER =
  "Enter a drop of abundance: What evidence of cosmic flow did you witness today?";

const POOL_BASE_H = 96;
const POOL_EXPAND_EXTRA = 14;
const DRAG_RELEASE_PX = 64;

export function AbundanceView() {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"idle" | "falling" | "splash">("idle");
  const [poolHeight, setPoolHeight] = useState(POOL_BASE_H);
  const [poolFlash, setPoolFlash] = useState(0);
  const [rippleKey, setRippleKey] = useState(0);
  const [toast, setToast] = useState(false);
  const dropCompleteGuard = useRef(false);

  useEffect(() => {
    if (phase === "idle") dropCompleteGuard.current = false;
  }, [phase]);

  const finishSequence = useCallback(() => {
    setPhase("splash");
    setPoolHeight(POOL_BASE_H + POOL_EXPAND_EXTRA);
    setPoolFlash((k) => k + 1);
    setRippleKey((k) => k + 1);
    setText("");

    window.setTimeout(() => {
      setPoolHeight(POOL_BASE_H);
      setPhase("idle");
      setToast(true);
      window.setTimeout(() => setToast(false), 5200);
    }, reduceMotion ? 200 : 480);
  }, [reduceMotion]);

  const startDrop = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("falling");
  }, [phase]);

  const onDropFallComplete = useCallback(() => {
    if (dropCompleteGuard.current) return;
    dropCompleteGuard.current = true;
    finishSequence();
  }, [finishSequence]);

  const onDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (phase !== "idle") return;
      const v = info.velocity.y;
      if (info.offset.y > DRAG_RELEASE_PX || v > 380) {
        startDrop();
      }
    },
    [phase, startDrop],
  );

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-5 pb-app-bottom pt-6 [overflow-x:clip]">
      <header className="mb-4 shrink-0 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/70">Abundance</p>
        <h1 className="mt-2 font-semibold text-xl tracking-tight text-stone-100">
          The Liquid Light Pool
        </h1>
        <p className="mx-auto mt-2 max-w-[20rem] text-xs leading-relaxed text-stone-500">
          Not material manifesting — recognizing the creative power that flows through all things. A space
          for gratitude as cosmic pattern.
        </p>
      </header>

      <div
        className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-end pb-2"
        style={{ paddingBottom: "max(7.5rem, calc(env(safe-area-inset-bottom, 0px) + 5rem))" }}
      >
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
              transition={{ duration: 0.28 }}
              className="flex w-full max-w-sm flex-col items-center gap-3"
            >
              <motion.div
                drag={reduceMotion ? false : "y"}
                dragConstraints={{ top: 0, bottom: 140 }}
                dragElastic={0.14}
                onDragEnd={onDragEnd}
                className="flex w-full flex-col items-center gap-3 rounded-2xl border border-violet-500/20 bg-slate-950/60 px-3 pb-4 pt-3 shadow-lg shadow-violet-950/30"
              >
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={PLACEHOLDER}
                  rows={5}
                  className="min-h-[7.5rem] w-full resize-none rounded-xl border border-amber-200/15 bg-slate-900/70 px-3 py-2.5 text-sm leading-relaxed text-stone-200 placeholder:text-stone-600 focus:border-amber-200/35 focus:outline-none focus:ring-1 focus:ring-amber-200/25"
                />
                <div className="flex w-full flex-col items-center gap-1.5">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
                  <button
                    type="button"
                    onClick={startDrop}
                    className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/85 transition-colors hover:text-amber-50"
                  >
                    Pull Down to Anchor
                  </button>
                  <p className="text-center text-[10px] text-stone-600">Or drag this card toward the pool</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {phase === "falling" && (
            <motion.div
              key="drop"
              className="pointer-events-none absolute left-1/2 flex w-[min(100%,20rem)] -translate-x-1/2 justify-center"
              style={{ top: "28%" }}
              initial={false}
            >
              <motion.div
                className="h-[50px] w-[50px] rounded-full bg-amber-100 shadow-[0_0_28px_8px_rgba(253,230,138,0.55),0_0_60px_20px_rgba(251,191,36,0.35)]"
                initial={{ y: 0 }}
                animate={{
                  y: reduceMotion ? 200 : 300,
                }}
                transition={{
                  y: {
                    type: "tween",
                    ease: [0.45, 0.03, 0.78, 0.99],
                    duration: reduceMotion ? 0.22 : 0.72,
                  },
                }}
                onAnimationComplete={onDropFallComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cosmic pool — anchored to bottom of view */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] overflow-hidden rounded-t-[42%] border-t border-amber-200/25"
        animate={{ height: poolHeight }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        style={{
          background:
            "linear-gradient(to top, rgba(251,191,36,0.42) 0%, rgba(253,230,138,0.18) 45%, rgba(91,33,182,0.12) 100%)",
          boxShadow:
            "0 -24px 70px rgba(251,191,36,0.35), 0 -8px 40px rgba(167,139,250,0.2), inset 0 12px 40px rgba(255,255,255,0.12)",
        }}
      >
        <motion.div
          key={poolFlash}
          className="absolute inset-0 bg-gradient-to-t from-amber-200/30 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0] }}
          transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: "easeOut" }}
        />
        {/* Shimmer sheen */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.35), transparent 55%)",
          }}
        />
        <RippleBurst key={rippleKey} active={rippleKey > 0} reduceMotion={!!reduceMotion} />
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="pointer-events-none absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-20 max-w-[18rem] -translate-x-1/2 text-center text-xs leading-relaxed text-amber-100/90"
          >
            The microcosm is nourished. The macrocosm expands.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function RippleBurst({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute bottom-[32%] left-1/2 z-[2] -translate-x-1/2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/55 bg-amber-200/15"
          initial={{ scale: 0.35, opacity: 0.65 }}
          animate={{ scale: 5.5 + i * 0.8, opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.95 + i * 0.1,
            delay: i * 0.07,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
