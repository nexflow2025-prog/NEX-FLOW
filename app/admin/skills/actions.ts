"use server";

import { revalidatePath } from "next/cache";

import { checkAdmin } from "@/lib/admin";
import { slugify } from "@/lib/skills";

function revalidateSkillPaths() {
  revalidatePath("/admin/skills");
  revalidatePath("/membros");
  revalidatePath("/explorer");
}

export async function createSkill(formData: FormData) {
  const supabase = await checkAdmin();

  const nome = formData.get("nome") as string;
  const descricao = formData.get("descricao") as string;
  const urlRepositorio = formData.get("url_repositorio") as string;
  const categoriaId = formData.get("categoria_id") as string;
  const tipoId = formData.get("tipo_id") as string;
  const comandoInstalacao = (formData.get("comando_instalacao") as string) || null;
  const comandoUso = (formData.get("comando_uso") as string) || null;
  const mostrarNoPreview = formData.get("mostrar_no_preview") === "on";

  if (!nome || !descricao || !urlRepositorio || !categoriaId || !tipoId) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  // Busca o próximo número sequencial
  const { data: lastSkill } = await supabase
    .from("skills")
    .select("numero")
    .order("numero", { ascending: false })
    .limit(1)
    .single();

  const numero = (lastSkill?.numero ?? 0) + 1;

  // Busca o próximo rank dentro da categoria
  const { data: lastRank } = await supabase
    .from("skills")
    .select("rank")
    .eq("categoria_id", categoriaId)
    .order("rank", { ascending: false })
    .limit(1)
    .single();

  const rank = (lastRank?.rank ?? 0) + 1;

  const { error } = await supabase.from("skills").insert({
    numero,
    rank,
    nome,
    slug: slugify(nome),
    descricao,
    url_repositorio: urlRepositorio,
    comando_instalacao: comandoInstalacao,
    comando_uso: comandoUso,
    mostrar_no_preview: mostrarNoPreview,
    ativo: true,
    categoria_id: categoriaId,
    tipo_id: tipoId,
  });

  if (error) throw error;

  revalidateSkillPaths();
}

export async function updateSkill(id: string, formData: FormData) {
  const supabase = await checkAdmin();

  const numeroRaw = formData.get("numero") as string;
  const rankRaw = formData.get("rank") as string;
  const nome = formData.get("nome") as string;
  const slug = formData.get("slug") as string;
  const descricao = formData.get("descricao") as string;
  const urlRepositorio = formData.get("url_repositorio") as string;
  const categoriaId = formData.get("categoria_id") as string;
  const tipoId = formData.get("tipo_id") as string;
  const comandoInstalacao = (formData.get("comando_instalacao") as string) || null;
  const comandoUso = (formData.get("comando_uso") as string) || null;
  const mostrarNoPreview = formData.get("mostrar_no_preview") === "on";
  const ativo = formData.get("ativo") === "on";

  if (!id) {
    throw new Error("ID da skill é obrigatório.");
  }

  if (!nome || !descricao || !urlRepositorio || !categoriaId || !tipoId) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  const numero = Number(numeroRaw);
  const rank = Number(rankRaw);

  if (Number.isNaN(numero) || Number.isNaN(rank)) {
    throw new Error("Número e rank devem ser valores numéricos.");
  }

  const { error } = await supabase
    .from("skills")
    .update({
      numero,
      rank,
      nome,
      slug: slug || slugify(nome),
      descricao,
      url_repositorio: urlRepositorio,
      comando_instalacao: comandoInstalacao,
      comando_uso: comandoUso,
      mostrar_no_preview: mostrarNoPreview,
      ativo,
      categoria_id: categoriaId,
      tipo_id: tipoId,
      atualizado_em: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;

  revalidateSkillPaths();
}

export async function deleteSkill(id: string) {
  const supabase = await checkAdmin();

  if (!id) {
    throw new Error("ID da skill é obrigatório.");
  }

  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) throw error;

  revalidateSkillPaths();
}

export async function toggleSkillActive(id: string, ativo: boolean) {
  const supabase = await checkAdmin();

  const { error } = await supabase
    .from("skills")
    .update({ ativo, atualizado_em: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  revalidateSkillPaths();
}
