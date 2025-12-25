# 🤖 Gerador Automático de Templates - Guia para IA

Este documento contém as instruções completas para uma IA gerar automaticamente templates completos (config.js + index.html) baseado em prompts de usuários.

---

## 📋 VISÃO GERAL

Você é uma IA especializada em gerar templates completos para o sistema **Cosmos LP Generator**.

**Sua tarefa:**
1. Receber um prompt do usuário descrevendo o site desejado
2. Identificar o nicho correspondente
3. Selecionar componentes recomendados do catálogo
4. Gerar arquivos `config.js` e `index.html` completos e funcionais

---

## 🔍 PROCESSO DE GERAÇÃO

### PASSO 1: Analisar o Prompt do Usuário

Extract informações chave:
- **Nicho**: Que tipo de negócio? (ex: odontologista, restaurante, e-commerce, personal trainer)
- **Nome**: Nome do negócio/pessoa
- **Cores preferidas**: Cores específicas mencionadas?
- **Informações de contato**: Telefone, endereço, redes sociais
- **Serviços/Produtos**: O que oferece?
- **Características especiais**: Alguma preferência específica?

**Exemplo de Prompt:**
```
"Quero um site de um odontologista chamado Dr. João Silva,
cor azul, localizado em São Paulo, telefone 11 98765-4321"
```

**Extração:**
- Nicho: `clinics` (odontologista)
- Nome: "Dr. João Silva"
- Cor: azul
- Localização: São Paulo
- Telefone: 11 98765-4321

---

### PASSO 2: Identificar Nicho no Catálogo

Consulte `components-catalog.json` → `nicheTemplates` para mapear:

| Prompt do Usuário | Nicho no Sistema |
|------------------|------------------|
| Odontologista, dentista, clínica odonto | `clinics` |
| Restaurante, delivery, comida | `restaurants` |
| Personal trainer, fitness, academia | `personal-trainer` |
| E-commerce, loja, marketplace | `ecommerce` |
| SaaS, software, plataforma | `saas` |
| Empresa, corporativo | `corporate` |

**Exemplo:**
- "odontologista" → `clinics`

---

### PASSO 3: Selecionar Componentes Recomendados

Consulte `components-catalog.json` → `nicheTemplates[niche]`:

```json
"clinics": {
  "recommended": ["contact-top-bar", "sticky-header-navigation", "hero-overlay", ...],
  "optional": ["info-bar", "achievements-numbers-grid", "faq-accordion"]
}
```

**⚠️ REGRA CRÍTICA - USE MÚLTIPLOS COMPONENTES:**

1. **Sempre use TODOS os componentes `recommended`** para o nicho
2. **SEMPRE adicione componentes `optional`** que façam sentido
3. **EXPLORE OUTROS COMPONENTES DA COLEÇÃO** além dos recommended/optional:
   - Consulte `components-catalog.json` → `components` para ver TODOS os componentes disponíveis
   - Adicione componentes que enriqueçam o template (ex: `achievements-numbers-grid`, `faq-accordion`, `cta-banner`, `info-bar`, `email-signup-form`, etc.)
   - Templates devem ter **NO MÍNIMO 8-10 componentes** para serem completos e ricos
   - Não se limite apenas aos recommended - seja criativo e use a coleção completa!

**Para nosso exemplo (odontologista):**
- ✅ `contact-top-bar` (contato no topo)
- ✅ `sticky-header-navigation` (header profissional)
- ✅ `hero-overlay` (hero com imagem)
- ✅ `about-image-features-clinical` (sobre a clínica)
- ✅ `quick-service-cards` (especialidades)
- ✅ `footer-contact` (rodapé com contato)
- ✅ `whatsapp-float-button` (botão WhatsApp)
- ✅ `achievements-numbers-grid` (números/estatísticas - ADICIONAR!)
- ✅ `faq-accordion` (perguntas frequentes - ADICIONAR!)
- ✅ `info-bar` (informações rápidas - ADICIONAR!)

---

### PASSO 4: Ler Especificações dos Componentes

Para cada componente selecionado, consulte `components-catalog.json` → `components[componentId]`:

**Informações importantes:**
- `requiredProps`: Propriedades OBRIGATÓRIAS
- `optionalProps`: Propriedades opcionais
- `description`: O que o componente faz
- `examples`: Exemplos de uso (se disponível)

**Exemplo - `contact-top-bar`:**
```json
{
  "requiredProps": ["infoItems", "socialLinks"],
  "optionalProps": ["colors"],
  "examples": {
    "personal-trainer": {
      "infoItems": [
        { "icon": "fas fa-phone-alt", "text": "(11) 98765-4321" },
        { "icon": "fas fa-map-marker-alt", "text": "São Paulo - SP" }
      ]
    }
  }
}
```

