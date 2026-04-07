import { BackToPractice } from "@/components/app/BackToPractice";
import { JoinUsContent } from "@/components/join/JoinUsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Join Us",
  description: "Stay connected with Mio Dios.",
};

export default function JoinUsPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <JoinUsContent />
    </div>
  );
}
