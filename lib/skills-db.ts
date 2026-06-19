import { createClient as createServerClient } from "@/lib/supabase/server";
import type { SkillCategory, Skill, SkillDbRow, SkillKind } from "@/types";

function normalizeRelation<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] : value;
}

export async function getCategoriesWithSkills(
  options: { previewOnly?: boolean } = {}
): Promise<SkillCategory[]> {
  const supabase = await createServerClient();

  const query = supabase
    .from("skills")
    .select(
      `
      numero,
      rank,
      nome,
      slug,
      descricao,
      url_repositorio,
      comando_instalacao,
      comando_uso,
      mostrar_no_preview,
      ativo,
      categorias!inner(nome, cor),
      tipos_skill!inner(codigo)
    `
    )
    .eq("ativo", true)
    .order("rank", { ascending: true });

  if (options.previewOnly) {
    query.eq("mostrar_no_preview", true);
  }

  const { data, error } = await query.returns<SkillDbRow[]>();

  if (error) throw error;

  const grouped = new Map<string, SkillCategory>();

  data!.forEach((row) => {
    const categoria = normalizeRelation(row.categorias);
    const tipo = normalizeRelation(row.tipos_skill);

    if (!categoria || !tipo) return;

    const categoryName = categoria.nome;
    const categoryColor = categoria.cor;

    if (!grouped.has(categoryName)) {
      grouped.set(categoryName, {
        category: categoryName,
        color: categoryColor,
        items: [],
      });
    }

    const skill: Skill = {
      n: row.numero,
      rank: row.rank,
      name: row.nome,
      desc: row.descricao,
      url: row.url_repositorio,
      kind: tipo.codigo as SkillKind,
      install: row.comando_instalacao || undefined,
      use: row.comando_uso || undefined,
    };

    grouped.get(categoryName)!.items.push(skill);
  });

  return Array.from(grouped.values());
}

export async function getAllCategories(): Promise<
  { id: string; nome: string; slug: string; cor: string; ordem: number }[]
> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("categorias")
    .select("id, nome, slug, cor, ordem")
    .order("ordem", { ascending: true });

  if (error) throw error;
  return data || [];
}
