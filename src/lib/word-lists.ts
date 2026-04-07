const STORAGE_ALIGNMENT = "miodios.alignmentWords";
const STORAGE_RELEASE = "miodios.releaseWords";

export const DEFAULT_ALIGNMENT_WORDS: string[] = [
  "Love",
  "Unity",
  "Vitality",
  "Surrender",
  "Wisdom",
  "Presence",
  "Flow",
  "Harmony",
  "Radiance",
  "Clarity",
  "Grace",
  "Compassion",
  "Wholeness",
];

export const DEFAULT_RELEASE_WORDS: string[] = [
  "Guilt",
  "Control",
  "Fear",
  "Resentment",
  "Separation",
  "Scarcity",
  "Attachment",
  "Judgment",
  "Doubt",
  "Pride",
  "Expectation",
];

export type WordListsState = {
  alignment: string[];
  release: string[];
};

function safeParseList(raw: string | null, fallback: string[]): string[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return fallback;
    const list = parsed
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean);
    return list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  }
}

export function loadWordLists(): WordListsState {
  const fallback: WordListsState = {
    alignment: [...DEFAULT_ALIGNMENT_WORDS],
    release: [...DEFAULT_RELEASE_WORDS],
  };
  if (typeof window === "undefined") return fallback;
  try {
    return {
      alignment: safeParseList(
        localStorage.getItem(STORAGE_ALIGNMENT),
        fallback.alignment,
      ),
      release: safeParseList(localStorage.getItem(STORAGE_RELEASE), fallback.release),
    };
  } catch {
    return fallback;
  }
}

export function saveWordLists(lists: WordListsState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_ALIGNMENT, JSON.stringify(lists.alignment));
  localStorage.setItem(STORAGE_RELEASE, JSON.stringify(lists.release));
  window.dispatchEvent(new Event("miodios-wordlists"));
}

export function wordsFromMultiline(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function multilineFromWords(words: string[]): string {
  return words.join("\n");
}
