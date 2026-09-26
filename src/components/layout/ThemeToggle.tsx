"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { site } from "@/content/site";

/**
 * The theme lives on <html data-theme>, written before first paint by the inline
 * script in the layout. This subscribes to that attribute rather than holding its
 * own copy, so there is nothing to keep in sync.
 */
function useTheme() {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => observer.disconnect();
    },
    () => document.documentElement.dataset.theme ?? "light",
    () => "light",
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("boma-theme", next);
    } catch {
      // Private mode: the choice simply does not persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? site.nav.themeLight : site.nav.themeDark}
      className={className}
    >
      {dark ? <Sun size={18} weight="fill" aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
