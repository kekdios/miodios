"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AlignmentView } from "./AlignmentView";
import { BottomNav, type TabId } from "./BottomNav";
import { ReleaseView } from "./ReleaseView";
import { RhythmView } from "./RhythmView";

const panelVariants = {
  initial: { opacity: 0, x: 6, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -6, filter: "blur(4px)" },
};

export function ResonanceApp() {
  const [tab, setTab] = useState<TabId>("rhythm");

  return (
    <div className="relative flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden bg-slate-950 shadow-2xl shadow-black/60 ring-1 ring-violet-950/50 sm:rounded-2xl sm:shadow-xl">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(91,33,182,0.35),transparent),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(49,46,129,0.2),transparent),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(76,29,149,0.15),transparent)]"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="relative z-0 flex min-h-0 flex-1 flex-col"
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {tab === "rhythm" && <RhythmView />}
          {tab === "release" && <ReleaseView />}
          {tab === "alignment" && <AlignmentView />}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
