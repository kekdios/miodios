import { listVisitsRecent } from "@/lib/join-db";

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

export function VisitorsContent() {
  const visits = listVisitsRecent();

  return (
    <article className="min-w-0 space-y-6 pb-10 pt-1 text-stone-200">
      <header className="space-y-2 border-b border-violet-500/15 pb-6">
        <h1 className="text-xl font-semibold leading-snug text-amber-50 sm:text-2xl">Visitors</h1>
        <p className="text-sm leading-relaxed text-stone-400">
          Recent navigations logged from the app (newest first). {visits.length} row
          {visits.length !== 1 ? "s" : ""} shown (max 500).
        </p>
      </header>

      {visits.length === 0 ? (
        <p className="text-sm text-stone-500">No visits recorded yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-violet-500/15 bg-slate-900/35">
          <table className="w-full min-w-[36rem] border-collapse text-left text-xs text-stone-300">
            <thead>
              <tr className="border-b border-violet-500/20 bg-slate-950/80 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-stone-500">
                <th className="whitespace-nowrap px-3 py-2.5">Time</th>
                <th className="px-3 py-2.5">Path</th>
                <th className="whitespace-nowrap px-3 py-2.5">IP</th>
                <th className="px-3 py-2.5">Referrer</th>
                <th className="min-w-[12rem] px-3 py-2.5">User agent</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-violet-500/10 align-top last:border-b-0 hover:bg-violet-950/30"
                >
                  <td className="whitespace-nowrap px-3 py-2 tabular-nums text-stone-400">{v.created_at}</td>
                  <td className="max-w-[10rem] px-3 py-2 font-mono text-amber-100/90">{truncate(v.path, 80)}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-stone-400">{v.ip || "—"}</td>
                  <td className="max-w-[12rem] px-3 py-2 break-all text-stone-500">
                    {v.referrer ? truncate(v.referrer, 120) : "—"}
                  </td>
                  <td className="px-3 py-2 text-stone-500">{truncate(v.user_agent, 160)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
