import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { MembrosContent } from "@/components/membros/MembrosContent";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NexSkills — Área de Membros",
  robots: "noindex, nofollow",
};

export default async function MembersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/entrar");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <MembrosContent />
      </div>
    </AppShell>
  );
}
