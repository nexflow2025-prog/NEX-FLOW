import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
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

  if (profile?.papel !== "ADMIN") {
    redirect("/");
  }

  return { supabase, user, profile };
}

export async function checkAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Não autenticado");
  }

  const { data: profile } = await supabase
    .from("perfis")
    .select("papel")
    .eq("id", user.id)
    .single();

  if (profile?.papel !== "ADMIN") {
    throw new Error("Acesso negado");
  }

  return supabase;
}
