"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Looping ambient audio with mute toggle (same behavior as RhythmView).
 */
export function useAmbientLoop(audioSrc: string, volume: number) {
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;
    void audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [audioSrc, volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !soundOn;
    if (soundOn) {
      void a.play().catch(() => {});
    }
  }, [soundOn]);

  const toggleSound = useCallback(() => {
    setSoundOn((v) => !v);
  }, []);

  return { soundOn, toggleSound };
}
