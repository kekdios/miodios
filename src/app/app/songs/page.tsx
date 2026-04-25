import { BackToPractice } from "@/components/app/BackToPractice";
import { SongsContent } from "@/components/songs/SongsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Songs",
  description: "369 One and Prayer One — listen and lyrics.",
};

export default function SongsPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <SongsContent />
    </div>
  );
}
