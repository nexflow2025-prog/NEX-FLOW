import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://nex-flow-ten.vercel.app";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
      },
      customer_email: user.email,
      success_url: `${origin}/membros?pagamento=sucesso`,
      cancel_url: `${origin}/?pagamento=cancelado`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/checkout] erro ao criar sessão:", error);
    return NextResponse.json(
      { error: "Erro ao criar checkout." },
      { status: 500 }
    );
  }
}
