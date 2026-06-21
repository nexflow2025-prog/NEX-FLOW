import type { Metadata } from "next";

import { PrivacyContent } from "@/components/legal/PrivacyContent";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export const metadata: Metadata = {
  title: "Política de Privacidade — NexSkills",
  description:
    "Política de Privacidade da NexSkills. Saiba como coletamos, usamos e protegemos seus dados ao usar nossa plataforma.",
};

export default function PrivacidadePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollToTop />
      <PrivacyContent />
    </section>
  );
}
