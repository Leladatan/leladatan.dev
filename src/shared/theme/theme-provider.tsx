"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

export type ThemeOrigin = { x: number; y: number };

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const next: Theme = stored === "light" ? "light" : "dark";
    setThemeState(next);
    applyTheme(next);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== "theme") return;
      const value: Theme = event.newValue === "light" ? "light" : "dark";
      setThemeState(value);
      applyTheme(value);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = (next: Theme, origin?: ThemeOrigin) => {
    const commit = () => {
      flushSync(() => setThemeState(next));
      localStorage.setItem("theme", next);
      applyTheme(next);
    };
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = document.documentElement;
    if (
      reduced ||
      !origin ||
      typeof document.startViewTransition !== "function"
    ) {
      commit();
      return;
    }

    root.style.setProperty("--theme-x", `${origin.x}px`);
    root.style.setProperty("--theme-y", `${origin.y}px`);
    root.classList.add("theme-ripple");
    const transition = document.startViewTransition(commit);
    transition.finished.finally(() => {
      root.classList.remove("theme-ripple");
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
