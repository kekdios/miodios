import { Cormorant_Garamond } from "next/font/google";
import { PrayerLanding } from "@/components/landing/PrayerLanding";

const prayerSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`${prayerSerif.className} h-full min-h-0`}>
      <PrayerLanding />
    </div>
  );
}
