import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
const THEMES = [
  { id: "dark", name: "Midnight Navy" },
  { id: "light", name: "Daylight" },
  { id: "ocean", name: "Deep Ocean" },
  { id: "amber", name: "Amber Ops" }
];
function apply(id) {
  const root = document.documentElement;
  THEMES.forEach((t) => root.classList.remove(`theme-${t.id}`));
  root.classList.add(`theme-${id}`);
  try {
    localStorage.setItem("lmc-theme", id);
  } catch {
  }
}
function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem("lmc-theme");
    } catch {
    }
    const id = THEMES.find((t) => t.id === saved)?.id ?? "dark";
    setTheme(id);
    apply(id);
  }, []);
  const pick = (id) => {
    setTheme(id);
    apply(id);
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(Button, { "aria-label": "Change theme", variant: "ghost", size: "icon", className: "text-muted-foreground", onClick: () => setOpen(!open), children: /* @__PURE__ */ jsx(Palette, { className: "h-4 w-4" }) }),
    open && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-11 z-50 w-44 rounded-md border border-border bg-popover p-1 shadow-lg", children: THEMES.map((t) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => pick(t.id),
        className: `flex w-full items-center justify-between rounded px-2 py-2 text-left text-xs hover:bg-surface ${theme === t.id ? "text-primary" : "text-popover-foreground"}`,
        children: [
          t.name,
          theme === t.id && /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" })
        ]
      },
      t.id
    )) })
  ] });
}
export {
  THEMES,
  ThemeSwitcher
};
