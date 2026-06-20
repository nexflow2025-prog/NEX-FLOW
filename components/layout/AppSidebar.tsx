"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Home,
  LogOut,
  Menu,
  Search,
  Shield,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  isAdmin: boolean;
  email: string;
  nome: string;
}

const mainNav = [
  { label: "Início", href: "/membros", icon: Home },
  { label: "Catálogo de Skills", href: "/catalogo", icon: Search },
  { label: "Guia", href: "/guia", icon: BookOpen },
];

const adminNav = [
  { label: "Gerenciar Skills", href: "/admin/skills", icon: Shield },
];

/** Deriva as iniciais do nome ou email para o avatar. */
function getInitials(nome: string): string {
  const parts = nome.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return nome.slice(0, 2).toUpperCase();
}

function SidebarSignOut() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <Button
      variant="ghost"
      onClick={async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
      }}
      className="w-full justify-start gap-3 text-[#ff3a44] hover:bg-[#ff3a44]/10 hover:text-[#ff6b73]"
    >
      <LogOut className="size-4" />
      Sair
    </Button>
  );
}

function SidebarContent({
  isAdmin,
  email,
  nome,
  onNavigate,
}: AppSidebarProps & { onNavigate?: () => void }) {
  const pathname = usePathname();

  const displayName = nome || email;
  const initials = getInitials(displayName);

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-6">
        <a href="/membros" className="flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-[#ff3a44]">
            Nex
          </span>
          <span className="font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-white">
            Flow
          </span>
        </a>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav className="flex flex-col gap-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {isAdmin && (
          <>
            <div className="my-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Admin
            </div>
            <nav className="flex flex-col gap-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-[#ff3a44]",
                      active
                        ? "bg-[#ff3a44]/15"
                        : "hover:bg-[#ff3a44]/10 hover:text-[#ff6b73]"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </>
        )}
      </div>

      {/* User footer */}
      <div className="shrink-0 border-t border-sidebar-border px-4 py-4">
        {/* Avatar + info */}
        <div className="mb-3 flex items-center gap-3 rounded-lg px-2 py-2">
          {/* Avatar circle with initials */}
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ff3a44]/15 text-sm font-bold text-[#ff3a44]">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {displayName}
            </p>
            {nome && nome !== email && (
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            )}
          </div>
        </div>

        {/* Sign out */}
        <SidebarSignOut />
      </div>
    </div>
  );
}

export function AppSidebar({ isAdmin, email, nome }: AppSidebarProps) {
  return <SidebarContent isAdmin={isAdmin} email={email} nome={nome} />;
}

export function MobileSidebar({ isAdmin, email, nome }: AppSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Abrir menu">
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent
        side="left"
        className="w-[260px] border-r border-sidebar-border bg-sidebar p-0"
      >
        <SidebarContent
          isAdmin={isAdmin}
          email={email}
          nome={nome}
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
