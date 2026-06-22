import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { CategoriesProof } from "@/components/marketing/CategoriesProof";
import { OfferSection } from "@/components/marketing/OfferSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCta } from "@/components/marketing/FinalCta";
import { getAllCategories, getCatalogStats } from "@/lib/skills-db";

export default async function HomePage() {
  const [stats, categories] = await Promise.all([
    getCatalogStats(),
    getAllCategories(),
  ]);

  const { totalSkills, previewSkills, remainingSkills } = stats;
  const totalCategories = categories.length;

  return (
    <>
      <Hero
        totalSkills={totalSkills}
        totalCategories={totalCategories}
        previewSkills={previewSkills}
        remainingSkills={remainingSkills}
      />
      <ProblemSection />
      <FeaturesSection totalSkills={totalSkills} />
      <CategoriesProof />
      <OfferSection totalSkills={totalSkills} remainingSkills={remainingSkills} />
      <FaqSection />
      <FinalCta totalSkills={totalSkills} remainingSkills={remainingSkills} />
    </>
  );
}
