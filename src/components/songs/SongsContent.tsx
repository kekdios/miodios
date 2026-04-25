import { SONG_LYRICS_369, SONG_LYRICS_PRAYER } from "@/lib/songs-lyrics";

function LyricsDetails({ lyrics }: { lyrics: string }) {
  return (
    <details className="group mt-4 overflow-hidden rounded-xl border border-violet-500/20 bg-slate-900/40 open:border-violet-500/30">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-amber-200/90 transition-colors marker:content-[''] hover:bg-violet-950/35 [&::-webkit-details-marker]:hidden">
        Show lyrics
      </summary>
      <div className="border-t border-violet-500/15 px-4 py-4">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-stone-400">{lyrics}</pre>
      </div>
    </details>
  );
}

export function SongsContent() {
  return (
    <article className="min-w-0 space-y-10 pb-10 pt-1 text-stone-200">
      <header className="space-y-2 border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Songs</h1>
        <p className="text-sm leading-relaxed text-stone-400">
          Listen and open the lyrics when you want to sing or read along.
        </p>
      </header>

      <section className="space-y-3" aria-labelledby="song-369-heading">
        <h2 id="song-369-heading" className="text-lg font-semibold text-amber-100/95">
          369 <span className="font-normal text-stone-500">· 369 One</span>
        </h2>
        <audio className="w-full rounded-lg" controls preload="metadata" src="/audio/369_one.mp3">
          <a href="/audio/369_one.mp3">Download 369 One (MP3)</a>
        </audio>
        <LyricsDetails lyrics={SONG_LYRICS_369} />
      </section>

      <section className="space-y-3 border-t border-violet-500/10 pt-8" aria-labelledby="song-prayer-heading">
        <h2 id="song-prayer-heading" className="text-lg font-semibold text-amber-100/95">
          Prayer <span className="font-normal text-stone-500">· Prayer One</span>
        </h2>
        <audio className="w-full rounded-lg" controls preload="metadata" src="/audio/prayer_one.mp3">
          <a href="/audio/prayer_one.mp3">Download Prayer One (MP3)</a>
        </audio>
        <LyricsDetails lyrics={SONG_LYRICS_PRAYER} />
      </section>
    </article>
  );
}
