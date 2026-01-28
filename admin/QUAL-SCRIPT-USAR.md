# 🔧 Guia de Migração - Escolha seu Cenário

## ⚠️ IMPORTANTE: Escolha o Script Correto

Você tem **2 opções** de migração dependendo da situação:

---

## 🆕 Opção 1: Tabela Nova (RECOMENDADO)

**Use quando:**
- ✅ Primeira instalação
- ✅ Tabela vazia ou com dados de teste
- ✅ Pode apagar e recriar a tabela

**Script:** `schema-completo.sql`

**Características:**
- 🔴 **APAGA** a tabela existente
- ✅ Cria estrutura do zero
- ✅ Todas as colunas corretas
- ✅ Mais rápido

**Como executar:**

```sql
-- No SQL Editor do Supabase
-- Cole e execute:

-- O conteúdo de: admin/schema-completo.sql
```

**Depois execute:**
```sql
-- Cole e execute:
-- O conteúdo de: admin/imoveis_dump.sql
```

---

## 🔄 Opção 2: Migração Segura (Tabela Existente)

**Use quando:**
- ⚠️ Já tem dados importantes na tabela
- ⚠️ Não pode apagar a tabela
- ⚠️ Quer preservar registros existentes

**Script:** `migration-add-columns.sql`

**Características:**
- ✅ **PRESERVA** dados existentes
- ✅ Adiciona apenas colunas faltantes
- ✅ Seguro para produção
- ⏱️ Pode ser mais lento

**Como executar:**

```sql
-- No SQL Editor do Supabase
-- Cole e execute:

-- O conteúdo de: admin/migration-add-columns.sql
```

**Depois execute:**
```sql
-- Cole e execute:
-- O conteúdo de: admin/imoveis_dump.sql
```

---

## 🎯 Qual Escolher?

### Use **Opção 1** (schema-completo.sql) se:
- ✅ Está começando do zero
- ✅ Não tem dados importantes
- ✅ Quer instalar tudo limpo

### Use **Opção 2** (migration-add-columns.sql) se:
- ⚠️ Já adicionou imóveis pelo admin
- ⚠️ Tem dados que não pode perder
- ⚠️ Só quer adicionar as colunas novas

---

## 📊 Fluxo Completo

### Para Instalação Nova (Opção 1):

```bash
1️⃣ Abra Supabase SQL Editor
2️⃣ Execute: admin/schema-completo.sql
3️⃣ Execute: admin/imoveis_dump.sql
4️⃣ Verifique: SELECT COUNT(*) FROM public."Hsmartins_Produtos";
   → Deve retornar: 132
```

### Para Migração Segura (Opção 2):

```bash
1️⃣ Abra Supabase SQL Editor
2️⃣ Execute: admin/migration-add-columns.sql
3️⃣ Execute: admin/imoveis_dump.sql
4️⃣ Verifique: SELECT COUNT(*) FROM public."Hsmartins_Produtos";
   → Deve retornar: seus registros antigos + 132
```

---

## 🔍 Verificação Pós-Migração

Execute no SQL Editor:

```sql
-- 1. Ver total de registros
SELECT COUNT(*) as total FROM public."Hsmartins_Produtos";

-- 2. Ver estrutura da tabela
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'Hsmartins_Produtos'
ORDER BY ordinal_position;

-- 3. Ver últimos imóveis
SELECT 
    title,
    tipoimovel,
    price_current,
    endereco_cidade,
    created_at
FROM public."Hsmartins_Produtos" 
ORDER BY created_at DESC 
LIMIT 5;

-- 4. Verificar imagens
SELECT 
    title,
    jsonb_array_length(images_urls) as num_fotos
FROM public."Hsmartins_Produtos"
WHERE images_urls != '[]'::jsonb
LIMIT 10;
```

---

## ⚠️ Erro Comum: "column does not exist"

**Causa:** Você executou `schema-completo.sql` quando a tabela já existia, mas o `CREATE TABLE IF NOT EXISTS` não adiciona colunas.

**Solução:**

### Opção A (Rápida): Recriar do zero
```sql
DROP TABLE IF EXISTS public."Hsmartins_Produtos" CASCADE;
-- Depois execute: admin/schema-completo.sql
```

### Opção B (Segura): Adicionar colunas
```sql
-- Execute: admin/migration-add-columns.sql
```

---

## 🛟 Backup Antes de Migrar

**Sempre faça backup se tiver dados importantes!**

### No Supabase Dashboard:
1. Database → Backups
2. Create Backup
3. Aguarde conclusão
4. Execute a migração

### Via SQL:
```sql
-- Backup em tabela temporária
CREATE TABLE backup_produtos AS 
SELECT * FROM public."Hsmartins_Produtos";

-- Depois da migração, se der problema:
-- DROP TABLE public."Hsmartins_Produtos";
-- ALTER TABLE backup_produtos RENAME TO "Hsmartins_Produtos";
```

---

## 📝 Resumo Rápido

| Cenário | Script | Resultado |
|---------|--------|-----------|
| 🆕 Instalação nova | `schema-completo.sql` | Tabela limpa com 132 imóveis |
| 🔄 Já tenho dados | `migration-add-columns.sql` | Dados antigos + 132 novos |
| 🐛 Erro de coluna | `migration-add-columns.sql` | Adiciona colunas faltantes |

---

**🎯 Em caso de dúvida, use `migration-add-columns.sql` (Opção 2) - é mais seguro!**
