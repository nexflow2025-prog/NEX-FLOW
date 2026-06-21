import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Assinatura do Stripe ausente." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[stripe/webhook] assinatura inválida:", message);
    return NextResponse.json(
      { error: `Assinatura inválida: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;

    if (!userId) {
      console.error("[stripe/webhook] user_id ausente nos metadata:", session.id);
      return NextResponse.json(
        { error: "user_id ausente nos metadata." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("perfis")
      .update({
        acesso_liberado: true,
        stripe_customer_id:
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id || null,
        stripe_checkout_session_id: session.id,
        stripe_payment_status: session.payment_status,
        acesso_liberado_em: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("[stripe/webhook] erro ao atualizar perfil:", error);
      return NextResponse.json(
        { error: "Erro ao liberar acesso." },
        { status: 500 }
      );
    }

    console.log("[stripe/webhook] acesso liberado para:", userId);
  }

  return NextResponse.json({ received: true });
}
