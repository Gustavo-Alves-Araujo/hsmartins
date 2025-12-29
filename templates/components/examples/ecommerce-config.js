/**
 * Exemplo de Config para E-commerce
 *
 * Este é um exemplo completo de config.js para um site de e-commerce.
 * Use este como base e adapte conforme suas necessidades.
 */

const config = {
  theme: {
    colors: {
      primary: '#2563EB',        // Blue - Confiança para e-commerce
      secondary: '#3B82F6',       // Blue light
      tertiary: '#60A5FA',       // Blue lighter
      accent: '#F59E0B',         // Amber
      background: '#FFFFFF',      // White background
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

  // Componentes recomendados para E-commerce
  'sticky-navbar-gradient': {
    logoUrl: "https://placehold.co/120x40/2563EB/FFFFFF?text=SHOP",
    logoAlt: "Logo E-commerce",
    links: {
      products: { text: "Produtos", href: "#produtos" },
      categories: { text: "Categorias", href: "#categorias" },
      about: { text: "Sobre", href: "#sobre" },
      contact: { text: "Contato", href: "#contato" }
    },
    ctaButton: {
      text: "Minha Conta",
      href: "#account",
      class: "btn-primary"
    }
  },

  'hero-image-badge': {
    tag: "Nova Coleção",
    tagIcon: "fas fa-star",
    title: "Descubra produtos",
    titleHighlight: "incríveis",
    description: "Milhares de produtos com os melhores preços. Frete grátis para todo o Brasil.",
    buttons: [
      {
        text: "Comprar Agora",
        href: "#produtos",
        class: "btn-primary",
        hero: true,
        icon: "fas fa-shopping-cart"
      },
      {
        text: "Ver Ofertas",
        href: "#ofertas",
        class: "btn-outline"
      }
    ],
    rating: {
      stars: 5,
      text: "+ de 10.000 avaliações positivas"
    },
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    imageAlt: "Produtos em destaque",
    badge: {
      icon: "fas fa-truck",
      title: "Frete Grátis",
      text: "Em compras acima de R$ 100"
    }
  },

  'info-bar': {
    items: [
      { icon: "fas fa-truck", text: "Frete Grátis acima de R$ 100" },
      { icon: "fas fa-undo", text: "Troca em 30 dias" },
      { icon: "fas fa-lock", text: "Compra Segura" },
      { icon: "fas fa-headset", text: "Suporte 24/7" }
    ]
  },

  'card-grid': {
    title: "Produtos em Destaque",
    subtitle: "Os mais vendidos e queridinhos",
    items: [
      {
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        title: "Fone de Ouvido Premium",
        description: "Qualidade de som excepcional com cancelamento de ruído",
        alt: "Fone de Ouvido Premium"
      },
      {
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        title: "Relógio Inteligente",
        description: "Monitoramento de saúde e notificações no seu pulso",
        alt: "Relógio Inteligente"
      },
      {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        title: "Tênis Esportivo",
        description: "Conforto e performance para seus treinos",
        alt: "Tênis Esportivo"
      },
      {
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
        title: "Mochila Executiva",
        description: "Estilo e praticidade para o dia a dia",
        alt: "Mochila Executiva"
      }
    ],
    layout: {
      columns: 4,
      aspectRatio: "3/4",
      gap: "6"
    }
  },

  'social-proof-logos': {
    title: "Marcas Parceiras",
    logos: [
      { name: "Marca 1", logo: "https://placehold.co/150x60/2563EB/FFFFFF?text=BRAND1" },
      { name: "Marca 2", logo: "https://placehold.co/150x60/2563EB/FFFFFF?text=BRAND2" },
      { name: "Marca 3", logo: "https://placehold.co/150x60/2563EB/FFFFFF?text=BRAND3" },
      { name: "Marca 4", logo: "https://placehold.co/150x60/2563EB/FFFFFF?text=BRAND4" }
    ]
  },

  'pricing-grid-highlight': {
    id: "planos",
    title: "Planos de Assinatura",
    subtitle: "Economize com nossos planos mensais",
    plans: [
      {
        name: "Básico",
        price: "Grátis",
        period: "",
        description: "Para compradores casuais",
        features: [
          "Acesso a produtos",
          "Frete padrão",
          "Suporte por email"
        ],
        button: { text: "Começar", href: "#signup" },
        highlighted: false
      },
      {
        name: "Premium",
        price: "R$ 29",
        period: "/mês",
        description: "O mais popular",
        features: [
          "Frete grátis em todas as compras",
          "Descontos exclusivos",
          "Suporte prioritário",
          "Acesso antecipado a lançamentos"
        ],
        button: { text: "Assinar Premium", href: "#signup" },
        highlighted: true,
        badge: "Mais Popular"
      },
      {
        name: "VIP",
        price: "R$ 99",
        period: "/mês",
        description: "Para clientes fiéis",
        features: [
          "Tudo do Premium",
          "Cashback de 5%",
          "Atendimento VIP",
          "Eventos exclusivos"
        ],
        button: { text: "Assinar VIP", href: "#signup" },
        highlighted: false
      }
    ]
  },

  'faq-accordion': {
    title: "Perguntas Frequentes",
    subtitle: "Tire suas dúvidas sobre compras e entregas",
    questions: [
      {
        question: "Qual o prazo de entrega?",
        answer: "O prazo de entrega varia de 3 a 10 dias úteis, dependendo da região. Frete grátis para compras acima de R$ 100."
      },
      {
        question: "Posso trocar ou devolver?",
        answer: "Sim! Você tem até 30 dias para trocar ou devolver produtos não utilizados, na embalagem original."
      },
      {
        question: "Quais formas de pagamento aceitam?",
        answer: "Aceitamos cartão de crédito, débito, boleto e PIX. Parcelamento em até 12x sem juros."
      },
      {
        question: "Meus dados estão seguros?",
        answer: "Sim, utilizamos criptografia SSL e seguimos todas as normas de segurança para proteger seus dados."
      }
    ]
  },

  'footer-multi-column-dark': {
    logo: {
      url: "https://placehold.co/120x40/2563EB/FFFFFF?text=SHOP",
      alt: "Logo E-commerce"
    },
    description: "Sua loja online com os melhores produtos e preços.",
    columns: [
      {
        title: "Produtos",
        links: [
          { text: "Novidades", href: "#novidades" },
          { text: "Ofertas", href: "#ofertas" },
          { text: "Mais Vendidos", href: "#mais-vendidos" },
          { text: "Categorias", href: "#categorias" }
        ]
      },
      {
        title: "Ajuda",
        links: [
          { text: "Central de Ajuda", href: "#ajuda" },
          { text: "Política de Troca", href: "#trocas" },
          { text: "Frete e Entrega", href: "#frete" },
          { text: "Formas de Pagamento", href: "#pagamento" }
        ]
      },
      {
        title: "Empresa",
        links: [
          { text: "Sobre Nós", href: "#sobre" },
          { text: "Contato", href: "#contato" },
          { text: "Trabalhe Conosco", href: "#trabalhe" },
          { text: "Blog", href: "#blog" }
        ]
      }
    ],
    copyright: "© 2024 E-commerce Shop. Todos os direitos reservados."
  },

  site: {
    title: "E-commerce Shop - Os Melhores Produtos com os Melhores Preços",
    name: "E-commerce Shop",
    established: "",
    logoAlt: "Logo E-commerce",
    logoUrl: "https://placehold.co/120x40/2563EB/FFFFFF?text=SHOP"
  }
};

window.config = config;






