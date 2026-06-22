import { Check } from "lucide-react";

import { siteConfig } from "@/data/site";
import { CheckoutButton } from "@/components/marketing/CheckoutButton";

interface OfferSectionProps {
  totalSkills: number;
  remainingSkills: number;
}

export function OfferSection({ totalSkills, remainingSkills }: OfferSectionProps) {
  const priceFormatted = String(siteConfig.price).includes(",")
    ? String(siteConfig.price)
    : `${siteConfig.price},00`;
  const benefits = [
    `Acesso completo às ${totalSkills} skills curadas`,
    "Atualizações vitalícias (skills novas pra sempre)",
    "Guia de instalação e uso passo a passo",
    "Suporte e comunidade exclusiva",
    "Comando pronto: copiar, colar e usar",
  ];

  return (
    <section id="oferta" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#e62630]">
          A oferta
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Pague <span className="text-[#ff3a44]">uma vez</span>. Use pra{" "}
          <span className="text-[#ff3a44]">sempre</span>.
        </h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-3xl border border-[#e62630]/40 bg-gradient-to-b from-[#e62630]/10 to-[#101013] p-8 text-center sm:p-12">
        <div className="pointer-events-none absolute -top-1/3 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(230,38,48,0.25),transparent_70%)]" />

        <span className="relative inline-block rounded-full border border-[#e62630]/40 px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#ff6b73]">
          🚀 Oferta de lançamento
        </span>

        <div className="relative mt-6 font-[family-name:var(--font-mono)] text-lg text-muted-foreground line-through">
          De R$ {siteConfig.oldPrice}
        </div>
        <div className="relative mt-2 flex items-start justify-center font-[family-name:var(--font-heading)] text-7xl font-extrabold leading-none text-foreground sm:text-8xl">
          <small className="mt-2 text-2xl font-semibold text-muted-foreground sm:text-3xl">
            R$
          </small>
          {priceFormatted}
        </div>
        <p className="relative mt-2 font-[family-name:var(--font-mono)] text-sm text-[#ff6b73]">
          pagamento único · preço de lançamento (sobe em breve)
        </p>

        <ul className="relative mx-auto mt-8 max-w-sm space-y-3 text-left">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <Check className="mt-0.5 size-5 shrink-0 text-[#3ddc84]" />
              {benefit}
            </li>
          ))}
        </ul>

        <CheckoutButton
          totalSkills={remainingSkills}
          label={`Quero liberar minhas ${remainingSkills} skills premium →`}
        />

        <p className="relative mt-5 flex items-center justify-center gap-2 font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
          🔒 Compra segura · acesso imediato · 🛡️ {siteConfig.guaranteeDays}{" "}
          dias de garantia
        </p>

        <div className="relative mt-8 flex items-center gap-4 border-t border-border pt-6 text-left">
          <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#3ddc84] text-[#3ddc84]">
            <span className="font-[family-name:var(--font-heading)] text-2xl font-extrabold leading-none">
              {siteConfig.guaranteeDays}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] font-bold uppercase tracking-wider">
              DIAS
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">
              Garantia incondicional de {siteConfig.guaranteeDays} dias.
            </strong>{" "}
            Não achou útil? Devolvemos 100% do seu dinheiro, sem perguntas. O
            risco é todo nosso.
          </p>
        </div>
      </div>
    </section>
  );
}
