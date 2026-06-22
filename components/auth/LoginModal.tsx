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
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
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
    console.log("[LOGIN DEBUG] ação: submit email/senha");
    setEmailLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.user) {
      setEmailLoading(false);
      setError("Email ou senha inválidos.");
      return;
    }

    setEmailLoading(false);
    setOpen(false);

    window.location.href = "/pos-login";
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    console.log("[LOGIN DEBUG] ação: clique google");

    const redirectTo = `${window.location.origin}/auth/callback`;
    console.log("[LOGIN DEBUG] chamando signInWithOAuth google");
    console.log("[Google Login] redirectTo:", redirectTo);
    console.log("[Google Login] supabase url:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          prompt: "select_account consent",
        },
      },
    });

    console.log("[LOGIN DEBUG] oauth data.url existe:", Boolean(data?.url));
    console.log("[LOGIN DEBUG] oauth error:", signInError);

    if (signInError) {
      console.error("[Google Login] Erro ao iniciar login:", signInError);
      console.error("[Google Login] Mensagem:", signInError.message);
      console.error("[Google Login] Código:", signInError.status);
      setGoogleLoading(false);
      setError(`Erro ao entrar com Google: ${signInError.message}`);
      return;
    }

    if (data?.url) {
      console.log("[Google Login] auth url:", data.url);
      window.location.href = data.url;
      return;
    }

    setGoogleLoading(false);
    setError("Não foi possível iniciar o login com Google. Verifique a configuração do provider no Supabase.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="border-none bg-transparent p-0 shadow-none sm:max-w-md flex items-center justify-center">
        <LoginForm
          onSubmit={handleSubmit}
          onGoogleSignIn={handleGoogleSignIn}
          loading={emailLoading}
          googleLoading={googleLoading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
}
