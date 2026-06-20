"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { toast } from "sonner";

import { SearchFilter } from "./SearchFilter";
import { CategoryTrack } from "./CategoryTrack";
import { BulkActions } from "./BulkActions";
import { HowToPanel } from "./HowToPanel";
import { StatsBadges } from "./StatsBadges";
import type { SkillCategory } from "@/types";
import { searchSkills, filterByCategory, countSkills } from "@/lib/skills";

interface ClientCatalogProps {
  categories: SkillCategory[];
  mode: "public" | "member";
}

export function ClientCatalog({ categories, mode }: ClientCatalogProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    const searched = searchSkills(categories, query);
    return filterByCategory(searched, activeCategory);
  }, [categories, query, activeCategory]);

  const categoryNames = useMemo(
    () => categories.map((c) => c.category),
    [categories]
  );

  async function handleCopy(text: string, label: string) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast.success(label);
    } catch {
      toast.error("Não foi possível copiar. Tente manualmente.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-[#e62630]/35 bg-[#e62630]/10 px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#ff6b73]">
          <span className="inline-block size-1.5 rounded-full bg-[#e62630] shadow-[0_0_12px_#e62630]" />
          {mode === "member"
            ? "✓ Acesso de membro · catálogo completo"
            : "Claude Code · curadoria"}
        </span>

        <h1 className="mt-6 font-[family-name:var(--font-heading)] text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          <span className="text-[#ff3a44] [text-shadow:0_0_34px_rgba(230,38,48,0.4),0_0_4px_rgba(230,38,48,0.5)]">
            Nex
          </span>
          Skills
        </h1>
        <p className="mt-3 font-[family-name:var(--font-mono)] text-sm tracking-wide text-muted-foreground">
          a central de skills do Claude Code
        </p>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {mode === "member" ? (
            <>
              Bem-vindo, membro! Aqui estão as{" "}
              <strong className="text-foreground">114 skills completas</strong>
              , organizadas por <strong className="text-foreground">objetivo</strong>.
              Cada uma com o que faz e o comando pronto pra instalar.
            </>
          ) : (
            <>
              As <strong className="text-foreground">melhores skills, plugins e MCPs</strong>{" "}
              do Claude Code — escolhidas a dedo e organizadas por{" "}
              <strong className="text-foreground">objetivo</strong>. Cada uma com o
              que faz e o comando pronto pra instalar.
            </>
          )}
        </p>

        <div className="mt-8">
          <StatsBadges
            totalSkills={countSkills(categories)}
            totalCategories={categories.length}
            mode={mode}
          />
        </div>
      </header>

      <HowToPanel />

      {mode === "member" ? (
        <BulkActions categories={categories} onCopy={handleCopy} />
      ) : (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#e62630]/30 bg-gradient-to-r from-[#e62630]/15 to-transparent p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h5 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
              🔓 Faltam +90 skills pra você
            </h5>
            <p className="mt-1 text-sm text-muted-foreground">
              Esta é só a amostra. Libere as{" "}
              <code className="rounded bg-black/40 px-1 py-0.5 font-[family-name:var(--font-mono)] text-[#ff6b73]">
                114 skills completas
              </code>{" "}
              + guia + comunidade por <strong className="text-foreground">R$ 27</strong>{" "}
              (acesso vitalício, 7 dias de garantia).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-[#e62630] px-4 font-[family-name:var(--font-mono)] text-sm font-bold text-white transition-colors hover:bg-[#ff3a44]"
          >
            Liberar tudo por R$ 27 →
          </Link>
        </div>
      )}

      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        categories={categoryNames}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="py-16 text-center font-[family-name:var(--font-mono)] text-sm text-muted-foreground">
            Nenhuma skill encontrada — tenta outro termo.
          </div>
        ) : (
          filtered.map((category, catIndex) => {
            // Número de skills em todas as categorias anteriores
            const startIndex = filtered
              .slice(0, catIndex)
              .reduce((acc, c) => acc + c.items.length, 0);

            return (
              <CategoryTrack
                key={category.category}
                category={category}
                startIndex={startIndex}
                forceShowAll={!!query || activeCategory !== "all"}
                onCopy={handleCopy}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
