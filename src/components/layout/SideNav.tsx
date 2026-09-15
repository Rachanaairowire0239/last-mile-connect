import { Boxes, ClipboardCheck, HardHat, LifeBuoy, Network, RadioTower, Radar, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Site Audit", to: "/site-audit", icon: ClipboardCheck },
  { title: "Survey", to: "/survey", icon: Radar },
  { title: "Field Engineer Support", to: "/", icon: HardHat },
  { title: "Products & Inventory", to: "/products", icon: Boxes },
  { title: "Passive Services", to: "/passive", icon: RadioTower },
  { title: "ISP Gateway", to: "/isp-gateway", icon: Network },
] as const;

export function SideNav({ activeService, onServiceSelect }: { activeService?: string | undefined; onServiceSelect?: ((service: string) => void) | undefined }) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground lg:flex">
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = activeService === item.title;
          return (
            <Button
              key={item.title}
              type="button"
              variant="ghost"
              onClick={() => onServiceSelect?.(item.title)}
              className={`h-10 w-full justify-start px-3 text-xs ${
                active
                  ? "bg-primary/15 text-foreground shadow-[inset_2px_0_0_0_var(--color-primary)]"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
              {item.title}
            </Button>
          );
        })}
      </nav>

      <div className="mt-4 rounded-md border border-primary/20 bg-primary/5 p-3">
        <WandSparkles className="h-4 w-4 text-primary" />
        <p className="mt-2 text-xs font-semibold">Need a custom solution?</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Build a tailored multi-site scope.</p>
        <Button variant="outline" size="sm" className="mt-3 w-full text-[11px]">Request solution</Button>
      </div>

      <div className="mt-auto rounded-md border border-sidebar-border bg-sidebar-accent p-3">
        <LifeBuoy className="h-4 w-4 text-primary" />
        <p className="mt-2 text-xs font-semibold">Need help?</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Contact your technical coordinator for any assistance.
        </p>
        <Button size="sm" className="mt-3 w-full text-[11px]">
          Contact Coordinator
        </Button>
      </div>
    </aside>
  );
}
