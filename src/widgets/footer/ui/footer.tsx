import { githubUrl, telegramUrl } from "@/shared/lib/site";

export function Footer({
  note,
  github,
  telegram,
}: {
  note: string;
  github: string;
  telegram: string;
}) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:items-end">
        <div>
          <p className="font-display text-5xl tracking-tight sm:text-6xl">
            leladatan
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{note}</p>
        </div>
        <div className="grid gap-3">
          <FooterLink
            href={githubUrl}
            label={github}
            host="github.com/Leladatan"
          />
          <FooterLink
            href={telegramUrl}
            label={telegram}
            host="t.me/leladatan"
          />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  host,
}: {
  href: string;
  label: string;
  host: string;
}) {
  return (
    <a
      href={href}
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-accent"
    >
      <span className="font-display text-2xl tracking-tight">{label}</span>
      <span className="text-sm text-muted transition-transform group-hover:translate-x-1">
        {host}
      </span>
    </a>
  );
}
