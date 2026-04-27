import { BackToPractice } from "@/components/app/BackToPractice";
import { VideosContent } from "@/components/videos/VideosContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Videos",
  description: "369 and Rise Within videos.",
};

export default function VideosPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <VideosContent />
    </div>
  );
}
