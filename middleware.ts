import { type NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/supabase/middleware";

// Rotas que qualquer pessoa pode acessar, logada ou não.
const PUBLIC_PATHS = ["/", "/entrar", "/pos-login", "/auth/callback", "/catalogo"];

const ADMIN_PREFIX = "/admin";
const USER_HOME = "/catalogo";
const ADMIN_HOME = "/admin/skills";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { user, response, supabase } = await getSession(request);

  console.log("[middleware] pathname:", pathname);
  console.log("[middleware] user:", user?.id);

  // 1. Rotas públicas sempre liberadas.
  if (PUBLIC_PATHS.includes(pathname)) {
    return response;
  }

  // 2. Não autenticado tentando área restrita → login.
  if (!user) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }

  // 3. Busca o papel do usuário logado.
  const { data: profile } = await supabase
    .from("perfis")
    .select("papel")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.papel === "ADMIN";

  // 4. Usuário comum NÃO pode acessar /admin/*; manda para a área de membros.
  if (!isAdmin && pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.redirect(new URL(USER_HOME, request.url));
  }

  // 5. Libera para qualquer usuário autenticado (admin ou não).
  return response;
}

export const config = {
  // Intercepta todas as rotas, exceto arquivos estáticos, _next, API e imagens.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/|.*\\.).*)"],
};
