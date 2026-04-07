"use client";

import { AnimatePresence, motion } from "framer-motion";

type CompletionPromptProps = {
  open: boolean;
  message: string;
  onBeginAgain: () => void;
};

/**
 * Post-flow “Begin again” — centered modal so tab content does not reserve bottom strip space.
 */
export function CompletionPrompt({
  open,
  message,
  onBeginAgain,
}: CompletionPromptProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="completion-overlay"
          className="fixed inset-0 z-[60] flex items-center justify-center px-5 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="completion-prompt-message"
            className="relative w-full max-w-sm rounded-2xl border border-amber-200/20 bg-slate-950/95 px-5 py-4 text-center shadow-2xl shadow-violet-950/50 backdrop-blur-md"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            <p
              id="completion-prompt-message"
              className="text-sm font-medium text-amber-100/95"
            >
              {message}
            </p>
            <button
              type="button"
              onClick={onBeginAgain}
              className="mt-4 w-full rounded-xl border border-stone-600/50 py-2.5 text-sm text-stone-200 transition-colors hover:border-amber-200/30 hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200/50"
            >
              Begin again
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
