"use client";

import { useCallback, useEffect, useRef } from "react";

export const SINE_SAMPLE_SECONDS = 24;
const PEAK = 0.085;

export function useSineSample(onEnded: () => void) {
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

      const tEnd = t0 + SINE_SAMPLE_SECONDS;
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
