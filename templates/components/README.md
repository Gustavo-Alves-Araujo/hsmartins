# 🚀 Cosmos LP Generator - Sistema de Componentes

Sistema modular e automatizado para criação de landing pages usando componentes reutilizáveis.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Componentes Disponíveis](#componentes-disponíveis)
- [Sistema de Recomendações](#sistema-de-recomendações)
- [Exemplos](#exemplos)
- [Documentação](#documentação)

## 🎯 Visão Geral

O Cosmos LP Generator é um sistema que permite criar landing pages completas através de um arquivo `config.js`. Os componentes são detectados, carregados e montados automaticamente na ordem especificada.

### ✨ Características Principais

- ✅ **Zero configuração manual** - Componentes detectados automaticamente
- ✅ **100% automático** - Carregamento e montagem automáticos
- ✅ **Reutilizável** - Mesmos componentes em múltiplos templates
- ✅ **Escalável** - Fácil adicionar novos componentes
- ✅ **Inteligente** - Sistema de recomendações baseado em contexto
- ✅ **Validado** - Schema de validação para configs
- ✅ **Documentado** - Metadata estruturada para IAs

## 📁 Estrutura do Projeto

```
templates/
├── components/
│   ├── catalog/                    # Sistema de catálogo e recomendações
│   │   ├── components-catalog.json # Metadata de todos os componentes
│   │   ├── config-schema.json      # Schema de validação JSON
│   │   └── component-recommender.js # Sistema de recomendações
│   ├── examples/                   # Exemplos de config por nicho
│   │   ├── personal-trainer-config.js
│   │   ├── clinic-config.js
│   │   ├── saas-config.js
│   │   ├── restaurant-config.js
│   │   └── ecommerce-config.js
│   ├── docs/                       # Documentação
│   │   ├── COMPONENTES-DISPONIVEIS.md
│   │   ├── COMO-CRIAR-COMPONENTE.md
│   │   └── GUIA-CONTRASTE-CORES.md
│   ├── [componentes].js           # Componentes individuais
│   ├── base-component.js          # Classe base
│   ├── component-registry.js      # Sistema de registro
│   ├── cosmos-template.js          # Inicializador
│   └── README.md                   # Este arquivo
└── [templates]/                    # Templates de sites
    └── [nome-template]/
        ├── config.js
        └── index.html
```

## 🚀 Como Usar

### 1. Criar um Template

Crie uma pasta para seu template e adicione um `config.js`:

```javascript
const config = {
  theme: {
    colors: {
      primary: '#16A34A',
      background: '#FFFFFF',
      // ...
    },
    fonts: {
      primary: '"Poppins", sans-serif',
      // ...
    }
  },

  // Componentes (qualquer chave com hífen é detectada automaticamente)
  'contact-top-bar': {
    infoItems: [
      { icon: "fas fa-phone-alt", text: "(11) 98765-4321" }
    ],
    socialLinks: [
      { icon: "fab fa-instagram", href: "https://instagram.com" }
    ]
  },

  'hero-image-badge': {
    title: "Seu Título",
    titleHighlight: "Destaque",
    // ...
  },

  site: {
    title: "Meu Site",
    name: "Meu Site",
    // ...
  }
};

window.config = config;
```

### 2. Criar o HTML

Crie um `index.html` simples:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="config.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/templates/components/component-registry.js"></script>
  <script src="/templates/components/cosmos-template.js"></script>
</head>
<body class="antialiased">
  <!-- Componentes montam aqui automaticamente -->
</body>
</html>
```

### 3. Pronto!

Os componentes serão detectados, carregados e montados automaticamente na ordem que aparecem no `config.js`.

## 📦 Componentes Disponíveis

Temos **30+ componentes** organizados por categoria:

### 🧭 Navegação
- `contact-top-bar` - Barra superior com contato
- `sticky-header-navigation` - Header fixo profissional
- `sticky-navbar-gradient` - Navbar moderna com gradiente
- `header-navigation` - Header simples e limpo

### 🎯 Hero
- `hero-image-badge` - Hero com imagem e badge
- `hero-overlay` - Hero cinematográfico com overlay

### 📊 Informação
- `info-bar` - Barra de informações genérica
- `achievements-numbers-grid` - Grid de estatísticas
- `social-proof-logos` - Logos de clientes/parceiros

### 🎨 Features e Serviços
- `quick-service-cards` - Cards de serviços
- `features-grid-glass` - Grid de features com glassmorphism
- `benefit-highlight-split` - Destaque de benefícios
- `feature-highlight` - Destaque de feature

### 📝 Conteúdo
- `about-image-features` - Seção sobre com imagem
- `about-image-features-clinical` - Versão para clínicas
- `card-grid` - Grid genérico de cards

### 💰 Preços
- `pricing-grid-highlight` - Grid de planos com destaque
- `plans-callout-box` - Caixa de destaque de plano

### 📧 Formulários e Contato
- `email-signup-form` - Formulário de email
- `footer-contact` - Footer com contato completo
- `footer-multi-column-dark` - Footer multi-coluna escuro
- `footer-multi-column-links` - Footer multi-coluna com links

### 🎯 CTA
- `cta-banner` - Banner de call-to-action
- `cta-glow-card` - Card CTA com glow

### 🎨 Visual
- `ambient-background-effects` - Efeitos de fundo ambientais

### 📱 Integração
- `whatsapp-float-button` - Botão flutuante WhatsApp
- `faq-accordion` - FAQ com accordion

**📖 Ver documentação completa:** [`docs/COMPONENTES-DISPONIVEIS.md`](./docs/COMPONENTES-DISPONIVEIS.md)

## 🤖 Sistema de Recomendações

O sistema de recomendações ajuda a escolher os componentes ideais para seu nicho:

```javascript
// Carregar o recommender
const recommender = new ComponentRecommender();

// Recomendar para um nicho
const recommendations = recommender.recommendForNiche('personal-trainer', {
  hasPricing: true,
  hasContact: true
});

// Verificar compatibilidade
const compatibility = recommender.checkCompatibility(recommendations);

// Gerar config completo
const { config, metadata } = recommender.generateConfig('personal-trainer', {
  hasPricing: true
}, {
  siteName: "Meu Personal Trainer",
  phone: "(11) 99999-9999"
});
```

**📖 Ver mais:** [`catalog/component-recommender.js`](./catalog/component-recommender.js)

## 📚 Exemplos

Temos exemplos completos de config para diferentes nichos:

- **Personal Trainer:** [`examples/personal-trainer-config.js`](./examples/personal-trainer-config.js)
- **Clínica:** [`examples/clinic-config.js`](./examples/clinic-config.js)
- **SaaS:** [`examples/saas-config.js`](./examples/saas-config.js)
- **Restaurante:** [`examples/restaurant-config.js`](./examples/restaurant-config.js)
- **E-commerce:** [`examples/ecommerce-config.js`](./examples/ecommerce-config.js)

## 📖 Documentação

### Documentação Principal

- **[Componentes Disponíveis](./docs/COMPONENTES-DISPONIVEIS.md)** - Lista completa de componentes
- **[Como Criar Componente](./docs/COMO-CRIAR-COMPONENTE.md)** - Guia para criar novos componentes
- **[Guia de Contraste de Cores](./docs/GUIA-CONTRASTE-CORES.md)** - Guia de acessibilidade

### Catálogo e Metadata

- **[Components Catalog](./catalog/components-catalog.json)** - Catálogo completo com metadata
- **[Config Schema](./catalog/config-schema.json)** - Schema de validação JSON

## 🎨 Sistema de Tema

Todos os componentes inferem automaticamente as cores do tema global:

```javascript
theme: {
  colors: {
    primary: '#16A34A',    // Usado automaticamente pelos componentes
    secondary: '#22C55E',
    accent: '#F97316',
    background: '#FFFFFF'
  }
}
```

Componentes podem ter override de cores quando necessário:

```javascript
'hero-overlay': {
  // ...
  colors: {
    primary: 'green',  // Override: usa 'green' ao invés do primary do tema
    accent: 'orange'
  }
}
```

## 🔧 Adicionar Novos Componentes

1. Crie o arquivo do componente em `components/[nome-do-componente].js`
2. Siga o padrão da classe base (veja [`docs/COMO-CRIAR-COMPONENTE.md`](./docs/COMO-CRIAR-COMPONENTE.md))
3. Adicione metadata no [`catalog/components-catalog.json`](./catalog/components-catalog.json)
4. O componente será detectado automaticamente!

## 🎯 Nichos Suportados

- 🏋️ **Personal Trainer / Fitness**
- 💻 **SaaS / Plataformas**
- 🏥 **Clínicas / Consultórios**
- 🍕 **Restaurantes / Delivery**
- 🛍️ **E-commerce**
- 🏢 **Corporativo / Profissional**

## 📝 Notas Importantes

- Todos os componentes se adaptam automaticamente ao tema claro/escuro
- Componentes inferem cores do tema global quando não há override
- Todos os componentes são responsivos
- Ícones podem usar Lucide Icons ou Font Awesome
- Componentes seguem padrões de acessibilidade (WCAG AA)

## 🤝 Contribuindo

Para adicionar novos componentes ou melhorar os existentes:

1. Leia o guia: [`docs/COMO-CRIAR-COMPONENTE.md`](./docs/COMO-CRIAR-COMPONENTE.md)
2. Mantenha componentes genéricos e reutilizáveis
3. Adicione metadata completa no catálogo
4. Atualize a documentação

## 📄 Licença

[Adicione sua licença aqui]

---

**Última atualização:** 2024
**Total de componentes:** 30+
**Versão do catálogo:** 1.0.0
