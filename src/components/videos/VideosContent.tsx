export function VideosContent() {
  return (
    <article className="min-w-0 space-y-10 pb-10 pt-1 text-stone-200">
      <header className="border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Videos</h1>
      </header>

      <section className="space-y-3" aria-labelledby="video-369-heading">
        <h2 id="video-369-heading" className="text-sm font-medium uppercase tracking-[0.12em] text-stone-500">
          369
        </h2>
        <div className="overflow-hidden rounded-2xl border border-violet-500/15 bg-black/40 shadow-lg shadow-violet-950/30">
          <video
            className="max-h-[min(70vh,520px)] w-full object-contain"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/videos/369-mv.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="space-y-3 border-t border-violet-500/10 pt-8" aria-labelledby="video-rise-within-heading">
        <h2 id="video-rise-within-heading" className="text-sm font-medium uppercase tracking-[0.12em] text-stone-500">
          Rise Within
        </h2>
        <div className="overflow-hidden rounded-2xl border border-violet-500/15 bg-black/40 shadow-lg shadow-violet-950/30">
          <video
            className="max-h-[min(70vh,520px)] w-full object-contain"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/videos/rise-within-mv.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </article>
  );
}
