"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/shared/theme/theme-provider";

export function ThemeToggle({
  toLight,
  toDark,
}: {
  toLight: string;
  toDark: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = !mounted || theme !== "light";

  return (
    <button
      type="button"
      aria-label={dark ? toLight : toDark}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full border border-current/20"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="2.4" fill="currentColor" />
      <path
        d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M10.2 1.6a5.8 5.8 0 1 0 4.2 9.6A6.2 6.2 0 0 1 10.2 1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
