import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export function BackToPractice() {
  return (
    <div className="sticky top-0 z-10 -mx-5 mb-4 border-b border-violet-500/10 bg-slate-950/90 px-5 py-3 backdrop-blur-sm">
      <Link
        href="/app"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-200/90 transition-colors hover:text-amber-50"
      >
        <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={2} />
        Go Back
      </Link>
    </div>
  );
}
