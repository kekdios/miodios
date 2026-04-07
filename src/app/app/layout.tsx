import { AppShell } from "@/components/app/AppShell";

export default function AppSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="box-border flex h-full min-h-0 w-full flex-col justify-center overflow-hidden bg-slate-950">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-md min-w-0 flex-col">
        <AppShell>{children}</AppShell>
      </div>
    </div>
  );
}
