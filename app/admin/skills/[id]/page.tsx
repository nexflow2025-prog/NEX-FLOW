import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/layout/AppShell";
import { requireAdmin } from "@/lib/admin";
import type { AdminSkill, CategoryOption, TypeOption } from "@/types";
import { updateSkill } from "../actions";

export const metadata: Metadata = {
  title: "NexSkills — Admin · Editar Skill",
  robots: "noindex, nofollow",
};

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { id } = await params;

  const [{ data: skill }, { data: categorias }, { data: tipos }] = await Promise.all([
    supabase
      .from("skills")
      .select(
        "id, numero, rank, nome, slug, descricao, url_repositorio, comando_instalacao, comando_uso, mostrar_no_preview, ativo, categoria_id, tipo_id, categorias(nome), tipos_skill(codigo)"
      )
      .eq("id", id)
      .single<AdminSkill>(),
    supabase.from("categorias").select("id, nome").order("ordem").returns<CategoryOption[]>(),
    supabase.from("tipos_skill").select("id, codigo").order("ordem").returns<TypeOption[]>(),
  ]);

  if (!skill) {
    notFound();
  }

  const updateSkillWithId = updateSkill.bind(null, skill.id);

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
        <Link
          href="/admin/skills"
          className="text-sm text-muted-foreground hover:text-[#ff6b73]"
        >
          ← Voltar para skills
        </Link>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-tight text-foreground">
          Editar Skill
        </h1>
        <p className="mt-2 text-muted-foreground">{skill.nome}</p>
      </div>

      <form
        action={updateSkillWithId}
        className="space-y-6 rounded-2xl border border-border bg-card p-6"
      >
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            Nome
          </label>
          <Input
            name="nome"
            required
            defaultValue={skill.nome}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            Slug
          </label>
          <Input
            name="slug"
            required
            defaultValue={skill.slug}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            Descrição
          </label>
          <textarea
            name="descricao"
            required
            rows={3}
            defaultValue={skill.descricao}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#e62630]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            URL do repositório (sem https://)
          </label>
          <Input
            name="url_repositorio"
            required
            defaultValue={skill.url_repositorio}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">
              Categoria
            </label>
            <select
              name="categoria_id"
              required
              defaultValue={skill.categoria_id}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#e62630]"
            >
              {categorias?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">
              Tipo
            </label>
            <select
              name="tipo_id"
              required
              defaultValue={skill.tipo_id}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#e62630]"
            >
              {tipos?.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.codigo}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            Comando de instalação (opcional)
          </label>
          <Input
            name="comando_instalacao"
            defaultValue={skill.comando_instalacao ?? ""}
            placeholder="npx skills add https://github.com/usuario/repo"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            Comando de uso (opcional)
          </label>
          <Input
            name="comando_uso"
            defaultValue={skill.comando_uso ?? ""}
            placeholder="/superpowers"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="mostrar_no_preview"
              id="mostrar_no_preview"
              defaultChecked={skill.mostrar_no_preview}
              className="size-4 rounded border-border"
            />
            <label htmlFor="mostrar_no_preview" className="text-sm text-muted-foreground">
              Mostrar no preview público
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ativo"
              id="ativo"
              defaultChecked={skill.ativo}
              className="size-4 rounded border-border"
            />
            <label htmlFor="ativo" className="text-sm text-muted-foreground">
              Ativo
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
          >
            Salvar
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/skills">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  </AppShell>
  );
}
