import { BackToPractice } from "@/components/app/BackToPractice";
import { DonateContent } from "@/components/donate/DonateContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Donate",
  description: "Support Mio Dios.",
};

export default function DonatePage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <DonateContent />
    </div>
  );
}
