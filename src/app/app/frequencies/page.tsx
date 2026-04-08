import { BackToPractice } from "@/components/app/BackToPractice";
import { FrequenciesContent } from "@/components/frequencies/FrequenciesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Frequencies",
  description: "Primary spiritual frequencies and short tone samples.",
};

export default function FrequenciesPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <FrequenciesContent />
    </div>
  );
}
