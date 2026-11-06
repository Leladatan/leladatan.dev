"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/shared/lib/gsap";
import { SpaceCanvas } from "./space-canvas";

export function Hero({
  role,
  scrollLabel,
}: {
  role: string;
  scrollLabel: string;
}) {
  const section = useRef<HTMLElement>(null);
  const scroll = useRef(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          scroll.current = self.progress;
        },
      });
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className="relative h-[100svh] overflow-hidden bg-[#07060b] text-white"
    >
      <SpaceCanvas scroll={scroll} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07060b] via-transparent to-[#07060b]/40" />
      <span className="shooting-star shooting-star-a" />
      <span className="shooting-star shooting-star-b" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20">
        <p className="text-xs tracking-[0.28em] text-white/60 uppercase">
          {role}
        </p>
        <h1 className="mt-4 max-w-[12ch] bg-gradient-to-br from-white via-white to-[#c4b5fd] bg-clip-text font-display text-[clamp(3.6rem,13vw,9rem)] leading-[0.86] tracking-tight text-transparent">
          leladatan
        </h1>
        <p className="mt-10 flex items-center gap-3 text-sm text-white/55">
          <span className="motion-line block h-px w-14 origin-left bg-white/70" />
          {scrollLabel}
        </p>
      </div>
    </section>
  );
}
