import { PrayerExplainer } from "@/components/prayer/PrayerExplainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Prayer",
  description: "Line-by-line reflections on the adapted prayer.",
};

export default function PrayerPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <PrayerExplainer />
    </div>
  );
}
