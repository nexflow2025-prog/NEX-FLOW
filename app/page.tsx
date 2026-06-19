import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { CategoriesProof } from "@/components/marketing/CategoriesProof";
import { OfferSection } from "@/components/marketing/OfferSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCta } from "@/components/marketing/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <CategoriesProof />
      <OfferSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
