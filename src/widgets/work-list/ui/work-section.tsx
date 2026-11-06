"use client";

import { useRef } from "react";
import { WorkCard } from "@/entities/work/ui/work-card";
import type { Locale } from "@/shared/i18n/routing";
import { gsap, useGSAP } from "@/shared/lib/gsap";

type Item = {
  slug: string;
  title: string;
  summary: string;
  stack: readonly string[];
};

export function WorkSection({
  locale,
  kicker,
  title,
  items,
}: {
  locale: Locale;
  kicker: string;
  title: string;
  items: Item[];
}) {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-work-card]", {
        y: 56,
        autoAlpha: 0,
        immediateRender: false,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
        },
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs tracking-[0.22em] text-accent uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 max-w-xl font-display text-4xl leading-none md:text-6xl">
        {title}
      </h2>
      <div className="mt-12 grid gap-5 [perspective:1200px] md:grid-cols-2">
        {items.map((item, index) => (
          <WorkCard
            key={item.slug}
            locale={locale}
            href={`/${locale}/work/${item.slug}`}
            index={String(index + 1).padStart(2, "0")}
            title={item.title}
            summary={item.summary}
            stack={item.stack}
          />
        ))}
      </div>
    </section>
  );
}
