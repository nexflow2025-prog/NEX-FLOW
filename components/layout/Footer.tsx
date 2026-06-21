"use client";

import { siteConfig } from "@/data/site";
import { TermsDialog } from "@/components/legal/TermsDialog";
import { PrivacyDialog } from "@/components/legal/PrivacyDialog";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
            {siteConfig.name} — {siteConfig.tagline}
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-4 font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
            <TermsDialog
              trigger={
                <button
                  type="button"
                  className="transition-colors hover:text-foreground"
                >
                  Termos de Uso
                </button>
              }
            />
            <PrivacyDialog
              trigger={
                <button
                  type="button"
                  className="transition-colors hover:text-foreground"
                >
                  Política de Privacidade
                </button>
              }
            />
            <a
              href="mailto:nexflow2025@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
