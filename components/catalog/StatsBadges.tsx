interface StatsBadgesProps {
  totalSkills: number;
  totalCategories: number;
  previewSkills?: number;
  remainingSkills?: number;
  mode?: "public" | "member";
}

export function StatsBadges({
  totalSkills,
  totalCategories,
  previewSkills = 18,
  remainingSkills,
  mode = "public",
}: StatsBadgesProps) {
  const premiumSkills =
    typeof remainingSkills === "number"
      ? remainingSkills
      : Math.max(totalSkills - previewSkills, 0);

  const items =
    mode === "public"
      ? [
          { value: totalSkills, label: "skills verificadas" },
          { value: totalCategories, label: "objetivos" },
          { value: previewSkills, label: "skills liberadas na amostra" },
          { value: `+${premiumSkills}`, label: "skills premium" },
        ]
      : [
          { value: totalSkills, label: "skills verificadas" },
          { value: totalCategories, label: "objetivos" },
          { value: previewSkills, label: "skills liberadas na amostra" },
          { value: "∞", label: "acesso vitalício" },
        ];

  return (
    <div className="flex w-full flex-nowrap gap-3.5 overflow-x-auto sm:w-auto sm:overflow-visible">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-[120px] shrink-0 flex-col gap-0.5 rounded-xl border border-border bg-gradient-to-br from-card to-[#101013] px-5 py-3.5"
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
