import { BackToPractice } from "@/components/app/BackToPractice";
import { WordListsSettings } from "@/components/settings/WordListsSettings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Settings",
  description: "Alignment and Release word lists.",
};

export default function SettingsPage() {
  return (
    <div className="app-scroll flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5">
      <BackToPractice />
      <WordListsSettings />
    </div>
  );
}
