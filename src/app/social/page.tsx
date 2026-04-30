import { KingdomRiseSocialContent } from "@/components/social/KingdomRiseSocialContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Kingdom Rise",
  description:
    "Kingdom Rise — female and male vocal videos side by side. Kenya Women Aid has more songs, downloads, and ways to contribute.",
  openGraph: {
    title: "Mio Dios · Kingdom Rise",
    description:
      "Kingdom Rise videos. Kenya Women Aid has more songs, downloads, and ways to contribute.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kingdom Rise · videos · Mio Dios",
    description:
      "Two Kingdom Rise videos — then visit Kenya Women Aid for more recordings and downloads.",
  },
};

export default function SocialSharePage() {
  /* Fixed scrollport: root layout uses overflow:hidden on html/body, so scrolling must happen here. */
  return (
    <div className="fixed inset-0 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain bg-slate-950">
      <div className="mx-auto min-h-0 w-full max-w-5xl px-5 pb-safe pt-2">
        <KingdomRiseSocialContent />
      </div>
    </div>
  );
}