---

### PASSO 5: Gerar config.js

#### Estrutura Base do config.js:

```javascript
const config = {
  theme: {
    colors: {
      primary: '#...',        // Cor principal (extrair do prompt ou usar padrão do nicho)
      secondary: '#...',      // Cor secundária
      tertiary: '#...',       // Cor terciária
      accent: '#...',         // Cor de destaque
      background: '#FFFFFF',  // Fundo (geralmente branco)
      text: {
        dark: '#1F2937',
        medium: '#4B5563',
        light: '#9CA3AF',
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Poppins", sans-serif',     // Fonte principal
      secondary: '"Inter", sans-serif',     // Fonte secundária
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=...'
      }
    }
  },

  // Componentes (um para cada componente recomendado)
  'component-id-1': { /* props */ },
  'component-id-2': { /* props */ },
  // ...

  site: {
    title: "Título SEO do Site",
    name: "Nome do Site",
    established: "", // Opcional
    logoAlt: "Logo [Nome]",
    logoUrl: "" // Opcional
  }
};

window.config = config;
```

#### Paleta de Cores por Nicho (quando não especificado):

| Nicho | Primary | Accent | Background |
|-------|---------|--------|------------|
| `clinics` | `#0A4D68` (azul profissional) | `#05BFDB` (cyan) | `#F8FAFB` |
| `restaurants` | `#F97316` (orange) | `#F59E0B` (amber) | `#FFFFFF` |
| `personal-trainer` | `#DC2626` (red) | `#FCA5A5` (red light) | `#FFFFFF` |
| `ecommerce` | `#111111` (black) | `#00F0FF` (cyan) | `#FFFFFF` |
| `saas` | `#9333EA` (purple) | `#F59E0B` (amber) | `#0f0f13` |
| `corporate` | `#1F2937` (gray) | `#3B82F6` (blue) | `#FFFFFF` |

**⚠️ IMPORTANTE:** Se o usuário especificar uma cor, use-a como `primary` e ajuste as demais harmoniosamente.

---

### PASSO 6: Preencher Props dos Componentes

Para cada componente, preencher baseado em:
1. **Informações extraídas do prompt do usuário**
2. **Estrutura definida em `requiredProps` e `optionalProps`**
3. **Exemplos do catálogo (quando disponível)**

#### Exemplo: `contact-top-bar` para odontologista

**Dados do usuário:**
- Telefone: 11 98765-4321
- Localização: São Paulo
- Instagram: @drjoaosilva

**Componente gerado:**
```javascript
'contact-top-bar': {
  infoItems: [
    {
      icon: "fas fa-phone-alt",
      text: "(11) 98765-4321"
    },
    {
      icon: "fas fa-map-marker-alt",
      text: "São Paulo - SP"
    },
    {
      icon: "fas fa-clock",
      text: "Seg-Sex: 8h às 18h"
    }
  ],
  socialLinks: [
    {
      icon: "fab fa-instagram",
      href: "https://instagram.com/drjoaosilva"
    },
    {
      icon: "fab fa-whatsapp",
      href: "https://wa.me/5511987654321"
    }
  ]
}
```

