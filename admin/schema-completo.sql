-- ============================================
-- SCHEMA COMPLETO - Tabela Hsmartins_Produtos
-- Migração do XML antigo para novo sistema
-- ============================================

-- ATENÇÃO: Este script irá RECRIAR a tabela do zero
-- Se você tem dados importantes, faça backup primeiro!

-- Drop da tabela antiga (necessário para migração)
DROP TABLE IF EXISTS public."Hsmartins_Produtos" CASCADE;

-- Cria tabela completa com todos os campos do XML
CREATE TABLE public."Hsmartins_Produtos" (
    -- Identificação
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    old_id INTEGER,  -- ID do sistema antigo
    ref TEXT,  -- Referência interna
    
    -- Informações Básicas
    title TEXT NOT NULL,
    tipoimovel TEXT,  -- Apartamento, Casa, Chácara, etc
    subtipoimovel TEXT,
    transacao TEXT,  -- Venda, Aluguel
    category TEXT,  -- Categoria para exibição
    
    -- Valores
    valor NUMERIC(12,2),  -- Preço principal
    price_current TEXT,  -- Preço formatado para exibição
    price_original TEXT,  -- Preço anterior (se houver desconto)
    valor_condominio NUMERIC(10,2),
    valor_iptu NUMERIC(10,2),
    
    -- Áreas
    area_privativa NUMERIC(10,2),
    area_construida NUMERIC(10,2),
    area_total NUMERIC(10,2),
    area_terreno NUMERIC(10,2),
    
    -- Características do Imóvel
    dormitorios INTEGER,
    banheiro INTEGER,
    suites INTEGER,
    vagas INTEGER,
    mobiliado BOOLEAN DEFAULT FALSE,
    em_condominio BOOLEAN DEFAULT FALSE,
    ano_construcao INTEGER,
    aceitafinanciamento BOOLEAN DEFAULT FALSE,
    
    -- Endereço
    endereco_logradouro TEXT,
    endereco_numero TEXT,
    endereco_complemento TEXT,
    endereco_cep TEXT,
    endereco_bairro TEXT,
    endereco_nome_condominio TEXT,
    endereco_zona TEXT,
    endereco_regiao TEXT,
    endereco_pontoreferencia TEXT,
    endereco_cidade TEXT,
    endereco_estado TEXT,
    endereco_pais TEXT,
    
    -- Descrição e Detalhes
    descricao TEXT,
    
    -- Empreendimento
    empreendimento_estagio TEXT,
    empreendimento_inicio DATE,
    empreendimento_terminio DATE,
    empreendimento_nome TEXT,
    empreendimento_descricao TEXT,
    
    -- Mídia
    video TEXT,  -- URL do vídeo (YouTube, etc)
    image_url TEXT,  -- Imagem principal (primeira do array)
    images_urls JSONB DEFAULT '[]'::jsonb,  -- Array de URLs de todas as imagens
    
    -- Características (array de features)
    caracteristicas JSONB DEFAULT '[]'::jsonb,
    
    -- Status e Controle
    destacado BOOLEAN DEFAULT FALSE,
    imovel_status TEXT,  -- Ativo, Inativo
    imovel_situacao TEXT,  -- Disponível, Vendido, etc
    
    -- Campos para compatibilidade com sistema atual
    rating TEXT,
    installments TEXT,
    badge_text TEXT,
    badge_style TEXT,
    
    -- Datas
    data_cadastro TIMESTAMPTZ,
    data_atualizado TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_produtos_old_id ON public."Hsmartins_Produtos"(old_id);
CREATE INDEX IF NOT EXISTS idx_produtos_tipoimovel ON public."Hsmartins_Produtos"(tipoimovel);
CREATE INDEX IF NOT EXISTS idx_produtos_cidade ON public."Hsmartins_Produtos"(endereco_cidade);
CREATE INDEX IF NOT EXISTS idx_produtos_status ON public."Hsmartins_Produtos"(imovel_status);
CREATE INDEX IF NOT EXISTS idx_produtos_destacado ON public."Hsmartins_Produtos"(destacado);
CREATE INDEX IF NOT EXISTS idx_produtos_valor ON public."Hsmartins_Produtos"(valor);

-- Habilita Row Level Security (RLS)
ALTER TABLE public."Hsmartins_Produtos" ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
DROP POLICY IF EXISTS "Permitir leitura pública de produtos" ON public."Hsmartins_Produtos";
CREATE POLICY "Permitir leitura pública de produtos"
ON public."Hsmartins_Produtos"
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Permitir inserção para usuários autenticados" ON public."Hsmartins_Produtos";
CREATE POLICY "Permitir inserção para usuários autenticados"
ON public."Hsmartins_Produtos"
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização para usuários autenticados" ON public."Hsmartins_Produtos";
CREATE POLICY "Permitir atualização para usuários autenticados"
ON public."Hsmartins_Produtos"
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir exclusão para usuários autenticados" ON public."Hsmartins_Produtos";
CREATE POLICY "Permitir exclusão para usuários autenticados"
ON public."Hsmartins_Produtos"
FOR DELETE
TO public
USING (true);

-- Comentários nas colunas
COMMENT ON TABLE public."Hsmartins_Produtos" IS 'Tabela completa de imóveis da HS Martins - migrada do sistema antigo';
COMMENT ON COLUMN public."Hsmartins_Produtos".old_id IS 'ID do sistema antigo para referência';
COMMENT ON COLUMN public."Hsmartins_Produtos".images_urls IS 'Array JSON de URLs das imagens do imóvel';
COMMENT ON COLUMN public."Hsmartins_Produtos".caracteristicas IS 'Array JSON de características do imóvel';

-- View para consultas simplificadas (apenas imóveis ativos)
CREATE OR REPLACE VIEW public."Hsmartins_Produtos_Ativos" AS
SELECT 
    id,
    title,
    tipoimovel,
    category,
    price_current,
    price_original,
    image_url,
    images_urls,
    endereco_cidade,
    endereco_bairro,
    dormitorios,
    banheiro,
    vagas,
    area_construida,
    rating,
    installments,
    badge_text,
    badge_style,
    destacado,
    created_at
FROM public."Hsmartins_Produtos"
WHERE imovel_status = 'Ativo' OR imovel_status IS NULL
ORDER BY destacado DESC, created_at DESC;

-- Grant de permissões
GRANT SELECT ON public."Hsmartins_Produtos_Ativos" TO PUBLIC;
