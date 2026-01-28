-- ============================================
-- MIGRAÇÃO SEGURA - Adiciona Colunas Faltantes
-- Para usar quando a tabela já existe e tem dados
-- ============================================

-- Este script adiciona apenas as colunas que faltam
-- Não remove dados existentes

BEGIN;

-- Adiciona colunas de identificação
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS old_id INTEGER;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS ref TEXT;

-- Adiciona colunas básicas
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS tipoimovel TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS subtipoimovel TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS transacao TEXT;

-- Adiciona colunas de valores
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS valor NUMERIC(12,2);

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS valor_condominio NUMERIC(10,2);

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS valor_iptu NUMERIC(10,2);

-- Adiciona colunas de áreas
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS area_privativa NUMERIC(10,2);

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS area_construida NUMERIC(10,2);

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS area_total NUMERIC(10,2);

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS area_terreno NUMERIC(10,2);

-- Adiciona colunas de características
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS dormitorios INTEGER;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS banheiro INTEGER;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS suites INTEGER;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS vagas INTEGER;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS mobiliado BOOLEAN DEFAULT FALSE;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS em_condominio BOOLEAN DEFAULT FALSE;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS ano_construcao INTEGER;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS aceitafinanciamento BOOLEAN DEFAULT FALSE;

-- Adiciona colunas de endereço
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_logradouro TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_numero TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_complemento TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_cep TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_bairro TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_nome_condominio TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_zona TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_regiao TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_pontoreferencia TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_cidade TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_estado TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS endereco_pais TEXT;

-- Adiciona colunas de descrição
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS descricao TEXT;

-- Adiciona colunas de empreendimento
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS empreendimento_estagio TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS empreendimento_inicio DATE;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS empreendimento_terminio DATE;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS empreendimento_nome TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS empreendimento_descricao TEXT;

-- Adiciona colunas de mídia
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS video TEXT;

-- images_urls já foi adicionado anteriormente, mas vamos garantir
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS images_urls JSONB DEFAULT '[]'::jsonb;

-- Adiciona colunas de características
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS caracteristicas JSONB DEFAULT '[]'::jsonb;

-- Adiciona colunas de status
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS destacado BOOLEAN DEFAULT FALSE;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS imovel_status TEXT;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS imovel_situacao TEXT;

-- Adiciona colunas de datas
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS data_cadastro TIMESTAMPTZ;

ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS data_atualizado TIMESTAMPTZ;

-- Cria índices
CREATE INDEX IF NOT EXISTS idx_produtos_old_id ON public."Hsmartins_Produtos"(old_id);
CREATE INDEX IF NOT EXISTS idx_produtos_tipoimovel ON public."Hsmartins_Produtos"(tipoimovel);
CREATE INDEX IF NOT EXISTS idx_produtos_cidade ON public."Hsmartins_Produtos"(endereco_cidade);
CREATE INDEX IF NOT EXISTS idx_produtos_status ON public."Hsmartins_Produtos"(imovel_status);
CREATE INDEX IF NOT EXISTS idx_produtos_destacado ON public."Hsmartins_Produtos"(destacado);
CREATE INDEX IF NOT EXISTS idx_produtos_valor ON public."Hsmartins_Produtos"(valor);

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

COMMIT;

-- Verificação
SELECT 
    column_name, 
    data_type 
FROM information_schema.columns 
WHERE table_name = 'Hsmartins_Produtos' 
ORDER BY ordinal_position;
