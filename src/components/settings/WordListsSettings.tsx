"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_ALIGNMENT_WORDS,
  DEFAULT_RELEASE_WORDS,
  loadWordLists,
  multilineFromWords,
  saveWordLists,
  wordsFromMultiline,
} from "@/lib/word-lists";

export function WordListsSettings() {
  const [alignmentText, setAlignmentText] = useState("");
  const [releaseText, setReleaseText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const { alignment, release } = loadWordLists();
    setAlignmentText(multilineFromWords(alignment));
    setReleaseText(multilineFromWords(release));
  }, []);

  const handleSave = useCallback(() => {
    const alignment = wordsFromMultiline(alignmentText);
    const release = wordsFromMultiline(releaseText);
    if (alignment.length === 0 || release.length === 0) {
      return;
    }
    saveWordLists({ alignment, release });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }, [alignmentText, releaseText]);

  const handleReset = useCallback(() => {
    setAlignmentText(multilineFromWords(DEFAULT_ALIGNMENT_WORDS));
    setReleaseText(multilineFromWords(DEFAULT_RELEASE_WORDS));
    saveWordLists({
      alignment: [...DEFAULT_ALIGNMENT_WORDS],
      release: [...DEFAULT_RELEASE_WORDS],
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }, []);

  const canSave =
    wordsFromMultiline(alignmentText).length > 0 &&
    wordsFromMultiline(releaseText).length > 0;

  return (
    <article className="space-y-8 pb-10 pt-1 text-stone-200">
      <header className="space-y-2 border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Settings</h1>
        <p className="text-sm leading-relaxed text-stone-400">
          Edit the words shown in the Alignment and Release tumblers. One entry per line.
        </p>
      </header>

      <section className="space-y-2">
        <label htmlFor="alignment-words" className="text-sm font-medium text-amber-100/90">
          Alignment words
        </label>
        <textarea
          id="alignment-words"
          value={alignmentText}
          onChange={(e) => setAlignmentText(e.target.value)}
          rows={12}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-violet-500/25 bg-slate-900/80 px-3 py-2.5 text-sm leading-relaxed text-stone-200 placeholder:text-stone-600 focus:border-amber-200/40 focus:outline-none focus:ring-1 focus:ring-amber-200/30"
        />
      </section>

      <section className="space-y-2">
        <label htmlFor="release-words" className="text-sm font-medium text-amber-100/90">
          Release words
        </label>
        <textarea
          id="release-words"
          value={releaseText}
          onChange={(e) => setReleaseText(e.target.value)}
          rows={12}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-violet-500/25 bg-slate-900/80 px-3 py-2.5 text-sm leading-relaxed text-stone-200 placeholder:text-stone-600 focus:border-amber-200/40 focus:outline-none focus:ring-1 focus:ring-amber-200/30"
        />
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={!canSave}
          className="rounded-xl border border-amber-200/35 bg-violet-700/80 px-5 py-2.5 text-sm font-semibold text-amber-50 transition-colors hover:bg-violet-600/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-violet-500/30 px-5 py-2.5 text-sm font-medium text-stone-300 transition-colors hover:border-violet-400/40 hover:text-stone-100"
        >
          Restore defaults
        </button>
        {saved && (
          <span className="text-sm text-emerald-400/90" role="status">
            Saved
          </span>
        )}
      </div>

      {!canSave && (
        <p className="text-sm text-amber-200/70">Each list needs at least one non-empty line to save.</p>
      )}
    </article>
  );
}
