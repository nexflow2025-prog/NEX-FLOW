"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import LoginForm from "@/components/ui/login-form";

export default function EntrarPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setLoading(false);
      setError("Email ou senha inválidos.");
      return;
    }

    setLoading(false);

    // Navegação server-side para a rota intermediária decidir o destino
    // com base no perfil, evitando race condition no cliente.
    window.location.href = "/pos-login";
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
    </section>
  );
}
