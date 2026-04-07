import { ResonanceApp } from "@/components/resonance/ResonanceApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mio Dios · Practice",
  description: "Rhythm, release, and alignment — the daily practice.",
};

export default function AppPage() {
  return <ResonanceApp />;
}
