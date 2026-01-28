# 🎨 Novas Funcionalidades do Admin - HS Martins

## ✅ Implementado

### 📸 Múltiplas Imagens por Imóvel
- **Até 20 fotos** por imóvel
- Seleção múltipla (Ctrl/Cmd + clique nos arquivos)
- Preview antes do upload
- Upload paralelo otimizado
- Primeira imagem = imagem principal

### 💰 Máscaras de Preço Automáticas
- Formatação em tempo real: `R$ 650.000,00`
- Separadores de milhares automáticos
- Validação de entrada

### 🎯 Melhorias na Interface
- Indicador visual de imagem principal
- Botão para remover imagens individuais
- Badges "Nova" para fotos recém-adicionadas
- Status de upload com progresso

## 🚀 Como Usar

### Adicionar Múltiplas Imagens

1. **Criar/Editar Imóvel**
   - Clique em "Novo Imóvel" ou "Editar" em um existente

2. **Selecionar Imagens**
   - Clique no campo "Imagens do Imóvel"
   - Mantenha `Ctrl` (Windows/Linux) ou `Cmd` (Mac)
   - Clique em até 20 imagens
   - Confirme a seleção

3. **Preview**
   - Veja todas as imagens selecionadas
   - A primeira será a **imagem principal**
   - Badge azul "Principal" indica a foto de capa

4. **Salvar**
   - Clique em "Salvar"
   - Aguarde o upload (mostra "Enviando imagens...")
   - Pronto! ✅

### Digitar Preços

**Antes:** Você digitava `650000`
**Agora:** Digita normalmente e o sistema formata automaticamente

Exemplo:
- Digite: `650000`
- Vira: `R$ 650.000,00`

O sistema remove a formatação ao salvar no banco.

## 🗄️ Atualização do Banco de Dados

### Se a tabela já existe:

```sql
-- Execute no SQL Editor do Supabase
ALTER TABLE public."Hsmartins_Produtos" 
ADD COLUMN IF NOT EXISTS images_urls JSONB DEFAULT '[]'::jsonb;

-- Migra dados existentes
UPDATE public."Hsmartins_Produtos"
SET images_urls = jsonb_build_array(image_url)
WHERE image_url IS NOT NULL 
  AND (images_urls IS NULL OR images_urls = '[]'::jsonb);
```

Ou use o arquivo: `admin/migration-add-images.sql`

## 📊 Estrutura de Dados

### Antes (uma imagem):
```json
{
  "image_url": "https://..."
}
```

### Agora (múltiplas imagens):
```json
{
  "image_url": "https://imagem1.jpg",
  "images_urls": [
    "https://imagem1.jpg",
    "https://imagem2.jpg",
    "https://imagem3.jpg"
  ]
}
```

## 🎬 Próximos Passos (Opcional)

### Carrossel de Imagens no Site
Para mostrar todas as imagens no site com carrossel:
1. Atualizar `product-grid-advanced.js` com navegação de imagens
2. Adicionar botões prev/next
3. Indicadores de posição (1/5, 2/5, etc)

### Modal de Detalhes
Criar modal com:
- Galeria completa de imagens
- Descrição detalhada do imóvel
- Informações de contato

## 📝 Notas Técnicas

- **Formato de armazenamento**: JSONB no PostgreSQL
- **Bucket**: `Hsmartins_Produtos` (público)
- **Caminho**: `produtos/{timestamp}-{random}.{ext}`
- **Upload**: Paralelo com Promise.all()
- **Compatibilidade**: Mantém `image_url` para retrocompatibilidade

## 🐛 Troubleshooting

### Imagens não aparecem
- Verifique se o bucket é **público**
- Confirme as políticas de Storage

### Erro ao salvar com múltiplas imagens
- Execute a migração: `migration-add-images.sql`
- Verifique se a coluna `images_urls` existe

### Preview não funciona
- Verifique o console do navegador (F12)
- Limpe o cache (Ctrl+Shift+R)

---

**Desenvolvido para HS Martins Imóveis** 🏠
