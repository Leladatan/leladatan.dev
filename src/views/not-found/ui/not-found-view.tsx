import Link from "next/link";

export function NotFoundView({
  title,
  body,
  home,
  href,
}: {
  title: string;
  body: string;
  home: string;
  href: string;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 pt-24">
      <p className="font-display text-7xl text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl">{title}</h1>
      <p className="mt-4 text-muted">{body}</p>
      <Link href={href} className="mt-8 text-sm text-accent">
        {home}
      </Link>
    </main>
  );
}
