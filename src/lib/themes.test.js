import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { renderErrorPage } from "./error-page.js";
import { THEMES, THEME_OPTIONS, THEME_INIT_SCRIPT, applyTheme, normalizeTheme } from "./themes.js";

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => {
      const value = parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort(
    (firstValue, secondValue) => secondValue - firstValue,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function mockRoot() {
  const classes = new Set(["unrelated", "theme-ocean"]);
  return {
    dataset: {},
    style: {
      setProperty(token, color) {
        this[token] = color;
      },
    },
    classList: {
      [Symbol.iterator]: () => classes.values(),
      add: (value) => classes.add(value),
      remove: (value) => classes.delete(value),
      contains: (value) => classes.has(value),
      toggle(value, enabled) {
        if (enabled) classes.add(value);
        else classes.delete(value);
      },
    },
  };
}

test("standalone server failure page shares bootstrap and semantic colors", () => {
  const html = renderErrorPage();
  assert.ok(html.includes(`<script>${THEME_INIT_SCRIPT}</script>`));
  for (const [token, color] of Object.entries(THEMES[0].colors)) {
    assert.ok(html.includes(`--${token}: ${color};`));
  }
  assert.ok(html.includes("background: var(--background)"));
  assert.ok(html.includes("color: var(--primary-foreground)"));
});

test("six complete themes and system option have unique IDs and identical tokens", () => {
  for (const id of ["light", "dark", "corporate-blue", "modern-gray", "midnight", "azure"]) {
    assert.ok(THEMES.some((theme) => theme.id === id));
  }
  assert.equal(new Set(THEME_OPTIONS.map((theme) => theme.id)).size, THEMES.length + 1);
  for (const theme of THEMES) {
    assert.deepEqual(Object.keys(theme.colors), Object.keys(THEMES[0].colors));
    for (const color of Object.values(theme.colors)) assert.match(color, /^#[0-9a-f]{6}$/i);
  }
});

test("all text, button, status and navigation pairings meet WCAG AA contrast", () => {
  for (const { id, colors } of THEMES) {
    const pairs = [
      ["foreground", "background"],
      ["card-foreground", "card"],
      ["surface-foreground", "surface"],
      ["popover-foreground", "popover"],
      ["nav-foreground", "nav"],
      ["sidebar-foreground", "sidebar"],
      ["primary-foreground", "primary"],
      ["secondary-foreground", "secondary"],
      ["accent-foreground", "accent"],
      ["sidebar-accent-foreground", "sidebar-accent"],
      ["sidebar-primary-foreground", "sidebar-primary"],
    ];
    for (const background of ["background", "card", "surface", "nav", "sidebar", "hover"]) {
      for (const text of [
        "muted-foreground",
        "link",
        "primary",
        "success",
        "warning",
        "destructive",
      ])
        pairs.push([text, background]);
    }
    for (const status of ["success", "warning", "destructive", "brand"])
      pairs.push([`${status}-foreground`, status]);
    for (const [text, background] of pairs) {
      assert.ok(
        contrast(colors[text], colors[background]) >= 4.5,
        `${id}: ${text} on ${background}`,
      );
    }
    for (const background of ["background", "card", "surface"]) {
      assert.ok(
        contrast(colors.input, colors[background]) >= 3,
        `${id}: input border on ${background}`,
      );
      assert.ok(
        contrast(colors.ring, colors[background]) >= 3,
        `${id}: focus ring on ${background}`,
      );
    }
  }
});

test("theme application replaces legacy classes, sets all tokens and toggles dark mode", () => {
  const root = mockRoot();
  for (const theme of THEMES) {
    applyTheme(theme.id, THEMES, root, false);
    assert.equal(root.dataset.theme, theme.id);
    assert.equal(root.style.colorScheme, theme.mode);
    assert.equal(root.classList.contains("dark"), theme.mode === "dark");
    assert.equal(root.classList.contains("theme-ocean"), false);
    assert.equal(root.classList.contains("unrelated"), true);
    for (const [token, color] of Object.entries(theme.colors))
      assert.equal(root.style[`--${token}`], color);
  }
  applyTheme("system", THEMES, root, true);
  assert.equal(root.dataset.theme, "dark");
  applyTheme("system", THEMES, root, false);
  assert.equal(root.dataset.theme, "light");
});

test("pre-paint initialization handles saved, legacy, unknown and unavailable storage", () => {
  for (const [saved, expected] of [
    ["midnight", "midnight"],
    ["ocean", "azure"],
    ["amber", "modern-gray"],
    ["unknown", "dark"],
    [null, "dark"],
  ]) {
    const root = mockRoot();
    runInNewContext(THEME_INIT_SCRIPT, {
      document: { documentElement: root },
      localStorage: { getItem: () => saved },
      matchMedia: () => ({ matches: true }),
    });
    assert.equal(root.dataset.theme, expected);
  }
  const root = mockRoot();
  runInNewContext(THEME_INIT_SCRIPT, {
    document: { documentElement: root },
    localStorage: {
      getItem() {
        throw new Error("Blocked");
      },
    },
    matchMedia: () => ({ matches: false }),
  });
  assert.equal(root.dataset.theme, "light");
  assert.equal(normalizeTheme("invalid"), "system");
  assert.equal(normalizeTheme("ocean"), "azure");
});
