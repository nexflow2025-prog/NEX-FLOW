"use client";

import React, { useState } from "react";

interface LoginFormProps {
  onClose?: () => void;
  onSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function LoginForm({
  onClose,
  onSubmit,
  loading,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit({ email, password });
    }
    onClose?.();
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-[#141318] border border-[#2c2330] p-6 mx-2">
      <div className="py-4 flex justify-center">
        <div className="flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[#ff3a44]">
            Nex
          </span>
          <span className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-white">
            Skills
          </span>
        </div>
      </div>

      <h1 className="mb-6 text-center text-2xl font-semibold text-white">
        Entrar na conta
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm text-[#7c7682]">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            required
            className="py-2.5 w-full rounded-lg border border-[#2c2330] bg-[#101013] px-3 text-center text-white placeholder-[#7c7682] focus:ring-2 focus:ring-[#e62630] focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block text-sm text-[#7c7682]"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            autoComplete="current-password"
            required
            className="py-2.5 w-full rounded-lg border border-[#2c2330] bg-[#101013] px-3 text-center text-white placeholder-[#7c7682] focus:ring-2 focus:ring-[#e62630] focus:outline-none"
          />
        </div>

        {error && (
          <p className="mb-4 text-center text-sm text-[#ff6b73]">{error}</p>
        )}

        <div className="mb-2 text-right">
          <a
            href="#"
            className="text-sm text-[#7c7682] hover:text-[#ff6b73]"
          >
            Esqueceu a senha?
          </a>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-2.5 font-medium w-full rounded-lg bg-[#e62630] text-white transition-colors duration-300 hover:bg-[#ff3a44] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[#7c7682]">
        Ao clicar em entrar, você concorda com nossos
        <a href="#" className="underline hover:text-[#ff6b73]">
          Termos de Serviço
        </a>{" "}
        e{" "}
        <a href="#" className="underline hover:text-[#ff6b73]">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  );
}
