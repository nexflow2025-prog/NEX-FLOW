-- RESET COMPLETO DAS POLÍTICAS RLS
-- Rode isso no SQL Editor do Supabase quando quiser recriar as políticas do zero.

-- 1. Desabilita RLS temporariamente.
ALTER TABLE IF EXISTS perfis DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categorias DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tipos_skill DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS skills DISABLE ROW LEVEL SECURITY;

-- 2. Remove todas as políticas antigas (se existirem).
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

-- Remove políticas padrão criadas pelo Supabase, se existirem.
DROP POLICY IF EXISTS "Enable read access for all users" ON perfis;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON perfis;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON perfis;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON perfis;
DROP POLICY IF EXISTS "Enable read access for all users" ON categorias;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON categorias;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON categorias;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON categorias;
DROP POLICY IF EXISTS "Enable read access for all users" ON tipos_skill;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON tipos_skill;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON tipos_skill;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON tipos_skill;
DROP POLICY IF EXISTS "Enable read access for all users" ON skills;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON skills;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON skills;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON skills;

-- 3. Recria a função is_admin de forma segura (security definer + stable evita recursão).
DROP FUNCTION IF EXISTS public.is_admin(uuid);

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
      AND papel = 'ADMIN'
  );
$$;

-- 4. Habilita RLS.
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipos_skill ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- 5. Recria as políticas.

-- PERFIS: próprio perfil ou admin.
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

-- CATEGORIAS: leitura pública, escrita apenas ADMIN.
CREATE POLICY "categorias_select_public"
  ON categorias FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "categorias_write_admin"
  ON categorias FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- TIPOS_SKILL: leitura pública, escrita apenas ADMIN.
CREATE POLICY "tipos_skill_select_public"
  ON tipos_skill FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "tipos_skill_write_admin"
  ON tipos_skill FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- SKILLS: leitura pública apenas das ativas, escrita apenas ADMIN.
CREATE POLICY "skills_select_public"
  ON skills FOR SELECT
  TO authenticated, anon
  USING (ativo = true);

CREATE POLICY "skills_write_admin"
  ON skills FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 6. Garante permissão de uso da função is_admin.
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
