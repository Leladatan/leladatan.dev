"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/shared/i18n/routing";
import { StackPlate } from "./stack-plate";

type CardProps = {
  href: string;
  index: string;
  title: string;
  summary: string;
  stack: readonly string[];
  locale: Locale;
};

export function WorkCard({
  href,
  index,
  title,
  summary,
  stack,
  locale,
}: CardProps) {
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setCanTilt(fine && !reduced);
  }, []);

  return (
    <Link
      href={href}
      hrefLang={locale}
      data-work-card
      onPointerMove={(event) => {
        if (!canTilt) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        event.currentTarget.style.transform = `rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = "";
      }}
      className="group flex h-full flex-col rounded-3xl border border-line bg-bg/70 p-6 transition-colors will-change-transform [transform-style:preserve-3d] hover:border-accent/50"
    >
      <span className="font-display text-sm text-accent">{index}</span>
      <h3 className="mt-6 font-display text-3xl leading-none">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-6 text-muted">{summary}</p>
      <StackPlate stack={stack} className="mt-8 grid-cols-2" fillOdd dense />
    </Link>
  );
}
