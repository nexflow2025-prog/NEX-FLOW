interface StatsBadgesProps {
  totalSkills: number;
  totalCategories: number;
  previewSkills?: number;
  mode?: "public" | "member";
}

export function StatsBadges({
  totalSkills,
  totalCategories,
  previewSkills,
  mode = "public",
}: StatsBadgesProps) {
  const items = [
    { value: totalSkills, label: "skills verificadas" },
    { value: totalCategories, label: "objetivos" },
    mode === "public"
      ? { value: previewSkills ?? 0, label: "skills liberadas na amostra" }
      : { value: "∞", label: "acesso vitalício" },
  ];

  return (
    <div className="flex flex-wrap gap-3.5">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-[120px] flex-col gap-0.5 rounded-xl border border-border bg-gradient-to-br from-card to-[#101013] px-5 py-3.5"
        >
          <span className="font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-none text-[#e62630]">
            {item.value}
          </span>
          <small className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
            {item.label}
          </small>
        </div>
      ))}
    </div>
  );
}
