/**
 * Exemplo de Config para Personal Trainer / Fitness
 *
 * Este é um exemplo completo de config.js para um site de personal trainer.
 * Use este como base e adapte conforme suas necessidades.
 */

const config = {
  theme: {
    colors: {
      primary: '#DC2626',        // Red-600 - Cor energética para fitness
      secondary: '#EF4444',       // Red-500
      tertiary: '#F87171',        // Red-400
      accent: '#FCA5A5',          // Red-300
      background: '#FFFFFF',       // White background
      text: {
        dark: '#1F2937',
        medium: '#4B5563',
        light: '#9CA3AF',
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Poppins", sans-serif',
      secondary: '"Inter", sans-serif',
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap'
      }
    }
  },

  // Componentes recomendados para Personal Trainer
  'contact-top-bar': {
    infoItems: [
      { icon: "fas fa-phone-alt", text: "(11) 98765-4321" },
      { icon: "fas fa-map-marker-alt", text: "São Paulo - SP" },
      { icon: "fas fa-clock", text: "Seg-Sex: 6h às 22h | Sáb: 8h às 14h" }
    ],
    socialLinks: [
      { icon: "fab fa-instagram", href: "https://instagram.com" },
      { icon: "fab fa-facebook-f", href: "https://facebook.com" },
      { icon: "fab fa-youtube", href: "https://youtube.com" }
    ]
  },

  'hero-image-badge': {
    tag: "Transforme seu Corpo",
    tagIcon: "fas fa-dumbbell",
    title: "Alcance seus objetivos com",
    titleHighlight: "Treinamento Personalizado",
    description: "Personal trainer certificado com mais de 10 anos de experiência. Treinos personalizados, acompanhamento nutricional e resultados garantidos.",
    buttons: [
      {
        text: "Agendar Aula Experimental",
        href: "#contato",
        class: "btn-primary",
        hero: true,
        icon: "fas fa-calendar-check"
      },
      {
        text: "Ver Planos",
        href: "#planos",
        class: "btn-outline"
      }
    ],
    rating: {
      stars: 5,
      text: "+ de 500 alunos transformados"
    },
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    imageAlt: "Personal trainer motivando aluno",
    badge: {
      icon: "fas fa-trophy",
      title: "10+ Anos",
      text: "De experiência"
    }
  },

  'info-bar': {
    items: [
      { icon: "fas fa-dumbbell", text: "Treino Personalizado" },
      { icon: "fas fa-utensils", text: "Acompanhamento Nutricional" },
      { icon: "fas fa-home", text: "Atendimento em Domicílio" },
      { icon: "fas fa-clock", text: "Horários Flexíveis" }
    ]
  },

  'achievements-numbers-grid': {
    id: "resultados",
    title: "Resultados que Falam por Si",
    stats: [
      { value: "500+", label: "Alunos Transformados" },
      { value: "10+", label: "Anos de Experiência" },
      { value: "95%", label: "Taxa de Satisfação" },
      { value: "24/7", label: "Suporte Online" }
    ],
    description: "Com metodologia comprovada e acompanhamento personalizado, ajudamos centenas de pessoas a alcançarem seus objetivos."
  },

  'quick-service-cards': {
    cards: [
      {
        icon: "fas fa-user-friends",
        title: "Treino Individual",
        description: "Atenção exclusiva e treino 100% personalizado para seus objetivos específicos.",
        buttonText: "Saiba Mais",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-users",
        title: "Treino em Dupla",
        description: "Treine com um amigo ou parceiro e economize! Treino personalizado para duas pessoas.",
        buttonText: "Ver Preço",
        buttonHref: "#planos"
      },
      {
        icon: "fas fa-home",
        title: "Treino em Casa",
        description: "Comodidade total! Vou até sua casa com equipamentos portáteis.",
        buttonText: "Agendar",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-utensils",
        title: "Consultoria Nutricional",
        description: "Plano alimentar personalizado alinhado com seus objetivos.",
        buttonText: "Conhecer",
        buttonHref: "#contato"
      }
    ]
  },

  'about-image-features': {
    id: "sobre",
    tag: "Sobre Mim",
    title: "Transformando Vidas Através do Fitness",
    paragraphs: [
      "Sou um personal trainer certificado com mais de 10 anos de experiência no mercado fitness.",
      "Com formação em Educação Física e especialização em Treinamento Funcional e Nutrição Esportiva.",
      "Acredito que cada pessoa é única e merece um plano de treino e nutrição feito especialmente para ela."
    ],
    features: [
      { icon: "fas fa-certificate", text: "CREF Certificado" },
      { icon: "fas fa-graduation-cap", text: "Especialização em Treinamento Funcional" },
      { icon: "fas fa-apple-alt", text: "Nutrição Esportiva" },
      { icon: "fas fa-heartbeat", text: "Avaliação Física Completa" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    imageAlt: "Personal trainer profissional",
    reverse: false
  },

  'pricing-grid-highlight': {
    id: "planos",
    title: "Planos que Cabem no Seu Bolso",
    subtitle: "Escolha o plano ideal para sua jornada de transformação",
    plans: [
      {
        name: "Básico",
        price: "R$ 200",
        period: "/mês",
        description: "Perfeito para quem está começando",
        features: [
          "4 treinos por mês",
          "Plano de treino personalizado",
          "Acompanhamento via app",
          "Suporte por WhatsApp"
        ],
        button: { text: "Começar Agora", href: "#contato" },
        highlighted: false
      },
      {
        name: "Premium",
        price: "R$ 350",
        period: "/mês",
        description: "O mais escolhido para resultados rápidos",
        features: [
          "8 treinos por mês",
          "Plano de treino personalizado",
          "Plano nutricional incluído",
          "Acompanhamento 24/7"
        ],
        button: { text: "Escolher Premium", href: "#contato" },
        highlighted: true,
        badge: "Mais Popular"
      }
    ]
  },

  'footer-contact': {
    title: "Vamos Transformar seu Corpo Juntos?",
    address: {
      label: "Localização",
      street: "Atendimento em toda São Paulo",
      city: "São Paulo",
      zipCode: "SP",
      mapQuery: "São Paulo, SP"
    },
    contact: {
      label: "Contato",
      phone: "(11) 98765-4321"
    },
    socialLinks: [
      { icon: "fab fa-instagram", href: "https://instagram.com", label: "Instagram" },
      { icon: "fab fa-facebook-f", href: "https://facebook.com", label: "Facebook" },
      { icon: "fab fa-whatsapp", href: "https://wa.me/5511987654321", label: "WhatsApp" }
    ],
    copyright: "Personal Trainer © 2024 – Todos os direitos reservados.",
    tags: ["Personal Trainer", "Treino Personalizado", "Fitness", "Nutrição Esportiva"]
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Fale Comigo",
    href: "https://wa.me/5511987654321?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20treinos%20personalizados.",
    color: "#25D366"
  },

  site: {
    title: "Personal Trainer - Transforme seu Corpo e Alcançe seus Objetivos",
    name: "Personal Trainer",
    established: "CREF 12345-G/SP",
    logoAlt: "Logo Personal Trainer",
    logoUrl: ""
  }
};

window.config = config;


