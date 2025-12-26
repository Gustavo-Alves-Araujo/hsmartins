const config = {
  theme: {
    colors: {
      primary: '#63452c',        // Marrom solicitado
      primaryLight: '#8B6B4D',   // Tom mais claro
      background: '#FDFBF7',     // Off-white para limpeza visual
      accent: '#D4AF37',         // Dourado para detalhes de qualidade
      text: {
        dark: '#1F1510',
        medium: '#4B3F38',
        light: '#9CA3AF',
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
        text: "(11) 98320-4340"
      },
      {
        icon: "fas fa-map-marker-alt",
        text: "São Paulo e Região"
      },
      {
        icon: "fas fa-clock",
        text: "Atendimento Dinâmico: 24h"
      }
    ],
    socialLinks: [
      {
        icon: "fab fa-whatsapp",
        href: "https://wa.me/551198320434"
      }
    ]
  },

  'sticky-header-navigation': {
    logoUrl: "https://nulttixasqcrugsbpduk.supabase.co/storage/v1/object/public/fotos/1766528165689-jevzh.png",
    logoAlt: "Vidraceiro Jailson",
    siteName: "Vidraceiro Jailson",
    established: "Excelência e Agilidade",
    links: {
      about: { text: "Sobre", href: "#sobre" },
      services: { text: "Serviços", href: "#servicos" },
      projects: { text: "Galeria", href: "#galeria" },
      cta: { text: "Orçamento Rápido", href: "https://wa.me/551198320434", target: "_blank" }
    }
  },

  'hero-split': {
    badge: "🚀 Entrega rápida e atendimento dinâmico",
    title: "Vidraçaria de alta",
    titleHighlight: "qualidade em São Paulo",
    description: "Trabalhos sob medida com acabamento impecável. Do box de banheiro ao fechamento de sacadas, Jailson garante a melhor entrega da região.",
    ctaPrimary: {
      text: "Pedir Orçamento",
      href: "https://wa.me/551198320434"
    },
    ctaSecondary: {
      text: "Ver Serviços",
      href: "#servicos"
    },
    imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800",
    imageAlt: "Instalação de Vidros"
  },

  'info-bar': {
    items: [
      { icon: "fas fa-bolt", text: "Entrega Recorde" },
      { icon: "fas fa-shield-alt", text: "Vidros Certificados" },
      { icon: "fas fa-user-check", text: "Instalação Profissional" },
      { icon: "fas fa-medal", text: "Garantia de Qualidade" }
    ]
  },

  'quick-service-cards': {
    id: "servicos",
    cards: [
      {
        icon: "fas fa-shower",
        title: "Box para Banheiro",
        description: "Diversos modelos e acabamentos para modernizar seu banheiro com segurança.",
        buttonText: "Saber Mais",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-vector-square",
        title: "Espelhos Sob Medida",
        description: "Espelhos decorativos, bisotados e com molduras para todos os ambientes.",
        buttonText: "Saber Mais",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-th-large",
        title: "Janelas e Portas",
        description: "Vidros temperados e laminados com isolamento acústico e resistência.",
        buttonText: "Saber Mais",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-tools",
        title: "Manutenção Geral",
        description: "Reparos em roldanas, molas de piso e substituição de vidros quebrados.",
        buttonText: "Saber Mais",
        buttonHref: "#contato"
      }
    ]
  },

  'about-image-features': {
    id: "sobre",
    tag: "Quem é Jailson",
    title: "Experiência e Confiança em Vidraçaria",
    paragraphs: [
      "Com anos de atuação no mercado, o Vidraceiro Jailson se destaca pelo atendimento dinâmico e pela rapidez na entrega.",
      "Nosso compromisso é transformar seus projetos em realidade com a segurança que sua família merece e a sofisticação que seu ambiente precisa.",
      "Atendemos projetos residenciais e comerciais com a mesma dedicação e profissionalismo."
    ],
    features: [
      { icon: "fas fa-check-circle", text: "Orçamento Gratuito" },
      { icon: "fas fa-check-circle", text: "Pagamento Facilitado" },
      { icon: "fas fa-check-circle", text: "Materiais de Primeira" },
      { icon: "fas fa-check-circle", text: "Limpeza Pós-Obra" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1516714435131-44d6b64dc38b?w=800",
    imageAlt: "Vidraceiro Trabalhando"
  },

  'achievements-numbers-grid': {
    stats: [
      { icon: "fas fa-smile", value: "500+", label: "Clientes Satisfeitos" },
      { icon: "fas fa-hammer", value: "1.2k", label: "Instalações Realizadas" },
      { icon: "fas fa-calendar-check", value: "10", label: "Anos de Experiência" },
      { icon: "fas fa-city", value: "15", label: "Cidades Atendidas" }
    ]
  },

  'faq-accordion': {
    title: "Dúvidas Frequentes",
    subtitle: "Confira as principais perguntas sobre nossos serviços",
    questions: [
      {
        question: "Qual o prazo médio de entrega?",
        answer: "Dependendo do projeto, conseguimos realizar a entrega e instalação em até 3 a 5 dias úteis para itens padrão."
      },
      {
        question: "Vocês fazem orçamento no local?",
        answer: "Sim! Realizamos visitas técnicas para medição e orçamento detalhado sem compromisso em toda região."
      },
      {
        question: "Quais as formas de pagamento?",
        answer: "Aceitamos cartões de crédito (parcelamos), PIX e transferência bancária."
      },
      {
        question: "Os vidros têm garantia?",
        answer: "Sim, oferecemos garantia total sobre a instalação e contra defeitos de fabricação dos materiais."
      }
    ]
  },

  'footer-contact': {
    title: "Fale com o Jailson",
    address: {
      label: "Área de Atendimento",
      street: "Atendemos toda Grande São Paulo",
      city: "São Paulo - SP",
      zipCode: "Atendimento em Domicílio",
      mapQuery: "São Paulo"
    },
    contact: {
      label: "WhatsApp / Telefone",
      phone: "(11) 98320-4340"
    },
    socialLinks: [
      { icon: "fab fa-whatsapp", href: "https://wa.me/551198320434", label: "WhatsApp" }
    ],
    copyright: "© 2024 Vidraceiro Jailson. Todos os direitos reservados.",
    tags: ["Vidraçaria", "Box de Banheiro", "Espelhos", "Vidro Temperado"]
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Orçamento Via Zap",
    href: "https://wa.me/551198320434?text=Olá%20Jailson,%20gostaria%20de%20um%20orçamento!",
    color: "#25D366"
  },

  site: {
    title: "Vidraceiro Jailson - Vidraçaria em São Paulo | Entrega Rápida",
    name: "Vidraceiro Jailson",
    logoAlt: "Logo Vidraceiro Jailson",
    logoUrl: "https://nulttixasqcrugsbpduk.supabase.co/storage/v1/object/public/fotos/1766528165689-jevzh.png"
  }
};

window.config = config;