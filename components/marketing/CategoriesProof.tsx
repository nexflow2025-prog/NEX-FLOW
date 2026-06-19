import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { categoriesFull } from "@/data/categories";

export function CategoriesProof() {
  return (
    <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#e62630]">
          O que tem dentro
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Skills organizadas por{" "}
          <span className="text-[#ff3a44]">objetivo</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          Você não procura por &quot;tipo técnico&quot;. Procura pelo que quer fazer — e
          acha na hora.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categoriesFull.map((category) => (
            <span
              key={category.category}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 font-[family-name:var(--font-mono)] text-sm text-foreground"
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.category}{" "}
              <b className="text-muted-foreground">{category.items.length}</b>
            </span>
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="mt-10 border-border bg-transparent font-[family-name:var(--font-mono)] text-sm font-bold text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
        >
          <Link href="/explorer" target="_blank" rel="noopener">
            Explorar o catálogo completo <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
