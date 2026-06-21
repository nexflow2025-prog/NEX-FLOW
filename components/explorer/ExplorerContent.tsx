"use client";

import { ClientCatalog } from "@/components/catalog/ClientCatalog";
import type { SkillCategory } from "@/types";

interface ExplorerContentProps {
  categories: SkillCategory[];
  mode?: "public" | "member";
  totalSkills: number;
  previewSkills: number;
  remainingSkills: number;
}

export function ExplorerContent({
  categories,
  mode = "public",
  totalSkills,
  previewSkills,
  remainingSkills,
}: ExplorerContentProps) {
  return (
    <ClientCatalog
      categories={categories}
      mode={mode}
      totalSkills={totalSkills}
      previewSkills={previewSkills}
      remainingSkills={remainingSkills}
    />
  );
}
