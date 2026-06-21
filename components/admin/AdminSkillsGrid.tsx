"use client";

import { useMemo, useState, useTransition } from "react";
import { ExternalLink, Pencil, Power, PowerOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchFilter } from "@/components/catalog/SearchFilter";
import { SkillEditModal } from "@/components/admin/SkillEditModal";
import { DeleteSkillForm } from "@/components/admin/DeleteSkillForm";
import { toggleSkillActive } from "@/app/admin/skills/actions";
import { cn } from "@/lib/utils";
import type { AdminSkill, CategoryOption, TypeOption } from "@/types";

interface AdminSkillsGridProps {
  skills: AdminSkill[];
  categorias: CategoryOption[];
  tipos: TypeOption[];
  totalCount: number;
  headerAction?: React.ReactNode;
}

interface GroupedCategory {
  id: string;
  nome: string;
  cor: string;
  ordem: number;
  items: AdminSkill[];
}

export function AdminSkillsGrid({ skills, categorias, tipos, totalCount, headerAction }: AdminSkillsGridProps) {
  const [skillsList, setSkillsList] = useState<AdminSkill[]>(skills);
  const [selectedSkill, setSelectedSkill] = useState<AdminSkill | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [pendingToggles, startToggleTransition] = useTransition();

  const categoryNames = useMemo(
    () => categorias.map((c) => c.nome),
    [categorias]
  );

  const filteredSkills = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

    return skillsList.filter((skill) => {
      const matchesCategory =
        activeCategory === "all" || skill.categorias?.nome === activeCategory;

      if (!matchesCategory) return false;

      if (terms.length === 0) return true;

      const tipo = skill.tipos_skill?.codigo ?? "";
      const categoria = skill.categorias?.nome ?? "";
      const text = `${skill.nome} ${skill.descricao} ${tipo} ${categoria} ${skill.url_repositorio}`.toLowerCase();

      return terms.every((term) => text.includes(term));
    });
  }, [skillsList, query, activeCategory]);

  const groupedCategories = useMemo(() => {
    const map = new Map<string, GroupedCategory>();

    for (const skill of filteredSkills) {
      const cat = skill.categorias;
      if (!cat) continue;

      if (!map.has(cat.id)) {
        map.set(cat.id, {
          id: cat.id,
          nome: cat.nome,
          cor: cat.cor,
          ordem: cat.ordem,
          items: [],
        });
      }

      map.get(cat.id)!.items.push(skill);
    }

    const groups = Array.from(map.values());

    groups.sort((a, b) => a.ordem - b.ordem);

    for (const group of groups) {
      group.items.sort((a, b) => {
        if (a.rank !== b.rank) return a.rank - b.rank;
        return a.numero - b.numero;
      });
    }

    return groups;
  }, [filteredSkills]);

  const handleUpdateSuccess = (updatedSkill: AdminSkill) => {
    setSkillsList((prev) => prev.map((s) => (s.id === updatedSkill.id ? updatedSkill : s)));
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
      {/* Top bar: search + Nova Skill button */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <SearchFilter
            query={query}
            onQueryChange={setQuery}
            categories={categoryNames}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>

      {groupedCategories.length === 0 ? (
        <div className="rounded-2xl border border-border py-16 text-center">
          <p className="font-[family-name:var(--font-mono)] text-sm text-muted-foreground">
            Nenhuma skill encontrada — tenta outro termo ou categoria.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedCategories.map((category, catIndex) => {
            // Número de skills em todas as categorias anteriores
            const startIndex = groupedCategories
              .slice(0, catIndex)
              .reduce((acc, c) => acc + c.items.length, 0);

            return (
              <section key={category.id}>
                {/* Category header — CategoryTrack style */}
                <div
                  className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3.5 sm:px-5"
                  style={{
                    background: `linear-gradient(100deg, ${category.cor}22, transparent 72%)`,
                  }}
                >
                  <h2
                    className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
                  >
                    {category.nome}
                  </h2>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[#ff6b73]">
                    {category.items.length} skills
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {category.items.map((skill, index) => (
                    <AdminSkillCard
                      key={skill.id}
                      skill={skill}
                      color={category.cor}
                      visualIndex={startIndex + index + 1}
                      onEdit={() => setSelectedSkill(skill)}
                      onDeleteSuccess={() => handleDeleteSuccess(skill.id)}
                      onToggle={() => handleToggle(skill)}
                      pendingToggle={pendingToggles}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

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

interface AdminSkillCardProps {
  skill: AdminSkill;
  color: string;
  visualIndex: number;
  onEdit: () => void;
  onDeleteSuccess: () => void;
  onToggle: () => void;
  pendingToggle: boolean;
}

function AdminSkillCard({
  skill,
  color,
  visualIndex,
  onEdit,
  onDeleteSuccess,
  onToggle,
  pendingToggle,
}: AdminSkillCardProps) {
  const repoUrl = skill.url_repositorio
    ? `https://${skill.url_repositorio}`
    : null;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-[#101013] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#e62630]/55 hover:shadow-[0_0_0_1px_rgba(230,38,48,0.15),0_18px_50px_rgba(0,0,0,0.5)]",
        !skill.ativo && "opacity-60"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-250 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px 220px at 100% 0, ${color}29, transparent 60%)`,
        }}
      />

      <div className="relative z-10 mb-3 flex items-center justify-between">
        <span
          className="font-[family-name:var(--font-heading)] text-sm font-extrabold"
          style={{ color }}
        >
          #{visualIndex}
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground ring-1 ring-border">
            {skill.tipos_skill?.codigo ?? "—"}
          </span>
          {skill.rank <= 3 && (
            <span className="rounded border border-[#e62630]/40 bg-[#e62630]/10 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[#e62630]">
              TOP {skill.rank}
            </span>
          )}
        </div>
      </div>

      <h4 className="relative z-10 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-foreground">
        {skill.nome}
      </h4>

      <p className="relative z-10 mt-2 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-relaxed text-muted-foreground">
        {skill.descricao}
      </p>

      <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span
          className="rounded-full border border-border px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-muted-foreground"
          title="Categoria"
        >
          {skill.categorias?.nome ?? "—"}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-bold",
            skill.mostrar_no_preview
              ? "border border-[#3ddc84]/40 bg-[#3ddc84]/10 text-[#3ddc84]"
              : "border border-border text-muted-foreground"
          )}
        >
          preview {skill.mostrar_no_preview ? "sim" : "não"}
        </span>
        <button
          type="button"
          disabled={pendingToggle}
          onClick={onToggle}
          className={cn(
            "rounded-full px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-bold transition-colors disabled:opacity-50",
            skill.ativo
              ? "border border-[#3ddc84]/40 bg-[#3ddc84]/10 text-[#3ddc84] hover:bg-[#3ddc84]/20"
              : "border border-border bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {skill.ativo ? "ativo" : "inativo"}
        </button>
      </div>

      <div className="relative z-10 mt-5 flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 border-border bg-transparent px-3 text-xs text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
          onClick={onEdit}
        >
          <Pencil className="size-3.5" />
          Editar
        </Button>

        <DeleteSkillForm
          id={skill.id}
          nome={skill.nome}
          onSuccess={onDeleteSuccess}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-transparent px-3 text-xs font-medium text-[#ff6b73] transition-colors hover:border-[#e62630] hover:text-[#ff3a44] disabled:opacity-50"
        />

        <Button
          size="sm"
          variant="outline"
          disabled={pendingToggle}
          className={cn(
            "h-8 gap-1.5 border-border bg-transparent px-3 text-xs disabled:opacity-50",
            skill.ativo
              ? "text-muted-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
              : "text-[#3ddc84] hover:border-[#3ddc84] hover:text-[#3ddc84]"
          )}
          onClick={onToggle}
        >
          {skill.ativo ? (
            <>
              <PowerOff className="size-3.5" />
              Desativar
            </>
          ) : (
            <>
              <Power className="size-3.5" />
              Ativar
            </>
          )}
        </Button>

        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[10px] font-bold text-muted-foreground transition-colors hover:text-[#ff6b73]"
          >
            repo <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </article>
  );
}
