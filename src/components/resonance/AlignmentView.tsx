"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAmbientLoop } from "@/hooks/useAmbientLoop";
import { useAlignmentWords } from "@/hooks/useWordLists";
import { PAGES_AMBIENT_SRC, PAGES_AMBIENT_VOLUME } from "@/lib/ambient-pages";
import { AmbientSoundToggle } from "./AmbientSoundToggle";
import { CompletionPrompt } from "./CompletionPrompt";
import { WordTumbler } from "./WordTumbler";

/** After integration scale animation (~4.2s) plus a short beat before toast */
const TOAST_AFTER_MS = 5800;

export function AlignmentView() {
  const alignmentWords = useAlignmentWords();
  const { soundOn, toggleSound } = useAmbientLoop(PAGES_AMBIENT_SRC, PAGES_AMBIENT_VOLUME);
  const [tumblerKey, setTumblerKey] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [integrated, setIntegrated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const integrateStartedRef = useRef(false);

  const activeWord = alignmentWords[activeWordIndex] ?? alignmentWords[0];

  const triggerIntegrate = useCallback(() => {
    if (integrateStartedRef.current) return;
    integrateStartedRef.current = true;
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setIntegrated(true);
    toastTimer.current = setTimeout(() => {
      toastTimer.current = null;
      setShowToast(true);
    }, TOAST_AFTER_MS);
  }, []);

  const reset = useCallback(() => {
    integrateStartedRef.current = false;
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setIntegrated(false);
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
      alignmentWords.length === 0 ? 0 : Math.min(i, alignmentWords.length - 1),
    );
  }, [alignmentWords.length]);

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col px-5 pb-app-bottom pt-6 [overflow-x:clip]">
      <header className="relative mb-2 shrink-0">
        <AmbientSoundToggle soundOn={soundOn} onToggle={toggleSound} />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/70">
          Alignment
        </p>
        <h1 className="mt-2 font-semibold text-xl tracking-tight text-stone-100">
          Integration
        </h1>
        {/* One compact line like Release’s header footprint — long copy lived here and stole scroll viewport height */}
        <p className="mt-1 text-[10px] uppercase leading-snug tracking-[0.18em] text-stone-500">
          Scroll the dial · anchor a quality
        </p>
      </header>

      <div className="app-scroll flex min-h-0 flex-1 flex-col gap-2 scroll-pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]">
        <div
          className="mx-auto w-full max-w-sm shrink-0"
          style={{ pointerEvents: integrated ? "none" : "auto" }}
        >
          <WordTumbler
            key={`${tumblerKey}-${alignmentWords.join("|")}`}
            words={alignmentWords}
            activeIndex={activeWordIndex}
            onActiveIndexChange={setActiveWordIndex}
            disabled={integrated}
            ariaLabel="Choose a quality to integrate"
            idPrefix="alignment-tumbler"
            heightPx={156}
            integratedWordHighlight
          />
        </div>

        <p className="shrink-0 px-1 text-center text-sm leading-snug text-stone-400">
          I open to{" "}
          <span className="font-medium text-amber-200">{activeWord}</span> as a living frequency today.
          <span className="mt-1.5 block text-[10px] uppercase leading-tight tracking-[0.2em] text-stone-600">
            Integration · not fixing, remembering
          </span>
        </p>

        {!integrated && (
          <div className="mt-10 flex shrink-0 flex-col items-center gap-2 pb-16">
            <motion.button
              type="button"
              onClick={triggerIntegrate}
              aria-label="Press to integrate"
              className="relative touch-manipulation overflow-visible rounded-[1.35rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              whileTap={{ scale: 0.96 }}
            >
              <motion.span
                className="pointer-events-none absolute -inset-2 rounded-[1.5rem] bg-gradient-to-br from-amber-200/45 via-violet-400/35 to-amber-300/25"
                style={{ filter: "blur(10px)" }}
                aria-hidden
                animate={{
                  opacity: [0.65, 1, 0.65],
                  scale: [0.96, 1.04, 0.96],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="pointer-events-none absolute -inset-0.5 rounded-2xl border-2 border-amber-200/50"
                aria-hidden
                animate={{ opacity: [0.5, 0.95, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative block rounded-2xl shadow-[0_0_28px_-4px_rgba(251,191,36,0.45),0_0_40px_-8px_rgba(167,139,250,0.35),inset_0_0_0_1px_rgba(253,230,138,0.25)]">
                <Image
                  src="/images/release.png"
                  alt="Integrate"
                  width={500}
                  height={500}
                  className="h-auto w-full max-w-[min(18vw,70px)] rounded-2xl"
                  priority={false}
                />
              </span>
            </motion.button>
            <p className="text-center text-sm font-semibold tracking-wide text-amber-100/90">
              Press To Integrate
            </p>
          </div>
        )}
      </div>

      <CompletionPrompt
        open={showToast}
        message="What you integrate, integrates you."
        onBeginAgain={reset}
      />
    </div>
  );
}
