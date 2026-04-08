import { BackToPractice } from "@/components/app/BackToPractice";
import { ThreeSixNineContent } from "@/components/three-six-nine/ThreeSixNineContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · 369",
  description: "The triad of creation, the bridge of harmony, and the culmination.",
};

export default function ThreeSixNinePage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <ThreeSixNineContent />
    </div>
  );
}
