# 🤖 Gerador Automático de Templates - Guia para IA

Este documento contém as instruções completas para uma IA gerar automaticamente a configuração JSON de templates para o sistema **Cosmos LP Generator** baseado em prompts de usuários.

---

## 📋 VISÃO GERAL

Você é uma IA especializada em gerar configurações JSON para o sistema **Cosmos LP Generator**.

**Sua tarefa:**
1. Receber um prompt do usuário descrevendo o site desejado
2. Identificar o nicho correspondente
3. Selecionar componentes recomendados do catálogo
4. Gerar um **JSON puro e válido** com a configuração completa que será parseado e atribuído ao objeto `config`

**⚠️ FORMATO DE SAÍDA:**
- Você deve gerar **APENAS JSON puro** (sem `const config =`, sem `window.config = config;`, sem comentários)
- O JSON será parseado automaticamente e atribuído ao objeto `config`
- Use aspas duplas para todas as chaves e strings
- Escape aspas dentro de strings com `\"`
- Não inclua vírgulas finais
- Certifique-se de que o JSON é válido e pode ser parseado sem erros

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

### PASSO 2: Selecionar Componentes Recomendados

Consulte `components-catalog.json` → `nicheTemplates[niche]`:

```json
"clinics": {
  "recommended": ["contact-top-bar", "sticky-header-navigation", "hero-overlay", ...],
  "optional": ["info-bar", "achievements-numbers-grid", "faq-accordion"]
}
```

**⚠️ REGRA CRÍTICA - USE MÚLTIPLOS COMPONENTES:**

1. **Sempre use TODOS os componentes `recommended`** para o nicho
3. **EXPLORE OUTROS COMPONENTES DA COLEÇÃO** além dos recommended/optional:
   - Consulte `components-catalog.json` → `components` para ver TODOS os componentes disponíveis
   - Adicione componentes que enriqueçam o template (ex: `achievements-numbers-grid`, `faq-accordion`, `cta-banner`, `info-bar`, `email-signup-form`, etc.)
   - Templates devem ter **NO MÍNIMO 8-10 componentes** para serem completos e ricos

**Para nosso exemplo (odontologista):**
- ✅ `contact-top-bar` (contato no topo)
- ✅ `sticky-header-navigation` (header profissional)
- ✅ `hero-overlay` (hero com imagem)
- ✅ `about-image-features-clinical` (sobre a clínica)
- ✅ `quick-service-cards` (especialidades)
- ✅ `whatsapp-float-button` (botão WhatsApp)
- ✅ `achievements-numbers-grid` (números/estatísticas - ADICIONAR!)
- ✅ `faq-accordion` (perguntas frequentes - ADICIONAR!)
- ✅ `info-bar` (informações rápidas - ADICIONAR!)
- ✅ `footer-contact` (rodapé com contato)

---

### PASSO 3: Ler Especificações dos Componentes

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

### PASSO 4: Gerar JSON de Configuração

#### Estrutura Base do JSON:

**⚠️ IMPORTANTE:** Você deve gerar um **JSON puro e válido**, sem comentários JavaScript, sem `const config =`, sem `window.config = config;`. Apenas o objeto JSON que será parseado e atribuído ao objeto `config`.

```json
{
  "theme": {
    "colors": {
      "primary": "#...",
      "primaryLight": "#...",
      "secondary": "#...",
      "tertiary": "#...",
      "accent": "#...",
      "background": "#FFFFFF",
      "text": {
        "dark": "#1F2937",
        "medium": "#4B5563",
        "light": "#9CA3AF",
        "white": "#FFFFFF"
      }
    },
    "fonts": {
      "primary": "\"Poppins\", sans-serif",
      "secondary": "\"Inter\", sans-serif",
      "urls": {
        "google": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap"
      }
    }
  },
  "component-id-1": { },
  "component-id-2": { },
  "site": {
    "title": "Título SEO do Site",
    "name": "Nome do Site",
    "established": "",
    "logoAlt": "Logo [Nome]",
    "logoUrl": ""
  }
}
```

**Regras para o JSON:**
- Use aspas duplas para todas as chaves e strings
- Escape aspas dentro de strings com `\"`
- Não inclua comentários
- Não inclua vírgulas finais
- Certifique-se de que o JSON é válido e pode ser parseado

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

### PASSO 5: Preencher Props dos Componentes

Para cada componente, preencher baseado em:
1. **Informações extraídas do prompt do usuário**
2. **Estrutura definida em `requiredProps` e `optionalProps`**
3. **Exemplos do catálogo (quando disponível)**

#### Exemplo: `contact-top-bar` para odontologista

**Dados do usuário:**
- Telefone: 11 98765-4321
- Localização: São Paulo
- Instagram: @drjoaosilva

**Componente gerado (em JSON):**
```json
{
  "contact-top-bar": {
    "infoItems": [
      {
        "icon": "fas fa-phone-alt",
        "text": "(11) 98765-4321"
      },
      {
        "icon": "fas fa-map-marker-alt",
        "text": "São Paulo - SP"
      },
      {
        "icon": "fas fa-clock",
        "text": "Seg-Sex: 8h às 18h"
      }
    ],
    "socialLinks": [
      {
        "icon": "fab fa-instagram",
        "href": "https://instagram.com/drjoaosilva"
      },
      {
        "icon": "fab fa-whatsapp",
        "href": "https://wa.me/5511987654321"
      }
    ]
  }
}
```

