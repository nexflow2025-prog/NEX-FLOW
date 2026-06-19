"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SkillCard } from "./SkillCard";
import type { SkillCategory } from "@/types";

const TOP_N = 10;

interface CategoryTrackProps {
  category: SkillCategory;
  forceShowAll?: boolean;
  onCopy: (text: string, label: string) => void;
}

export function CategoryTrack({
  category,
  forceShowAll = false,
  onCopy,
}: CategoryTrackProps) {
  const [expanded, setExpanded] = useState(false);
  const showAll = forceShowAll || expanded;
  const visible = showAll ? category.items : category.items.slice(0, TOP_N);
  const hasMore = category.items.length > TOP_N;

  return (
    <section className="mb-12">
      <div
        className="mb-5 flex items-baseline justify-between gap-4 rounded-xl border border-border px-4 py-3.5 sm:px-5"
        style={{
          background: `linear-gradient(100deg, ${category.color}22, transparent 72%)`,
        }}
      >
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {category.category}
        </h3>
        <span className="font-[family-name:var(--font-mono)] text-xs text-[#ff6b73]">
          {category.items.length} skills
          {!showAll && hasMore ? ` · top ${Math.min(TOP_N, category.items.length)}` : ""}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <SkillCard
            key={item.n}
            skill={item}
            color={category.color}
            onCopy={onCopy}
          />
        ))}
      </div>

      {!showAll && hasMore && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(true)}
          className="mt-4 rounded-full border-border font-[family-name:var(--font-mono)] text-xs text-muted-foreground hover:border-[#e62630] hover:text-foreground"
        >
          + ver todas as {category.items.length}
        </Button>
      )}
    </section>
  );
}
