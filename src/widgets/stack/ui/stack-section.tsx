export function StackSection({
  kicker,
  siteLabel,
  jobLabel,
  repoLabel,
  site,
  job,
  repo,
}: {
  kicker: string;
  siteLabel: string;
  jobLabel: string;
  repoLabel: string;
  site: readonly string[];
  job: readonly string[];
  repo: readonly string[];
}) {
  const groups = [
    [siteLabel, site],
    [jobLabel, job],
    [repoLabel, repo],
  ] as const;

  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[12rem_1fr]">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">
          {kicker}
        </p>
        <div className="grid gap-8">
          {groups.map(([label, items]) => (
            <div key={label}>
              <h2 className="text-sm text-muted">{label}</h2>
              <p className="mt-2 text-lg leading-8">{items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
