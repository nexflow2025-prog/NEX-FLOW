import { redirect } from "next/navigation";

import { AppSidebar, MobileSidebar } from "@/components/layout/AppSidebar";
import { createClient } from "@/lib/supabase/server";

async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("perfis")
    .select("role")
    .eq("id", user.id)
    .single();

  return {
    user,
    isAdmin: profile?.role === "ADMIN",
    email: user.email ?? "",
    nome: (user.user_metadata?.name as string | undefined) ?? user.email ?? "",
  };
}

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/entrar");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop — full height, fixed */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <AppSidebar
          isAdmin={session.isAdmin}
          email={session.email}
          nome={session.nome}
        />
      </aside>

      {/* Mobile top bar — only visible on small screens */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <MobileSidebar
          isAdmin={session.isAdmin}
          email={session.email}
          nome={session.nome}
        />
        <a href="/membros" className="flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-heading)] text-xl font-extrabold tracking-tight text-[#ff3a44]">
            Nex
          </span>
          <span className="font-[family-name:var(--font-heading)] text-xl font-extrabold tracking-tight text-white">
            Flow
          </span>
        </a>
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col pt-14 lg:pl-64 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
