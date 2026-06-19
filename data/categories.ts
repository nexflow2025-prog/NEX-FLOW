import type { SkillCategory } from "@/types";

import skillsFull from "./skills-full.json";
import skillsSample from "./skills-sample.json";

export const categoriesFull: SkillCategory[] = skillsFull as SkillCategory[];
export const categoriesSample: SkillCategory[] = skillsSample as SkillCategory[];

export const categoryColors: Record<string, string> = {
  "Escrever código melhor": "#d13b42",
  "Automatizar tarefas": "#ff8a4c",
  "Conectar ferramentas (MCP)": "#22d3ee",
  "Design e Frontend": "#a78bfa",
  Segurança: "#34d399",
  "Conteúdo, dados e mídia": "#fbbf24",
};