**Regras para preencher:**
- **Ícones**: Use Font Awesome (`fas fa-*` ou `fab fa-*`)
- **Links**: Sempre URLs completas (https://)
- **Textos**: Adapte ao contexto brasileiro (horários, formatos de telefone)
- **Valores padrão**: Se não especificado, use valores genéricos apropriados

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

**JSON gerado:**
```json
{
  "theme": {
    "colors": {
      "primary": "#0A4D68",
      "primaryLight": "#088395",
      "background": "#F8FAFB",
      "accent": "#05BFDB",
      "text": {
        "dark": "#1F2937",
        "medium": "#4B5563",
        "light": "#6B7280",
        "white": "#FFFFFF"
      }
    },
    "fonts": {
      "primary": "\"Poppins\", sans-serif",
      "secondary": "\"Inter\", sans-serif",
      "urls": {
        "google": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap"
      }
    }
  },
  "contact-top-bar": {
    "infoItems": [
      {
        "icon": "fas fa-phone-alt",
        "text": "(11) 98765-4321"
      },
      {
        "icon": "fas fa-map-marker-alt",
        "text": "São Paulo - SP"
      },
      {
        "icon": "fas fa-clock",
        "text": "Seg-Sex: 8h às 18h"
      }
    ],
    "socialLinks": [
      {
        "icon": "fab fa-instagram",
        "href": "https://instagram.com"
      }
    ]
  },
  "sticky-header-navigation": {
    "logoUrl": "",
    "logoAlt": "Logo Dr. João Silva",
    "siteName": "Dr. João Silva",
    "established": "CRO 12345",
    "links": {
      "about": { "text": "Sobre", "href": "#sobre" },
      "services": { "text": "Especialidades", "href": "#servicos" },
      "location": { "text": "Localização", "href": "#localizacao" },
      "cta": { "text": "Agendar Consulta", "href": "https://wa.me/5511987654321", "target": "_blank" }
    }
  },
  "hero-overlay": {
    "badge": "Cuidando do seu sorriso com excelência",
    "title": "Seu sorriso",
    "titleHighlight": "merece o melhor.",
    "subtitle": "Tratamentos odontológicos modernos com tecnologia de ponta e atendimento humanizado.",
    "ctaPrimary": {
      "text": "Agendar Consulta",
      "href": "https://wa.me/5511987654321",
      "target": "_blank"
    },
    "ctaSecondary": {
      "text": "Nossas Especialidades",
      "href": "#servicos"
    },
    "backgroundImage": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1920",
    "backgroundAlt": "Consultório Odontológico",
    "whatsappNumber": "5511987654321"
  },
  "quick-service-cards": {
    "cards": [
      {
        "icon": "fas fa-tooth",
        "title": "Clareamento Dental",
        "description": "Clareamento profissional para um sorriso mais branco e radiante.",
        "buttonText": "Saiba Mais",
        "buttonHref": "#contato"
      },
      {
        "icon": "fas fa-tooth",
        "title": "Implantes Dentários",
        "description": "Soluções em implantes com tecnologia de última geração.",
        "buttonText": "Agendar",
        "buttonHref": "#contato"
      },
      {
        "icon": "fas fa-tooth",
        "title": "Ortodontia",
        "description": "Aparelhos ortodônticos para corrigir o alinhamento dos dentes.",
        "buttonText": "Conhecer",
        "buttonHref": "#contato"
      },
      {
        "icon": "fas fa-tooth",
        "title": "Limpeza Profissional",
        "description": "Limpeza e profilaxia para manter sua saúde bucal em dia.",
        "buttonText": "Agendar",
        "buttonHref": "#contato"
      }
    ]
  },
  "about-image-features-clinical": {
    "id": "sobre",
    "tag": "Sobre Nós",
    "title": "Excelência em Odontologia",
    "paragraphs": [
      "Dr. João Silva é um profissional altamente qualificado com anos de experiência em odontologia.",
      "Nosso consultório oferece tratamentos modernos com tecnologia de ponta e atendimento humanizado.",
      "Comprometidos com a saúde e bem-estar dos nossos pacientes."
    ],
    "features": [
      { "icon": "fas fa-certificate", "text": "CRO Certificado" },
      { "icon": "fas fa-users", "text": "Equipe Qualificada" },
      { "icon": "fas fa-hospital", "text": "Tecnologia de Ponta" },
      { "icon": "fas fa-heart", "text": "Atendimento Humanizado" }
    ],
    "imageUrl": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
    "imageAlt": "Dr. João Silva"
  },
  "whatsapp-float-button": {
    "icon": "fab fa-whatsapp",
    "text": "Agendar Consulta",
    "href": "https://wa.me/5511987654321?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.",
    "color": "#25D366"
  },
  "footer-contact": {
    "title": "Entre em Contato",
    "address": {
      "label": "Endereço",
      "street": "Consultório Odontológico",
      "city": "São Paulo - SP",
      "zipCode": "CEP: 00000-000",
      "mapQuery": "São Paulo"
    },
    "contact": {
      "label": "Contato",
      "phone": "(11) 98765-4321"
    },
    "socialLinks": [
      { "icon": "fab fa-instagram", "href": "https://instagram.com", "label": "Instagram" },
      { "icon": "fab fa-whatsapp", "href": "https://wa.me/5511987654321", "label": "WhatsApp" }
    ],
    "copyright": "© 2024 Dr. João Silva. Todos os direitos reservados.",
    "tags": ["Odontologia", "Dentista", "Clínica Odontológica"]
  },
  "site": {
    "title": "Dr. João Silva - Odontologia | Consultório em São Paulo",
    "name": "Dr. João Silva",
    "established": "CRO 12345",
    "logoAlt": "Logo Dr. João Silva",
    "logoUrl": ""
  }
}
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

**Tema (exemplo em JSON):**
```json
{
  "theme": {
    "colors": {
      "primary": "#F97316",
      "secondary": "#FB923C",
      "tertiary": "#FDBA74",
      "accent": "#F59E0B",
      "background": "#FFFFFF"
    }
  }
}
```

---

## 🎨 REGRAS DE DESIGN E CONTEÚDO


### Imagens de Placeholder

Use URLs do Unsplash apropriadas para cada nicho:
---

## ⚠️ VALIDAÇÕES E CHECKLIST

Antes de entregar o JSON, verifique:

### JSON de Configuração:
- [ ] **JSON é válido e pode ser parseado** (sem erros de sintaxe)
- [ ] Todas as chaves estão entre aspas duplas
- [ ] Strings com aspas internas estão escapadas com `\"`
- [ ] Não há vírgulas finais em arrays/objetos
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
  - Texto escuro em fundo claro: use `text-black` ou `text-gray-900`
  - **NUNCA use `text-gray-400` em fundos escuros** - use `text-gray-200` ou `text-white`
  - **NUNCA use cores claras em fundos claros** - garanta contraste mínimo de 4.5:1


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

1. **Gere apenas JSON puro**: Não inclua `const config =`, `window.config = config;`, ou comentários JavaScript
2. **JSON válido é obrigatório**: O JSON deve ser parseável sem erros. Use aspas duplas, escape correto, sem vírgulas finais
3. **Nunca invente componentes**: Só use componentes que existem no `components-catalog.json`
4. **Sempre use componentes recommended**: Esses são os ideais para cada nicho
5. **⚠️ USE MÚLTIPLOS COMPONENTES**: Templates devem ter 8-10+ componentes. Explore a coleção completa!
6. **⚠️ CONTRASTE É OBRIGATÓRIO**: Sempre garanta contraste adequado (mínimo 4.5:1) em todos os componentes
7. **Mantenha textos em português brasileiro**: Todo conteúdo deve estar em pt-BR
8. **Use Font Awesome para ícones**: `fas fa-*` para sólidos, `fab fa-*` para brands
9. **URLs devem ser completas**: Sempre `https://` no início
10. **Telefones brasileiros**: Formato `(XX) XXXXX-XXXX` para display, `55XXXXXXXXXXX` para WhatsApp
11. **Imagens**: Prefira Unsplash para placeholders, use URLs diretas
12. **Escape de strings**: Strings com aspas devem usar `\"` (ex: `"\"Poppins\", sans-serif"`)
__


# templates/components/catalog/components-catalog.json

{
  "version": "1.0.0",
  "lastUpdated": "2024",
  "totalComponents": 36,
  "components": {
    "contact-top-bar": {
      "id": "contact-top-bar",
      "name": "Contact Top Bar",
      "description": "Barra superior com informações de contato e redes sociais",
      "category": "navigation",
      "tags": ["contact", "social", "header", "top-bar", "info"],
      "niches": ["personal-trainer", "clinics", "professional-services", "local-business"],
      "requiredProps": ["infoItems", "socialLinks"],
      "optionalProps": ["colors"],
      "dependencies": [],
      "compatibleWith": ["sticky-header-navigation", "header-navigation"],
      "incompatibleWith": ["hero-overlay"],
      "style": "compact",
      "theme": "adapts",
      "file": "contact-top-bar.js",
      "examples": {
        "personal-trainer": {
          "infoItems": [
            { "icon": "fas fa-phone-alt", "text": "(11) 98765-4321" },
            { "icon": "fas fa-map-marker-alt", "text": "São Paulo - SP" },
            { "icon": "fas fa-clock", "text": "Seg-Sex: 6h às 22h" }
          ],
          "socialLinks": [
            { "icon": "fab fa-instagram", "href": "https://instagram.com" }
          ]
        }
      },
      "suggestions": {
        "bestFor": ["Sites que precisam destacar contato no topo", "Profissionais de serviços locais"],
        "avoidWith": ["hero-overlay (pode conflitar visualmente)"],
        "placement": "top"
      }
    },
    "hero-image-badge": {
      "id": "hero-image-badge",
      "name": "Hero Image Badge",
      "description": "Seção hero com imagem, texto destacado, badge flutuante e avaliação com estrelas",
      "category": "hero",
      "tags": ["hero", "image", "badge", "rating", "cta"],
      "niches": ["personal-trainer", "fitness", "products", "services", "ecommerce", "portfolio"],
      "requiredProps": ["title", "titleHighlight", "description", "imageUrl"],
      "optionalProps": ["tag", "tagIcon", "buttons", "rating", "badge", "colors"],
      "dependencies": [],
      "compatibleWith": ["contact-top-bar", "info-bar"],
      "incompatibleWith": [],
      "style": "image-focused",
      "theme": "adapts",
      "file": "hero-image-badge.js",
      "suggestions": {
        "bestFor": ["Personal trainers", "Produtos físicos", "Serviços com imagem"],
        "placement": "after-header"
      }
    },
    "hero-overlay": {
      "id": "hero-overlay",
      "name": "Hero Overlay",
      "description": "Hero com imagem de fundo, overlay escuro e conteúdo centralizado. Design cinematográfico",
      "category": "hero",
      "tags": ["hero", "overlay", "background-image", "cinematic", "cta"],
      "niches": ["restaurants", "delivery", "events", "premium-products", "atmosphere"],
      "requiredProps": ["title", "titleHighlight", "subtitle", "backgroundImage"],
      "optionalProps": ["badge", "ctaPrimary", "ctaSecondary", "whatsappNumber", "colors"],
      "dependencies": [],
      "compatibleWith": ["header-navigation"],
      "incompatibleWith": ["contact-top-bar"],
      "style": "cinematic",
      "theme": "adapts",
      "file": "hero-overlay.js",
      "suggestions": {
        "bestFor": ["Restaurantes", "Eventos", "Produtos premium", "Landing pages impactantes"],
        "placement": "after-header"
      }
    },
    "hero-badge-preview": {
      "id": "hero-badge-preview",
      "name": "Hero Badge Preview",
      "description": "Seção hero com badge, título com gradiente, descrição, botões e preview de dashboard",
      "category": "hero",
      "tags": ["hero", "badge", "gradient", "preview", "saas"],
      "niches": ["saas", "software", "digital-products", "startups", "tech"],
      "requiredProps": ["title", "titleHighlight", "description"],
      "optionalProps": ["badge", "buttons", "preview", "colors"],
      "dependencies": [],
      "compatibleWith": ["sticky-navbar-gradient", "features-grid-glass"],
      "incompatibleWith": [],
      "style": "modern",
      "theme": "adapts",
      "file": "hero-badge-preview.js",
      "suggestions": {
        "bestFor": ["SaaS e plataformas", "Produtos digitais", "Startups tech"],
        "placement": "after-header"
      }
    },
    "info-bar": {
      "id": "info-bar",
      "name": "Info Bar",
      "description": "Barra de informações genérica com ícones e textos customizáveis",
      "category": "information",
      "tags": ["info", "bar", "icons", "generic"],
      "niches": ["personal-trainer", "restaurants", "stores", "services", "clinics"],
      "requiredProps": ["items"],
      "optionalProps": ["colors"],
      "dependencies": [],
      "compatibleWith": ["contact-top-bar", "hero-image-badge", "hero-overlay"],
      "incompatibleWith": [],
      "style": "horizontal",
      "theme": "adapts",
      "file": "info-bar.js",
      "suggestions": {
        "bestFor": ["Qualquer negócio que precise destacar informações rápidas"],
        "placement": "after-hero"
      }
    },
    "achievements-numbers-grid": {
      "id": "achievements-numbers-grid",
      "name": "Achievements Numbers Grid",
      "description": "Grid de números/estatísticas de conquistas com valores grandes e labels",
      "category": "statistics",
      "tags": ["numbers", "stats", "achievements", "grid", "social-proof"],
      "niches": ["personal-trainer", "companies", "clinics", "ecommerce", "any"],
      "requiredProps": ["stats"],
      "optionalProps": ["id", "title", "description", "colors"],
      "dependencies": [],
      "compatibleWith": ["info-bar", "about-image-features"],
      "incompatibleWith": [],
      "style": "numbers-focused",
      "theme": "adapts",
      "file": "achievements-numbers-grid.js",
      "suggestions": {
        "bestFor": ["Negócios com números impressionantes", "Social proof"],
        "placement": "mid-page"
      }
    },
    "quick-service-cards": {
      "id": "quick-service-cards",
      "name": "Quick Service Cards",
      "description": "Grid de cards de serviços rápidos com ícones, títulos e botões de ação",
      "category": "services",
      "tags": ["services", "cards", "grid", "icons", "cta"],
      "niches": ["personal-trainer", "clinics", "stores", "services"],
      "requiredProps": ["cards"],
      "optionalProps": ["colors"],
      "dependencies": [],
      "compatibleWith": ["info-bar", "hero-image-badge"],
      "incompatibleWith": [],
      "style": "card-grid",
      "theme": "adapts",
      "file": "quick-service-cards.js",
      "suggestions": {
        "bestFor": ["Negócios com múltiplos serviços", "Especialidades"],
        "placement": "mid-page"
      }
    },
    "about-image-features": {
      "id": "about-image-features",
      "name": "About Image Features",
      "description": "Seção sobre com imagem, texto e lista de características/features com ícones",
      "category": "content",
      "tags": ["about", "image", "features", "split-layout"],
      "niches": ["personal-trainer", "clinics", "companies", "professionals"],
      "requiredProps": ["title", "paragraphs", "features", "imageUrl"],
      "optionalProps": ["id", "tag", "reverse", "colors"],
      "dependencies": [],
      "compatibleWith": ["achievements-numbers-grid", "quick-service-cards"],
      "incompatibleWith": [],
      "style": "split-layout",
      "theme": "adapts",
      "file": "about-image-features.js",
      "suggestions": {
        "bestFor": ["Páginas 'Sobre'", "Profissionais", "Empresas"],
        "placement": "mid-page"
      }
    },
    "about-image-features-clinical": {
      "id": "about-image-features-clinical",
      "name": "About Image Features Clinical",
      "description": "Versão do about-image-features com layout sempre invertido (imagem à direita)",
      "category": "content",
      "tags": ["about", "image", "features", "clinical", "split-layout"],
      "niches": ["clinics", "healthcare", "medical-services"],
      "requiredProps": ["title", "paragraphs", "features", "imageUrl"],
      "optionalProps": ["id", "tag", "colors"],
      "dependencies": [],
      "compatibleWith": ["sticky-header-navigation", "hero-overlay"],
      "incompatibleWith": [],
      "style": "split-layout-right",
      "theme": "adapts",
      "file": "about-image-features-clinical.js",
      "suggestions": {
        "bestFor": ["Clínicas e consultórios", "Profissionais de saúde"],
        "placement": "mid-page"
      }
    },
    "pricing-grid-highlight": {
      "id": "pricing-grid-highlight",
      "name": "Pricing Grid Highlight",
      "description": "Grid de planos/preços com destaque em um plano",
      "category": "pricing",
      "tags": ["pricing", "plans", "grid", "highlight", "subscription"],
      "niches": ["saas", "personal-trainer", "subscription-services", "any"],
      "requiredProps": ["title", "plans"],
      "optionalProps": ["id", "subtitle", "colors"],
      "dependencies": [],
      "compatibleWith": ["quick-service-cards", "about-image-features"],
      "incompatibleWith": [],
      "style": "grid-highlight",
      "theme": "adapts",
      "file": "pricing-grid-highlight.js",
      "suggestions": {
        "bestFor": ["Negócios com pricing", "Planos de assinatura"],
        "placement": "mid-to-late-page"
      }
    },
    "footer-contact": {
      "id": "footer-contact",
      "name": "Footer Contact",
      "description": "Footer com informações de contato, redes sociais e mapa",
      "category": "footer",
      "tags": ["footer", "contact", "social", "map", "address"],
      "niches": ["personal-trainer", "clinics", "local-business", "stores"],
      "requiredProps": ["address", "contact"],
      "optionalProps": ["title", "socialLinks", "copyright", "tags", "colors", "mapQuery"],
      "dependencies": [],
      "compatibleWith": ["contact-top-bar", "whatsapp-float-button"],
      "incompatibleWith": [],
      "style": "contact-focused",
      "theme": "adapts",
      "file": "footer-contact.js",
      "suggestions": {
        "bestFor": ["Negócios que precisam de contato completo", "Serviços locais"],
        "placement": "bottom"
      }
    },
    "whatsapp-float-button": {
      "id": "whatsapp-float-button",
      "name": "WhatsApp Float Button",
      "description": "Botão flutuante fixo para WhatsApp com animação de pulso",
      "category": "integration",
      "tags": ["whatsapp", "float", "button", "cta", "contact"],
      "niches": ["personal-trainer", "clinics", "local-business", "ecommerce"],
      "requiredProps": ["href"],
      "optionalProps": ["icon", "text", "color"],
      "dependencies": [],
      "compatibleWith": ["footer-contact", "contact-top-bar"],
      "incompatibleWith": [],
      "style": "floating",
      "theme": "fixed",
      "file": "whatsapp-float-button.js",
      "suggestions": {
        "bestFor": ["Negócios que usam WhatsApp", "Conversão rápida"],
        "placement": "fixed-bottom-right"
      }
    },
    "sticky-header-navigation": {
      "id": "sticky-header-navigation",
      "name": "Sticky Header Navigation",
      "description": "Header fixo sticky com logo, menu de navegação responsivo e botão de área do cliente",
      "category": "navigation",
      "tags": ["header", "sticky", "navigation", "menu", "responsive"],
      "niches": ["clinics", "professional-offices", "platforms", "corporate"],
      "requiredProps": ["logoUrl", "links"],
      "optionalProps": ["logoAlt", "siteName", "established", "clientAreaButton", "colors"],
      "dependencies": [],
      "compatibleWith": ["contact-top-bar", "hero-overlay"],
      "incompatibleWith": [],
      "style": "professional",
      "theme": "adapts",
      "file": "sticky-header-navigation.js",
      "suggestions": {
        "bestFor": ["Clínicas", "Escritórios profissionais", "Plataformas com login"],
        "placement": "top"
      }
    },
    "sticky-navbar-gradient": {
      "id": "sticky-navbar-gradient",
      "name": "Sticky Navbar Gradient",
      "description": "Navbar fixa com gradiente no logo e menu responsivo. Fica fixa no topo ao fazer scroll",
      "category": "navigation",
      "tags": ["navbar", "sticky", "gradient", "modern", "saas"],
      "niches": ["saas", "software", "professional-services", "ecommerce", "corporate"],
      "requiredProps": ["logoUrl", "links"],
      "optionalProps": ["logoAlt", "ctaButton", "colors"],
      "dependencies": [],
      "compatibleWith": ["hero-badge-preview", "features-grid-glass"],
      "incompatibleWith": [],
      "style": "modern-gradient",
      "theme": "adapts",
      "file": "sticky-navbar-gradient.js",
      "suggestions": {
        "bestFor": ["SaaS/Software", "E-commerce moderno", "Landing pages corporativas"],
        "placement": "top"
      }
    },
    "header-navigation": {
      "id": "header-navigation",
      "name": "Header Navigation",
      "description": "Componente de navegação com menu responsivo, logo e botão CTA",
      "category": "navigation",
      "tags": ["header", "navigation", "menu", "logo", "cta"],
      "niches": ["restaurants", "delivery", "stores", "local-business"],
      "requiredProps": ["logoUrl", "links"],
      "optionalProps": ["logoAlt", "siteName", "established", "whatsappNumber", "colors"],
      "dependencies": [],
      "compatibleWith": ["hero-overlay", "info-bar"],
      "incompatibleWith": [],
      "style": "clean",
      "theme": "adapts",
      "file": "header-navigation.js",
      "suggestions": {
        "bestFor": ["Restaurantes", "Lojas físicas", "Serviços locais"],
        "placement": "top"
      }
    },
    "features-grid-glass": {
      "id": "features-grid-glass",
      "name": "Features Grid Glass",
      "description": "Grid de features com efeito glassmorphism e ícones coloridos",
      "category": "features",
      "tags": ["features", "grid", "glassmorphism", "modern", "saas"],
      "niches": ["saas", "digital-products", "professional-services", "modern"],
      "requiredProps": ["features"],
      "optionalProps": ["title", "subtitle", "colors"],
      "dependencies": [],
      "compatibleWith": ["hero-badge-preview", "sticky-navbar-gradient"],
      "incompatibleWith": [],
      "style": "glassmorphism",
      "theme": "adapts",
      "file": "features-grid-glass.js",
      "suggestions": {
        "bestFor": ["SaaS e plataformas", "Produtos digitais", "Landing pages modernas"],
        "placement": "mid-page"
      }
    },
    "benefit-highlight-split": {
      "id": "benefit-highlight-split",
      "name": "Benefit Highlight Split",
      "description": "Seção split com visual (emoji/imagem) e lista de benefícios",
      "category": "features",
      "tags": ["benefits", "split", "visual", "emoji", "modern"],
      "niches": ["saas", "digital-products", "premium-services", "modern"],
      "requiredProps": ["title", "benefits"],
      "optionalProps": ["visual", "image", "reverse", "colors"],
      "dependencies": [],
      "compatibleWith": ["features-grid-glass", "hero-badge-preview"],
      "incompatibleWith": [],
      "style": "split-glow",
      "theme": "adapts",
      "file": "benefit-highlight-split.js",
      "suggestions": {
        "bestFor": ["SaaS e plataformas", "Produtos digitais", "Serviços premium"],
        "placement": "mid-page"
      }
    },
    "feature-highlight": {
      "id": "feature-highlight",
      "name": "Feature Highlight",
      "description": "Seção split com imagem e lista de features/benefícios",
      "category": "features",
      "tags": ["feature", "split", "image", "benefits"],
      "niches": ["products", "services", "companies", "landing-pages"],
      "requiredProps": ["title", "features", "image"],
      "optionalProps": ["badge", "description", "cta", "layout", "colors"],
      "dependencies": [],
      "compatibleWith": ["about-image-features", "card-grid"],
      "incompatibleWith": [],
      "style": "split-image",
      "theme": "adapts",
      "file": "feature-highlight.js",
      "suggestions": {
        "bestFor": ["Produtos e serviços", "Sobre a empresa", "Destaque de funcionalidades"],
        "placement": "mid-page"
      }
    },
    "card-grid": {
      "id": "card-grid",
      "name": "Card Grid",
      "description": "Grid genérico de cards com imagens, overlay e hover effects",
      "category": "content",
      "tags": ["cards", "grid", "images", "portfolio", "gallery"],
      "niches": ["portfolio", "ecommerce", "catalog", "showcase"],
      "requiredProps": ["items"],
      "optionalProps": ["title", "subtitle", "layout", "colors"],
      "dependencies": [],
      "compatibleWith": ["hero-image-badge", "feature-highlight"],
      "incompatibleWith": [],
      "style": "grid-overlay",
      "theme": "adapts",
      "file": "card-grid.js",
      "suggestions": {
        "bestFor": ["Portfólios", "Galerias de produtos", "Catálogos"],
        "placement": "mid-page"
      }
    },
    "social-proof-logos": {
      "id": "social-proof-logos",
      "name": "Social Proof Logos",
      "description": "Seção de logos/marcas de empresas que confiam no serviço",
      "category": "social-proof",
      "tags": ["logos", "social-proof", "clients", "partners", "minimalist"],
      "niches": ["saas", "agencies", "consulting", "b2b", "professional-services"],
      "requiredProps": ["logos"],
      "optionalProps": ["title", "colors"],
      "dependencies": [],
      "compatibleWith": ["hero-badge-preview", "features-grid-glass"],
      "incompatibleWith": [],
      "style": "minimalist",
      "theme": "adapts",
      "file": "social-proof-logos.js",
      "suggestions": {
        "bestFor": ["SaaS e plataformas", "Agências", "Produtos B2B"],
        "placement": "mid-page"
      }
    },
    "plans-callout-box": {
      "id": "plans-callout-box",
      "name": "Plans Callout Box",
      "description": "Caixa de destaque para planos com fundo colorido, título, subtítulo e botão CTA",
      "category": "pricing",
      "tags": ["pricing", "callout", "highlight", "promotion", "cta"],
      "niches": ["any"],
      "requiredProps": ["title", "subtitle", "button"],
      "optionalProps": ["description", "colors"],
      "dependencies": [],
      "compatibleWith": ["pricing-grid-highlight"],
      "incompatibleWith": [],
      "style": "callout",
      "theme": "adapts",
      "file": "plans-callout-box.js",
      "suggestions": {
        "bestFor": ["Destaque de plano especial", "Ofertas limitadas", "Promoções"],
        "placement": "mid-to-late-page"
      }
    },
    "faq-accordion": {
      "id": "faq-accordion",
      "name": "FAQ Accordion",
      "description": "Seção de perguntas frequentes com accordion interativo",
      "category": "support",
      "tags": ["faq", "accordion", "questions", "interactive"],
      "niches": ["any"],
      "requiredProps": ["questions"],
      "optionalProps": ["title", "subtitle", "colors"],
      "dependencies": [],
      "compatibleWith": ["pricing-grid-highlight", "cta-banner"],
      "incompatibleWith": [],
      "style": "accordion",
      "theme": "adapts",
      "file": "faq-accordion.js",
      "suggestions": {
        "bestFor": ["Qualquer negócio (FAQ universal)", "Reduzir dúvidas"],
        "placement": "late-page"
      }
    },
    "email-signup-form": {
      "id": "email-signup-form",
      "name": "Email Signup Form",
      "description": "Formulário de inscrição por email com checkbox de termos",
      "category": "forms",
      "tags": ["form", "email", "newsletter", "lead-generation"],
      "niches": ["marketing", "blog", "content", "newsletter"],
      "requiredProps": [],
      "optionalProps": ["title", "subtitle", "buttonText", "termsText", "colors"],
      "dependencies": [],
      "compatibleWith": ["cta-banner", "footer-contact"],
      "incompatibleWith": [],
      "style": "form",
      "theme": "adapts",
      "file": "email-signup-form.js",
      "suggestions": {
        "bestFor": ["Newsletters", "Lead generation", "Marketing"],
        "placement": "mid-to-late-page"
      }
    },
    "footer-multi-column-dark": {
      "id": "footer-multi-column-dark",
      "name": "Footer Multi Column Dark",
      "description": "Footer com múltiplas colunas em tema escuro",
      "category": "footer",
      "tags": ["footer", "multi-column", "links", "dark", "corporate"],
      "niches": ["saas", "ecommerce", "corporate", "modern"],
      "requiredProps": ["columns"],
      "optionalProps": ["logo", "description", "copyright", "colors"],
      "dependencies": [],
      "compatibleWith": ["sticky-navbar-gradient", "hero-badge-preview"],
      "incompatibleWith": [],
      "style": "multi-column-dark",
      "theme": "adapts",
      "file": "footer-multi-column-dark.js",
      "suggestions": {
        "bestFor": ["SaaS e plataformas", "E-commerce", "Sites corporativos"],
        "placement": "bottom"
      }
    },
    "footer-multi-column-links": {
      "id": "footer-multi-column-links",
      "name": "Footer Multi Column Links",
      "description": "Footer com múltiplas colunas de links, redes sociais e informações do desenvolvedor",
      "category": "footer",
      "tags": ["footer", "multi-column", "links", "social", "developer"],
      "niches": ["corporate", "portfolio", "agencies", "developers"],
      "requiredProps": ["columns"],
      "optionalProps": ["socialLinks", "developerInfo", "copyright"],
      "dependencies": [],
      "compatibleWith": ["sticky-header-navigation"],
      "incompatibleWith": [],
      "style": "multi-column",
      "theme": "adapts",
      "file": "footer-multi-column-links.js",
      "suggestions": {
        "bestFor": ["Sites corporativos", "Portfólios", "Agências"],
        "placement": "bottom"
      }
    },
    "cta-banner": {
      "id": "cta-banner",
      "name": "CTA Banner",
      "description": "Banner centralizado de call-to-action com botões customizáveis. Design cinematográfico",
      "category": "cta",
      "tags": ["cta", "banner", "conversion", "cinematic", "buttons"],
      "niches": ["any"],
      "requiredProps": ["title", "buttons"],
      "optionalProps": ["subtitle", "backgroundPattern", "colors"],
      "dependencies": [],
      "compatibleWith": ["faq-accordion", "pricing-grid-highlight"],
      "incompatibleWith": [],
      "style": "cinematic",
      "theme": "adapts",
      "file": "cta-banner.js",
      "suggestions": {
        "bestFor": ["Conversão final", "Ofertas especiais", "Promoções"],
        "placement": "late-page"
      }
    },
    "cta-glow-card": {
      "id": "cta-glow-card",
      "name": "CTA Glow Card",
      "description": "Card de call-to-action com efeito glow e gradiente",
      "category": "cta",
      "tags": ["cta", "card", "glow", "gradient", "modern"],
      "niches": ["saas", "digital-products", "modern"],
      "requiredProps": ["title", "description", "button"],
      "optionalProps": ["footerText", "colors"],
      "dependencies": [],
      "compatibleWith": ["features-grid-glass", "hero-badge-preview"],
      "incompatibleWith": [],
      "style": "glow-gradient",
      "theme": "adapts",
      "file": "cta-glow-card.js",
      "suggestions": {
        "bestFor": ["SaaS e plataformas", "Produtos digitais", "Conversão final"],
        "placement": "late-page"
      }
    },
    "ambient-background-effects": {
      "id": "ambient-background-effects",
      "name": "Ambient Background Effects",
      "description": "Efeitos de fundo ambientais com blobs animados",
      "category": "visual",
      "tags": ["background", "effects", "ambient", "blobs", "animation"],
      "niches": ["modern", "digital-products", "landing-pages"],
      "requiredProps": [],
      "optionalProps": ["colors", "intensity"],
      "dependencies": [],
      "compatibleWith": ["hero-badge-preview", "features-grid-glass"],
      "incompatibleWith": [],
      "style": "ambient",
      "theme": "adapts",
      "file": "ambient-background-effects.js",
      "suggestions": {
        "bestFor": ["Landing pages modernas", "Produtos digitais", "Backgrounds decorativos"],
        "placement": "background"
      }
    },
    "marquee-info-bar": {
      "id": "marquee-info-bar",
      "name": "Marquee Info Bar",
      "description": "Barra superior com texto em scroll horizontal (marquee) para destacar informações importantes",
      "category": "navigation",
      "tags": ["marquee", "info", "scroll", "promotion", "announcement"],
      "niches": ["ecommerce", "stores", "promotions", "any"],
      "requiredProps": ["items"],
      "optionalProps": ["colors"],
      "dependencies": [],
      "compatibleWith": ["navbar-ecommerce", "sticky-navbar-gradient"],
      "incompatibleWith": [],
      "style": "marquee-scroll",
      "theme": "adapts",
      "file": "marquee-info-bar.js",
      "suggestions": {
        "bestFor": ["E-commerce", "Lojas", "Promoções", "Informações urgentes"],
        "placement": "top"
      }
    },
    "navbar-ecommerce": {
      "id": "navbar-ecommerce",
      "name": "Navbar E-commerce",
      "description": "Navbar genérica otimizada para e-commerce com logo, menu e ícones de ação (search, account, cart)",
      "category": "navigation",
      "tags": ["navbar", "ecommerce", "menu", "shopping", "cart"],
      "niches": ["ecommerce", "stores", "shopping", "retail"],
      "requiredProps": ["logoText", "links"],
      "optionalProps": ["logoUrl", "actions", "sticky", "colors"],
      "dependencies": [],
      "compatibleWith": ["marquee-info-bar", "hero-split"],
      "incompatibleWith": [],
      "style": "ecommerce",
      "theme": "adapts",
      "file": "navbar-ecommerce.js",
      "suggestions": {
        "bestFor": ["E-commerce", "Lojas online", "Marketplaces"],
        "placement": "top"
      }
    },
    "hero-split": {
      "id": "hero-split",
      "name": "Hero Split",
      "description": "Hero section com layout split (texto à esquerda, imagem à direita). Genérico para qualquer tipo de hero",
      "category": "hero",
      "tags": ["hero", "split", "layout", "image", "cta"],
      "niches": ["ecommerce", "products", "services", "any"],
      "requiredProps": ["title", "imageUrl"],
      "optionalProps": ["badge", "titleHighlight", "description", "buttons", "reverse", "colors"],
      "dependencies": [],
      "compatibleWith": ["navbar-ecommerce", "social-proof-logos"],
      "incompatibleWith": [],
      "style": "split-layout",
      "theme": "adapts",
      "file": "hero-split.js",
      "suggestions": {
        "bestFor": ["E-commerce", "Produtos", "Serviços", "Landing pages"],
        "placement": "after-header"
      }
    },
    "product-grid-ecommerce": {
      "id": "product-grid-ecommerce",
      "name": "Product Grid E-commerce",
      "description": "Grid de produtos para e-commerce com preço, badge, botão de ação e parcelamento",
      "category": "content",
      "tags": ["products", "ecommerce", "grid", "shopping", "price"],
      "niches": ["ecommerce", "stores", "retail", "marketplace"],
      "requiredProps": ["products"],
      "optionalProps": ["title", "subtitle", "linkText", "linkHref", "layout", "colors"],
      "dependencies": [],
      "compatibleWith": ["hero-split", "promo-banner-split"],
      "incompatibleWith": [],
      "style": "product-grid",
      "theme": "adapts",
      "file": "product-grid-ecommerce.js",
      "suggestions": {
        "bestFor": ["E-commerce", "Lojas", "Catálogos de produtos"],
        "placement": "mid-page"
      }
    },
    "promo-banner-split": {
      "id": "promo-banner-split",
      "name": "Promo Banner Split",
      "description": "Banner promocional com layout split (texto + imagem). Genérico para promoções, ofertas, destaque de produtos/serviços",
      "category": "cta",
      "tags": ["promo", "banner", "split", "promotion", "offer"],
      "niches": ["ecommerce", "stores", "promotions", "any"],
      "requiredProps": ["title", "imageUrl"],
      "optionalProps": ["badge", "description", "price", "originalPrice", "button", "reverse", "colors"],
      "dependencies": [],
      "compatibleWith": ["product-grid-ecommerce", "benefits-grid"],
      "incompatibleWith": [],
      "style": "split-promo",
      "theme": "adapts",
      "file": "promo-banner-split.js",
      "suggestions": {
        "bestFor": ["E-commerce", "Promoções", "Ofertas especiais", "Destaque de produtos"],
        "placement": "mid-page"
      }
    },
    "benefits-grid": {
      "id": "benefits-grid",
      "name": "Benefits Grid",
      "description": "Grid de benefícios com ícones, títulos e descrições. Genérico para destacar vantagens, benefícios, características",
      "category": "features",
      "tags": ["benefits", "grid", "icons", "features", "advantages"],
      "niches": ["ecommerce", "services", "any"],
      "requiredProps": ["benefits"],
      "optionalProps": ["columns", "colors"],
      "dependencies": [],
      "compatibleWith": ["promo-banner-split", "product-grid-ecommerce"],
      "incompatibleWith": [],
      "style": "grid-icons",
      "theme": "adapts",
      "file": "benefits-grid.js",
      "suggestions": {
        "bestFor": ["E-commerce", "Serviços", "Destaque de vantagens"],
        "placement": "mid-to-late-page"
      }
    }
  },
  "categories": {
    "navigation": ["contact-top-bar", "sticky-header-navigation", "sticky-navbar-gradient", "header-navigation", "marquee-info-bar", "navbar-ecommerce"],
    "hero": ["hero-image-badge", "hero-overlay", "hero-badge-preview", "hero-split"],
    "information": ["info-bar", "achievements-numbers-grid", "social-proof-logos"],
    "services": ["quick-service-cards", "features-grid-glass", "benefit-highlight-split", "feature-highlight", "benefits-grid"],
    "content": ["about-image-features", "about-image-features-clinical", "card-grid", "product-grid-ecommerce"],
    "pricing": ["pricing-grid-highlight", "plans-callout-box"],
    "footer": ["footer-contact", "footer-multi-column-dark", "footer-multi-column-links"],
    "cta": ["cta-banner", "cta-glow-card", "promo-banner-split"],
    "forms": ["email-signup-form"],
    "support": ["faq-accordion"],
    "integration": ["whatsapp-float-button"],
    "visual": ["ambient-background-effects"]
  },
  "nicheTemplates": {
    "personal-trainer": {
      "recommended": ["contact-top-bar", "hero-image-badge", "info-bar", "achievements-numbers-grid", "quick-service-cards", "about-image-features", "pricing-grid-highlight", "footer-contact", "whatsapp-float-button"],
      "optional": ["cta-banner", "faq-accordion"]
    },
    "saas": {
      "recommended": ["sticky-navbar-gradient", "hero-badge-preview", "social-proof-logos", "features-grid-glass", "benefit-highlight-split", "pricing-grid-highlight", "faq-accordion", "cta-glow-card", "footer-multi-column-dark"],
      "optional": ["ambient-background-effects", "email-signup-form"]
    },
    "clinics": {
      "recommended": ["contact-top-bar", "sticky-header-navigation", "hero-overlay", "about-image-features-clinical", "quick-service-cards", "footer-contact", "whatsapp-float-button"],
      "optional": ["info-bar", "achievements-numbers-grid", "faq-accordion"]
    },
    "restaurants": {
      "recommended": ["header-navigation", "hero-overlay", "info-bar", "quick-service-cards", "card-grid", "footer-contact"],
      "optional": ["cta-banner", "whatsapp-float-button"]
    },
    "ecommerce": {
      "recommended": ["marquee-info-bar", "navbar-ecommerce", "hero-split", "social-proof-logos", "product-grid-ecommerce", "promo-banner-split", "benefits-grid", "footer-multi-column-dark"],
      "optional": ["whatsapp-float-button", "faq-accordion", "pricing-grid-highlight"]
    },
    "corporate": {
      "recommended": ["sticky-header-navigation", "hero-overlay", "about-image-features", "achievements-numbers-grid", "feature-highlight", "footer-multi-column-links"],
      "optional": ["social-proof-logos", "faq-accordion"]
    }
  }
}


# templates/components/catalog/config-schema.json

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Cosmos LP Generator Config Schema",
  "description": "Schema de validação para arquivos config.js",
  "type": "object",
  "required": ["theme", "site"],
  "properties": {
    "theme": {
      "type": "object",
      "required": ["colors", "fonts"],
      "properties": {
        "colors": {
          "type": "object",
          "required": ["primary", "background"],
          "properties": {
            "primary": {
              "type": "string",
              "description": "Cor primária (hexadecimal ou nome Tailwind)",
              "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[a-z-]+$"
            },
            "secondary": {
              "type": "string",
              "description": "Cor secundária"
            },
            "tertiary": {
              "type": "string",
              "description": "Cor terciária"
            },
            "accent": {
              "type": "string",
              "description": "Cor de destaque"
            },
            "background": {
              "type": "string",
              "description": "Cor de fundo"
            },
            "text": {
              "type": "object",
              "properties": {
                "dark": { "type": "string" },
                "medium": { "type": "string" },
                "light": { "type": "string" },
                "white": { "type": "string" }
              }
            }
          }
        },
        "fonts": {
          "type": "object",
          "required": ["primary", "secondary"],
          "properties": {
            "primary": { "type": "string" },
            "secondary": { "type": "string" },
            "urls": {
              "type": "object",
              "properties": {
                "google": { "type": "string", "format": "uri" }
              }
            }
          }
        }
      }
    },
    "site": {
      "type": "object",
      "required": ["title", "name"],
      "properties": {
        "title": { "type": "string" },
        "name": { "type": "string" },
        "established": { "type": "string" },
        "logoAlt": { "type": "string" },
        "logoUrl": { "type": "string", "format": "uri" },
        "logoFallback": { "type": "string", "format": "uri" }
      }
    },
    "contact-top-bar": {
      "type": "object",
      "required": ["infoItems", "socialLinks"],
      "properties": {
        "infoItems": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["icon", "text"],
            "properties": {
              "icon": { "type": "string" },
              "text": { "type": "string" }
            }
          }
        },
        "socialLinks": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["icon", "href"],
            "properties": {
              "icon": { "type": "string" },
              "href": { "type": "string", "format": "uri" }
            }
          }
        },
        "colors": {
          "type": "object",
          "properties": {
            "background": { "type": "string" },
            "primary": { "type": "string" }
          }
        }
      }
    },
    "hero-image-badge": {
      "type": "object",
      "required": ["title", "titleHighlight", "description", "imageUrl"],
      "properties": {
        "tag": { "type": "string" },
        "tagIcon": { "type": "string" },
        "title": { "type": "string" },
        "titleHighlight": { "type": "string" },
        "description": { "type": "string" },
        "buttons": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "text": { "type": "string" },
              "href": { "type": "string" },
              "class": { "type": "string" },
              "icon": { "type": "string" }
            }
          }
        },
        "rating": {
          "type": "object",
          "properties": {
            "stars": { "type": "number", "minimum": 1, "maximum": 5 },
            "text": { "type": "string" }
          }
        },
        "imageUrl": { "type": "string", "format": "uri" },
        "imageAlt": { "type": "string" },
        "badge": {
          "type": "object",
          "properties": {
            "icon": { "type": "string" },
            "title": { "type": "string" },
            "text": { "type": "string" }
          }
        }
      }
    },
    "info-bar": {
      "type": "object",
      "required": ["items"],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["icon", "text"],
            "properties": {
              "icon": { "type": "string" },
              "text": { "type": "string" }
            }
          }
        }
      }
    },
    "pricing-grid-highlight": {
      "type": "object",
      "required": ["title", "plans"],
      "properties": {
        "id": { "type": "string" },
        "title": { "type": "string" },
        "subtitle": { "type": "string" },
        "plans": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["name", "price", "features"],
            "properties": {
              "name": { "type": "string" },
              "price": { "type": "string" },
              "period": { "type": "string" },
              "description": { "type": "string" },
              "features": { "type": "array", "items": { "type": "string" } },
              "button": {
                "type": "object",
                "properties": {
                  "text": { "type": "string" },
                  "href": { "type": "string" }
                }
              },
              "highlighted": { "type": "boolean" },
              "badge": { "type": "string" }
            }
          }
        }
      }
    },
    "footer-contact": {
      "type": "object",
      "required": ["address", "contact"],
      "properties": {
        "title": { "type": "string" },
        "address": {
          "type": "object",
          "required": ["street", "city"],
          "properties": {
            "label": { "type": "string" },
            "street": { "type": "string" },
            "city": { "type": "string" },
            "zipCode": { "type": "string" },
            "mapQuery": { "type": "string" }
          }
        },
        "contact": {
          "type": "object",
          "required": ["phone"],
          "properties": {
            "label": { "type": "string" },
            "phone": { "type": "string" }
          }
        },
        "socialLinks": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["icon", "href"],
            "properties": {
              "icon": { "type": "string" },
              "href": { "type": "string", "format": "uri" },
              "label": { "type": "string" }
            }
          }
        },
        "copyright": { "type": "string" },
        "tags": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "whatsapp-float-button": {
      "type": "object",
      "required": ["href"],
      "properties": {
        "icon": { "type": "string" },
        "text": { "type": "string" },
        "href": { "type": "string", "format": "uri" },
        "color": { "type": "string" }
      }
    }
  },
  "additionalProperties": true,
  "patternProperties": {
    "^[a-z-]+$": {
      "type": "object",
      "description": "Componentes dinâmicos (chaves com hífen são componentes)"
    }
  }
}


