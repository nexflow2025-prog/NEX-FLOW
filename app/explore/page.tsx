import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ClientCatalog } from "@/components/catalog/ClientCatalog";
import { Toaster } from "@/components/ui/sonner";
import { getCategoriesWithSkills } from "@/lib/skills-db";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NexSkills — Catálogo completo",
  description: "Catálogo completo NexSkills — 114 skills do Claude Code.",
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

  return (
    <>
      <ClientCatalog categories={categories} mode="member" />
      <Toaster position="bottom-right" />
    </>
  );
}
