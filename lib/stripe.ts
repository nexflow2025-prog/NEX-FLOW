import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeInstance) return stripeInstance;

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY não configurada.");
  }

  stripeInstance = new Stripe(secretKey, {
    apiVersion: "2026-05-27.dahlia",
    typescript: true,
  });

  return stripeInstance;
}
