-- Execute este SQL no Supabase para corrigir as políticas RLS

-- 1. Remove as políticas antigas
DROP POLICY IF EXISTS "Allow authenticated select" ON public."Hsmartins_Financiamentos";
DROP POLICY IF EXISTS "Allow authenticated update" ON public."Hsmartins_Financiamentos";

-- 2. Cria as novas políticas que permitem acesso anônimo (para o admin funcionar)
CREATE POLICY "Allow public select" ON public."Hsmartins_Financiamentos"
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public update" ON public."Hsmartins_Financiamentos"
    FOR UPDATE
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public delete" ON public."Hsmartins_Financiamentos"
    FOR DELETE
    TO anon, authenticated
    USING (true);
