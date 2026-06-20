"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/Header";

const internalRoutes = [
  "/membros",
  "/explorer",
  "/catalogo",
  "/guia",
  "/admin/skills",
  "/admin/skills/novo",
];

export function ConditionalHeader() {
  const pathname = usePathname();

  const isInternalRoute =
    internalRoutes.includes(pathname) ||
    pathname.startsWith("/admin/skills/");

  if (isInternalRoute) {
    return null;
  }

  return <Header />;
}
