import Link from "next/link";
import { BookOpen, MessageCircle, Rocket } from "lucide-react";

import { siteConfig } from "@/data/site";

interface MembrosContentProps {
  totalSkills: number;
}

export function MembrosContent({ totalSkills }: MembrosContentProps) {
  const cards = [
    {
      icon: BookOpen,
      title: "Catálogo de Skills",
      description:
        `As ${totalSkills} skills curadas, por objetivo. Clique em instalar e cole o comando no Claude Code.`,
      href: "/catalogo",
      variant: "red" as const,
    },
    {
      icon: Rocket,
      title: "Guia passo a passo",
      description:
        "Como instalar o Claude Code e usar as skills do zero — mesmo se você está começando agora.",
      href: "/guia",
      variant: "red" as const,
    },
    {
      icon: MessageCircle,
      title: "Comunidade no WhatsApp",
      description:
        "Tire dúvidas, peça skills novas e troque ideia com quem também usa. Bem-vindo ao grupo!",
      href: siteConfig.whatsappUrl || "#",
      variant: "green" as const,
      external: true,
    },
  ];

  return (
    <div>
      <div className="text-center">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-[#3ddc84]/35 bg-[#3ddc84]/10 px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#3ddc84]">
          Acesso liberado
        </span>
        <h1 className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Bem-vindo ao <span className="text-[#ff3a44]">NexSkills</span> 🎉
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Seu acesso está ativo — pra sempre. Aqui está tudo que você precisa pra
          turbinar seu Claude Code agora mesmo.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          const isDisabled = !card.href || card.href === "#";

          const body = (
            <>
              <div
                className={`flex size-13 items-center justify-center rounded-xl border text-2xl ${
                  card.variant === "green"
                    ? "border-[#3ddc84]/30 bg-[#3ddc84]/10 text-[#3ddc84]"
                    : "border-[#e62630]/30 bg-[#e62630]/10 text-[#e62630]"
                }`}
              >
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              <div
                className={`mt-5 font-[family-name:var(--font-mono)] text-xs font-bold ${
                  card.variant === "green"
                    ? "text-[#3ddc84]"
                    : "text-[#ff6b73]"
                }`}
              >
                {isDisabled ? "Em breve →" : "Acessar →"}
              </div>
            </>
          );

          if (isDisabled) {
            return (
              <div
                key={card.title}
                className="group relative block overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-[#101013] p-7 opacity-70"
              >
                {body}
              </div>
            );
          }

          return (
            <Link
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className={`group relative block overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-[#101013] p-7 transition-all duration-200 hover:-translate-y-1 ${
                card.variant === "green"
                  ? "hover:border-[#3ddc84]/50"
                  : "hover:border-[#e62630]/50"
              }`}
            >
              {body}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        💡 <strong className="text-foreground">Dica:</strong> salve esta página
        nos favoritos. Sempre que entrar uma skill nova, ela aparece no catálogo
        automaticamente — seu acesso é vitalício e as atualizações são gratuitas
        pra sempre.
      </div>
    </div>
  );
}
