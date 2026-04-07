"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAmbientLoop } from "@/hooks/useAmbientLoop";
import { useReleaseWords } from "@/hooks/useWordLists";
import { PAGES_AMBIENT_SRC, PAGES_AMBIENT_VOLUME } from "@/lib/ambient-pages";
import { AmbientSoundToggle } from "./AmbientSoundToggle";
import { CompletionPrompt } from "./CompletionPrompt";
import { WordTumbler } from "./WordTumbler";

/** Toast after release — not during the tumbler exit animation */
const TOAST_AFTER_MS = 5000;
/** Tumbler fades out over this duration once release triggers */
const TUMBLER_FADE_S = 4;

export function ReleaseView() {
  const releaseWords = useReleaseWords();
  const { soundOn, toggleSound } = useAmbientLoop(PAGES_AMBIENT_SRC, PAGES_AMBIENT_VOLUME);
  const [tumblerKey, setTumblerKey] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [released, setReleased] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const releaseStartedRef = useRef(false);

  const activeWord = releaseWords[activeWordIndex] ?? releaseWords[0];

  const triggerRelease = useCallback(() => {
    if (releaseStartedRef.current) return;
    releaseStartedRef.current = true;
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setReleased(true);
    toastTimer.current = setTimeout(() => {
      toastTimer.current = null;
      setShowToast(true);
    }, TOAST_AFTER_MS);
  }, []);

  const reset = useCallback(() => {
    releaseStartedRef.current = false;
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setReleased(false);
    setShowToast(false);
    setActiveWordIndex(0);
    setTumblerKey((k) => k + 1);
  }, []);
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  useEffect(() => {
    setActiveWordIndex((i) =>
      releaseWords.length === 0 ? 0 : Math.min(i, releaseWords.length - 1),
    );
  }, [releaseWords.length]);

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col px-5 pb-app-bottom pt-6 [overflow-x:clip]">
      <header className="relative mb-2 shrink-0">
        <AmbientSoundToggle soundOn={soundOn} onToggle={toggleSound} />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/70">
          Release
        </p>
        <h1 className="mt-2 font-semibold text-xl tracking-tight text-stone-100">
          Dissolve the Blockages
        </h1>
        <p className="mt-1 text-[10px] uppercase leading-snug tracking-[0.18em] text-stone-500">
          Scroll the dial · choose what to release
        </p>
      </header>

      <div className="app-scroll flex min-h-0 flex-1 flex-col gap-3">
        <motion.div
          className="mx-auto w-full max-w-sm shrink-0"
          initial={false}
          animate={
            released
              ? {
                  filter: "blur(20px)",
                  opacity: 0,
                  scale: 1.08,
                }
              : {
                  filter: "blur(0px)",
                  opacity: 1,
                  scale: 1,
                }
          }
          transition={{ duration: TUMBLER_FADE_S, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ pointerEvents: released ? "none" : "auto" }}
        >
          <WordTumbler
            key={`${tumblerKey}-${releaseWords.join("|")}`}
            words={releaseWords}
            activeIndex={activeWordIndex}
            onActiveIndexChange={setActiveWordIndex}
            disabled={released}
            ariaLabel="Choose a pattern to release"
            idPrefix="release-tumbler"
            heightPx={168}
          />
        </motion.div>

        <p className="shrink-0 text-center text-sm leading-relaxed text-stone-400">
          I choose to release{" "}
          <span className="font-medium text-amber-200">{activeWord}</span> from my life.
        </p>

        {!released && (
          <div className="flex shrink-0 flex-col items-center gap-2 pb-8">
            <motion.button
              type="button"
              onClick={triggerRelease}
              aria-label="Press to release"
              className="relative touch-manipulation rounded-[1.35rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              whileTap={{ scale: 0.96 }}
            >
              <motion.span
                className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-amber-200/45 via-violet-400/35 to-amber-300/25"
                style={{ filter: "blur(10px)" }}
                aria-hidden
                animate={{
                  opacity: [0.65, 1, 0.65],
                  scale: [0.96, 1.04, 0.96],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-amber-200/50"
                aria-hidden
                animate={{ opacity: [0.5, 0.95, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                className="relative block rounded-2xl shadow-[0_0_28px_-4px_rgba(251,191,36,0.45),0_0_40px_-8px_rgba(167,139,250,0.35),inset_0_0_0_1px_rgba(253,230,138,0.25)]"
              >
                <Image
                  src="/images/release.png"
                  alt="Release"
                  width={500}
                  height={500}
                  className="h-auto w-full max-w-[min(36vw,140px)] rounded-2xl"
                  priority={false}
                />
              </span>
            </motion.button>
            <p className="text-center text-sm font-semibold tracking-wide text-amber-100/90">
              Press to Release
            </p>
          </div>
        )}
      </div>

      <CompletionPrompt
        open={showToast}
        message="What you release, releases you."
        onBeginAgain={reset}
      />
    </div>
  );
}
