"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { toast } from "sonner";

import { SearchFilter } from "./SearchFilter";
import { CategoryTrack } from "./CategoryTrack";
import { BulkActions } from "./BulkActions";
import { HowToPanel } from "./HowToPanel";
import { StatsBadges } from "./StatsBadges";
import { Button } from "@/components/ui/button";
import type { SkillCategory } from "@/types";
import { searchSkills, filterByCategory } from "@/lib/skills";

interface ClientCatalogProps {
  categories: SkillCategory[];
  mode: "public" | "member";
  totalSkills: number;
  previewSkills: number;
  remainingSkills: number;
}

export function ClientCatalog({
  categories,
  mode,
  totalSkills,
  previewSkills,
  remainingSkills,
}: ClientCatalogProps) {
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
      <header className="mb-10 text-center">
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

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {mode === "member" ? (
            <>
              Bem-vindo, membro! Aqui estão as{" "}
              <strong className="text-foreground">{totalSkills} skills completas</strong>
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

        <div className="mt-8 flex flex-col items-center justify-center gap-3.5">
          <StatsBadges
            totalSkills={totalSkills}
            totalCategories={categories.length}
            previewSkills={previewSkills}
            remainingSkills={remainingSkills}
            mode={mode}
          />
          {mode === "public" && (
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 whitespace-nowrap bg-[#e62630] px-6 font-[family-name:var(--font-mono)] text-base font-bold text-white transition-colors hover:bg-[#ff3a44]"
              >
                <Link href="/#oferta">Liberar acesso por R$ 27,00</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 whitespace-nowrap border-border bg-transparent px-6 font-[family-name:var(--font-mono)] text-base font-bold text-foreground transition-colors hover:border-[#e62630] hover:text-[#ff6b73]"
              >
                <Link href="/">Voltar para início</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <HowToPanel />

      {mode === "member" ? (
        <BulkActions categories={categories} onCopy={handleCopy} />
      ) : (
        <p className="mb-6 text-sm text-muted-foreground">
          🔓 Faltam +{remainingSkills} skills pra você. Libere as {totalSkills} skills completas + guia + comunidade.
        </p>
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
                mode={mode}
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
