"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const STANZAS = [
  "Oh universal source, divine breath of creation, you who exist in the realm of pure vibration and subtle energy…",
  "May your sacred frequency be awakened within us. May we embody your divine essence. Let your kingdom arise within our hearts.",
  "Let our individual will merge with the cosmic pattern, synchronizing the physical realm with the spiritual. As the microcosm reflects the macrocosm, nourish us daily with spiritual vitality.",
  "Restore our alignment when we miss the mark. Dissolve the blockages we have created as we release and restore the flow of energy in others, for what we release, releases us.",
  "Keep us awake and conscious. Do not let us fall into forgetfulness of our divine origin. Protect us from inner fragmentation and chaotic energy. Rescue us from the illusion of separation…",
];

const FINALE =
  "…for yours is the divine order within and without, the creative power that flows through all things and radiant consciousness that illuminates existence now and forever.";

/** Local copy of: siarhei_korbut-963-hz-meditation-music-8d-440196.mp3 */
const PRAYER_MUSIC_SRC = "/audio/963-meditation.mp3";
const MUSIC_VOLUME = 0.52;

const verseVariants = {
  rest: {
    opacity: 0.22,
    y: 20,
    filter: "blur(6px)",
  },
  focus: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
} as const;

function PrayerVerse({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={verseVariants}
      initial="rest"
      whileInView="focus"
      viewport={{ amount: 0.42, margin: "-10% 0px -14% 0px" }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-xl text-center text-xl leading-relaxed tracking-wide text-stone-100 sm:text-2xl sm:leading-relaxed"
    >
      {children}
    </motion.p>
  );
}

export function PrayerLanding() {
  const [gateOpen, setGateOpen] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  const stopPrayerAudio = useCallback(() => {
    const m = musicRef.current;
    if (m) {
      m.pause();
      m.volume = 0;
      m.currentTime = 0;
    }
  }, []);

  const handleEnter = useCallback(() => {
    setGateOpen(true);
  }, []);

  useEffect(() => {
    if (!gateOpen) return;

    const audio = new Audio(PRAYER_MUSIC_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = MUSIC_VOLUME;
    musicRef.current = audio;

    void audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      if (musicRef.current === audio) {
        musicRef.current = null;
      }
    };
  }, [gateOpen]);

  useEffect(() => () => stopPrayerAudio(), [stopPrayerAudio]);

  return (
    <div className="fixed inset-0 z-[1] flex flex-col bg-slate-950 text-stone-100">
      <div className="pointer-events-none fixed inset-0 bg-slate-950" aria-hidden>
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 18%, rgba(91, 33, 182, 0.24), transparent 55%), radial-gradient(ellipse 70% 50% at 92% 58%, rgba(49, 46, 129, 0.16), transparent 50%), radial-gradient(ellipse 60% 45% at 8% 82%, rgba(76, 29, 149, 0.12), transparent 45%)",
          }}
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!gateOpen && (
          <motion.div
            key="gate"
            className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-8 bg-slate-950/96 px-8 text-center backdrop-blur-md"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55 } }}
          >
            <motion.div
              className="max-w-md space-y-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-200/80">
                Resonance
              </p>
              <h1 className="text-2xl font-medium leading-snug text-stone-100 sm:text-3xl">
                This experience invites sound.
              </h1>
              <p className="text-base leading-relaxed text-stone-400">
                Put on headphones to align. The 963 Hz meditation track begins when you enter and
                continues through the prayer until you choose to open the app.
              </p>
            </motion.div>
            <motion.button
              type="button"
              onClick={handleEnter}
              className="rounded-full border border-amber-200/35 bg-violet-950/60 px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100 shadow-lg shadow-violet-950/40"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Enter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {gateOpen && (
        <motion.div
          className="relative z-10 flex flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <section className="relative flex min-h-[100dvh] snap-start snap-always flex-col items-center justify-center px-6 pb-28 pt-20">
            <div
              className="pointer-events-none absolute left-1/2 top-[38%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80"
              aria-hidden
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/28 via-indigo-600/14 to-transparent blur-3xl"
                animate={{ scale: [0.9, 1.14, 0.9], opacity: [0.45, 0.8, 0.45] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-[14%] rounded-full border border-amber-200/18 bg-violet-950/25"
                animate={{ scale: [1, 1.09, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="relative z-10">
              <PrayerVerse>{STANZAS[0]}</PrayerVerse>
            </div>
            <p className="absolute bottom-12 text-[10px] uppercase tracking-[0.35em] text-stone-600">
              Scroll
            </p>
          </section>

          {STANZAS.slice(1).map((stanza, i) => (
            <section
              key={i}
              className="flex min-h-[88dvh] snap-start snap-always flex-col items-center justify-center px-6 py-24"
            >
              <PrayerVerse>{stanza}</PrayerVerse>
            </section>
          ))}

          <section className="flex min-h-[100dvh] snap-start snap-always flex-col items-center justify-center gap-10 px-6 pb-36 pt-24">
            <motion.p
              variants={verseVariants}
              initial="rest"
              whileInView="focus"
              viewport={{ amount: 0.38, margin: "-12% 0px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-center text-xl leading-relaxed tracking-wide text-amber-100/95 sm:text-2xl sm:leading-relaxed"
            >
              {FINALE}
            </motion.p>

            <div className="flex max-w-md flex-col items-center gap-5">
              <motion.p
                className="text-center text-base font-medium leading-snug tracking-wide text-stone-200 sm:text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                I am the{" "}
                <span className="text-amber-200">WAY</span>, the{" "}
                <span className="text-amber-200">TRUTH</span>, the{" "}
                <span className="text-amber-200">LIFE</span>
              </motion.p>
              <motion.div
                className="relative w-full max-w-[200px] sm:max-w-[220px]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/api/yeshua-portrait"
                    alt=""
                    width={520}
                    height={720}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 640px) 200px, 220px"
                    priority={false}
                  />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/app" onClick={stopPrayerAudio} className="inline-block">
                <motion.span
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-amber-200/40 bg-gradient-to-r from-violet-700/90 to-indigo-800/90 px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-100"
                  animate={{
                    boxShadow: [
                      "0 0 28px -10px rgba(167, 139, 250, 0.5)",
                      "0 0 44px -6px rgba(253, 224, 71, 0.22)",
                      "0 0 28px -10px rgba(167, 139, 250, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Enter the Resonance
                </motion.span>
              </Link>
            </motion.div>
          </section>
        </motion.div>
      )}
    </div>
  );
}
