import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { CategoriesProof } from "@/components/marketing/CategoriesProof";
import { OfferSection } from "@/components/marketing/OfferSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCta } from "@/components/marketing/FinalCta";
import { getTotalSkillsCount } from "@/lib/skills-db";

export default async function HomePage() {
  const totalSkills = await getTotalSkillsCount();

  return (
    <>
      <Hero totalSkills={totalSkills} />
      <ProblemSection />
      <FeaturesSection totalSkills={totalSkills} />
      <CategoriesProof />
      <OfferSection totalSkills={totalSkills} />
      <FaqSection />
      <FinalCta totalSkills={totalSkills} />
    </>
  );
}
