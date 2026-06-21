import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function PosLoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("[pos-login] user:", user?.id, user?.email);

  if (!user) {
    redirect("/entrar");
  }

  const { data: profile } = await supabase
    .from("perfis")
    .select("papel")
    .eq("id", user.id)
    .single();

  console.log("[pos-login] profile:", profile);

  if (profile?.papel === "ADMIN") {
    redirect("/admin/skills");
  }

  redirect("/membros");
}
