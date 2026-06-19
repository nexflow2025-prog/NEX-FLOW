import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { GuiaContent } from "@/components/guia/GuiaContent";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "NexSkills — Guia passo a passo",
  robots: "noindex, nofollow",
};

export default async function GuidePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/entrar");
  }

  return <GuiaContent />;
}
