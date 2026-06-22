-- Políticas RLS do NexSkills
-- Rode no SQL Editor do Supabase (aba "New query").

-- 1. Remove políticas antigas para evitar conflito ao re-rodar.
DROP POLICY IF EXISTS "perfis_select_own" ON perfis;
DROP POLICY IF EXISTS "perfis_select_admin" ON perfis;
DROP POLICY IF EXISTS "perfis_insert_own" ON perfis;
DROP POLICY IF EXISTS "perfis_insert_admin" ON perfis;
DROP POLICY IF EXISTS "perfis_update_own" ON perfis;
DROP POLICY IF EXISTS "perfis_update_admin" ON perfis;
DROP POLICY IF EXISTS "perfis_delete_admin" ON perfis;
DROP POLICY IF EXISTS "categorias_select_public" ON categorias;
DROP POLICY IF EXISTS "categorias_write_admin" ON categorias;
DROP POLICY IF EXISTS "tipos_skill_select_public" ON tipos_skill;
DROP POLICY IF EXISTS "tipos_skill_write_admin" ON tipos_skill;
DROP POLICY IF EXISTS "skills_select_public" ON skills;
DROP POLICY IF EXISTS "skills_write_admin" ON skills;

-- 2. Função auxiliar para verificar se o usuário é ADMIN.
--    SECURITY DEFINER + STABLE evita recursão RLS ao consultar public.perfis.
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

-- 3. Garante permissão de uso da função para usuários autenticados.
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- 4. Habilita RLS nas tabelas.
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_skill ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- 5. Políticas para perfis.
--    Próprio perfil é sempre permitido; admin pode tudo.
CREATE POLICY "perfis_select_own"
  ON perfis FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "perfis_select_admin"
  ON perfis FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "perfis_insert_own"
  ON perfis FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "perfis_insert_admin"
  ON perfis FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "perfis_update_own"
  ON perfis FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "perfis_update_admin"
  ON perfis FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "perfis_delete_admin"
  ON perfis FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 6. Categorias: leitura pública, escrita apenas ADMIN.
CREATE POLICY "categorias_select_public"
  ON categorias FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "categorias_write_admin"
  ON categorias FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 7. Tipos de skill: leitura pública, escrita apenas ADMIN.
CREATE POLICY "tipos_skill_select_public"
  ON tipos_skill FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "tipos_skill_write_admin"
  ON tipos_skill FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 8. Skills: leitura pública apenas das ativas, escrita apenas ADMIN.
CREATE POLICY "skills_select_public"
  ON skills FOR SELECT
  TO authenticated, anon
  USING (ativo = true);

CREATE POLICY "skills_write_admin"
  ON skills FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));
