export function DonateContent() {
  return (
    <article className="space-y-6 pb-8 pt-1 text-stone-200">
      <header className="space-y-2 border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Donate</h1>
        <p className="text-sm leading-relaxed text-stone-400">
          If this practice has been meaningful, you can help keep it available and evolving.
        </p>
      </header>
      <div className="space-y-3 text-sm leading-relaxed text-stone-400">
        <p>
          Support helps cover hosting and ongoing care for the experience. There is no obligation; presence
          here is already enough.
        </p>
        <p className="text-xs text-stone-500">
          A dedicated payment link can be added here when you choose a channel (e.g. Stripe, PayPal, or
          another option you prefer).
        </p>
      </div>
    </article>
  );
}
