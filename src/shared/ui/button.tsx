import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  solid:
    "inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm text-bg transition-transform duration-200 hover:-translate-y-0.5",
  ghost:
    "inline-flex items-center justify-center rounded-full border border-line px-4 py-2 text-sm text-ink transition-transform duration-200 hover:-translate-y-0.5",
} as const;

type Props = {
  href?: string;
  variant?: keyof typeof styles;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "solid",
  children,
  className = "",
  type = "button",
  ...rest
}: Props) {
  const classes = `${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
