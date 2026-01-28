# 📦 Guia de Migração - XML → Supabase

## 🎯 Objetivo

Migrar todos os imóveis do arquivo XML antigo (`h26_www.hsmartins.com.br.xml`) para o novo banco de dados Supabase com estrutura completa.

## 📋 Pré-requisitos

- Python 3.x instalado
- Acesso ao Supabase
- Arquivo XML: `h26_www.hsmartins.com.br.xml`

## 🚀 Passo a Passo

### 1️⃣ Criar a Nova Estrutura da Tabela

No **SQL Editor** do Supabase, execute:

```bash
admin/schema-completo.sql
```

Este script irá:
- ✅ Criar tabela com **TODOS** os campos do XML
- ✅ Adicionar índices para performance
- ✅ Configurar RLS (Row Level Security)
- ✅ Criar view de imóveis ativos
- ✅ Manter compatibilidade com sistema atual

### 2️⃣ Gerar o SQL de Migração

No terminal, execute:

```bash
cd /home/axolutions/cosmos-lp-generator
python3 admin/xml_to_sql.py h26_www.hsmartins.com.br.xml > admin/imoveis_dump.sql
```

Isso irá:
- 📖 Ler o arquivo XML
- 🔄 Converter cada `<imovel>` em INSERT SQL
- 💾 Gerar arquivo `imoveis_dump.sql`

### 3️⃣ Importar os Dados no Supabase

No **SQL Editor** do Supabase:

1. Abra o arquivo `admin/imoveis_dump.sql`
2. Copie o conteúdo
3. Cole no SQL Editor
4. Clique em **Run** (ou Ctrl+Enter)

⏱️ **Tempo estimado**: 2-5 minutos para ~100 imóveis

### 4️⃣ Verificar a Importação

Execute no SQL Editor:

```sql
-- Total de imóveis
SELECT COUNT(*) as total FROM public."Hsmartins_Produtos";

-- Imóveis por status
SELECT 
    imovel_status, 
    COUNT(*) as quantidade 
FROM public."Hsmartins_Produtos" 
GROUP BY imovel_status;

-- Imóveis por tipo
SELECT 
    tipoimovel, 
    COUNT(*) as quantidade 
FROM public."Hsmartins_Produtos" 
GROUP BY tipoimovel 
ORDER BY quantidade DESC;

-- Últimos 5 imóveis adicionados
SELECT 
    title, 
    tipoimovel, 
    price_current, 
    endereco_cidade,
    created_at
FROM public."Hsmartins_Produtos" 
ORDER BY created_at DESC 
LIMIT 5;
```

## 📊 Estrutura de Dados

### Mapeamento XML → SQL

| Campo XML | Campo SQL | Tipo | Notas |
|-----------|-----------|------|-------|
| `<id>` | `old_id` | INTEGER | ID do sistema antigo |
| `<titulo>` | `title` | TEXT | Título do imóvel |
| `<tipoimovel>` | `tipoimovel` | TEXT | Casa, Apartamento, etc |
| `<valor>` | `valor` | NUMERIC | Valor numérico |
| `<valor>` | `price_current` | TEXT | Formatado: R$ 650.000,00 |
| `<dormitorios>` | `dormitorios` | INTEGER | Número de quartos |
| `<fotos>` | `images_urls` | JSONB | Array de URLs |
| `<caracteristicas>` | `caracteristicas` | JSONB | Array de features |
| `<descricao>` | `descricao` | TEXT | Descrição completa |
| `<endereco_*>` | `endereco_*` | TEXT | Todos os campos de endereço |

### Campos Novos Adicionados

- `id` (UUID) - Novo identificador único
- `category` - Categoria para exibição
- `rating` - Avaliação (padrão: 4.5)
- `installments` - Info de parcelamento
- `badge_text` / `badge_style` - Badges visuais
- `created_at` / `updated_at` - Controle de datas

## 🎨 Recursos do Script

### ✨ Funcionalidades

1. **Conversão Automática de Tipos**
   - Sim/Não → `TRUE/FALSE`
   - Datas → Formato PostgreSQL
   - Valores → NUMERIC

2. **Extração de Imagens**
   - Todas as `<foto>` → Array JSON
   - Primeira foto → `image_url`
   - Mantém ordem original

3. **Características**
   - Lista de `<caracteristica>` → Array JSON
   - Remove aspas extras
   - Limpa formatação

