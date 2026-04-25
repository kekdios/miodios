import {
  SONG_LYRICS_369,
  SONG_LYRICS_369POP_ONE,
  SONG_LYRICS_369POP_TWO,
  SONG_LYRICS_PRAYER,
} from "@/lib/songs-lyrics";

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

function SongBlock({
  id,
  title,
  subtitle,
  src,
  downloadName,
  lyrics,
  withTopBorder = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  downloadName: string;
  lyrics: string;
  withTopBorder?: boolean;
}) {
  return (
    <section
      className={`space-y-3 ${withTopBorder ? "border-t border-violet-500/10 pt-8" : ""}`}
      aria-labelledby={id}
    >
      <h2 id={id} className="text-lg font-semibold text-amber-100/95">
        {title} <span className="font-normal text-stone-500">· {subtitle}</span>
      </h2>
      <audio className="w-full rounded-lg" controls preload="metadata" src={src}>
        <a href={src}>{downloadName}</a>
      </audio>
      <LyricsDetails lyrics={lyrics} />
    </section>
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

      <SongBlock
        id="song-369pop-one-heading"
        title="369 Pop"
        subtitle="369 Pop One"
        src="/audio/369pop_one.mp3"
        downloadName="Download 369 Pop One (MP3)"
        lyrics={SONG_LYRICS_369POP_ONE}
      />

      <SongBlock
        id="song-369pop-two-heading"
        title="369 Pop"
        subtitle="369 Pop Two"
        src="/audio/369pop_two.mp3"
        downloadName="Download 369 Pop Two (MP3)"
        lyrics={SONG_LYRICS_369POP_TWO}
        withTopBorder
      />

      <SongBlock
        id="song-369-heading"
        title="369"
        subtitle="369 One"
        src="/audio/369_one.mp3"
        downloadName="Download 369 One (MP3)"
        lyrics={SONG_LYRICS_369}
        withTopBorder
      />

      <SongBlock
        id="song-prayer-heading"
        title="Prayer"
        subtitle="Prayer One"
        src="/audio/prayer_one.mp3"
        downloadName="Download Prayer One (MP3)"
        lyrics={SONG_LYRICS_PRAYER}
        withTopBorder
      />
    </article>
  );
}
