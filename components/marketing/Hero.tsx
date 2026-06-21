import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeroProps {
  totalSkills: number;
}

export function Hero({ totalSkills }: HeroProps) {
  return (
    <section className="relative px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-14 gap-2 bg-[#e62630] px-8 font-[family-name:var(--font-mono)] text-base font-bold text-white shadow-[0_0_0_1px_rgba(230,38,48,0.4),0_14px_40px_rgba(230,38,48,0.25)] transition-all hover:bg-[#ff3a44] hover:shadow-[0_0_0_1px_rgba(230,38,48,0.6),0_18px_50px_rgba(230,38,48,0.4)]"
          >
            <Link href="/#oferta">
              Liberar <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 gap-2 border-border bg-transparent px-8 font-[family-name:var(--font-mono)] text-base font-bold text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
          >
            <Link href="/catalogo?preview=1">
              Espiar o catálogo <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          {[
            { value: totalSkills, label: "skills curadas" },
            { value: 6, label: "objetivos" },
            { value: "100%", label: "com link real" },
            { value: "∞", label: "acesso vitalício" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <span className="block font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[#ff6b73]">
                {item.value}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
