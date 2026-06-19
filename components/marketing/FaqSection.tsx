import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Preciso saber programar?",
    answer:
      "Não precisa ser expert. As skills têm explicação em português e comando pronto — você só copia e cola no Claude Code. O guia te ajuda no resto.",
  },
  {
    question: "O que é o Claude Code?",
    answer:
      "É a ferramenta de programação com IA da Anthropic (criadora do Claude). As skills do NexSkills turbinam o que ele consegue fazer: revisar código, automatizar tarefas, gerar imagens, conectar ferramentas e muito mais.",
  },
  {
    question: "É pagamento único mesmo?",
    answer:
      "Sim. Você paga uma vez e tem acesso vitalício, incluindo todas as atualizações futuras. Sem mensalidade, sem pegadinha.",
  },
  {
    question: "As skills funcionam de verdade?",
    answer:
      "Todas têm link real verificado e comando que instala. Diferente de listas soltas pela internet, aqui você não cai em \"skill que não existe\".",
  },
  {
    question: "Como recebo o acesso?",
    answer:
      "Assim que o pagamento é confirmado, você recebe na hora o link de acesso ao catálogo completo, ao guia passo a passo e ao grupo de WhatsApp da comunidade.",
  },
  {
    question: "E se eu não gostar?",
    answer:
      "Você tem 7 dias de garantia. Se achar que não foi útil pra você, é só pedir e devolvemos 100% do seu dinheiro, sem perguntas. O risco é todo nosso.",
  },
];

export function FaqSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#e62630]">
            Dúvidas
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Perguntas frequentes
          </h2>
        </div>

        <Accordion className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border border-border bg-card px-5 data-[state=open]:bg-gradient-to-br data-[state=open]:from-card data-[state=open]:to-[#101013]"
            >
              <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-heading)] text-base font-bold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
