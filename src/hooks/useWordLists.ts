"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_ALIGNMENT_WORDS,
  DEFAULT_RELEASE_WORDS,
  loadWordLists,
  type WordListsState,
} from "@/lib/word-lists";

export function useWordLists(): WordListsState {
  const [state, setState] = useState<WordListsState>(() => loadWordLists());

  useEffect(() => {
    setState(loadWordLists());
    const refresh = () => setState(loadWordLists());
    window.addEventListener("miodios-wordlists", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("miodios-wordlists", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return state;
}

export function useAlignmentWords(): readonly string[] {
  const { alignment } = useWordLists();
  return alignment.length > 0 ? alignment : DEFAULT_ALIGNMENT_WORDS;
}

export function useReleaseWords(): readonly string[] {
  const { release } = useWordLists();
  return release.length > 0 ? release : DEFAULT_RELEASE_WORDS;
}
