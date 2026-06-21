import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ClientCatalog } from "@/components/catalog/ClientCatalog";
import { Toaster } from "@/components/ui/sonner";
import { getCategoriesWithSkills } from "@/lib/skills-db";
import {
  countSkills,
  countPreviewSkills,
  countRemainingSkills,
} from "@/lib/skills";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NexSkills — Catálogo completo",
  description: "Catálogo completo NexSkills — skills do Claude Code.",
};

export default async function ExplorePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/entrar");
  }

  const categories = await getCategoriesWithSkills();

  const totalSkills = countSkills(categories);
  const previewSkills = countPreviewSkills(categories);
  const remainingSkills = countRemainingSkills(categories);

  return (
    <>
      <ClientCatalog
        categories={categories}
        mode="member"
        totalSkills={totalSkills}
        previewSkills={previewSkills}
        remainingSkills={remainingSkills}
      />
      <Toaster position="bottom-right" />
    </>
  );
}
