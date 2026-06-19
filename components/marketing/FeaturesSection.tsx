import { Zap, Infinity, BookOpen, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "114 skills que funcionam",
    description:
      "Testei uma por uma. Só entrou no catálogo o que instala de verdade e vale a pena. Você não cai mais em link quebrado.",
  },
  {
    icon: Infinity,
    title: "Skills novas pra sempre",
    description:
      "Toda semana surge coisa nova. Você paga uma vez e recebe as próximas pra sempre — sem mensalidade, sem pagar de novo.",
  },
  {
    icon: BookOpen,
    title: "Guia do absoluto zero",
    description:
      "Nunca mexeu no Claude Code? Sem problema. O guia te leva do \"não sei nada\" ao \"instalei minha primeira skill\" em minutos.",
  },
  {
    icon: MessageCircle,
    title: "Grupo no WhatsApp",
    description:
      "Travou? Pergunta no grupo. Quer uma skill que não tem? Pede. Você não fica sozinho na frente da tela.",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#e62630]">
          A virada
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Eu já fiz o trabalho chato.
          <br />
          Você só <span className="text-[#ff3a44]">copia e cola</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
          O NexSkills é a sua central pronta: as 114 melhores skills, cada uma
          explicada em português e com o comando na mão. Sem garimpo, sem erro,
          sem inglês difícil.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-gradient-to-br from-card to-[#101013] p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#e62630]/45"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-[#e62630]/30 bg-[#e62630]/10 text-2xl text-[#e62630]">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
