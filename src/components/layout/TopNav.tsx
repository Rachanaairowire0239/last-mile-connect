import { Bell, Command, Search } from "lucide-react";
import { Fragment } from "react";

export function TopNav({ crumbs }: { crumbs: string[] }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-nav px-4 text-nav-foreground md:px-6">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
          LM
        </div>
        <span className="text-sm font-semibold tracking-tight">Last Mile</span>
      </div>

      <nav aria-label="Breadcrumb" className="ml-4 hidden items-center gap-2 text-xs lg:flex">
        {crumbs.map((c, i) => (
          <Fragment key={c}>
            {i > 0 && <span className="text-muted-foreground">›</span>}
            <span
              className={
                i === crumbs.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"
              }
            >
              {c}
            </span>
          </Fragment>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search services, products, engineers..."
            aria-label="Search"
            className="h-9 w-56 rounded-md border border-border bg-background/60 pl-9 pr-12 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-ring lg:w-80"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            <Command className="h-3 w-3" />K
          </span>
        </div>

        <span className="hidden items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-[11px] font-medium text-success sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          All Systems Operational
        </span>

        <button
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <div className="flex items-center gap-2 pl-1">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold leading-tight">User</p>
            <p className="text-[10px] leading-tight text-muted-foreground">Airtel Business</p>
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-surface text-xs font-semibold">
            AB
          </div>
        </div>
      </div>
    </header>
  );
}