Adicione estas instruções específicas ao guia:

---

## 🖼️ REGRAS CRÍTICAS PARA IMAGENS UNSPLASH

### ⚠️ NUNCA INVENTE URLs - USE APENAS ESTE FORMATO:

**URLs válidas do Unsplash seguem EXATAMENTE este padrão:**

```
https://images.unsplash.com/photo-[ID]?w=[largura]
```

**Onde:**
- `[ID]` = sequência numérica de 13 dígitos (ex: `1616440752223`)
- `[largura]` = valor numérico (ex: `1920`, `800`, `600`)

---

### ✅ EXEMPLOS DE URLs VÁLIDAS:

```
✅ https://images.unsplash.com/photo-1616440752223-2951195966ca?w=1920
✅ https://images.unsplash.com/photo-1606813907291-d10d557cf95f?w=800
✅ https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920
```

---

### ❌ NUNCA FAÇA ISTO:

```
❌ https://images.unsplash.com/photo-dentist-clinic?w=1920
❌ https://images.unsplash.com/photo-restaurant-food?w=800
❌ https://images.unsplash.com/photo-modern-office?w=1920
❌ URLs inventadas ou com palavras descritivas
```

---

### 📚 BANCO DE IDs APROVADOS POR NICHO:

Use **APENAS** estes IDs testados e validados:

