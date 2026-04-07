"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const DEFAULT_ITEM_HEIGHT_PX = 64;
const INTEGRATION_ITEM_HEIGHT_PX = 80;

export function WordTumbler({
  words,
  activeIndex,
  onActiveIndexChange,
  disabled,
  ariaLabel,
  idPrefix,
  heightPx = 168,
  integratedWordHighlight = false,
}: {
  words: readonly string[];
  activeIndex: number;
  onActiveIndexChange: (i: number) => void;
  disabled: boolean;
  ariaLabel: string;
  idPrefix: string;
  heightPx?: number;
  /** When true and `disabled`, the centered word is larger and white (integration flow). */
  integratedWordHighlight?: boolean;
}) {
  const integrationLook = Boolean(disabled && integratedWordHighlight);
  const itemHeightPx = integrationLook
    ? INTEGRATION_ITEM_HEIGHT_PX
    : DEFAULT_ITEM_HEIGHT_PX;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateCenteredIndex = useCallback(() => {
    const container = scrollerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const centerY = cRect.top + cRect.height / 2;
    let best = 0;
    let bestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cy = r.top + r.height / 2;
      const d = Math.abs(cy - centerY);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    onActiveIndexChange(best);
  }, [onActiveIndexChange]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateCenteredIndex);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    updateCenteredIndex();
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateCenteredIndex]);

  return (
    <div
      className="relative mx-auto w-full max-w-sm select-none"
      style={{ height: heightPx }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[calc(50%-2rem)] bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[calc(50%-2rem)] bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent"
        aria-hidden
      />
      <div
        ref={scrollerRef}
        className="app-scroll h-full cursor-grab overscroll-contain active:cursor-grabbing [-webkit-overflow-scrolling:touch]"
        style={{
          scrollSnapType: "y mandatory",
          scrollPaddingTop: "calc(50% - 2rem)",
          scrollPaddingBottom: "calc(50% - 2rem)",
        }}
        tabIndex={disabled ? -1 : 0}
        role="listbox"
        aria-label={ariaLabel}
        aria-activedescendant={`${idPrefix}-option-${activeIndex}`}
      >
        <div style={{ height: "calc(50% - 2rem)" }} className="shrink-0" aria-hidden />
        {words.map((word, i) => (
          <div
            key={`${idPrefix}-${word}`}
            id={`${idPrefix}-option-${i}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            role="option"
            aria-selected={i === activeIndex}
            className="flex shrink-0 items-center justify-center"
            style={{
              height: itemHeightPx,
              scrollSnapAlign: "center",
            }}
          >
            <motion.span
              className={`text-center font-medium tracking-wide ${
                integrationLook && i === activeIndex
                  ? "text-3xl font-semibold leading-tight text-white sm:text-4xl"
                  : i === activeIndex
                    ? "text-2xl text-amber-200 sm:text-3xl"
                    : "text-lg text-stone-500"
              }`}
              animate={{
                opacity: integrationLook
                  ? i === activeIndex
                    ? 1
                    : 0.22
                  : i === activeIndex
                    ? 1
                    : 0.28,
                scale: integrationLook
                  ? i === activeIndex
                    ? [1, 1.2, 1.44, 1.728]
                    : 0.82
                  : i === activeIndex
                    ? 1
                    : 0.88,
              }}
              transition={
                integrationLook && i === activeIndex
                  ? {
                      opacity: { type: "spring", stiffness: 420, damping: 32 },
                      scale: {
                        duration: 4.2,
                        times: [0, 1 / 3, 2 / 3, 1],
                        ease: [0.22, 0.61, 0.36, 1],
                      },
                    }
                  : { type: "spring", stiffness: 420, damping: 32 }
              }
            >
              {word}
            </motion.span>
          </div>
        ))}
        <div style={{ height: "calc(50% - 2rem)" }} className="shrink-0" aria-hidden />
      </div>
    </div>
  );
}
