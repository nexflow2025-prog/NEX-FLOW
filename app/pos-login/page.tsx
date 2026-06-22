import Link from "next/link";
import { redirect } from "next/navigation";

import { CheckoutButton } from "@/components/marketing/CheckoutButton";
import { createClient } from "@/lib/supabase/server";
import { getCategoriesWithSkills } from "@/lib/skills-db";
import { countPreviewSkills, countSkills } from "@/lib/skills";

export default async function PosLoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("perfis")
    .select("role, acesso_liberado")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "ADMIN";
  const hasFullAccess = isAdmin || profile?.acesso_liberado === true;

  if (isAdmin) {
    redirect("/admin/skills");
  }

  if (hasFullAccess) {
    redirect("/membros");
  }

  const categories = await getCategoriesWithSkills();
  const totalSkills = countSkills(categories);
  const previewSkills = countPreviewSkills(categories);

  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <section className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-2xl">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[#e62630]">
          Acesso gratuito ativo
        </p>

        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-extrabold sm:text-4xl">
          Escolha como quer continuar
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Você já pode explorar {previewSkills} skills liberadas. Para acessar o catálogo completo com {totalSkills} skills, libere o acesso vitalício.
        </p>

        <div className="mt-8 space-y-3">
          <CheckoutButton
            totalSkills={totalSkills}
            label={`Liberar ${totalSkills} skills por R$27 →`}
          />

          <Link
            href="/catalogo?preview=1"
            className="block rounded-xl border border-border px-5 py-4 text-sm font-bold text-foreground transition hover:border-[#e62630]/60"
          >
            Explorar {previewSkills} skills liberadas
          </Link>
        </div>
      </section>
    </main>
  );
}
