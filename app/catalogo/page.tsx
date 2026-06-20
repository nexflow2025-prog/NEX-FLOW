import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { ExplorerContent } from "@/components/explorer/ExplorerContent";
import { Toaster } from "@/components/ui/sonner";
import { getCategoriesWithSkills } from "@/lib/skills-db";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NexSkills — Catálogo de Skills",
  description: "Catálogo completo NexSkills — skills do Claude Code.",
};

export default async function CatalogoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/entrar");
  }

  const categories = await getCategoriesWithSkills();

  return (
    <AppShell>
      <ExplorerContent categories={categories} />
      <Toaster position="bottom-right" />
    </AppShell>
  );
}
