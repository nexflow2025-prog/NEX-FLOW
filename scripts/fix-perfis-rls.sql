-- Corrige recursão infinita na RLS de public.perfis
-- Rode no SQL Editor do Supabase (aba "New query").

-- 1. Recria a função is_admin com SECURITY DEFINER + STABLE,
--    evitando que a verificação de admin dispare as policies da própria tabela perfis.
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.perfis
    WHERE id = user_id
      AND role = 'ADMIN'
  );
$$;

-- 2. Garante permissão de execução para usuários autenticados.
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- 3. Remove as policies antigas de perfis para evitar conflito.
DROP POLICY IF EXISTS "perfis_select_own_or_admin" ON perfis;
DROP POLICY IF EXISTS "perfis_insert_own_or_admin" ON perfis;
DROP POLICY IF EXISTS "perfis_update_own_or_admin" ON perfis;
DROP POLICY IF EXISTS "perfis_delete_admin" ON perfis;

-- 4. Recria as policies de perfis sem consultar a tabela perfis diretamente.
--    A verificação de admin passa pela função SECURITY DEFINER public.is_admin().

-- Leitura: próprio perfil.
CREATE POLICY "perfis_select_own"
  ON perfis FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Leitura: admin pode ler todos os perfis.
CREATE POLICY "perfis_select_admin"
  ON perfis FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Inserção: próprio perfil.
CREATE POLICY "perfis_insert_own"
  ON perfis FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Inserção: admin pode inserir em qualquer perfil.
CREATE POLICY "perfis_insert_admin"
  ON perfis FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

-- Atualização: próprio perfil.
CREATE POLICY "perfis_update_own"
  ON perfis FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Atualização: admin pode atualizar qualquer perfil.
CREATE POLICY "perfis_update_admin"
  ON perfis FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Exclusão: apenas admin pode remover perfis.
CREATE POLICY "perfis_delete_admin"
  ON perfis FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));
