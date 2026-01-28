# Sistema Admin HS Martins - Guia Completo 🏠

Sistema completo de administração de imóveis com Supabase e Landing Page dinâmica.

## 📋 O que foi criado

### 1. **Admin Panel** (`/admin/index.html`)
- ✅ Login com senha: `123123`
- ✅ CRUD completo de imóveis
- ✅ Upload de imagens para Supabase Storage
- ✅ Interface moderna e responsiva

### 2. **Integração Supabase**
- ✅ Tabela: `Hsmartins_Produtos`
- ✅ Bucket: `Hsmartins_Produtos`
- ✅ Carregamento automático de produtos na Landing Page

### 3. **Componente Atualizado**
- ✅ `product-grid-advanced.js` agora carrega produtos do Supabase
- ✅ Fallback automático para produtos padrão

## 🚀 Como Configurar

### Passo 1: Configurar o Supabase

1. Acesse: https://vkwczizdjhsejbpaapea.supabase.co

2. **Criar a Tabela** (SQL Editor):
   ```sql
   -- Cole o conteúdo do arquivo admin/setup-database.sql
   ```

3. **Criar o Bucket** (Storage):
   - Nome: `Hsmartins_Produtos`
   - Marcar como **Público**
   - Configurar políticas de acesso (ver `admin/README.md`)

### Passo 2: Acessar o Admin

1. Abra: `http://127.0.0.1:5500/admin/`
2. Senha: `123123`
3. Comece a adicionar imóveis!

### Passo 3: Ver Resultado na Landing Page

1. Abra: `http://127.0.0.1:5500/`
2. Role até a seção "Imóveis"
3. Os produtos do Supabase aparecerão automaticamente!

## 📁 Estrutura dos Arquivos Criados

```
cosmos-lp-generator/
├── admin/
│   ├── index.html              # Interface admin completa
│   ├── setup-database.sql      # Script para criar tabela
│   └── README.md              # Instruções detalhadas
├── templates/components/
│   └── product-grid-advanced.js  # Componente atualizado com Supabase
└── config.json                # Config com chaves vazias dos componentes
```

## 🎯 Funcionalidades do Admin

### Criar Novo Imóvel
1. Clique em "Novo Imóvel"
2. Preencha os campos:
   - **Título** *
   - Categoria
   - **Preço Atual** *
   - Preço Original (para desconto)
   - Avaliação
   - Parcelamento
   - Badge (Novo/Desconto)
   - **Imagem** (upload)
3. Clique em "Salvar"

### Editar Imóvel
1. Clique em "Editar" no card do imóvel
2. Modifique os campos desejados
3. Clique em "Salvar"

### Excluir Imóvel
1. Clique em "Excluir" no card do imóvel
2. Confirme a exclusão

### Upload de Imagens
- Aceita: JPG, PNG, WebP
- Armazenamento: Supabase Storage (`Hsmartins_Produtos` bucket)
- URL pública gerada automaticamente

## 🔧 Estrutura da Tabela

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | Sim (auto) | ID único |
| `title` | TEXT | Sim | Título do imóvel |
| `category` | TEXT | Não | Categoria |
| `price_current` | TEXT | Sim | Preço atual |
| `price_original` | TEXT | Não | Preço original |
| `rating` | TEXT | Não | Avaliação (ex: "4.8") |
| `installments` | TEXT | Não | Parcelamento |
| `badge_text` | TEXT | Não | Texto do badge |
| `badge_style` | TEXT | Não | "new" ou "discount" |
| `image_url` | TEXT | Não | URL da imagem |
| `created_at` | TIMESTAMP | Sim (auto) | Data de criação |
| `updated_at` | TIMESTAMP | Sim (auto) | Data de atualização |

## 🎨 Como Funciona a Integração

### No Frontend (Landing Page)

O componente `product-grid-advanced.js` automaticamente:

1. ✅ Carrega o Supabase JS Client
2. ✅ Conecta ao banco de dados
3. ✅ Busca todos os produtos
4. ✅ Renderiza os cards
5. ✅ Se falhar, usa produtos padrão

### Configuração do Componente

No `config.json`:
```json
{
  "product-grid-advanced": {
    "useSupabase": true  // true = carrega do Supabase, false = usa defaults
  }
}
```

Ou deixe vazio para usar o padrão (true):
```json
{
  "product-grid-advanced": {}
}
```

## 🔐 Segurança

### Login do Admin
- Senha armazenada em `localStorage`
- **⚠️ ATENÇÃO**: Para produção, implemente autenticação real com Supabase Auth

### Supabase
- Row Level Security (RLS) habilitado
- Políticas configuradas para acesso público (leitura/escrita)
- Para produção, ajuste as políticas conforme necessário

## 🐛 Troubleshooting

### Produtos não aparecem na Landing Page
1. Verifique se a tabela foi criada no Supabase
2. Abra o console (F12) e procure por erros
3. Verifique as políticas RLS da tabela

### Erro ao fazer upload de imagem
1. Verifique se o bucket foi criado
2. Confirme que está marcado como público
3. Verifique as políticas do bucket

### Admin não salva produtos
1. Verifique as políticas RLS (INSERT, UPDATE, DELETE)
2. Veja o console para erros
3. Confirme as credenciais do Supabase

## 📱 Responsividade

O admin é totalmente responsivo:
- ✅ Desktop (1280px+)
- ✅ Tablet (768px - 1279px)
- ✅ Mobile (< 768px)

## 🎯 Próximos Passos (Opcional)

1. **Autenticação Real**
   - Implementar Supabase Auth
   - Remover senha hardcoded

2. **Mais Campos**
   - Descrição completa
   - Localização (mapa)
   - Galeria de imagens
   - Características (quartos, banheiros, etc.)

3. **Filtros e Busca**
   - Filtrar por categoria
   - Buscar por título
   - Ordenação

4. **SEO**
   - Meta tags dinâmicas
   - URLs amigáveis
   - Sitemap

## 📞 Suporte

Para dúvidas ou problemas:
1. Veja `admin/README.md` para instruções detalhadas do Supabase
2. Confira os logs no console do navegador (F12)
3. Verifique a documentação do Supabase: https://supabase.com/docs

---

**Desenvolvido para HS Martins Empreendimentos Imobiliários** 🏠
