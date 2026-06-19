"use client";

import { useState, useTransition } from "react";

import { SkillEditModal } from "@/components/admin/SkillEditModal";
import { DeleteSkillForm } from "@/components/admin/DeleteSkillForm";
import { toggleSkillActive } from "@/app/admin/skills/actions";
import type { AdminSkill, CategoryOption, TypeOption } from "@/types";

interface SkillsTableClientProps {
  skills: AdminSkill[];
  categorias: CategoryOption[];
  tipos: TypeOption[];
}

export function SkillsTableClient({ skills, categorias, tipos }: SkillsTableClientProps) {
  const [skillsList, setSkillsList] = useState<AdminSkill[]>(skills);
  const [selectedSkill, setSelectedSkill] = useState<AdminSkill | null>(null);
  const [pendingToggles, startToggleTransition] = useTransition();

  const handleUpdateSuccess = (updatedSkill: AdminSkill) => {
    setSkillsList((prev) =>
      prev.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
    );
  };

  const handleDeleteSuccess = (id: string) => {
    setSkillsList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleToggle = (skill: AdminSkill) => {
    const nextAtivo = !skill.ativo;

    setSkillsList((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, ativo: nextAtivo } : s))
    );

    startToggleTransition(async () => {
      try {
        await toggleSkillActive(skill.id, nextAtivo);
      } catch (err) {
        // Reverte em caso de erro
        setSkillsList((prev) =>
          prev.map((s) => (s.id === skill.id ? { ...s, ativo: skill.ativo } : s))
        );
        console.error(err);
        alert(err instanceof Error ? err.message : "Erro ao alterar status.");
      }
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 font-[family-name:var(--font-mono)] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {skillsList.map((skill) => (
              <tr key={skill.id} className={!skill.ativo ? "opacity-50" : ""}>
                <td className="px-4 py-3">{skill.numero}</td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {skill.nome}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {skill.categorias?.nome}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {skill.tipos_skill?.codigo}
                </td>
                <td className="px-4 py-3">
                  {skill.mostrar_no_preview ? "Sim" : "Não"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={pendingToggles}
                    onClick={() => handleToggle(skill)}
                    className={`rounded-full px-2 py-1 text-xs font-bold ${
                      skill.ativo
                        ? "bg-[#3ddc84]/10 text-[#3ddc84]"
                        : "bg-muted text-muted-foreground"
                    } disabled:opacity-50`}
                  >
                    {skill.ativo ? "Ativo" : "Inativo"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className="text-xs text-muted-foreground hover:text-[#e62630]"
                    >
                      Editar
                    </button>
                    <DeleteSkillForm
                      id={skill.id}
                      nome={skill.nome}
                      onSuccess={() => handleDeleteSuccess(skill.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSkill && (
        <SkillEditModal
          skill={selectedSkill}
          categorias={categorias}
          tipos={tipos}
          open={!!selectedSkill}
          onOpenChange={(open) => {
            if (!open) setSelectedSkill(null);
          }}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
}
