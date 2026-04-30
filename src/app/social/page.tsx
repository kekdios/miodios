import { KingdomRiseSocialContent } from "@/components/social/KingdomRiseSocialContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Kingdom Rise",
  description:
    "Kingdom Rise portrait music videos — male and female mixes. Kenya Women Aid has more Kingdom Rise recordings, other songs, and downloads.",
  openGraph: {
    title: "Mio Dios · Kingdom Rise",
    description:
      "Portrait Kingdom Rise videos. Kenya Women Aid has more songs, downloads, and ways to contribute.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kingdom Rise · portrait videos · Mio Dios",
    description:
      "Two Kingdom Rise portrait MVs — then visit Kenya Women Aid for more recordings and downloads.",
  },
};

export default function SocialSharePage() {
  return (
    <div className="relative min-h-[100dvh] min-w-0 overflow-y-auto overscroll-contain bg-slate-950">
      <div className="mx-auto w-full max-w-lg px-5 pb-safe">
        <KingdomRiseSocialContent />
      </div>
    </div>
  );
}
