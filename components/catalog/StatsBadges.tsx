import { siteConfig } from "@/data/site";

interface StatsBadgesProps {
  totalSkills?: number;
  totalCategories?: number;
  mode?: "public" | "member";
}

export function StatsBadges({
  totalSkills,
  totalCategories,
  mode = "public",
}: StatsBadgesProps) {
  const items = [
    { value: totalSkills ?? siteConfig.totalSkills, label: "skills verificadas" },
    { value: totalCategories ?? 6, label: "objetivos" },
    mode === "public"
      ? { value: "100%", label: "com link real" }
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
