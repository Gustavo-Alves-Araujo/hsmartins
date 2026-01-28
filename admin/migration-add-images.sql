-- Migração: Adiciona suporte para múltiplas imagens
-- Execute este script se a tabela Hsmartins_Produtos já existe

-- Adiciona coluna images_urls para armazenar array de URLs de imagens
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS images_urls JSONB DEFAULT '[]'::jsonb;

-- Migra image_url existente para images_urls (se houver dados)
UPDATE public."Hsmartins_Produtos"
SET images_urls = jsonb_build_array(image_url)
WHERE image_url IS NOT NULL 
  AND (images_urls IS NULL OR images_urls = '[]'::jsonb);

-- Adiciona comentário na coluna
COMMENT ON COLUMN public."Hsmartins_Produtos".images_urls 
IS 'Array JSON de URLs das imagens do imóvel (máximo 20 imagens)';

-- Verifica a migração
SELECT 
    title,
    image_url,
    images_urls
FROM public."Hsmartins_Produtos"
LIMIT 5;
