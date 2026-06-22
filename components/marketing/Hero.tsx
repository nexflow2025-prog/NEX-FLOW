import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatsBadges } from "@/components/catalog/StatsBadges";

interface HeroProps {
  totalSkills: number;
  totalCategories: number;
  previewSkills: number;
  remainingSkills: number;
}

export function Hero({
  totalSkills,
  totalCategories,
  previewSkills,
  remainingSkills,
}: HeroProps) {
  return (
    <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#e62630]/35 bg-[#e62630]/10 px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#ff6b73]">
            <span className="inline-block size-1.5 rounded-full bg-[#e62630] shadow-[0_0_12px_#e62630]" />
            NexSkills · Claude Code
          </span>

          <h1 className="mt-7 font-[family-name:var(--font-heading)] text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Você usa o Claude Code{" "}
            <span className="text-[#ff3a44] [text-shadow:0_0_32px_rgba(230,38,48,0.4)]">
              pela metade
            </span>
            .
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A ferramenta consegue revisar seu código, criar sites, gerar imagens e
            automatizar tarefas sozinha —{" "}
            <strong className="text-foreground">
              mas só com as skills certas instaladas
            </strong>
            . Eu testei centenas e separei as {totalSkills} melhores,
            com o comando pronto pra colar.
          </p>
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3.5">
          <StatsBadges
            totalSkills={totalSkills}
            totalCategories={totalCategories}
            previewSkills={previewSkills}
            remainingSkills={remainingSkills}
            mode="public"
          />

          <div className="flex shrink-0 flex-wrap justify-center gap-3.5">
            <Button
              asChild
              size="lg"
              className="h-[74px] whitespace-nowrap rounded-xl bg-[#e62630] px-8 font-[family-name:var(--font-mono)] text-base font-bold text-white shadow-[0_0_0_1px_rgba(230,38,48,0.4),0_14px_40px_rgba(230,38,48,0.25)] transition-all hover:bg-[#ff3a44] hover:shadow-[0_0_0_1px_rgba(230,38,48,0.6),0_18px_50px_rgba(230,38,48,0.4)]"
            >
              <Link href="/#oferta">
                Liberar acesso por R$ 27,00 <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-[74px] whitespace-nowrap rounded-xl border-border bg-transparent px-8 font-[family-name:var(--font-mono)] text-base font-bold text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
            >
              <Link href="/catalogo?preview=1">
                Espiar o catálogo <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
