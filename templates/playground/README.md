# 🎨 Playground de Componentes Cosmos

Um ambiente visual estilo Storybook para visualizar e testar todos os componentes disponíveis no sistema Cosmos.

## 📋 O que é?

O Playground é uma página interativa que lista todos os 28 componentes disponíveis no sistema, permitindo:

- ✅ Visualizar todos os componentes em um único lugar
- ✅ Ver como cada componente se comporta visualmente
- ✅ Navegar facilmente entre componentes
- ✅ Copiar configurações de exemplo
- ✅ Testar diferentes variações

## 🚀 Como usar

1. Abra o arquivo `index.html` no navegador
2. Navegue pela barra lateral para ver os componentes
3. Cada componente é exibido em sua própria seção com:
   - Nome do componente
   - Código identificador
   - Preview visual

## 📦 Componentes Incluídos

### Navegação (4 componentes)
- `sticky-navbar-gradient` - Navbar fixa com gradiente
- `sticky-header-navigation` - Header fixo sticky
- `header-navigation` - Navegação padrão
- `contact-top-bar` - Barra superior de contato

### Hero (3 componentes)
- `hero-badge-preview` - Hero com badge e preview
- `hero-image-badge` - Hero com imagem e badge
- `hero-overlay` - Hero com overlay de imagem

### Info & Stats (3 componentes)
- `info-bar` - Barra de informações
- `achievements-numbers-grid` - Grid de números/estatísticas
- `social-proof-logos` - Logos de social proof

### Features (4 componentes)
- `features-grid-glass` - Grid de features com efeito glass
- `quick-service-cards` - Cards de serviços rápidos
- `feature-highlight` - Destaque de feature
- `benefit-highlight-split` - Destaque de benefício dividido

### About (3 componentes)
- `about-image-features` - Sobre com imagem e features
- `about-image-features-clinical` - Versão clínica
- `card-grid` - Grid de cards

### Pricing (2 componentes)
- `pricing-grid-highlight` - Grid de preços com destaque
- `plans-callout-box` - Box de plano especial

### FAQ & Forms (2 componentes)
- `faq-accordion` - Accordion de FAQ
- `email-signup-form` - Formulário de cadastro de email

### Footer (3 componentes)
- `footer-contact` - Footer com contato e mapa
- `footer-multi-column-dark` - Footer multi-coluna escuro
- `footer-multi-column-links` - Footer multi-coluna com links

### CTA (2 componentes)
- `cta-banner` - Banner de call-to-action
- `cta-glow-card` - Card de CTA com glow

### Effects & Utils (2 componentes)
- `ambient-background-effects` - Efeitos de fundo ambiente
- `whatsapp-float-button` - Botão flutuante do WhatsApp

## 🎯 Estrutura

```
playground/
├── index.html      # Página principal do playground
├── config.js       # Configuração com dados de exemplo para todos os componentes
└── README.md       # Este arquivo
```

## 💡 Personalização

Para testar diferentes configurações:

1. Edite o arquivo `config.js`
2. Modifique as propriedades do componente desejado
3. Recarregue a página no navegador

## 📱 Responsivo

O playground é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🔧 Tecnologias

- Tailwind CSS
- Font Awesome
- AOS (Animate On Scroll)
- Lucide Icons
- Component Registry System

## 📝 Notas

- Todos os componentes são carregados dinamicamente
- Os componentes são montados na ordem definida em `componentOrder`
- Componentes que não existem ou falham ao carregar são marcados com aviso








