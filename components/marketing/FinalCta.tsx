import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function FinalCta() {
  return (
    <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Hoje você usa metade.
          <br />
          Amanhã, o{" "}
          <span className="text-[#ff3a44]">Claude Code inteiro</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Por R$ {siteConfig.price} — menos que uma pizza — você para de garimpar e
          libera de uma vez tudo o que a ferramenta consegue fazer. Com{" "}
          {siteConfig.guaranteeDays} dias de garantia: ou você ama, ou devolvemos
          seu dinheiro.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 h-14 gap-2 bg-[#e62630] px-8 font-[family-name:var(--font-mono)] text-base font-bold text-white shadow-[0_0_0_1px_rgba(230,38,48,0.4),0_14px_40px_rgba(230,38,48,0.25)] transition-all hover:bg-[#ff3a44] hover:shadow-[0_0_0_1px_rgba(230,38,48,0.6),0_18px_50px_rgba(230,38,48,0.4)]"
        >
          <Link href="#oferta">
            Liberar minhas 114 skills por R$ {siteConfig.price} <ArrowRight className="size-4" />
          </Link>
        </Button>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
          pagamento único · acesso na hora · {siteConfig.guaranteeDays} dias de
          garantia
        </p>
      </div>
    </section>
  );
}
