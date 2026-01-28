-- Script SQL para criar a tabela Hsmartins_Produtos no Supabase
-- Execute este script no SQL Editor do Supabase

-- Cria a tabela de produtos
CREATE TABLE IF NOT EXISTS public."Hsmartins_Produtos" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    price_current TEXT NOT NULL,
    price_original TEXT,
    rating TEXT,
    installments TEXT,
    badge_text TEXT,
    badge_style TEXT,
    image_url TEXT,
    images_urls JSONB DEFAULT '[]'::jsonb,  -- Array de URLs de imagens
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Se a tabela já existe, adicione a coluna images_urls com este comando:
-- ALTER TABLE public."Hsmartins_Produtos" ADD COLUMN IF NOT EXISTS images_urls JSONB DEFAULT '[]'::jsonb;

-- Habilita Row Level Security (RLS)
ALTER TABLE public."Hsmartins_Produtos" ENABLE ROW LEVEL SECURITY;

-- Política de SELECT (leitura pública)
CREATE POLICY "Permitir leitura pública de produtos"
ON public."Hsmartins_Produtos"
FOR SELECT
TO public
USING (true);

-- Política de INSERT (qualquer usuário autenticado pode inserir)
CREATE POLICY "Permitir inserção para usuários autenticados"
ON public."Hsmartins_Produtos"
FOR INSERT
TO public
WITH CHECK (true);

-- Política de UPDATE (qualquer usuário autenticado pode atualizar)
CREATE POLICY "Permitir atualização para usuários autenticados"
ON public."Hsmartins_Produtos"
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Política de DELETE (qualquer usuário autenticado pode deletar)
CREATE POLICY "Permitir exclusão para usuários autenticados"
ON public."Hsmartins_Produtos"
FOR DELETE
TO public
USING (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_hsmartins_produtos_updated_at
    BEFORE UPDATE ON public."Hsmartins_Produtos"
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insere alguns produtos de exemplo (opcional)

-- Verificar se a tabela foi criada
SELECT * FROM public."Hsmartins_Produtos";
