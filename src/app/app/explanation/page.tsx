import { BackToPractice } from "@/components/app/BackToPractice";
import { ExplanationContent } from "@/components/explanation/ExplanationContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Explanation",
  description: "Line-by-line context for the adapted prayer.",
};

export default function ExplanationPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <ExplanationContent />
    </div>
  );
}
