"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/shared/lib/gsap";

export function ScrollBand() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const travel = () => Math.max(0, (line.current?.offsetWidth ?? 0) - 6);
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
      timeline.fromTo(line.current, { scaleX: 0.12 }, { scaleX: 1 }, 0);
      timeline.fromTo(dot.current, { x: 0 }, { x: travel }, 0);
      timeline.fromTo(glow.current, { opacity: 0.2 }, { opacity: 1 }, 0);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-hidden="true"
      className="mx-auto max-w-6xl px-6 pt-8"
    >
      <div className="relative h-24 overflow-hidden rounded-3xl border border-line">
        <div
          ref={glow}
          className="absolute inset-y-0 left-0 w-2/3"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 46%, transparent), transparent 72%)",
          }}
        />
        <div className="absolute inset-x-8 top-1/2">
          <div
            ref={line}
            className="h-px origin-left bg-gradient-to-r from-accent to-accent-2"
          />
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <div
              ref={dot}
              className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
