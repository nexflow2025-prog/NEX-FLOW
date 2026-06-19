"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateSkill } from "@/app/admin/skills/actions";
import type { AdminSkill, CategoryOption, TypeOption } from "@/types";

interface SkillEditModalProps {
  skill: AdminSkill;
  categorias: CategoryOption[];
  tipos: TypeOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (skill: AdminSkill) => void;
}

export function SkillEditModal({
  skill,
  categorias,
  tipos,
  open,
  onOpenChange,
  onSuccess,
}: SkillEditModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        await updateSkill(skill.id, formData);

        const numero = Number(formData.get("numero"));
        const rank = Number(formData.get("rank"));
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

        const categoria = categorias.find((c) => c.id === categoriaId) ?? null;
        const tipo = tipos.find((t) => t.id === tipoId) ?? null;

        onSuccess({
          ...skill,
          numero,
          rank,
          nome,
          slug,
          descricao,
          url_repositorio: urlRepositorio,
          comando_instalacao: comandoInstalacao,
          comando_uso: comandoUso,
          mostrar_no_preview: mostrarNoPreview,
          ativo,
          categoria_id: categoriaId,
          tipo_id: tipoId,
          categorias: categoria
            ? { id: categoria.id, nome: categoria.nome, cor: categoria.cor, ordem: categoria.ordem }
            : null,
          tipos_skill: tipo ? { codigo: tipo.codigo } : null,
        });

        onOpenChange(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao salvar skill.");
      }
    });
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#e62630]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Skill</DialogTitle>
          <DialogDescription>{skill.nome}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">
                Número
              </label>
              <Input
                name="numero"
                type="number"
                required
                defaultValue={skill.numero}
                disabled={isPending}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-muted-foreground">
                Rank
              </label>
              <Input
                name="rank"
                type="number"
                required
                defaultValue={skill.rank}
                disabled={isPending}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">
              Nome
            </label>
            <Input name="nome" required defaultValue={skill.nome} disabled={isPending} />
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
              disabled={isPending}
              className={inputClass}
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
              disabled={isPending}
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
                disabled={isPending}
                className={inputClass}
              >
                {categorias.map((cat) => (
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
                disabled={isPending}
                className={inputClass}
              >
                {tipos.map((tipo) => (
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
              disabled={isPending}
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
              disabled={isPending}
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
                disabled={isPending}
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
                disabled={isPending}
                className="size-4 rounded border-border"
              />
              <label htmlFor="ativo" className="text-sm text-muted-foreground">
                Ativo
              </label>
            </div>
          </div>

          {error && (
            <p className="text-sm text-[#ff6b73]">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