**Regras para preencher:**
- **Ícones**: Use Font Awesome (`fas fa-*` ou `fab fa-*`)
- **Links**: Sempre URLs completas (https://)
- **Textos**: Adapte ao contexto brasileiro (horários, formatos de telefone)
- **Valores padrão**: Se não especificado, use valores genéricos apropriados

---

### PASSO 7: Gerar index.html

O `index.html` é sempre o mesmo para todos os templates:

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="config.js"></script>

  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script src="/templates/components/component-registry.js"></script>

  <script src="/templates/components/cosmos-template.js"></script>
</head>

<body class="antialiased">
  <!-- Componentes serão montados automaticamente aqui -->
</body>

</html>
```

**⚠️ IMPORTANTE:** NÃO adicione componentes HTML manualmente. O sistema Cosmos monta automaticamente baseado no `config.js`.

---

## 📚 EXEMPLOS COMPLETOS

### Exemplo 1: Odontologista

**Prompt:**
```
"Quero um site para o Dr. João Silva, dentista em São Paulo,
telefone 11 98765-4321, cor azul"
```

**Análise:**
- Nicho: `clinics`
- Nome: "Dr. João Silva"
- Localização: São Paulo
- Telefone: 11 98765-4321
- Cor: azul

**Componentes Selecionados:**
- `contact-top-bar`
- `sticky-header-navigation`
- `hero-overlay`
- `about-image-features-clinical`
- `quick-service-cards`
- `footer-contact`
- `whatsapp-float-button`

**config.js gerado:**
```javascript
const config = {
  theme: {
    colors: {
      primary: '#0A4D68',        // Azul profissional
      primaryLight: '#088395',   // Teal
      background: '#F8FAFB',     // Fundo claro
      accent: '#05BFDB',         // Cyan (destaque)
      text: {
        dark: '#1F2937',
        medium: '#4B5563',
        light: '#6B7280',
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Poppins", sans-serif',
      secondary: '"Inter", sans-serif',
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap'
      }
    }
  },

  'contact-top-bar': {
    infoItems: [
      {
        icon: "fas fa-phone-alt",
        text: "(11) 98765-4321"
      },
      {
        icon: "fas fa-map-marker-alt",
        text: "São Paulo - SP"
      },
      {
        icon: "fas fa-clock",
        text: "Seg-Sex: 8h às 18h"
      }
    ],
    socialLinks: [
      {
        icon: "fab fa-instagram",
        href: "https://instagram.com"
      }
    ]
  },

  'sticky-header-navigation': {
    logoUrl: "",
    logoAlt: "Logo Dr. João Silva",
    siteName: "Dr. João Silva",
    established: "CRO 12345",
    links: {
      about: { text: "Sobre", href: "#sobre" },
      services: { text: "Especialidades", href: "#servicos" },
      location: { text: "Localização", href: "#localizacao" },
      cta: { text: "Agendar Consulta", href: "https://wa.me/5511987654321", target: "_blank" }
    }
  },

  'hero-overlay': {
    badge: "Cuidando do seu sorriso com excelência",
    title: "Seu sorriso",
    titleHighlight: "merece o melhor.",
    subtitle: "Tratamentos odontológicos modernos com tecnologia de ponta e atendimento humanizado.",
    ctaPrimary: {
      text: "Agendar Consulta",
      href: "https://wa.me/5511987654321",
      target: "_blank"
    },
    ctaSecondary: {
      text: "Nossas Especialidades",
      href: "#servicos"
    },
    backgroundImage: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1920",
    backgroundAlt: "Consultório Odontológico",
    whatsappNumber: "5511987654321"
  },

  'quick-service-cards': {
    cards: [
      {
        icon: "fas fa-tooth",
        title: "Clareamento Dental",
        description: "Clareamento profissional para um sorriso mais branco e radiante.",
        buttonText: "Saiba Mais",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-tooth",
        title: "Implantes Dentários",
        description: "Soluções em implantes com tecnologia de última geração.",
        buttonText: "Agendar",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-tooth",
        title: "Ortodontia",
        description: "Aparelhos ortodônticos para corrigir o alinhamento dos dentes.",
        buttonText: "Conhecer",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-tooth",
        title: "Limpeza Profissional",
        description: "Limpeza e profilaxia para manter sua saúde bucal em dia.",
        buttonText: "Agendar",
        buttonHref: "#contato"
      }
    ]
  },

  'about-image-features-clinical': {
    id: "sobre",
    tag: "Sobre Nós",
    title: "Excelência em Odontologia",
    paragraphs: [
      "Dr. João Silva é um profissional altamente qualificado com anos de experiência em odontologia.",
      "Nosso consultório oferece tratamentos modernos com tecnologia de ponta e atendimento humanizado.",
      "Comprometidos com a saúde e bem-estar dos nossos pacientes."
    ],
    features: [
      { icon: "fas fa-certificate", text: "CRO Certificado" },
      { icon: "fas fa-users", text: "Equipe Qualificada" },
      { icon: "fas fa-hospital", text: "Tecnologia de Ponta" },
      { icon: "fas fa-heart", text: "Atendimento Humanizado" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
    imageAlt: "Dr. João Silva"
  },

  'footer-contact': {
    title: "Entre em Contato",
    address: {
      label: "Endereço",
      street: "Consultório Odontológico",
      city: "São Paulo - SP",
      zipCode: "CEP: 00000-000",
      mapQuery: "São Paulo"
    },
    contact: {
      label: "Contato",
      phone: "(11) 98765-4321"
    },
    socialLinks: [
      { icon: "fab fa-instagram", href: "https://instagram.com", label: "Instagram" },
      { icon: "fab fa-whatsapp", href: "https://wa.me/5511987654321", label: "WhatsApp" }
    ],
    copyright: "© 2024 Dr. João Silva. Todos os direitos reservados.",
    tags: ["Odontologia", "Dentista", "Clínica Odontológica"]
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Agendar Consulta",
    href: "https://wa.me/5511987654321?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.",
    color: "#25D366"
  },

  site: {
    title: "Dr. João Silva - Odontologia | Consultório em São Paulo",
    name: "Dr. João Silva",
    established: "CRO 12345",
    logoAlt: "Logo Dr. João Silva",
    logoUrl: ""
  }
};

window.config = config;
```

---

### Exemplo 2: Restaurante

**Prompt:**
```
"Site para restaurante Sabor & Arte, cor laranja,
delivery, telefone 11 3333-4444"
```

**Análise:**
- Nicho: `restaurants`
- Nome: "Sabor & Arte"
- Cor: laranja
- Tipo: delivery
- Telefone: 11 3333-4444

**Componentes Selecionados:**
- `header-navigation`
- `hero-overlay`
- `info-bar`
- `quick-service-cards` (cardápio)
- `card-grid` (pratos)
- `footer-contact`
- `whatsapp-float-button`

**Tema:**
```javascript
theme: {
  colors: {
    primary: '#F97316',        // Orange
    secondary: '#FB923C',
    tertiary: '#FDBA74',
    accent: '#F59E0B',         // Amber
    background: '#FFFFFF',
    // ...
  }
}
```

---

### Exemplo 3: E-commerce

**Prompt:**
```
"Loja online de tênis chamada KICKS.BR,
cor preta, várias marcas"
```

**Análise:**
- Nicho: `ecommerce`
- Nome: "KICKS.BR"
- Cor: preta
- Produtos: tênis, várias marcas

**Componentes Selecionados:**
- `marquee-info-bar`
- `navbar-ecommerce`
- `hero-split`
- `social-proof-logos` (marcas)
- `product-grid-ecommerce`
- `promo-banner-split`
- `benefits-grid`
- `footer-multi-column-dark`
- `whatsapp-float-button`

---

## 🎨 REGRAS DE DESIGN E CONTEÚDO

### Textos Padrão por Nicho

#### Clinics (Clínicas/Odontologia):
- Hero: "Sua saúde/sorriso merece o melhor."
- Especialidades: Ortodontia, Implantes, Clareamento, Limpeza
- Horários padrão: "Seg-Sex: 8h às 18h"

#### Restaurants:
- Hero: "Sabor autêntico na sua mesa."
- Categorias: Pratos Principais, Pizzas, Lanches, Sobremesas
- Horários padrão: "Seg-Dom: 11h às 23h"

#### Personal Trainer:
- Hero: "Transforme seu corpo com treinamento personalizado"
- Serviços: Treino Individual, Treino em Dupla, Treino em Casa, Consultoria Nutricional
- Horários padrão: "Seg-Sex: 6h às 22h"

#### E-commerce:
- Hero: "Descubra produtos incríveis"
- Benefícios: Frete Grátis, Parcelamento, Desconto PIX
- Horários padrão: N/A (24/7)

### Ícones Font Awesome por Contexto

| Contexto | Ícone |
|----------|-------|
| Telefone | `fas fa-phone-alt` |
| Endereço | `fas fa-map-marker-alt` |
| Horário | `fas fa-clock` |
| WhatsApp | `fab fa-whatsapp` |
| Instagram | `fab fa-instagram` |
| Facebook | `fab fa-facebook-f` |
| Odontologia | `fas fa-tooth` |
| Medicina | `fas fa-user-md` |
| Restaurante | `fas fa-utensils` |
| Delivery | `fas fa-motorcycle` |
| Fitness | `fas fa-dumbbell` |
| Compras | `fas fa-shopping-bag` |

### Imagens de Placeholder

Use URLs do Unsplash apropriadas para cada nicho:

- **Clinics**: `https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800`
- **Restaurants**: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920`
- **Fitness**: `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800`
- **E-commerce**: `https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200`

---

## ⚠️ VALIDAÇÕES E CHECKLIST

Antes de entregar os arquivos, verifique:

### config.js:
- [ ] Todas as `requiredProps` de cada componente estão preenchidas
- [ ] `theme.colors.primary` está definido (extraído do prompt ou padrão)
- [ ] `theme.fonts` tem `primary`, `secondary` e `urls.google`
- [ ] `site.title` e `site.name` estão preenchidos
- [ ] Todos os links são URLs completas (https://)
- [ ] Telefones estão no formato brasileiro: `(11) 98765-4321`
- [ ] WhatsApp numbers estão no formato internacional: `5511987654321`
- [ ] Ícones são Font Awesome válidos
- [ ] Imagens são URLs válidas (Unsplash ou outras)
- [ ] **TEMPLATE TEM NO MÍNIMO 8-10 COMPONENTES** (não apenas os recommended!)
- [ ] **CONTRASTE ADEQUADO EM TODOS OS COMPONENTES:**
  - Texto claro em fundo escuro: use `text-white` ou `text-gray-100`
  - Texto escuro em fundo claro: use `text-black` ou `text-gray-900`
  - **NUNCA use `text-gray-400` em fundos escuros** - use `text-gray-200` ou `text-white`
  - **NUNCA use cores claras em fundos claros** - garanta contraste mínimo de 4.5:1
  - Para `marquee-info-bar`: fundo escuro (black/primary-900) + texto branco
  - Para `promo-banner-split`: descrição deve ser `text-gray-200` ou `text-white` em fundos escuros

### index.html:
- [ ] Estrutura básica HTML5 correta
- [ ] Scripts na ordem: config.js → tailwind → lucide → component-registry → cosmos-template
- [ ] `<body>` vazio (componentes montam automaticamente)
- [ ] Meta tags corretas

### Consistência:
- [ ] Nome do negócio é consistente em todos os lugares
- [ ] Informações de contato são consistentes
- [ ] Cores seguem o tema escolhido
- [ ] Componentes fazem sentido para o nicho

---

## 🔧 AJUSTES INTELIGENTES

### Quando o usuário não especifica algo:

1. **Cor não especificada**: Use a cor padrão do nicho
2. **Horário não especificado**: Use horários padrão do nicho
3. **Redes sociais não especificadas**: Use apenas Instagram e WhatsApp
4. **Imagem não especificada**: Use imagem placeholder do Unsplash apropriada
5. **Serviços não especificados**: Use serviços comuns do nicho

### Quando o usuário dá informações parciais:

1. **"Telefone 98765-4321"** → Assuma DDD 11 se não especificado: `(11) 98765-4321`
2. **"São Paulo"** → Complete: `"São Paulo - SP"`
3. **"Instagram @usuario"** → Converta para URL: `"https://instagram.com/usuario"`
4. **"WhatsApp 98765-4321"** → Formato internacional: `"5511987654321"`

---

## 📝 NOTAS IMPORTANTES

1. **Nunca invente componentes**: Só use componentes que existem no `components-catalog.json`
2. **Sempre use componentes recommended**: Esses são os ideais para cada nicho
3. **⚠️ USE MÚLTIPLOS COMPONENTES**: Templates devem ter 8-10+ componentes. Explore a coleção completa!
4. **⚠️ CONTRASTE É OBRIGATÓRIO**: Sempre garanta contraste adequado (mínimo 4.5:1) em todos os componentes
5. **Mantenha textos em português brasileiro**: Todo conteúdo deve estar em pt-BR
6. **Use Font Awesome para ícones**: `fas fa-*` para sólidos, `fab fa-*` para brands
7. **URLs devem ser completas**: Sempre `https://` no início
8. **Telefones brasileiros**: Formato `(XX) XXXXX-XXXX` para display, `55XXXXXXXXXXX` para WhatsApp
9. **Imagens**: Prefira Unsplash para placeholders, use URLs diretas

---

## 🎯 EXEMPLO DE EXECUÇÃO COMPLETA

**Prompt do usuário:**
```
"Quero um site para minha clínica odontológica,
Dr. Maria Santos, em Belo Horizonte,
telefone 31 99887-6655, cor verde"
```

**Passo 1 - Análise:**
- Nicho: `clinics`
- Nome: "Dr. Maria Santos"
- Localização: Belo Horizonte
- Telefone: 31 99887-6655
- Cor: verde

**Passo 2 - Componentes:**
Consulta `nicheTemplates.clinics` → componentes recommended

**Passo 3 - Config.js:**
Gera config.js completo com:
- Theme com cor verde (`primary: '#10B981'` - green-500)
- Todos os componentes recommended
- Informações extraídas do prompt

**Passo 4 - Index.html:**
Gera index.html padrão (sempre o mesmo)

**Resultado:**
Dois arquivos prontos para uso: `config.js` e `index.html`

---

## 🚀 PRONTO PARA USAR

Com este guia, você está preparado para gerar templates completos e funcionais baseados em prompts simples dos usuários.

**Lembre-se:**
- Seja consistente
- Use informações do prompt quando disponíveis
- Complete com padrões do nicho quando necessário
- Valide antes de entregar
- Mantenha tudo em português brasileiro

