/**
 * Exemplo de Config para SaaS / Plataformas
 *
 * Este é um exemplo completo de config.js para um site de SaaS ou plataforma.
 * Use este como base e adapte conforme suas necessidades.
 */

const config = {
  theme: {
    colors: {
      primary: '#9333EA',        // Purple - Moderno para SaaS
      secondary: '#EC4899',      // Pink
      tertiary: '#A855F7',      // Purple light
      accent: '#F59E0B',        // Amber
      background: '#0f0f13',    // Dark background
      text: {
        dark: '#1F2937',
        medium: '#4B5563',
        light: '#9CA3AF',
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Inter", sans-serif',
      secondary: '"Inter", sans-serif',
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
      }
    }
  },

  // Componentes recomendados para SaaS
  'sticky-navbar-gradient': {
    logoUrl: "https://placehold.co/120x40/9333EA/FFFFFF?text=SAAS",
    logoAlt: "Logo SaaS",
    links: {
      features: { text: "Funcionalidades", href: "#features" },
      pricing: { text: "Preços", href: "#pricing" },
      about: { text: "Sobre", href: "#about" },
      contact: { text: "Contato", href: "#contact" }
    },
    ctaButton: {
      text: "Começar Grátis",
      href: "#signup",
      class: "btn-primary"
    }
  },

  'hero-badge-preview': {
    badge: "Nova versão disponível",
    title: "Transforme seu negócio com",
    titleHighlight: "nossa plataforma",
    description: "A solução completa para gerenciar seu negócio de forma eficiente. Mais de 10.000 empresas confiam em nós.",
    buttons: [
      {
        text: "Começar Grátis",
        href: "#signup",
        class: "btn-primary"
      },
      {
        text: "Ver Demonstração",
        href: "#demo",
        class: "btn-outline"
      }
    ],
    preview: {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      alt: "Dashboard Preview"
    }
  },

  'social-proof-logos': {
    title: "Empresas que confiam em nós",
    logos: [
      { name: "Empresa 1", logo: "https://placehold.co/150x60/9333EA/FFFFFF?text=LOGO1" },
      { name: "Empresa 2", logo: "https://placehold.co/150x60/9333EA/FFFFFF?text=LOGO2" },
      { name: "Empresa 3", logo: "https://placehold.co/150x60/9333EA/FFFFFF?text=LOGO3" },
      { name: "Empresa 4", logo: "https://placehold.co/150x60/9333EA/FFFFFF?text=LOGO4" }
    ]
  },

  'features-grid-glass': {
    title: "Funcionalidades Poderosas",
    subtitle: "Tudo que você precisa para gerenciar seu negócio",
    features: [
      {
        icon: "lucide:zap",
        title: "Performance",
        description: "Alta performance e velocidade para suas operações"
      },
      {
        icon: "lucide:shield",
        title: "Segurança",
        description: "Seus dados protegidos com criptografia de ponta"
      },
      {
        icon: "lucide:smartphone",
        title: "Mobile",
        description: "Acesse de qualquer lugar, a qualquer momento"
      },
      {
        icon: "lucide:bar-chart",
        title: "Analytics",
        description: "Relatórios detalhados e insights valiosos"
      },
      {
        icon: "lucide:users",
        title: "Colaboração",
        description: "Trabalhe em equipe de forma eficiente"
      },
      {
        icon: "lucide:headphones",
        title: "Suporte",
        description: "Suporte 24/7 para ajudar você sempre"
      }
    ]
  },

  'benefit-highlight-split': {
    title: "Por que escolher nossa plataforma?",
    benefits: [
      "Economia de tempo e recursos",
      "Aumento de produtividade em até 300%",
      "Integração com principais ferramentas",
      "Atualizações constantes e melhorias",
      "Suporte técnico especializado"
    ],
    visual: "🚀",
    reverse: false
  },

  'pricing-grid-highlight': {
    id: "pricing",
    title: "Planos que Crescem com Você",
    subtitle: "Escolha o plano ideal para seu negócio",
    plans: [
      {
        name: "Starter",
        price: "R$ 99",
        period: "/mês",
        description: "Perfeito para começar",
        features: [
          "Até 5 usuários",
          "10GB de armazenamento",
          "Suporte por email",
          "Integrações básicas"
        ],
        button: { text: "Começar Agora", href: "#signup" },
        highlighted: false
      },
      {
        name: "Professional",
        price: "R$ 299",
        period: "/mês",
        description: "O mais popular",
        features: [
          "Usuários ilimitados",
          "100GB de armazenamento",
          "Suporte prioritário",
          "Todas as integrações",
          "Analytics avançado"
        ],
        button: { text: "Escolher Professional", href: "#signup" },
        highlighted: true,
        badge: "Mais Popular"
      },
      {
        name: "Enterprise",
        price: "R$ 799",
        period: "/mês",
        description: "Para grandes empresas",
        features: [
          "Tudo do Professional",
          "Armazenamento ilimitado",
          "Suporte dedicado 24/7",
          "Customizações",
          "Treinamento da equipe"
        ],
        button: { text: "Falar com Vendas", href: "#contact" },
        highlighted: false
      }
    ]
  },

  'faq-accordion': {
    title: "Perguntas Frequentes",
    subtitle: "Tire suas dúvidas sobre nossa plataforma",
    questions: [
      {
        question: "Posso testar antes de assinar?",
        answer: "Sim! Oferecemos um período de teste gratuito de 14 dias, sem necessidade de cartão de crédito."
      },
      {
        question: "Posso cancelar a qualquer momento?",
        answer: "Sim, você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas."
      },
      {
        question: "Meus dados estão seguros?",
        answer: "Absolutamente. Utilizamos criptografia de ponta e seguimos os mais altos padrões de segurança."
      },
      {
        question: "Oferecem suporte técnico?",
        answer: "Sim! Oferecemos suporte por email, chat e telefone, dependendo do seu plano."
      }
    ]
  },

  'cta-glow-card': {
    title: "Pronto para transformar seu negócio?",
    description: "Comece hoje mesmo e veja a diferença que nossa plataforma pode fazer.",
    button: {
      text: "Começar Grátis Agora",
      href: "#signup"
    },
    footerText: "Sem cartão de crédito necessário • Cancele quando quiser"
  },

  'footer-multi-column-dark': {
    logo: {
      url: "https://placehold.co/120x40/9333EA/FFFFFF?text=SAAS",
      alt: "Logo SaaS"
    },
    description: "A plataforma completa para gerenciar seu negócio de forma eficiente.",
    columns: [
      {
        title: "Produto",
        links: [
          { text: "Funcionalidades", href: "#features" },
          { text: "Preços", href: "#pricing" },
          { text: "Integrações", href: "#integrations" },
          { text: "Atualizações", href: "#updates" }
        ]
      },
      {
        title: "Empresa",
        links: [
          { text: "Sobre Nós", href: "#about" },
          { text: "Blog", href: "#blog" },
          { text: "Carreiras", href: "#careers" },
          { text: "Contato", href: "#contact" }
        ]
      },
      {
        title: "Suporte",
        links: [
          { text: "Central de Ajuda", href: "#help" },
          { text: "Documentação", href: "#docs" },
          { text: "Status", href: "#status" },
          { text: "Segurança", href: "#security" }
        ]
      }
    ],
    copyright: "© 2024 SaaS Platform. Todos os direitos reservados."
  },

  site: {
    title: "SaaS Platform - Transforme seu Negócio",
    name: "SaaS Platform",
    established: "",
    logoAlt: "Logo SaaS",
    logoUrl: "https://placehold.co/120x40/9333EA/FFFFFF?text=SAAS"
  }
};

window.config = config;






