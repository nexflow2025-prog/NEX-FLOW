"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/ui/login-form";
import { createClient } from "@/lib/supabase/client";

interface LoginModalProps {
  children?: React.ReactElement;
}

export function LoginModal({ children }: LoginModalProps) {
  const supabase = createClient();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const trigger = children || (
    <Button
      size="sm"
      className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
    >
      Entrar
    </Button>
  );

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
    setOpen(false);

    // Navegação server-side para a rota intermediária decidir o destino
    // com base no perfil, evitando race condition no cliente.
    window.location.href = "/pos-login";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="border-none bg-transparent p-0 shadow-none sm:max-w-md">
        <LoginForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
}
