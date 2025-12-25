const config = {
  theme: {
    colors: {
      primary: '#16A34A',        // Green - Cor do gramado/futebol
      secondary: '#22C55E',      // Green light
      tertiary: '#4ADE80',       // Green lighter
      accent: '#FACC15',         // Yellow - Destaque
      background: '#FFFFFF',     // White background
      text: {
        dark: '#1F2937',
        medium: '#4B5563',
        light: '#9CA3AF',
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Inter", sans-serif',
      secondary: '"Poppins", sans-serif',
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap'
      }
    }
  },

  'marquee-info-bar': {
    items: [
      { text: "🎟️ INGRESSOS DISPONÍVEIS PARA OS PRÓXIMOS JOGOS" },
      { text: "✅ COMPRA 100% SEGURA E GARANTIDA" },
      { text: "📱 ENTRADA DIGITAL - SEM FILAS" },
      { text: "⚡ ENVIO IMEDIATO APÓS A COMPRA" }
    ],
    colors: {
      background: "black",
      text: "white"
    }
  },

  'navbar-ecommerce': {
    logoText: "Coringressos",
    logoAlt: "Logo Coringressos",
    links: {
      jogos: { text: "Jogos", href: "#jogos" },
      times: { text: "Times", href: "#times" },
      campeonatos: { text: "Campeonatos", href: "#campeonatos" },
      promocoes: { text: "Promoções", href: "#promocoes", highlight: true }
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
    badge: "Ingressos Oficiais",
    title: "Viva a emoção do",
    titleHighlight: "futebol ao vivo",
    description: "Garanta seus ingressos para os melhores jogos do Brasil. Compra segura, entrada digital e suporte completo para você não perder nenhum lance.",
    buttons: [
      {
        text: "Ver Jogos Disponíveis",
        href: "#jogos",
        class: "bg-green-600 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-green-700 transition-all hover:scale-105 shadow-xl"
      },
      {
        text: "Como Funciona",
        href: "#como-funciona",
        class: "px-8 py-4 font-bold uppercase tracking-wider border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
    imageAlt: "Estádio de futebol com torcida",
    reverse: false,
    colors: {
      background: "white",
      title: "black",
      titleHighlight: "green-600"
    }
  },

  'info-bar': {
    items: [
      { icon: "fas fa-ticket-alt", text: "Ingressos Oficiais e Garantidos" },
      { icon: "fas fa-shield-alt", text: "Compra 100% Segura" },
      { icon: "fas fa-mobile-alt", text: "Entrada Digital no Celular" },
      { icon: "fas fa-clock", text: "Envio Imediato" }
    ],
    colors: {
      background: "green-700",
      text: "white",
      accent: "yellow-400"
    }
  },

  'social-proof-logos': {
    title: "Times e Campeonatos",
    logos: [
      { name: "Brasileirão", icon: "", style: "" },
      { name: "Copa do Brasil", icon: "", style: "" },
      { name: "Libertadores", icon: "", style: "" },
      { name: "Estaduais", icon: "", style: "" },
      { name: "Seleção", icon: "", style: "" }
    ]
  },

  'achievements-numbers-grid': {
    id: "estatisticas",
    title: "Números que Comprovam Nossa Confiança",
    description: "Milhares de torcedores já garantiram seus ingressos conosco",
    stats: [
      { value: "500K+", label: "Ingressos Vendidos" },
      { value: "98%", label: "Satisfação dos Clientes" },
      { value: "24/7", label: "Suporte Disponível" },
      { value: "100%", label: "Ingressos Garantidos" }
    ],
    colors: {
      background: "white",
      primary: "green-600"
    }
  },

  'product-grid-ecommerce': {
    title: "Próximos Jogos",
    subtitle: "Garanta seu lugar no estádio",
    linkText: "VER TODOS OS JOGOS",
    linkHref: "#todos-jogos",
    products: [
      {
        id: "1",
        name: "Flamengo x Palmeiras",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ingresso Flamengo x Palmeiras",
        badge: "EM ALTA",
        category: "Brasileirão Série A",
        showInstallment: true,
        installmentMonths: 3,
        description: "Maracanã - 15/03/2025 - 16h"
      },
      {
        id: "2",
        name: "Corinthians x São Paulo",
        price: 150.00,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ingresso Corinthians x São Paulo",
        badge: "DERRBY",
        category: "Brasileirão Série A",
        showInstallment: true,
        installmentMonths: 3,
        description: "Arena Corinthians - 20/03/2025 - 18h"
      },
      {
        id: "3",
        name: "Grêmio x Internacional",
        price: 180.00,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ingresso Grêmio x Internacional",
        badge: "GRE-NAL",
        category: "Brasileirão Série A",
        showInstallment: true,
        installmentMonths: 3,
        description: "Arena do Grêmio - 25/03/2025 - 19h"
      },
      {
        id: "4",
        name: "Atlético-MG x Cruzeiro",
        price: 140.00,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ingresso Atlético-MG x Cruzeiro",
        badge: "CLÁSSICO",
        category: "Brasileirão Série A",
        showInstallment: true,
        installmentMonths: 3,
        description: "Arena MRV - 28/03/2025 - 16h"
      },
      {
        id: "5",
        name: "Santos x Palmeiras",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ingresso Santos x Palmeiras",
        category: "Brasileirão Série A",
        showInstallment: true,
        installmentMonths: 3,
        description: "Vila Belmiro - 02/04/2025 - 18h"
      },
      {
        id: "6",
        name: "Fluminense x Botafogo",
        price: 100.00,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600",
        imageAlt: "Ingresso Fluminense x Botafogo",
        category: "Brasileirão Série A",
        showInstallment: true,
        installmentMonths: 3,
        description: "Maracanã - 05/04/2025 - 16h"
      }
    ],
    layout: {
      columns: 3
    },
    colors: {
      background: "white",
      title: "black"
    }
  },

  'promo-banner-split': {
    badge: "Oferta Especial",
    title: "Pacote Final Libertadores",
    description: "Garanta ingressos para a grande final da Libertadores com desconto especial. Não perca a chance de ver os melhores times da América do Sul em campo.",
    price: "A partir de R$ 250,00",
    originalPrice: "R$ 350,00",
    button: {
      text: "Garantir Ingressos",
      href: "#libertadores",
      class: "bg-green-600 text-white px-8 py-3 font-bold uppercase hover:bg-green-700 transition-colors"
    },
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Final Libertadores",
    reverse: false,
    colors: {
      background: "black",
      text: "white",
      accent: "#FACC15"
    }
  },

  'benefits-grid': {
    benefits: [
      {
        icon: "shield-check",
        iconType: "lucide",
        title: "Compra 100% Segura",
        description: "Ingressos oficiais com garantia total. Seu dinheiro está protegido."
      },
      {
        icon: "smartphone",
        iconType: "lucide",
        title: "Entrada Digital",
        description: "Receba seu ingresso no celular. Sem filas, sem complicação."
      },
      {
        icon: "zap",
        iconType: "lucide",
        title: "Envio Imediato",
        description: "Após a confirmação do pagamento, receba seu ingresso na hora."
      },
      {
        icon: "headphones",
        iconType: "lucide",
        title: "Suporte Completo",
        description: "Nossa equipe está disponível para ajudar você em qualquer momento."
      },
      {
        icon: "credit-card",
        iconType: "lucide",
        title: "Parcelamento",
        description: "Pague em até 3x sem juros no cartão de crédito."
      },
      {
        icon: "ticket",
        iconType: "lucide",
        title: "Ingressos Garantidos",
        description: "Todos os ingressos são oficiais e válidos para os jogos."
      }
    ],
    columns: 3,
    colors: {
      background: "white",
      iconBackground: "green-100",
      title: "black"
    }
  },

  'footer-multi-column-dark': {
    logoText: "Coringressos",
    description: "A maior plataforma de ingressos de futebol do Brasil. Garanta seu lugar no estádio com segurança e praticidade.",
    columns: [
      {
        title: "Ingressos",
        links: [
          { text: "Brasileirão", href: "#brasileirao" },
          { text: "Copa do Brasil", href: "#copa-brasil" },
          { text: "Libertadores", href: "#libertadores" },
          { text: "Estaduais", href: "#estaduais" },
          { text: "Seleção Brasileira", href: "#selecao" }
        ]
      },
      {
        title: "Ajuda",
        links: [
          { text: "Como Comprar", href: "#como-comprar" },
          { text: "Perguntas Frequentes", href: "#faq" },
          { text: "Política de Reembolso", href: "#reembolso" },
          { text: "Fale Conosco", href: "#contato" },
          { text: "Status do Pedido", href: "#status" }
        ]
      },
      {
        title: "Empresa",
        links: [
          { text: "Sobre Nós", href: "#sobre" },
          { text: "Termos de Uso", href: "#termos" },
          { text: "Política de Privacidade", href: "#privacidade" },
          { text: "Trabalhe Conosco", href: "#trabalhe" }
        ]
      }
    ],
    copyright: "© 2024 Coringressos. Todos os direitos reservados."
  },

  'faq-accordion': {
    title: "Perguntas Frequentes",
    questions: [
      {
        question: "Como funciona a compra de ingressos?",
        answer: "É muito simples! Escolha o jogo desejado, selecione a quantidade de ingressos, faça o pagamento e receba seus ingressos digitalmente no celular. Todo o processo é rápido e seguro."
      },
      {
        question: "Os ingressos são oficiais?",
        answer: "Sim! Todos os ingressos vendidos pela Coringressos são 100% oficiais e garantidos. Trabalhamos diretamente com os clubes e organizadores dos eventos."
      },
      {
        question: "Como recebo meus ingressos?",
        answer: "Após a confirmação do pagamento, você recebe seus ingressos digitalmente por email e WhatsApp. Basta apresentar o QR Code na entrada do estádio."
      },
      {
        question: "Posso cancelar ou trocar meu ingresso?",
        answer: "Sim, oferecemos política de reembolso conforme as regras de cada evento. Entre em contato conosco através do WhatsApp ou email para solicitar o cancelamento."
      },
      {
        question: "Quais formas de pagamento são aceitas?",
        answer: "Aceitamos cartão de crédito (até 3x sem juros), débito, PIX e boleto bancário. O pagamento via PIX tem aprovação imediata."
      },
      {
        question: "E se o jogo for cancelado?",
        answer: "Em caso de cancelamento do evento, garantimos o reembolso integral do valor pago ou a troca por outro jogo de sua preferência."
      }
    ],
    colors: {
      background: "white",
      primary: "green-600"
    }
  },

  'cta-banner': {
    title: "Não Perca Nenhum Lance",
    subtitle: "Garanta seus ingressos agora e viva a emoção do futebol ao vivo",
    buttons: [
      {
        text: "Ver Todos os Jogos",
        href: "#jogos",
        bgColor: "green",
        hoverColor: "green"
      },
      {
        text: "Falar com Atendente",
        href: "https://wa.me/5511999999999",
        target: "_blank",
        bgColor: "yellow",
        hoverColor: "yellow"
      }
    ],
    colors: {
      background: "green-700",
      textColor: "white"
    }
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Fale Conosco",
    href: "https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20ingressos.",
    color: "#25D366"
  },

  site: {
    title: "Coringressos | Ingressos de Futebol Oficiais",
    name: "Coringressos",
    established: "",
    logoAlt: "Logo Coringressos",
    logoUrl: "",
  },
};

window.config = config;

// Função global para adicionar ingressos ao carrinho (usada pelo product-grid-ecommerce)
window.productGridAddToCart = function(productId) {
  console.log('Adicionar ingresso ao carrinho:', productId);
  // Aqui você pode implementar a lógica do carrinho
  // Por exemplo, atualizar um estado global, abrir sidebar do carrinho, etc.
};

