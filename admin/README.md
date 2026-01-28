# Instruções para Configurar o Supabase

## 1. Criar a Tabela de Produtos

1. Acesse o Supabase: https://vkwczizdjhsejbpaapea.supabase.co
2. Vá em **SQL Editor** no menu lateral
3. Clique em **New Query**
4. Cole o conteúdo do arquivo `setup-database.sql`
5. Clique em **Run** ou pressione `Ctrl/Cmd + Enter`

Isso criará a tabela `Hsmartins_Produtos` com suporte a **múltiplas imagens** (até 20 por imóvel).

### Migração para Tabelas Existentes

Se a tabela já existe e você precisa adicionar suporte para múltiplas imagens:

1. Execute o arquivo `migration-add-images.sql` no SQL Editor
2. Isso adicionará a coluna `images_urls` e migrará os dados existentes

## 2. Criar o Bucket de Imagens

1. No Supabase, vá em **Storage** no menu lateral
2. Clique em **New Bucket** (ou **Create a new bucket**)
3. Preencha:
   - **Name**: `Hsmartins_Produtos`
   - **Public bucket**: ✅ Marque como **público** (para as imagens ficarem acessíveis)
4. Clique em **Create bucket**

### Configurar Políticas do Bucket

Após criar o bucket, configure as políticas de acesso:

1. Clique no bucket `Hsmartins_Produtos`
2. Vá em **Policies**
3. Clique em **New Policy**

#### Política de Upload (INSERT):
```sql
CREATE POLICY "Permitir upload público"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'Hsmartins_Produtos');
```

#### Política de Leitura (SELECT):
```sql
CREATE POLICY "Permitir leitura pública"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'Hsmartins_Produtos');
```

#### Política de Atualização (UPDATE):
```sql
CREATE POLICY "Permitir atualização pública"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'Hsmartins_Produtos');
```

#### Política de Exclusão (DELETE):
```sql
CREATE POLICY "Permitir exclusão pública"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'Hsmartins_Produtos');
```

**OU** você pode usar a interface gráfica:
1. Em Policies, selecione **"For full customization"**
2. Marque todas as operações: **SELECT**, **INSERT**, **UPDATE**, **DELETE**
3. Em **Target roles**, selecione **public**
4. Clique em **Review** e depois **Save policy**

## 3. Acessar o Admin

Após configurar o Supabase, acesse:

```
http://127.0.0.1:5500/admin/
```

**Senha**: `123123`

## 4. Verificar se está Funcionando

1. Faça login no admin
2. Tente criar um novo imóvel
3. Faça upload de uma imagem
4. Verifique se o imóvel aparece na lista
5. Teste editar e excluir

## Estrutura da Tabela Hsmartins_Produtos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único (gerado automaticamente) |
| title | TEXT | Título do imóvel (obrigatório) |
| category | TEXT | Categoria (ex: "Alto Padrão") |
| price_current | TEXT | Preço atual (obrigatório) |
| price_original | TEXT | Preço original (para mostrar desconto) |
| rating | TEXT | Avaliação (ex: "4.8") |
| installments | TEXT | Parcelamento (ex: "Em até 360x") |
| badge_text | TEXT | Texto do badge (ex: "Novo", "Desconto") |
| badge_style | TEXT | Estilo do badge ("new" ou "discount") |
| image_url | TEXT | URL da imagem principal (primeira do array) |
| images_urls | JSONB | Array JSON com todas as URLs de imagens (até 20) |
| created_at | TIMESTAMPTZ | Data de criação |
| updated_at | TIMESTAMPTZ | Data de atualização |

## Funcionalidades Avançadas

### Múltiplas Imagens por Imóvel
- Suporte para até **20 imagens por imóvel**
- Seleção múltipla de arquivos (Ctrl/Cmd + clique)
- Preview das imagens antes do upload
- Upload paralelo para melhor performance
- Primeira imagem é definida como principal

### Máscaras de Digitação
- **Preços**: Formatação automática em R$ 000.000,00
- Digitação facilitada com separadores de milhares
- Validação automática dos valores

### Gerenciamento de Imagens
- Visualização de todas as imagens do imóvel
- Remoção individual de imagens
- Indicador de imagem principal
- Mantém imagens existentes ao editar

## Troubleshooting

### Erro ao carregar produtos
- Verifique se a tabela foi criada corretamente
- Verifique as políticas RLS (Row Level Security)
- Execute a migração se a tabela já existia: `migration-add-images.sql`

### Erro ao fazer upload de imagem
- Verifique se o bucket foi criado
- Verifique se o bucket está marcado como público
- Verifique as políticas do bucket

### Não consigo criar/editar produtos
- Verifique as políticas RLS da tabela
- Verifique se a chave anon está correta no código
