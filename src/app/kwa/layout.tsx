import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenya Women Aid",
  description: "Empowering young Kenyan women through crypto-driven micro-enterprise.",
};

export default function KwaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
