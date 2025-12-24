const config = {
  theme: {
    colors: {
      primary: '#111111',        // Black - Cor principal para streetwear
      secondary: '#3B82F6',      // Blue
      tertiary: '#60A5FA',       // Blue light
      accent: '#00F0FF',         // Cyber Blue accent
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
      secondary: '"Space Grotesk", sans-serif',
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap'
      }
    }
  },

  'marquee-info-bar': {
    items: [
      { text: "FRETE GRÁTIS PARA TODO O BRASIL ACIMA DE R$ 299" },
      { text: "PARCELAMENTO EM ATÉ 10X SEM JUROS" },
      { text: "5% DE DESCONTO NO PIX" },
      { text: "ENVIOS EM ATÉ 24H ÚTEIS" }
    ],
    colors: {
      background: "black",
      text: "white"
    }
  },

  'navbar-ecommerce': {
    logoText: "KICKS.BR",
    logoAlt: "Logo KICKS.BR",
    links: {
      lancamentos: { text: "Lançamentos", href: "#lancamentos" },
      masculino: { text: "Masculino", href: "#masculino" },
      feminino: { text: "Feminino", href: "#feminino" },
      sale: { text: "SALE", href: "#sale", highlight: true }
    },
    actions: {
      search: true,
      account: { text: "Minha Conta", href: "#account" },
      cart: true
    },
    sticky: true,
    colors: {
      background: "white",
      text: "black"
    }
  },

  'hero-split': {
    badge: "Nova Coleção 2025",
    title: "URBAN",
    titleHighlight: "LEGENDS",
    description: "Descubra os modelos mais exclusivos que definem a cultura urbana. Conforto, estilo e autenticidade em cada passo.",
    buttons: [
      {
        text: "Ver Coleção",
        href: "#lancamentos",
        class: "bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-900 transition-all hover:scale-105 shadow-xl"
      },
      {
        text: "Ver Lookbook",
        href: "#lookbook",
        class: "px-8 py-4 font-bold uppercase tracking-wider border border-black hover:bg-black hover:text-white transition-all"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200",
    imageAlt: "Tênis Urban Legends",
    reverse: false,
    colors: {
      background: "brand-gray",
      title: "black",
      titleHighlight: "gray"
    }
  },

  'social-proof-logos': {
    title: "Marcas Parceiras",
    logos: [
      { name: "NIKE", icon: "", style: "" },
      { name: "ADIDAS", icon: "", style: "" },
      { name: "PUMA", icon: "", style: "" },
      { name: "NEW BALANCE", icon: "", style: "" },
      { name: "VANS", icon: "", style: "" }
    ]
  },

  'product-grid-ecommerce': {
    title: "Drops da Semana",
    subtitle: "Os modelos mais hypados chegaram.",
    linkText: "VER TODOS",
    linkHref: "#produtos",
    products: [
      {
        id: "1",
        name: "Nike Air Jordan 1 High",
        price: 1299.90,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Nike Air Jordan 1 High",
        badge: "NOVO",
        category: "Casual / Lifestyle",
        showInstallment: true,
        installmentMonths: 10
      },
      {
        id: "2",
        name: "Adidas Yeezy Boost 350",
        price: 1599.90,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Adidas Yeezy Boost 350",
        badge: "HOT",
        category: "Casual / Lifestyle",
        showInstallment: true,
        installmentMonths: 10
      },
      {
        id: "3",
        name: "New Balance 550 White",
        price: 899.90,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600",
        imageAlt: "New Balance 550 White",
        category: "Casual / Lifestyle",
        showInstallment: true,
        installmentMonths: 10
      },
      {
        id: "4",
        name: "Nike Dunk Low Retro",
        price: 799.90,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Nike Dunk Low Retro",
        badge: "RESTOCK",
        category: "Casual / Lifestyle",
        showInstallment: true,
        installmentMonths: 10
      }
    ],
    layout: {
      columns: 4
    },
    colors: {
      background: "white",
      title: "black"
    }
  },

  'promo-banner-split': {
    badge: "Oferta Relâmpago",
    title: "Urban Runner V2",
    description: "O tênis mais confortável do mercado com tecnologia de amortecimento responsivo. Design aerodinâmico para a selva de pedra.",
    price: "R$ 499,90",
    originalPrice: "R$ 899,90",
    button: {
      text: "Comprar Agora",
      href: "#promo",
      class: "bg-white text-black px-8 py-3 font-bold uppercase hover:bg-gray-200 transition-colors"
    },
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Urban Runner V2",
    reverse: false,
    colors: {
      background: "black",
      text: "white",
      accent: "yellow"
    }
  },

  'benefits-grid': {
    benefits: [
      {
        icon: "credit-card",
        iconType: "lucide",
        title: "Parcelamento Facilitado",
        description: "Em até 12x no cartão de crédito ou 4x sem juros."
      },
      {
        icon: "zap",
        iconType: "lucide",
        title: "Desconto no PIX",
        description: "Ganhe 5% de desconto pagando via PIX com aprovação imediata."
      },
      {
        icon: "truck",
        iconType: "lucide",
        title: "Entrega Expressa",
        description: "Frete Grátis para Sul e Sudeste em compras acima de R$ 299."
      }
    ],
    columns: 3,
    colors: {
      background: "white",
      iconBackground: "gray",
      title: "black"
    }
  },

  'footer-multi-column-dark': {
    logoText: "KICKS.BR",
    description: "A maior loja de streetwear do Brasil. Trazendo o lifestyle urbano para seus pés desde 2018.",
    columns: [
      {
        title: "Comprar",
        links: [
          { text: "Lançamentos", href: "#lancamentos" },
          { text: "Masculino", href: "#masculino" },
          { text: "Feminino", href: "#feminino" },
          { text: "Acessórios", href: "#acessorios" },
          { text: "Outlet", href: "#outlet" }
        ]
      },
      {
        title: "Ajuda",
        links: [
          { text: "Trocas e Devoluções", href: "#trocas" },
          { text: "Política de Frete", href: "#frete" },
          { text: "Guia de Tamanhos", href: "#tamanhos" },
          { text: "Fale Conosco", href: "#contato" },
          { text: "Status do Pedido", href: "#status" }
        ]
      }
    ],
    copyright: "© 2024 Kicks.br Ltda. CNPJ 00.000.000/0001-00. Todos os direitos reservados."
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Fale Conosco",
    href: "https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20produtos.",
    color: "#25D366"
  },

  site: {
    title: "KICKS.BR | O Melhor do Streetwear",
    name: "KICKS.BR",
    established: "",
    logoAlt: "Logo KICKS.BR",
    logoUrl: "",
  },
};

window.config = config;

// Função global para adicionar produtos ao carrinho (usada pelo product-grid-ecommerce)
window.productGridAddToCart = function(productId) {
  console.log('Adicionar produto ao carrinho:', productId);
  // Aqui você pode implementar a lógica do carrinho
  // Por exemplo, atualizar um estado global, abrir sidebar do carrinho, etc.
};

