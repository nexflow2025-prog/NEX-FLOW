"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserNav } from "@/components/auth/UserNav";
import { LoginModal } from "@/components/auth/LoginModal";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Catálogo", href: "/explorer" },
  { label: "Área de membros", href: "/membros" },
  { label: "Guia", href: "/guia" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMembros = pathname === "/membros";
  const isAdmin = pathname.startsWith("/admin");
  const showUserNav = isMembros || isAdmin;

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-baseline gap-1">
            <span className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-[#ff3a44] transition-colors group-hover:text-[#ff6b73]">
              Nex
            </span>
            <span className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-white">
              Skills
            </span>
          </Link>

          {isAdmin && pathname !== "/admin/skills" && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden text-sm text-muted-foreground hover:text-foreground md:flex"
            >
              <Link href="/admin/skills">← Voltar</Link>
            </Button>
          )}
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {isHome ? (
            <LoginModal>
              <Button
                size="sm"
                className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
              >
                Área de membros
              </Button>
            </LoginModal>
          ) : isAdmin ? null : (
            <>
              {nav
                .filter((item) => !(isMembros && (item.href === "/explorer" || item.href === "/membros")))
                .map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
            </>
          )}
          {showUserNav && (
            <div className="ml-4">
              <Suspense fallback={<div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />}>
                <UserNav />
              </Suspense>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {isAdmin && pathname !== "/admin/skills" && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <Link href="/admin/skills">← Voltar</Link>
            </Button>
          )}
          {showUserNav && (
            <Suspense fallback={<div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />}>
              <UserNav />
            </Suspense>
          )}
          {!isAdmin && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Abrir menu">
                    <Menu className="size-5" />
                  </Button>
                }
              />
              <SheetContent side="right" className="border-border bg-card">
                <div className="flex flex-col gap-6 pt-8">
                  {isHome ? (
                    <LoginModal>
                      <button
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-left font-[family-name:var(--font-heading)] text-lg font-bold text-foreground transition-colors hover:text-[#ff6b73]"
                        )}
                      >
                        Área de membros
                      </button>
                    </LoginModal>
                  ) : (
                    nav
                      .filter((item) => !(isMembros && (item.href === "/explorer" || item.href === "/membros")))
                      .map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "font-[family-name:var(--font-heading)] text-lg font-bold text-foreground transition-colors hover:text-[#ff6b73]"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
