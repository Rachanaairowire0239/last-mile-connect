import { Link, useRouterState } from "@tanstack/react-router";
import { Boxes, ClipboardCheck, HardHat, LifeBuoy, Network, Radar } from "lucide-react";

const items = [
  { title: "Site Audit", to: "/site-audit", icon: ClipboardCheck },
  { title: "Survey", to: "/survey", icon: Radar },
  { title: "Field Engineer Support", to: "/", icon: HardHat },
  { title: "Products & Inventories", to: "/products", icon: Boxes },
  { title: "ISP Gateway", to: "/isp-gateway", icon: Network },
] as const;

export function SideNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground lg:flex">
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.title}
              to={item.to}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-primary/15 text-foreground shadow-[inset_2px_0_0_0_var(--color-primary)]"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-sidebar-border bg-sidebar-accent p-3">
        <LifeBuoy className="h-4 w-4 text-primary" />
        <p className="mt-2 text-xs font-semibold">Need help?</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Contact your technical coordinator for any assistance.
        </p>
        <button className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90">
          Contact Coordinator
        </button>
      </div>
    </aside>
  );
}
