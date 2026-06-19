import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function PosLoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/entrar");
  }

  const { data: profile } = await supabase
    .from("perfis")
    .select("papel")
    .eq("id", user.id)
    .single();

  if (profile?.papel === "ADMIN") {
    redirect("/admin/skills");
  }

  redirect("/membros");
}
