import Link from "next/link";

export function KingdomRiseSocialContent() {
  return (
    <article className="min-w-0 space-y-8 pb-10 pt-6 text-stone-200">
      <header className="space-y-3 border-b border-violet-500/15 pb-6">
        <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Mio Dios</p>
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Kingdom Rise</h1>
        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-stone-400">
          For more songs — including downloads and ways to support the work — visit{" "}
          <Link href="/kwa" className="font-medium text-violet-300 underline decoration-violet-500/35 underline-offset-2 hover:text-violet-200 hover:decoration-violet-300/55">
            Kenya Women Aid
          </Link>
          .
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-6">
        <section className="min-w-0 space-y-3" aria-labelledby="social-kingdom-rise-female-heading">
          <h2
            id="social-kingdom-rise-female-heading"
            className="text-sm font-medium uppercase tracking-[0.12em] text-stone-500"
          >
            Kingdom Rise · female vocals
          </h2>
          <div className="overflow-hidden rounded-2xl border border-violet-500/15 bg-black/40 shadow-lg shadow-violet-950/30">
            <video className="max-h-[min(70vh,520px)] w-full object-contain md:max-h-[min(62vh,480px)]" controls playsInline preload="metadata">
              <source src="/videos/kingdom-rise-female-portrait-mv-comp.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="min-w-0 space-y-3 md:border-l md:border-violet-500/10 md:pl-6" aria-labelledby="social-kingdom-rise-male-heading">
          <h2
            id="social-kingdom-rise-male-heading"
            className="text-sm font-medium uppercase tracking-[0.12em] text-stone-500"
          >
            Kingdom Rise · male vocals
          </h2>
          <div className="overflow-hidden rounded-2xl border border-violet-500/15 bg-black/40 shadow-lg shadow-violet-950/30">
            <video className="max-h-[min(70vh,520px)] w-full object-contain md:max-h-[min(62vh,480px)]" controls playsInline preload="metadata">
              <source src="/videos/kingdom-rise-male-portrait-mv-comp.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </div>

      <aside className="rounded-2xl border border-violet-500/20 bg-violet-950/25 px-4 py-3 text-[0.9rem] leading-relaxed text-stone-300">
        Looking for audio downloads and crypto donation addresses? Everything is gathered on{" "}
        <Link href="/kwa" className="font-medium text-amber-100/95 underline underline-offset-2 hover:text-amber-50">
          the Kenya Women Aid page
        </Link>
        .
      </aside>
    </article>
  );
}
