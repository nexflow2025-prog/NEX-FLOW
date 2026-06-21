-- Adiciona campos necessários para controle de acesso pago via Stripe Checkout
ALTER TABLE public.perfis
  ADD COLUMN IF NOT EXISTS acesso_liberado boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id text,
  ADD COLUMN IF NOT EXISTS stripe_payment_status text,
  ADD COLUMN IF NOT EXISTS acesso_liberado_em timestamptz;

-- Comentários para documentação
COMMENT ON COLUMN public.perfis.acesso_liberado IS 'Indica se o usuário pagou e tem acesso liberado à área de membros';
COMMENT ON COLUMN public.perfis.stripe_customer_id IS 'ID do cliente no Stripe';
COMMENT ON COLUMN public.perfis.stripe_checkout_session_id IS 'ID da sessão de checkout Stripe que liberou o acesso';
COMMENT ON COLUMN public.perfis.stripe_payment_status IS 'Status do pagamento registrado pelo webhook Stripe';
COMMENT ON COLUMN public.perfis.acesso_liberado_em IS 'Data/hora em que o acesso foi liberado pelo webhook';
