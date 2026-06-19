"use client";

import { Lightbulb } from "lucide-react";

export function HowToPanel() {
  return (
    <div className="mb-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#e62630]/10 to-[#101013]">
      <div className="border-b border-border px-6 py-5">
        <h2 className="flex items-center gap-2.5 font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
          <span className="inline-block size-2.5 rounded-full bg-[#e62630] shadow-[0_0_12px_#e62630]" />
          Como usar — simples assim
        </h2>
      </div>
      <div className="grid divide-y border-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-6 sm:p-7">
          <span className="inline-block rounded-md border border-[#3ddc84]/30 bg-[#3ddc84]/10 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-[#3ddc84]">
            Passo 1 · Achar
          </span>
          <h4 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
            Escolha pelo objetivo
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Navegue pelas trilhas (escrever código, automatizar, conectar
            ferramentas...) ou <strong>busque</strong>. Cada card explica em
            português o que a skill faz.
          </p>
          <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
            <Lightbulb className="mt-0.5 size-3.5 shrink-0" />A etiqueta mostra
            o tipo: skill, plugin, MCP ou agente.
          </p>
        </div>
        <div className="p-6 sm:p-7">
          <span className="inline-block rounded-md border border-[#ff6b73]/30 bg-[#e62630]/10 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-[#ff6b73]">
            Passo 2 · Instalar
          </span>
          <h4 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
            Copie e cole no terminal
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Clique em <strong>⬇ instalar</strong> e o comando pronto vai pra
            área de transferência. Cole no <strong>Claude Code</strong>.
          </p>
          <div className="mt-4 rounded-xl border border-border bg-[#050506] p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[#cdc7c9]">
            <span className="text-muted-foreground">
              # exemplo (cada skill tem o seu):
            </span>
            <br />
            <span className="text-foreground">
              claude mcp add context7 -- npx -y @upstash/context7-mcp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
