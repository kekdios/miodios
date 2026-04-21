/**
 * Kenya Women Aid — static landing lives in /public/kwa (HTML/CSS/JS).
 * Iframe keeps the main app’s global layout (fonts, overflow) from constraining this page.
 */
export default function KwaPage() {
  return (
    <iframe
      title="Kenya Women Aid"
      src="/kwa/index.html"
      className="fixed inset-0 z-[100] block h-[100dvh] w-full border-0 bg-white"
      allow="clipboard-write"
    />
  );
}
