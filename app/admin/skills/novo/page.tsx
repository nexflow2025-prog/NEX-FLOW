import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/layout/AppShell";
import { requireAdmin } from "@/lib/admin";
import type { CategoryOption, TypeOption } from "@/types";
import { createSkill } from "../actions";

export const metadata: Metadata = {
  title: "NexSkills — Admin · Nova Skill",
  robots: "noindex, nofollow",
};

export default async function NewSkillPage() {
  const { supabase } = await requireAdmin();

  const [{ data: categorias }, { data: tipos }] = await Promise.all([
    supabase.from("categorias").select("id, nome").order("ordem").returns<CategoryOption[]>(),
    supabase.from("tipos_skill").select("id, codigo").order("ordem").returns<TypeOption[]>(),
  ]);

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
          Nova Skill
        </h1>
      </div>

      <form
        action={createSkill}
        className="space-y-6 rounded-2xl border border-border bg-card p-6"
      >
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            Nome
          </label>
          <Input
            name="nome"
            required
            placeholder="Ex: Superpowers"
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
            placeholder="O que essa skill faz?"
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
            placeholder="github.com/usuario/repo"
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
            placeholder="npx skills add https://github.com/usuario/repo"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-muted-foreground">
            Comando de uso (opcional)
          </label>
          <Input
            name="comando_uso"
            placeholder="/superpowers"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="mostrar_no_preview"
            id="mostrar_no_preview"
            className="size-4 rounded border-border"
          />
          <label htmlFor="mostrar_no_preview" className="text-sm text-muted-foreground">
            Mostrar no preview público
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
          >
            Salvar Skill
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
