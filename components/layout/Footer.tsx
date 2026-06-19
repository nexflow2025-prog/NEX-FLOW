import Link from "next/link";

import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
          {siteConfig.name} — {siteConfig.tagline} ·{" "}
          <Link
            href="/explorer"
            className="text-[#ff6b73] transition-colors hover:text-[#ff3a44]"
          >
            ver catálogo
          </Link>
        </p>
      </div>
    </footer>
  );
}
