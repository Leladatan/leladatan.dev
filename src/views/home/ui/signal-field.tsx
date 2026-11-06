"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Locale } from "@/shared/i18n/routing";
import { gsap, useGSAP } from "@/shared/lib/gsap";

type Item = { slug: string; title: string };

export function SignalField({
  locale,
  hint,
  items,
}: {
  locale: Locale;
  hint: string;
  items: Item[];
}) {
  const field = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const ripple = useRef<HTMLDivElement>(null);
  const links = useRef<Array<HTMLAnchorElement | null>>([]);
  const reduced = useRef(false);

  useGSAP(
    () => {
      reduced.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const node = field.current;
      const glowNode = glow.current;
      const rippleNode = ripple.current;
      if (!node || !glowNode || !rippleNode || reduced.current) return;

      gsap.set([glowNode, rippleNode], { xPercent: -50, yPercent: -50 });
      gsap.set(glowNode, {
        x: node.clientWidth / 2,
        y: node.clientHeight / 2,
      });

      const xTo = gsap.quickTo(glowNode, "x", {
        duration: 0.55,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(glowNode, "y", {
        duration: 0.55,
        ease: "power3.out",
      });

      const move = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        xTo(x);
        yTo(y);

        let nearest = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;
        links.current.forEach((link, index) => {
          if (!link) return;
          const box = link.getBoundingClientRect();
          const dx = box.left + box.width / 2 - event.clientX;
          const dy = box.top + box.height / 2 - event.clientY;
          const distance = dx * dx + dy * dy;
          if (distance < nearestDistance) {
            nearest = index;
            nearestDistance = distance;
          }
        });
        links.current.forEach((link, index) => {
          link?.toggleAttribute("data-near", index === nearest);
        });
      };

      const leave = () => {
        for (const link of links.current) link?.removeAttribute("data-near");
      };

      node.addEventListener("pointermove", move);
      node.addEventListener("pointerleave", leave);
      return () => {
        node.removeEventListener("pointermove", move);
        node.removeEventListener("pointerleave", leave);
      };
    },
    { scope: field },
  );

  return (
    <section className="mx-auto max-w-6xl px-6 pt-8">
      <div
        ref={field}
        onPointerDown={(event) => {
          const node = field.current;
          const rippleNode = ripple.current;
          if (!node || !rippleNode || reduced.current) return;
          const rect = node.getBoundingClientRect();
          gsap.killTweensOf(rippleNode);
          gsap.fromTo(
            rippleNode,
            {
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
              scale: 0,
              opacity: 0.7,
            },
            { scale: 16, opacity: 0, duration: 0.72, ease: "power2.out" },
          );
        }}
        className="relative h-72 overflow-hidden rounded-3xl border border-line md:h-80"
      >
        <div
          ref={glow}
          className="pointer-events-none absolute top-0 left-0 size-56 rounded-full bg-accent/30 blur-3xl"
        />
        <div
          ref={ripple}
          className="pointer-events-none absolute top-0 left-0 size-20 rounded-full border border-accent opacity-0"
        />
        <p className="pointer-events-none absolute top-5 left-6 text-xs tracking-[0.18em] text-muted uppercase">
          {hint}
        </p>
        <div className="grid h-full grid-cols-2 content-center gap-x-6 gap-y-8 px-6 pt-10 md:px-10">
          {items.map((item, index) => (
            <Link
              key={item.slug}
              ref={(node) => {
                links.current[index] = node;
              }}
              href={`/${locale}/work/${item.slug}`}
              hrefLang={locale}
              className="relative z-10 max-w-xs font-display text-2xl leading-none text-muted transition-colors data-[near]:text-ink md:text-3xl"
            >
              <span className="mb-2 block text-xs tracking-[0.16em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
