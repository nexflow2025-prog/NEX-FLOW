"use client";

import Link from "next/link";

export function LoginButton() {
  return (
    <Link
      href="/entrar"
      className="inline-flex h-8 items-center justify-center rounded-lg bg-[#e62630] px-4 font-[family-name:var(--font-mono)] text-sm font-bold text-white transition-colors hover:bg-[#ff3a44]"
    >
      Login
    </Link>
  );
}
