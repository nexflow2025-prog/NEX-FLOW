import type { Skill, SkillCategory, SkillKind } from "@/types";

export const kindLabel: Record<SkillKind, string> = {
  skill: "skill",
  plugin: "plugin",
  mcp: "MCP",
  agent: "agente",
  tool: "ferramenta",
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function installCommand(skill: Skill): string {
  if (skill.install?.trim()) return skill.install.trim();
  if (skill.url) return `npx skills add https://${skill.url}`;
  return "";
}

export function useCommand(skill: Skill): string {
  const slug = slugify(skill.name);
  if (skill.kind === "skill" || skill.kind === "plugin") return `/${slug}`;
  if (skill.use?.trim()) return skill.use.trim();
  if (skill.kind === "agent") return `use o agente ${skill.name}`;
  return `use o ${skill.name}`;
}

export function repoUrl(skill: Skill): string {
  return `https://${skill.url}`;
}

export function allInstallCommands(categories: SkillCategory[]): string[] {
  const commands = new Set<string>();
  categories.forEach((category) =>
    category.items.forEach((item) => {
      const cmd = installCommand(item);
      if (cmd) commands.add(cmd);
    })
  );
  return Array.from(commands);
}

export function searchSkills(
  categories: SkillCategory[],
  query: string
): SkillCategory[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        const text = `${item.name} ${item.desc} ${kindLabel[item.kind]}`.toLowerCase();
        return terms.every((term) => text.includes(term));
      }),
    }))
    .filter((category) => category.items.length > 0);
}

export function filterByCategory(
  categories: SkillCategory[],
  categoryName: string
): SkillCategory[] {
  if (categoryName === "all") return categories;
  return categories.filter((category) => category.category === categoryName);
}

export function countSkills(categories: SkillCategory[]): number {
  return categories.reduce((sum, category) => sum + category.items.length, 0);
}
