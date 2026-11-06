"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { LocaleSwitch } from "@/features/locale/ui/locale-switch";
import { ThemeToggle } from "@/features/theme/ui/theme-toggle";
import type { Locale } from "@/shared/i18n/routing";

type HeaderProps = {
  locale: Locale;
  work: string;
  about: string;
  menu: string;
  close: string;
  toLight: string;
  toDark: string;
};

export function Header({
  locale,
  work,
  about,
  menu,
  close,
  toLight,
  toDark,
}: HeaderProps) {
  const path = usePathname();
  const home = path === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState(path);
  if (path !== openPath) {
    setOpenPath(path);
    setOpen(false);
  }
  const solid = !home || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = solid
    ? "border-line bg-bg/80 text-ink"
    : "border-white/15 bg-white/10 text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <div
        className={`mx-auto max-w-6xl border backdrop-blur-md ${open ? "rounded-3xl" : "rounded-full"} ${tone}`}
      >
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-display text-lg tracking-tight"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            leladatan
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <NavLink
              href={`/${locale}/work`}
              active={path.startsWith(`/${locale}/work`)}
            >
              {work}
            </NavLink>
            <NavLink
              href={`/${locale}/about`}
              active={path === `/${locale}/about`}
            >
              {about}
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <LocaleSwitch locale={locale} path={path} />
            <ThemeToggle toLight={toLight} toDark={toDark} />
            <button
              type="button"
              className="rounded-full px-2 py-1 text-sm md:hidden"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? close : menu}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="grid gap-1 border-t border-current/15 px-3 py-3 text-ink md:hidden">
            <Link className="rounded-2xl px-3 py-2" href={`/${locale}/work`}>
              {work}
            </Link>
            <Link className="rounded-2xl px-3 py-2" href={`/${locale}/about`}>
              {about}
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="relative py-1"
    >
      {children}
      <span
        className={`absolute inset-x-0 -bottom-0.5 h-px ${active ? "bg-current" : "bg-transparent"}`}
      />
    </Link>
  );
}
