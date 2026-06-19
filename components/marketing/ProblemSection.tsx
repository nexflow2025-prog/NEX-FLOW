import { X } from "lucide-react";

const problems = [
  {
    title: "São milhares, espalhadas",
    description:
      "Skill boa tá perdida no meio de lixo, em dezenas de repositórios diferentes. Você não sabe onde olhar.",
  },
  {
    title: "Metade nem funciona",
    description:
      "Você tenta instalar, dá erro, perde a tarde e desiste achando que o problema é você. Não é.",
  },
  {
    title: "Tudo em inglês técnico",
    description:
      "Nome estranho, descrição confusa. Você nem sabe pra que serve, quanto menos como usar.",
  },
];

export function ProblemSection() {
  return (
    <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#e62630]">
          Por que isso acontece
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          O Claude Code vem &quot;pelado&quot;.
          <br />
          As <span className="text-[#ff3a44]">skills</span> é que dão o
          superpoder.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          O problema não é você. É que ninguém te conta quais skills instalar — e
          achar sozinho é um inferno.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-2xl border border-border bg-gradient-to-br from-card to-[#101013] p-6 text-left"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#e62630]/10 text-[#e62630]">
                <X className="size-5" />
              </div>
              <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                {problem.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
