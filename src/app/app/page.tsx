import { ResonanceApp } from "@/components/resonance/ResonanceApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Practice",
  description: "Rhythm, release, and alignment — the daily practice.",
};

export default function AppPage() {
  return (
    <div className="box-border flex h-full min-h-0 w-full flex-col justify-center overflow-hidden bg-slate-950">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-md min-w-0 flex-col">
        <ResonanceApp />
      </div>
    </div>
  );
}
