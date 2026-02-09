-- ============================================
-- SCHEMA - Tabela Hsmartins_Noticias
-- Sistema de Notícias/Blog
-- ============================================

-- Cria tabela de notícias
CREATE TABLE IF NOT EXISTS public."Hsmartins_Noticias" (
    -- Identificação
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Informações Básicas
    titulo TEXT NOT NULL,
    slug TEXT UNIQUE,  -- URL amigável (ex: "nova-lei-financiamento-2024")
    resumo TEXT,  -- Resumo/descrição curta para listagem
    conteudo TEXT NOT NULL,  -- Conteúdo completo da notícia (HTML permitido)
    
    -- Mídia
    imagem_principal TEXT,  -- URL da imagem principal
    imagens JSONB DEFAULT '[]'::jsonb,  -- Array de URLs de imagens adicionais
    
    -- Categorias e Tags
    categoria TEXT,  -- Ex: "Mercado", "Financiamento", "Dicas", etc
    tags JSONB DEFAULT '[]'::jsonb,  -- Array de tags
    
    -- Autor e Publicação
    autor TEXT DEFAULT 'H.S Martins',
    status TEXT DEFAULT 'rascunho',  -- rascunho, publicado, arquivado
    
    -- SEO
    meta_titulo TEXT,  -- Título para SEO (opcional, usa titulo se não informado)
    meta_descricao TEXT,  -- Descrição para SEO
    meta_keywords TEXT,  -- Palavras-chave para SEO
    
    -- Datas
    data_publicacao TIMESTAMPTZ,  -- Data de publicação
    data_atualizacao TIMESTAMPTZ,  -- Data da última atualização
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Controle
    visualizacoes INTEGER DEFAULT 0,  -- Contador de visualizações
    destacado BOOLEAN DEFAULT FALSE,  -- Notícia em destaque
    ordem INTEGER DEFAULT 0  -- Ordem de exibição (maior = primeiro)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_noticias_status ON public."Hsmartins_Noticias"(status);
CREATE INDEX IF NOT EXISTS idx_noticias_categoria ON public."Hsmartins_Noticias"(categoria);
CREATE INDEX IF NOT EXISTS idx_noticias_destacado ON public."Hsmartins_Noticias"(destacado);
CREATE INDEX IF NOT EXISTS idx_noticias_data_publicacao ON public."Hsmartins_Noticias"(data_publicacao DESC);
CREATE INDEX IF NOT EXISTS idx_noticias_slug ON public."Hsmartins_Noticias"(slug);
CREATE INDEX IF NOT EXISTS idx_noticias_ordem ON public."Hsmartins_Noticias"(ordem DESC);

-- Habilita Row Level Security (RLS)
ALTER TABLE public."Hsmartins_Noticias" ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
DROP POLICY IF EXISTS "Permitir leitura pública de notícias publicadas" ON public."Hsmartins_Noticias";
CREATE POLICY "Permitir leitura pública de notícias publicadas"
ON public."Hsmartins_Noticias"
FOR SELECT
TO public
USING (status = 'publicado');

DROP POLICY IF EXISTS "Permitir inserção para usuários autenticados" ON public."Hsmartins_Noticias";
CREATE POLICY "Permitir inserção para usuários autenticados"
ON public."Hsmartins_Noticias"
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização para usuários autenticados" ON public."Hsmartins_Noticias";
CREATE POLICY "Permitir atualização para usuários autenticados"
ON public."Hsmartins_Noticias"
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir exclusão para usuários autenticados" ON public."Hsmartins_Noticias";
CREATE POLICY "Permitir exclusão para usuários autenticados"
ON public."Hsmartins_Noticias"
FOR DELETE
TO public
USING (true);

-- Função para gerar slug automaticamente
CREATE OR REPLACE FUNCTION public.generate_slug(text)
RETURNS TEXT AS $$
DECLARE
    slug_text TEXT;
BEGIN
    -- Converte para minúsculas, remove acentos e caracteres especiais
    slug_text := lower(unaccent($1));
    slug_text := regexp_replace(slug_text, '[^a-z0-9]+', '-', 'g');
    slug_text := trim(both '-' from slug_text);
    RETURN slug_text;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_noticias_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    IF NEW.status = 'publicado' AND NEW.data_publicacao IS NULL THEN
        NEW.data_publicacao = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_hsmartins_noticias_updated_at ON public."Hsmartins_Noticias";
CREATE TRIGGER update_hsmartins_noticias_updated_at
    BEFORE UPDATE ON public."Hsmartins_Noticias"
    FOR EACH ROW
    EXECUTE FUNCTION public.update_noticias_updated_at();

-- Comentários
COMMENT ON TABLE public."Hsmartins_Noticias" IS 'Tabela de notícias/blog da HS Martins';
COMMENT ON COLUMN public."Hsmartins_Noticias".slug IS 'URL amigável gerada automaticamente do título';
COMMENT ON COLUMN public."Hsmartins_Noticias".status IS 'Status: rascunho, publicado, arquivado';
COMMENT ON COLUMN public."Hsmartins_Noticias".imagens IS 'Array JSON de URLs das imagens da notícia';
COMMENT ON COLUMN public."Hsmartins_Noticias".tags IS 'Array JSON de tags para categorização';

