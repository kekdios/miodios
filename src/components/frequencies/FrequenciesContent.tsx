"use client";

import { useSineSample } from "@/hooks/useSineSample";
import { Volume2 } from "lucide-react";
import { useCallback, useState } from "react";

const FREQUENCIES = [
  {
    hz: 432,
    title: "432 Hz (The Universal Tuning)",
    body:
      "Often described as aligning with the universe's natural vibration. It is associated with alpha brainwaves, full-body healing, and producing a significant relaxing effect on the brain and autonomic nervous system.",
  },
  {
    hz: 444,
    title: "444 Hz (The Angel Frequency)",
    body:
      "Associated with protection, higher guidance, and reassurance. It is often used in meditation for spiritual growth, inner peace, and opening awareness to something greater.",
  },
  {
    hz: 528,
    title: "528 Hz (The Love Frequency)",
    body: `One of the most famous Solfeggio tones. It is believed to resonate with the heart's energy, promoting love, compassion, and emotional balance. Many also associate this tone with "DNA repair" and cellular rejuvenation.`,
  },
  {
    hz: 741,
    title: "741 Hz (The Awakening Frequency)",
    body:
      "Tied to the Throat Chakra, this tone is used for mental clarity, problem-solving, self-expression, and awakening intuition.",
  },
  {
    hz: 777,
    title: "777 Hz",
    body: "Specifically cited as a frequency for spiritual awakening.",
  },
  {
    hz: 852,
    title: "852 Hz (The Intuition Frequency)",
    body:
      "Linked to the Third Eye Chakra. It is used to access inner wisdom, sensitize the listener to feeling things beyond thought, and deepen spiritual understanding.",
  },
  {
    hz: 963,
    title: "963 Hz (The Frequency of the Gods)",
    body:
      "The highest of the main Solfeggio tones, connected to the Crown Chakra and the pineal gland. It is said to awaken higher states of consciousness and create a sense of oneness, unity, and universal consciousness.",
  },
  {
    hz: 1074,
    title: "1074 Hz",
    body:
      "Described as a spiritual frequency that facilitates higher consciousness and profound spiritual experiences.",
  },
] as const;

export function FrequenciesContent() {
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
    <article className="space-y-8 pb-10 pt-1 text-stone-200">
      <header className="space-y-3 border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">
          The Primary Spiritual Frequencies
        </h1>
        <p className="text-sm leading-relaxed text-stone-300">
          Tap <span className="whitespace-nowrap">“Hear sample”</span> for a short sine tone at each Hz. Use
          headphones at a comfortable volume; stop if it feels uncomfortable.
        </p>
      </header>

      <section className="space-y-8" aria-label="Frequency list">
        {FREQUENCIES.map((item) => {
          const isPlaying = activeHz === item.hz;
          return (
            <div
              key={item.hz}
              className="rounded-2xl border border-violet-500/15 bg-slate-900/35 p-4 shadow-inner shadow-black/20 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h3 className="text-base font-semibold text-amber-100/95">{item.title}</h3>
                <button
                  type="button"
                  onClick={() => toggle(item.hz)}
                  className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors sm:self-start ${
                    isPlaying
                      ? "border-amber-300/50 bg-amber-500/20 text-amber-50"
                      : "border-amber-200/30 bg-violet-800/50 text-amber-100/95 hover:bg-violet-700/55"
                  }`}
                  aria-pressed={isPlaying}
                >
                  <Volume2 className="h-4 w-4" strokeWidth={2} aria-hidden />
                  {isPlaying ? "Stop" : "Hear sample"}
                </button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">{item.body}</p>
            </div>
          );
        })}
      </section>
    </article>
  );
}
