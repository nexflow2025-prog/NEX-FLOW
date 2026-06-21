"use client";

import Link from "next/link";
import { ExternalLink, Copy, Play, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";
import { installCommand, useCommand, repoUrl, kindLabel } from "@/lib/skills";

interface SkillCardProps {
  skill: Skill;
  color: string;
  visualIndex: number;
  onCopy: (text: string, label: string) => void;
  locked?: boolean;
}

export function SkillCard({ skill, color, visualIndex, onCopy, locked = false }: SkillCardProps) {
  const install = installCommand(skill);
  const use = useCommand(skill);
  const repo = repoUrl(skill);
  const type = kindLabel[skill.kind];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-[#101013] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#e62630]/55 hover:shadow-[0_0_0_1px_rgba(230,38,48,0.15),0_18px_50px_rgba(0,0,0,0.5)]",
        locked && "opacity-80"
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
            {type}
          </span>
          {skill.rank <= 3 && (
            <span className="rounded border border-[#e62630]/40 bg-[#e62630]/10 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[#e62630]">
              TOP {skill.rank}
            </span>
          )}
        </div>
      </div>

      <h4 className="relative z-10 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-foreground">
        {skill.name}
      </h4>
      <p className="relative z-10 mt-2 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-relaxed text-muted-foreground">
        {skill.desc}
      </p>

      <div className="relative z-10 mt-5 flex items-center gap-2">
        {locked ? (
          <>
            <Lock className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Acesso restrito</span>
            <Button
              size="sm"
              className="ml-auto h-8 gap-1.5 bg-[#e62630] px-3 text-xs font-bold text-white hover:bg-[#ff3a44]"
              asChild
            >
              <Link href="/#oferta">Liberar acesso completo</Link>
            </Button>
          </>
        ) : install ? (
          <>
            <Button
              size="sm"
              className="h-8 gap-1.5 bg-[#e62630] px-3 text-xs font-bold text-white hover:bg-[#ff3a44]"
              onClick={() => onCopy(install, `${skill.name} — comando de instalação copiado`)}
            >
              <Copy className="size-3.5" />
              instalar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-border bg-transparent px-3 text-xs text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
              onClick={() => onCopy(use, `${skill.name} — como usar: ${use}`)}
              title="Copiar como usar"
            >
              <Play className="size-3" />
              usar
            </Button>
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "ml-auto inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[10px] font-bold text-muted-foreground transition-colors hover:text-[#ff6b73]"
              )}
            >
              repo <ExternalLink className="size-3" />
            </a>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-border bg-transparent px-3 text-xs text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
            asChild
          >
            <a href={repo} target="_blank" rel="noopener noreferrer">
              abrir repo <ExternalLink className="size-3" />
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}
