import "dotenv/config";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const users = [
  {
    email: "nexflow@gmail.com",
    password: "nex2025@",
    name: "Usuário NexFlow",
    role: "USER",
  },
  {
    email: "nexflowburiti@gmail.com",
    password: "nexflow2025@",
    name: "Admin NexFlow",
    role: "ADMIN",
  },
];

async function createUsers() {
  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { name: user.name },
    });

    if (error) {
      if (error.message.includes("already been registered")) {
        console.log(`Usuário ${user.email} já existe.`);
      } else {
        console.error(`Erro ao criar ${user.email}:`, error);
      }
      continue;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("perfis").insert({
        id: data.user.id,
        nome: user.name,
        role: user.role,
      });

      if (profileError) {
        console.error(`Erro ao criar perfil ${user.email}:`, profileError);
        continue;
      }
    }

    console.log(`Usuário criado: ${user.email} (${user.role})`);
  }
}

createUsers().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});
