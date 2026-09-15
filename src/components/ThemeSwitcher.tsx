import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export const THEMES = [
  { id: "dark", name: "Midnight Navy" },
  { id: "light", name: "Daylight" },
  { id: "ocean", name: "Deep Ocean" },
  { id: "amber", name: "Amber Ops" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

function apply(id: ThemeId) {
  const root = document.documentElement;
  THEMES.forEach(t => root.classList.remove(`theme-${t.id}`));
  root.classList.add(`theme-${id}`);
  try { localStorage.setItem("lmc-theme", id); } catch { /* ignore */ }
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("dark");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("lmc-theme"); } catch { /* ignore */ }
    const id = (THEMES.find(t => t.id === saved)?.id ?? "dark") as ThemeId;
    setTheme(id);
    apply(id);
  }, []);

  const pick = (id: ThemeId) => { setTheme(id); apply(id); setOpen(false); };

  return (
    <div className="relative">
      <Button aria-label="Change theme" variant="ghost" size="icon" className="text-muted-foreground" onClick={() => setOpen(!open)}>
        <Palette className="h-4 w-4" />
      </Button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-44 rounded-md border border-border bg-popover p-1 shadow-lg">
          {THEMES.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => pick(t.id)}
              className={`flex w-full items-center justify-between rounded px-2 py-2 text-left text-xs hover:bg-surface ${theme === t.id ? "text-primary" : "text-popover-foreground"}`}
            >
              {t.name}
              {theme === t.id && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
