import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GuiaContentProps {
  adminPreview?: boolean;
}

const steps = [
  {
    n: 1,
    title: "Instale o Claude Code",
    content: (
      <>
        <p>
          O Claude Code é a ferramenta de IA da Anthropic que roda no seu
          computador. Baixe e instale seguindo o site oficial:
        </p>
        <ul className="ml-5 mt-3 list-disc space-y-1 text-sm">
          <li>
            Acesse{" "}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6b73] underline underline-offset-2"
            >
              claude.com/claude-code
            </a>
          </li>
          <li>Baixe a versão pro seu sistema (Windows, Mac ou Linux)</li>
          <li>Faça login com sua conta Claude (ou crie uma grátis)</li>
        </ul>
      </>
    ),
    tip: "No Windows, abra o \"Terminal\" ou \"PowerShell\" pra rodar os comandos. No Mac, abra o \"Terminal\".",
  },
  {
    n: 2,
    title: "Abra o catálogo e escolha uma skill",
    content: (
      <>
        <p>
          No{" "}
          <Link href="/explorer" className="text-[#ff6b73] underline underline-offset-2">
            catálogo NexSkills
          </Link>
          , navegue pelas trilhas (Escrever código, Automatizar, Design...) ou
          use a busca. Cada card explica em português o que a skill faz.
        </p>
        <p className="mt-3">
          Achou uma que quer? Olhe a etiqueta do tipo:{" "}
          <strong className="text-foreground">skill</strong>,{" "}
          <strong className="text-foreground">plugin</strong>,{" "}
          <strong className="text-foreground">MCP</strong> ou{" "}
          <strong className="text-foreground">agente</strong>.
        </p>
      </>
    ),
  },
  {
    n: 3,
    title: "Copie o comando e cole no Claude Code",
    content: (
      <>
        <p>
          Clique no botão <strong className="text-foreground">⬇ instalar</strong>{" "}
          do card — o comando vai pra sua área de transferência. Cole no terminal
          do Claude Code e dê enter. Exemplo:
        </p>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-border bg-[#050506] p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed">
            <span className="text-muted-foreground"># o botão copia algo assim:</span>
            <br />
            <span className="text-foreground">
              npx skills add github.com/obra/superpowers
            </span>
          </div>
          <div className="rounded-xl border border-border bg-[#050506] p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed">
            <span className="text-muted-foreground"># um MCP fica assim:</span>
            <br />
            <span className="text-foreground">
              claude mcp add context7 -- npx -y @upstash/context7-mcp
            </span>
          </div>
        </div>
      </>
    ),
    tip: "Cada skill tem o comando certo já pronto. É só copiar e colar — não precisa decorar nada.",
  },
  {
    n: 4,
    title: "Use a skill",
    content: (
      <>
        <p>
          Depois de instalada, clique no botão{" "}
          <strong className="text-foreground">▸ usar</strong> do card pra copiar
          como ativá-la:
        </p>
        <ul className="ml-5 mt-3 list-disc space-y-1 text-sm">
          <li>
            <strong className="text-foreground">Skills e plugins:</strong> viram
            um comando, tipo{" "}
            <code className="rounded bg-black/40 px-1 py-0.5 font-[family-name:var(--font-mono)] text-[#ff6b73]">
              /superpowers
            </code>
          </li>
          <li>
            <strong className="text-foreground">MCPs e ferramentas:</strong> é só
            pedir pro Claude em português, ex:{" "}
            <em>&quot;liste minhas issues do GitHub e abra um PR&quot;</em>
          </li>
        </ul>
      </>
    ),
    tip: "Pronto! Repita pra quantas skills quiser. Quanto mais você instala, mais poderoso seu Claude Code fica.",
  },
];

export function GuiaContent({ adminPreview }: GuiaContentProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 pb-20 sm:px-6 lg:px-8">
      <Link
        href={adminPreview ? "/admin/skills" : "/membros"}
        className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs text-muted-foreground transition-colors hover:text-[#ff6b73]"
      >
        <ArrowLeft className="size-3.5" />
        {adminPreview ? "voltar para admin" : "voltar pra área de membros"}
      </Link>

      <div className="mt-6 text-center">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#e62630]">
          Guia passo a passo
        </span>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Do zero ao primeiro <span className="text-[#ff3a44]">comando</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Em 4 passos você instala o Claude Code e usa sua primeira skill. Não
          precisa ser programador.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {steps.map((step) => (
          <div
            key={step.n}
            className="relative rounded-2xl border border-border bg-gradient-to-br from-card to-[#101013] p-7"
          >
            <div className="absolute -top-3.5 left-6 flex size-9 items-center justify-center rounded-lg bg-[#e62630] font-[family-name:var(--font-heading)] text-base font-extrabold text-white shadow-[0_0_18px_rgba(230,38,48,0.6)]">
              {step.n}
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
              {step.title}
            </h3>
            <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
              {step.content}
            </div>
            {step.tip && (
              <div className="mt-5 rounded-lg border-l-4 border-[#3ddc84] bg-[#3ddc84]/10 p-4 text-sm text-muted-foreground">
                <strong className="text-[#3ddc84]">Dica:</strong> {step.tip}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          asChild
          className="h-12 bg-[#e62630] px-8 font-[family-name:var(--font-mono)] text-sm font-bold text-white hover:bg-[#ff3a44]"
        >
          <Link href={adminPreview ? "/admin/skills?preview=explorer" : "/dashboard"}>
            {adminPreview ? "Ir pro catálogo (preview) →" : "Ir pro catálogo e começar →"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
