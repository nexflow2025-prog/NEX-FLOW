import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ExplorerContent } from "@/components/explorer/ExplorerContent";
import { Toaster } from "@/components/ui/sonner";
import { getCategoriesWithSkills } from "@/lib/skills-db";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NexSkills — Explorer",
  description: "Catálogo completo NexSkills — skills do Claude Code.",
};

export default async function ExplorerPage() {
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
      <ExplorerContent categories={categories} />
      <Toaster position="bottom-right" />
    </>
  );
}
