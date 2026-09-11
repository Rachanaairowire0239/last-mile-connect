import type { ReactNode } from "react";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

export function AppShell({ crumbs, children }: { crumbs: string[]; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav crumbs={crumbs} />
      <div className="flex w-full">
        <SideNav />
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
