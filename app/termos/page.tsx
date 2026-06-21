import type { Metadata } from "next";

import { TermsContent } from "@/components/legal/TermsContent";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export const metadata: Metadata = {
  title: "Termos de Uso — NexSkills",
  description:
    "Termos de Uso da NexSkills. Leia as regras e condições para acessar e utilizar nossa plataforma de skills para Claude Code.",
};

export default function TermosPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollToTop />
      <TermsContent />
    </section>
  );
}
