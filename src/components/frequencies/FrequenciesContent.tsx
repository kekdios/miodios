"use client";

import { Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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

const SAMPLE_SECONDS = 24;
const PEAK = 0.085;

function useSineSample(onEnded: () => void) {
  const chainRef = useRef<{
    ctx: AudioContext;
    osc: OscillatorNode;
    gain: GainNode;
  } | null>(null);
  const genRef = useRef(0);

  const stop = useCallback(() => {
    genRef.current += 1;
    const c = chainRef.current;
    if (!c) return;
    const { ctx, osc, gain } = c;
    chainRef.current = null;
    try {
      const t = ctx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(Math.min(gain.gain.value, PEAK), t);
      gain.gain.linearRampToValueAtTime(0, t + 0.12);
      osc.stop(t + 0.15);
    } catch {
      try {
        osc.disconnect();
      } catch {
        /* noop */
      }
    }
    ctx.close().catch(() => {});
  }, []);

  const play = useCallback(
    (hz: number) => {
      stop();
      const AC =
        typeof window !== "undefined" &&
        (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);
      if (!AC) return;
      const generation = genRef.current;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(hz, ctx.currentTime);
      const gain = ctx.createGain();
      const t0 = ctx.currentTime;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(PEAK, t0 + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      chainRef.current = { ctx, osc, gain };

      const tEnd = t0 + SAMPLE_SECONDS;
      gain.gain.setValueAtTime(PEAK, tEnd - 0.35);
      gain.gain.linearRampToValueAtTime(0, tEnd);
      osc.stop(tEnd);
      osc.onended = () => {
        if (generation !== genRef.current) return;
        chainRef.current = null;
        ctx.close().catch(() => {});
        onEnded();
      };

      void ctx.resume();
    },
    [stop, onEnded],
  );

  useEffect(() => () => stop(), [stop]);

  return { play, stop };
}

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
