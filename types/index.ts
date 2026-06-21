export type SkillKind = "skill" | "plugin" | "mcp" | "agent" | "tool";

export interface Skill {
  n: number;
  rank: number;
  name: string;
  desc: string;
  url: string;
  kind: SkillKind;
  install?: string;
  use?: string;
}

export interface SkillCategory {
  category: string;
  color: string;
  items: Skill[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  checkoutUrl: string;
  whatsappUrl: string;
  price: number;
  oldPrice: number;
  guaranteeDays: number;
}

// Tipos usados nas queries do Supabase
export interface AdminSkill {
  id: string;
  numero: number;
  rank: number;
  nome: string;
  slug: string;
  descricao: string;
  url_repositorio: string;
  comando_instalacao: string | null;
  comando_uso: string | null;
  mostrar_no_preview: boolean;
  ativo: boolean;
  categoria_id: string;
  tipo_id: string;
  categorias: { id: string; nome: string; cor: string; ordem: number } | null;
  tipos_skill: { codigo: string } | null;
}

export interface SkillDbRow {
  numero: number;
  rank: number;
  nome: string;
  slug: string;
  descricao: string;
  url_repositorio: string;
  comando_instalacao: string | null;
  comando_uso: string | null;
  mostrar_no_preview: boolean;
  ativo: boolean;
  categorias: { nome: string; cor: string };
  tipos_skill: { codigo: string };
}

export interface CategoryOption {
  id: string;
  nome: string;
  slug: string;
  cor: string;
  ordem: number;
}

export interface TypeOption {
  id: string;
  codigo: string;
}
