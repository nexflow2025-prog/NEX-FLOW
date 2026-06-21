import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { MembrosContent } from "@/components/membros/MembrosContent";
import { createClient } from "@/lib/supabase/server";
import { getTotalSkillsCount } from "@/lib/skills-db";

export const metadata: Metadata = {
  title: "NexSkills — Área de Membros",
  robots: "noindex, nofollow",
};

export default async function MembersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("[LOGIN DEBUG] usuário logado:", user?.id, user?.email);
  console.log("[LOGIN DEBUG] app_metadata:", user?.app_metadata);
  console.log(
    "[LOGIN DEBUG] identities:",
    user?.identities?.map((i) => i.provider)
  );

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("perfis")
    .select("papel, acesso_liberado")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.papel === "ADMIN";

  if (!isAdmin && profile?.acesso_liberado !== true) {
    redirect("/#oferta");
  }

  const totalSkills = await getTotalSkillsCount();

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <MembrosContent totalSkills={totalSkills} />
      </div>
    </AppShell>
  );
}
