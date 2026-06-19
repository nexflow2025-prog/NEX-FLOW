import "dotenv/config";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function createAdmin() {
  const email = "admin@admin.com";
  const password = "123456";

  // Verifica se já existe
  const { data: existing } = await supabase
    .from("perfis")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    console.log("Usuário admin já existe.");
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: "Administrador" },
  });

  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase.from("perfis").insert({
      id: data.user.id,
      nome: "Administrador",
      papel: "ADMIN",
    });

    if (profileError) throw profileError;
  }

  console.log("Usuário admin criado com sucesso:", data.user?.id);
}

createAdmin().catch((err) => {
  console.error("Erro ao criar admin:", err);
  process.exit(1);
});
