const config = {
  theme: {
    colors: {
      primary: '#1E3A5F',        // brand-blue (azul escuro profissional)
      secondary: '#2C5282',     // brand-blue-light (azul médio)
      tertiary: '#3A6BA0',      // brand-blue-lighter (azul claro)
      primaryLight: '#4A90E2',  // brand-light-blue
      background: '#F7F9FC',    // brand-light (fundo claro e profissional)
      accent: '#D4AF37',        // brand-gold (dourado elegante)
      text: {
        dark: '#1F2937',       // gray-800 - Contraste: 14:1 ✓
        medium: '#4B5563',     // gray-600 - Contraste: 7:1 ✓
        light: '#6B7280',      // gray-500 - Contraste: 5:1 ✓
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Playfair Display", serif',  // Títulos elegantes e clássicos
      secondary: '"Inter", sans-serif',      // Texto corrido profissional
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'
      }
    }
  },

  'header-navigation': {
    logoUrl: "https://placehold.co/100x100/1E3A5F/FFFFFF?text=OAB",
    logoAlt: "Logo Escritório de Advocacia",
    siteName: "Silva & Associados",
    established: "OAB/SP 123.456",
    whatsappNumber: "5511999999999",
    links: {
      about: {
        text: "Sobre",
        href: "#about"
      },
      services: {
        text: "Áreas de Atuação",
        href: "#services"
      },
      location: {
        text: "Contato",
        href: "#location"
      },
      cta: {
        text: "Agendar Consulta",
        href: "https://wa.me/5511999999999",
        target: "_blank"
      }
    },
    colors: {
      background: "background",
      text: "primary",
      ctaBg: "primary",
      ctaText: "white",
      border: "primary"
    }
  },

  'hero-overlay': {
    badge: "Excelência jurídica desde 2010",
    title: "Defendendo seus direitos",
    titleHighlight: "com expertise e dedicação.",
    subtitle: "Escritório de advocacia especializado em diversas áreas do direito. Atendimento personalizado, estratégias jurídicas eficazes e resultados que fazem a diferença.",
    ctaPrimary: {
      text: "Agendar Consulta",
      href: "https://wa.me/5511999999999",
      target: "_blank"
    },
    ctaSecondary: {
      text: "Nossas Áreas",
      href: "#services"
    },
    backgroundImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    backgroundAlt: "Escritório de advocacia moderno",
    whatsappNumber: "5511999999999",
    colors: {
      primary: 'blue',
      accent: 'amber',
      text: 'white'
    }
  },

  'info-bar': {
    items: [
      {
        icon: "fas fa-gavel",
        text: "Mais de 15 anos de experiência"
      },
      {
        icon: "fas fa-map-marker-alt",
        text: "Av. Paulista, 1000 - 10º andar - Bela Vista, São Paulo"
      },
      {
        icon: "fas fa-phone-alt",
        text: "Atendimento: (11) 3333-4444"
      }
    ],
    colors: {
      background: "blue",
      text: "white",
      accent: "amber"
    }
  },

  'card-grid': {
    title: "Áreas de Atuação",
    subtitle: "Especialização em diversas áreas do direito para atender todas as suas necessidades jurídicas",
    items: [
      {
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
        title: "Direito Civil",
        description: "Contratos, responsabilidade civil, direito de família, sucessões e questões patrimoniais com expertise comprovada",
        alt: "Direito Civil"
      },
      {
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        title: "Direito Trabalhista",
        description: "Defesa dos direitos trabalhistas, rescisões, acordos coletivos e consultoria preventiva para empresas",
        alt: "Direito Trabalhista"
      },
      {
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
        title: "Direito Empresarial",
        description: "Constituição de empresas, contratos comerciais, fusões, aquisições e consultoria empresarial estratégica",
        alt: "Direito Empresarial"
      },
      {
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
        title: "Direito Criminal",
        description: "Defesa criminal, habeas corpus, recursos e acompanhamento processual com estratégias personalizadas",
        alt: "Direito Criminal"
      },
      {
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
        title: "Direito Tributário",
        description: "Planejamento tributário, recuperação de créditos, defesa em processos fiscais e consultoria tributária",
        alt: "Direito Tributário"
      },
      {
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
        title: "Direito Imobiliário",
        description: "Compra e venda, locação, regularização de imóveis, usucapião e questões condominiais",
        alt: "Direito Imobiliário"
      }
    ],
    layout: {
      columns: 3,
      aspectRatio: "4/5",
      gap: "8"
    },
    colors: {
      background: "white",
      titleColor: "blue",
      subtitleColor: "gray",
      cardOverlay: "blue",
      accentLine: "amber"
    }
  },

  'feature-highlight': {
    badge: "Diferenciais",
    title: "Por que escolher nosso escritório?",
    description: "Combinamos tradição jurídica com inovação, oferecendo soluções jurídicas eficazes e personalizadas. Nossa equipe multidisciplinar está preparada para atender desde casos simples até questões complexas, sempre com transparência e comprometimento.",
    features: [
      "Mais de 15 anos de experiência no mercado",
      "Equipe multidisciplinar especializada",
      "Atendimento personalizado e humanizado",
      "Tecnologia de ponta para gestão de processos",
      "Resultados comprovados em milhares de casos",
      "Transparência total em custos e prazos"
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    imageAlt: "Equipe de advogados em reunião",
    cta: {
      text: "Conheça Nossa Equipe →",
      href: "#about",
      target: ""
    },
    layout: {
      imagePosition: "right"
    },
    colors: {
      background: "background",
      titleColor: "blue",
      badgeColor: "blue",
      accentColor: "amber",
      ctaColor: "blue",
      ctaHoverColor: "blue"
    }
  },

  'cta-banner': {
    title: "Precisa de orientação jurídica?",
    subtitle: "Agende uma consulta e descubra como podemos ajudar a resolver sua questão jurídica de forma eficiente e transparente.",
    buttons: [
      {
        text: "WhatsApp",
        icon: "fab fa-whatsapp",
        href: "https://wa.me/5511999999999",
        target: "_blank",
        bgColor: "green",
        hoverColor: "green"
      },
      {
        text: "Ligar Agora",
        icon: "fas fa-phone",
        href: "tel:+551133334444",
        bgColor: "blue",
        hoverColor: "blue"
      },
      {
        text: "Enviar Email",
        icon: "fas fa-envelope",
        href: "mailto:contato@silvaassociados.com.br",
        bgColor: "amber",
        hoverColor: "amber"
      }
    ],
    backgroundPattern: "https://www.transparenttextures.com/patterns/circles.png",
    colors: {
      background: "blue",
      textColor: "white"
    }
  },

  'footer-contact': {
    title: "Entre em Contato",
    address: {
      label: "Endereço",
      street: "Av. Paulista, 1000 - 10º andar",
      city: "Bela Vista, São Paulo - SP",
      zipCode: "CEP: 01310-100",
      mapQuery: "Av. Paulista, 1000, São Paulo"
    },
    contact: {
      label: "Contato",
      phone: "(11) 3333-4444"
    },
    socialLinks: [
      {
        icon: "fab fa-linkedin-in",
        href: "https://linkedin.com/company/silvaassociados",
        label: "LinkedIn"
      },
      {
        icon: "fab fa-instagram",
        href: "https://instagram.com/silvaassociados",
        label: "Instagram"
      },
      {
        icon: "fab fa-facebook-f",
        href: "https://facebook.com/silvaassociados",
        label: "Facebook"
      }
    ],
    copyright: "© 2024 Silva & Associados - Advocacia. Todos os direitos reservados. OAB/SP 123.456",
    tags: ["Advocacia", "Direito Civil", "Direito Trabalhista", "Direito Empresarial", "Consultoria Jurídica"],
    colors: {
      background: "gray",
      titleColor: "blue",
      textColor: "gray",
      textStrong: "blue",
      textMuted: "gray",
      iconColor: "blue",
      borderColor: "gray"
    }
  },

  site: {
    title: "Silva & Associados - Escritório de Advocacia | Excelência Jurídica",
    name: "Silva & Associados",
    established: "OAB/SP 123.456",
    logoAlt: "Logo Silva & Associados - Advocacia",
    logoUrl: "https://placehold.co/100x100/1E3A5F/FFFFFF?text=OAB",
    logoFallback: "https://placehold.co/100x100/1E3A5F/FFFFFF?text=SA",
  },
};

window.config = config;

