import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  console.log("[LOGIN DEBUG] entrou /auth/callback");

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("[LOGIN DEBUG] code presente:", Boolean(code));

  console.log("[auth/callback] code:", code ? "presente" : "ausente");

  if (!code) {
    console.error("[auth/callback] Código OAuth ausente");
    return NextResponse.redirect(
      new URL("/?error=oauth_code_missing", request.url)
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  console.log("[LOGIN DEBUG] user app_metadata:", data?.user?.app_metadata);
  console.log("[LOGIN DEBUG] user identities:", data?.user?.identities?.map((i) => ({
    provider: i.provider,
    identity_id: i.identity_id,
  })));
  console.log("[LOGIN DEBUG] sessão criada:", Boolean(data?.session));

  if (error || !data.session) {
    console.error("[auth/callback] Erro ao trocar code por sessão:", error);
    return NextResponse.redirect(
      new URL("/?error=oauth_exchange_failed", request.url)
    );
  }

  return NextResponse.redirect(new URL("/membros", request.url));
}
