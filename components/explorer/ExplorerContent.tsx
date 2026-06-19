"use client";

import { ClientCatalog } from "@/components/catalog/ClientCatalog";
import type { SkillCategory } from "@/types";

interface ExplorerContentProps {
  categories: SkillCategory[];
}

export function ExplorerContent({ categories }: ExplorerContentProps) {
  return <ClientCatalog categories={categories} mode="member" />;
}