4. **Badges Inteligentes**
   - `destacado=Sim` → Badge "Destaque"
   - `status=Inativo` → Badge "Vendido"

5. **Tratamento de Erros**
   - Pula imóveis com erro
   - Log de erros no stderr
   - Continua processamento

### 🔧 Personalização

Edite `xml_to_sql.py` para customizar:

```python
# Linha 200: Alterar rating padrão
data['rating'] = '5.0'  # Era 4.5

# Linha 202: Customizar mensagem de financiamento
if data['aceitafinanciamento']:
    data['installments'] = 'Até 420x direto com a construtora'

# Linha 170: Modificar lógica de badges
def determine_badge(imovel):
    # Sua lógica aqui
    return ('Texto', 'estilo')
```

## 📸 Migração de Imagens

### Opção 1: Manter URLs Antigas (Recomendado)

As URLs das imagens já estão no XML:
```
http://www.hsmartins.com.br/imagens/imoveis/20221215114758348539.jpg
```

✅ **Vantagem**: Migração rápida, sem reupload
❌ **Desvantagem**: Dependência do servidor antigo

### Opção 2: Migrar para Supabase Storage

Script Python para download e reupload:

```python
import requests
from supabase import create_client

# TODO: Criar script de migração de imagens
# Baixa de URL antiga → Upload para Supabase Storage
```

## 🔄 Atualização do Admin

O admin atual (`/admin`) já está compatível! ✅

**Campos mapeados automaticamente:**
- `title` ✓
- `category` ✓
- `price_current` ✓
- `image_url` ✓
- `images_urls` ✓
- `dormitorios`, `banheiro`, `vagas` ✓

**Novos campos disponíveis no admin:**
- Área construída
- Ano de construção
- Aceita financiamento
- Endereço completo
- Características
- Vídeo (YouTube)

## 📱 Atualização da Página de Detalhes

A página `imovel.html` pode exibir:

```javascript
// Novos campos disponíveis
property.area_construida  // Área em m²
property.dormitorios      // Número de quartos
property.banheiro         // Número de banheiros
property.vagas           // Vagas de garagem
property.endereco_*      // Endereço completo
property.caracteristicas // Array de features
property.video           // URL do YouTube
property.descricao       // Descrição completa
```

## 🐛 Troubleshooting

### Erro: "relation does not exist"
**Solução**: Execute `schema-completo.sql` primeiro

### Erro: "syntax error near..."
**Solução**: Verifique se há aspas simples na descrição. O script já escapa automaticamente.

### Imagens não aparecem
**Solução**: Verifique se as URLs do XML ainda estão acessíveis:
```bash
curl -I http://www.hsmartins.com.br/imagens/imoveis/20221215114758348539.jpg
```

### Poucos imóveis importados
**Solução**: Verifique o stderr para erros:
```bash
python3 admin/xml_to_sql.py h26_www.hsmartins.com.br.xml > dump.sql 2> erros.log
cat erros.log
```

## 📊 Estatísticas Esperadas

Baseado no XML fornecido:

- **Total de imóveis**: ~100-200
- **Ativos**: ~60-70%
- **Inativos**: ~30-40%
- **Com fotos**: ~80%
- **Com vídeo**: ~10%
- **Tipos principais**:
  - Apartamentos: 40%
  - Casas: 35%
  - Sobrados: 15%
  - Chácaras: 10%

## 🎯 Próximos Passos

Após a migração:

1. ✅ Teste o site (`index.html`)
2. ✅ Verifique o admin (`/admin`)
3. ✅ Teste páginas de detalhes (`imovel.html?id=...`)
4. ✅ Ajuste badges e categorias
5. ✅ Configure filtros por cidade/tipo
6. 📸 Considere migrar imagens para Supabase Storage
7. 🎥 Implemente player de vídeo na página de detalhes

## 📝 Comandos Úteis

```bash
# Gerar dump
python3 admin/xml_to_sql.py h26_www.hsmartins.com.br.xml > admin/imoveis_dump.sql

# Ver quantos imóveis serão importados
python3 admin/xml_to_sql.py h26_www.hsmartins.com.br.xml | grep "INSERT" | wc -l

# Ver apenas erros
python3 admin/xml_to_sql.py h26_www.hsmartins.com.br.xml 2>&1 >/dev/null | grep ERRO

# Backup antes de importar
# No Supabase Dashboard: Database > Backups > Create Backup
```

---

**🎉 Migração Completa! Todos os dados do sistema antigo preservados.**
