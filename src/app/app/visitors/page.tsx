import { BackToPractice } from "@/components/app/BackToPractice";
import { VisitorsContent } from "@/components/visitors/VisitorsContent";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mio Dios · Visitors",
  description: "Recent site visits.",
};

export default function VisitorsPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <VisitorsContent />
    </div>
  );
}
