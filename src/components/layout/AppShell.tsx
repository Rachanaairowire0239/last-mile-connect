import type { ReactNode } from "react";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

export function AppShell({
  crumbs,
  children,
  activeService,
  onServiceSelect,
}: {
  crumbs: string[];
  children: ReactNode;
  activeService?: string | undefined;
  onServiceSelect?: ((service: string) => void) | undefined;
}) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav crumbs={crumbs} />
      <div className="flex w-full">
        <SideNav activeService={activeService} onServiceSelect={onServiceSelect} />
        <main id="main-content" className="min-w-0 flex-1 px-4 py-5 md:px-6 xl:px-8">{children}</main>
      </div>
    </div>
  );
}
