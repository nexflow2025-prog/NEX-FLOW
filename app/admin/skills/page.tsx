import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ExplorerContent } from "@/components/explorer/ExplorerContent";
import { GuiaContent } from "@/components/guia/GuiaContent";
import { AdminSkillsGrid } from "@/components/admin/AdminSkillsGrid";
import { MembrosContent } from "@/components/membros/MembrosContent";
import { requireAdmin } from "@/lib/admin";
import { getCategoriesWithSkills } from "@/lib/skills-db";
import type { AdminSkill, CategoryOption, TypeOption } from "@/types";

export const metadata: Metadata = {
  title: "NexSkills — Admin · Skills",
  robots: "noindex, nofollow",
};

export default async function AdminSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { preview } = await searchParams;

  if (preview === "membros") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <MembrosContent adminPreview />
      </div>
    );
  }

  if (preview === "explorer") {
    const categories = await getCategoriesWithSkills();

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ExplorerContent categories={categories} />
      </div>
    );
  }

  if (preview === "guia") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <GuiaContent adminPreview />
      </div>
    );
  }

  const [{ data: skills }, { data: categorias }, { data: tipos }] = await Promise.all([
    supabase
      .from("skills")
      .select(
        "id, numero, rank, nome, slug, descricao, url_repositorio, comando_instalacao, comando_uso, mostrar_no_preview, ativo, categoria_id, tipo_id, categorias(id, nome, cor, ordem, slug), tipos_skill(id, codigo)"
      )
      .order("numero", { ascending: true })
      .returns<AdminSkill[]>(),
    supabase
      .from("categorias")
      .select("id, nome, slug, cor, ordem")
      .order("ordem")
      .returns<CategoryOption[]>(),
    supabase.from("tipos_skill").select("id, codigo").order("ordem").returns<TypeOption[]>(),
  ]);

  return (
    <div className="mx-auto w-[88vw] max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-tight text-foreground">
          Gerenciar Skills
        </h1>
        <Button
          asChild
          className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
        >
          <Link href="/admin/skills/novo">+ Nova Skill</Link>
        </Button>
      </div>

      <AdminSkillsGrid
        skills={skills ?? []}
        categorias={categorias ?? []}
        tipos={tipos ?? []}
      />
    </div>
  );
}
