export function VideosContent() {
  return (
    <article className="min-w-0 space-y-10 pb-10 pt-1 text-stone-200">
      <header className="space-y-2 border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Videos</h1>
        <p className="text-sm leading-relaxed text-stone-400">Portrait pieces — tap play to watch.</p>
      </header>

      <section className="space-y-3" aria-labelledby="video-369-portrait">
        <h2 id="video-369-portrait" className="text-sm font-medium uppercase tracking-[0.12em] text-stone-500">
          369 Portrait
        </h2>
        <div className="overflow-hidden rounded-2xl border border-violet-500/15 bg-black/40 shadow-lg shadow-violet-950/30">
          <video
            className="max-h-[min(70vh,520px)] w-full object-contain"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/videos/369-portrait.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="space-y-3 border-t border-violet-500/10 pt-8" aria-labelledby="video-rise-portrait">
        <h2 id="video-rise-portrait" className="text-sm font-medium uppercase tracking-[0.12em] text-stone-500">
          Rise Portrait
        </h2>
        <div className="overflow-hidden rounded-2xl border border-violet-500/15 bg-black/40 shadow-lg shadow-violet-950/30">
          <video
            className="max-h-[min(70vh,520px)] w-full object-contain"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/videos/rise-portrait.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </article>
  );
}