#### **Clínicas / Saúde:**
```json
{
  "hero": "1606813907291-d86efa9b94db",
  "about": "1631217868264-e5b90f97f4df",
  "consultorio": "1519494026892-80bbd2d6b6b6"
}
```

#### **Restaurantes / Food:**
```json
{
  "hero": "1589829545856-d10d557cf95f",
  "pratos": "1555939594-58d7cb561ad1",
  "ambiente": "1517248135467-4c7edcad34c4"
}
```

#### **Personal Trainer / Fitness:**
```json
{
  "hero": "1616440752223-2951195966ca",
  "treino": "1571019613454-1cb2f99b2d8b",
  "academia": "1534438327276-14e5300c3a48"
}
```

#### **Arquitetura:**
```json
{
  "hero": "1600585154340-be6161a56a0c",
  "projeto": "1613490493576-7fde63acd811",
  "interior": "1586023492125-27b2c045efd7"
}
```

#### **Assistência Técnica / Tech:**
```json
{
  "hero": "1616440752223-2951195966ca",
  "reparo": "1597740985671-2a8a3b80502e",
  "bancada": "1581092160562-40aa08e78837"
}
```

#### **Advogados / Escritórios:**
```json
{
  "hero": "1589829545856-d10d557cf95f",
  "escritorio": "1450101499163-c8848c66ca85",
  "juridico": "1521791055366-0d553872125f"
}
```

---

### 🔒 REGRA OBRIGATÓRIA:

**Antes de gerar qualquer URL de imagem:**

1. ✅ Verifique se o ID está no banco aprovado acima
2. ✅ Se não estiver, use um ID genérico que você SABE que existe
3. ✅ Use sempre o formato exato: `https://images.unsplash.com/photo-[ID]?w=[largura]`
4. ❌ NUNCA invente IDs novos
5. ❌ NUNCA use palavras descritivas no lugar do ID

---

### 🎯 IDs GENÉRICOS SEGUROS (sempre funcionam):

Se não encontrar no banco acima, use alguma IMAGEM FORNECIDA PELA PESSOA NO PROMPT

---

### ✅ CHECKLIST ANTES DE GERAR:

- [ ] URL começa com `https://images.unsplash.com/photo-`
- [ ] ID tem exatamente 13 dígitos ou formato `XXXXX-XXXXXXXX`
- [ ] Termina com `?w=[numero]`
- [ ] ID está no banco aprovado OU é um genérico seguro
- [ ] NÃO contém palavras descritivas

---

**IMPORTANTE:** Se tiver dúvida sobre um ID, use sempre um dos genéricos seguros listados acima. Melhor uma lOGO do que usar algo que quebre





