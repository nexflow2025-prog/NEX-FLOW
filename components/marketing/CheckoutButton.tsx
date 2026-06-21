"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/LoginModal";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

interface CheckoutButtonProps {
  totalSkills: number;
  label?: string;
  className?: string;
}

export function CheckoutButton({ totalSkills, label, className }: CheckoutButtonProps) {
  const { user, isLoading } = useUser();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  if (isLoading) {
    return (
      <Button
        size="lg"
        disabled
        className={cn(
          "relative h-14 w-full bg-[#e62630] font-[family-name:var(--font-mono)] text-base font-bold text-white hover:bg-[#ff3a44]",
          className
        )}
      >
        Carregando…
      </Button>
    );
  }

  if (!user) {
    return (
      <LoginModal>
        <Button
          size="lg"
          className={cn(
            "relative h-14 w-full bg-[#e62630] font-[family-name:var(--font-mono)] text-base font-bold text-white hover:bg-[#ff3a44]",
            className
          )}
        >
          {label ?? `Quero liberar minhas ${totalSkills} skills →`}
        </Button>
      </LoginModal>
    );
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Erro ao criar sessão de checkout.");
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("URL de checkout não retornada.");
    } catch (error) {
      console.error("[CheckoutButton] erro:", error);
      alert("Não foi possível iniciar o pagamento. Tente novamente.");
      setCheckoutLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleCheckout}
      disabled={checkoutLoading}
      className={cn(
        "relative h-14 w-full bg-[#e62630] font-[family-name:var(--font-mono)] text-base font-bold text-white hover:bg-[#ff3a44]",
        className
      )}
    >
      {checkoutLoading ? "Redirecionando…" : (label ?? `Quero liberar minhas ${totalSkills} skills →`)}
    </Button>
  );
}
