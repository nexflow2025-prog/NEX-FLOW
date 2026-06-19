"use client";

import { useState, useTransition } from "react";

import { deleteSkill } from "@/app/admin/skills/actions";

interface DeleteSkillFormProps {
  id: string;
  nome: string;
  onSuccess?: () => void;
  className?: string;
}

export function DeleteSkillForm({ id, nome, onSuccess, className }: DeleteSkillFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a skill "${nome}"? Esta ação não pode ser desfeita.`
    );

    if (!confirmed) return;

    setError(null);

    startTransition(async () => {
      try {
        await deleteSkill(id);
        onSuccess?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao excluir skill.");
      }
    });
  };

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        disabled={isPending}
        onClick={handleClick}
        className={className ?? "text-xs text-[#ff6b73] hover:text-[#ff3a44] disabled:opacity-50"}
      >
        {isPending ? "Excluindo..." : "Excluir"}
      </button>
      {error && <span className="text-xs text-[#ff6b73]">{error}</span>}
    </div>
  );
}
