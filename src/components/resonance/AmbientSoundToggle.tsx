"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSoundToggle({
  soundOn,
  onToggle,
}: {
  soundOn: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? "Mute ambient sound" : "Turn sound on"}
      className="absolute right-0 top-0 z-10 rounded-full p-2.5 text-amber-200/85 transition-colors hover:bg-violet-950/60 hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200/40"
      whileTap={{ scale: 0.94 }}
    >
      {soundOn ? (
        <Volume2 className="h-5 w-5" strokeWidth={2} />
      ) : (
        <VolumeX className="h-5 w-5" strokeWidth={2} />
      )}
    </motion.button>
  );
}
