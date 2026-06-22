import type { Metadata } from "next";

import { AppShell } from "@/components/layout/AppShell";
import { ExplorerContent } from "@/components/explorer/ExplorerContent";
import { Toaster } from "@/components/ui/sonner";
import { getCatalogStats, getCategoriesWithSkills } from "@/lib/skills-db";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NexSkills — Catálogo de Skills",
  description: "Catálogo completo NexSkills — skills do Claude Code.",
};

interface CatalogoPageProps {
  searchParams: Promise<{ preview?: string }> | { preview?: string };
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;
  const forcePreview = params.preview === "1";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let canAccessAll = false;

  if (user) {
    const { data: profile } = await supabase
      .from("perfis")
      .select("role, acesso_liberado")
      .eq("id", user.id)
      .single();

    canAccessAll =
      profile?.role === "ADMIN" || profile?.acesso_liberado === true;
  }

  const mode = forcePreview ? "public" : canAccessAll ? "member" : "public";

  const [categories, stats] = await Promise.all([
    getCategoriesWithSkills({ previewOnly: mode === "public" }),
    getCatalogStats(),
  ]);

  const { totalSkills, previewSkills, remainingSkills } = stats;

  const catalog = (
    <>
      <ExplorerContent
        categories={categories}
        mode={mode}
        totalSkills={totalSkills}
        previewSkills={previewSkills}
        remainingSkills={remainingSkills}
      />
      <Toaster position="bottom-right" />
    </>
  );

  if (mode === "member") {
    return <AppShell>{catalog}</AppShell>;
  }

  return (
    <div className="min-h-screen bg-background">
      {catalog}
    </div>
  );
}
