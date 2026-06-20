"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { useUser } from "@/hooks/use-user";

export function UserNav() {
  const pathname = usePathname();
  const { user, isAdmin, isLoading } = useUser();

  const isAdminSkills = pathname === "/admin/skills";

  if (isLoading) {
    return (
      <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
    );
  }

  if (!user) {
    return (
      <Button
        asChild
        size="sm"
        className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
      >
        <Link href="/entrar">Entrar</Link>
      </Button>
    );
  }

  // Ações específicas do header dentro da área admin /admin/skills
  if (isAdminSkills) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 p-1 backdrop-blur-sm">
        <SignOutButton
          variant="ghost"
          size="sm"
          className="rounded-full px-4 text-sm font-medium text-foreground hover:bg-[#e62630]/10 hover:text-[#ff6b73]"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium text-foreground">
          {user.user_metadata?.name || user.email?.split("@")[0]}
        </p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
      {user.user_metadata?.avatar_url && (
        <Image
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.name || "Avatar"}
          width={36}
          height={36}
          unoptimized
          className="size-9 rounded-full border border-border"
        />
      )}
      {isAdmin && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-border text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
        >
          <Link href="/admin/skills">Admin</Link>
        </Button>
      )}
      <SignOutButton variant="ghost" className="text-muted-foreground hover:text-foreground" />
    </div>
  );
}
