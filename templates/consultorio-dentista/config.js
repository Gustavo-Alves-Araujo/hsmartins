const config = {
  theme: {
    colors: {
      primary: '#0A4D68',        // brand-blue (azul profissional)
      primaryLight: '#088395',   // brand-teal
      background: '#F8FAFB',     // brand-light (fundo claro e limpo)
      accent: '#05BFDB',         // brand-cyan (destaque)
      text: {
        dark: '#1F2937',       // gray-800
        medium: '#4B5563',     // gray-600
        light: '#6B7280',      // gray-500
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Poppins", sans-serif',  // Títulos modernos e profissionais
      secondary: '"Inter", sans-serif',  // Texto corrido
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap'
      }
    }
  },

  'header-navigation': {
    logoUrl: "https://placehold.co/100x100/0A4D68/FFFFFF?text=ODONTO",
    logoAlt: "Logo Consultório Dentista",
    siteName: "Dr. Silva Odontologia",
    established: "CRO-SP 12345",
    whatsappNumber: "5511999999999",
    links: {
      about: {
        text: "Sobre",
        href: "#about"
      },
      services: {
        text: "Serviços",
        href: "#services"
      },
      location: {
        text: "Localização",
        href: "#location"
      },
      cta: {
        text: "Agendar Consulta",
        href: "https://wa.me/5511999999999",
        target: "_blank"
      }
    }
  },

  'hero-overlay': {
    badge: "Cuidando do seu sorriso com excelência",
    title: "Seu sorriso",
    titleHighlight: "merece o melhor.",
    subtitle: "Tratamentos odontológicos modernos com tecnologia de ponta e atendimento humanizado. Transforme sua saúde bucal conosco.",
    ctaPrimary: {
      text: "Agendar Consulta",
      href: "https://wa.me/5511999999999",
      target: "_blank"
    },
    ctaSecondary: {
      text: "Nossos Serviços",
      href: "#services"
    },
    backgroundImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
    backgroundAlt: "Consultório Odontológico Moderno",
    whatsappNumber: "5511999999999",
    colors: {
      primary: 'brand-blue',
      accent: 'brand-cyan',
      text: 'white'
    }
  },

  'info-bar': {
    items: [
      {
        icon: "fas fa-tooth",
        text: "Tecnologia de Ponta"
      },
      {
        icon: "fas fa-map-marker-alt",
        text: "Av. Paulista, 1000 - Bela Vista, São Paulo"
      },
      {
        icon: "far fa-clock",
        text: "Seg-Sex: 8h-19h | Sáb: 8h-13h"
      }
    ],
    colors: {
      background: "brand-blue",
      text: "white",
      accent: "brand-cyan"
    }
  },

  'card-grid': {
    title: "Nossos Serviços",
    subtitle: "Tratamentos completos para sua saúde bucal e estética dental",
    items: [
      {
        image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800",
        title: "Clareamento Dental",
        description: "Clareamento profissional com tecnologia LED para um sorriso mais branco e brilhante",
        alt: "Clareamento Dental Profissional"
      },
      {
        image: "https://images.unsplash.com/photo-1609840114035-3c981237ee0e?w=800",
        title: "Implantes Dentários",
        description: "Recupere seu sorriso com implantes de última geração e procedimentos minimamente invasivos",
        alt: "Implantes Dentários"
      },
      {
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800",
        title: "Ortodontia",
        description: "Aparelhos fixos e invisíveis para correção dental com acompanhamento especializado",
        alt: "Tratamento Ortodôntico"
      }
    ],
    layout: {
      columns: 3,
      aspectRatio: "4/5",
      gap: "8"
    },
    colors: {
      background: "white",           // Fundo branco puro (#FFFFFF)
      titleColor: "gray-900",        // Título escuro (#111827) - Contraste: 16:1 ✓
      subtitleColor: "gray-700",     // Subtítulo (#374151) - Contraste: 10.5:1 ✓
      cardOverlay: "gray-900",       // Overlay escuro para cards
      accentLine: "brand-blue"       // Linha de destaque
    }
  },

  'feature-highlight': {
    badge: "Destaque do Mês",
    title: "Limpeza Completa + Avaliação",
    description: "Pacote especial com limpeza profissional completa, aplicação de flúor e avaliação detalhada da sua saúde bucal. Prevenção é o melhor caminho para um sorriso saudável.",
    features: [
      "Limpeza profissional com ultrassom",
      "Remoção de tártaro e placa bacteriana",
      "Polimento e aplicação de flúor",
      "Avaliação completa da saúde bucal",
      "Orientações personalizadas de higiene"
    ],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
    imageAlt: "Limpeza Dental Profissional",
    cta: {
      text: "Agendar Agora →",
      href: "https://wa.me/5511999999999",
      target: "_blank"
    },
    layout: {
      imagePosition: "left"
    },
    colors: {
      background: "white",
      titleColor: "brand-blue",
      badgeColor: "brand-blue",
      accentColor: "brand-cyan",
      ctaColor: "brand-blue",
      ctaHoverColor: "brand-cyan"
    }
  },

  'cta-banner': {
    title: "Agende sua consulta agora!",
    subtitle: "Atendimento personalizado com horários flexíveis. Entre em contato e transforme seu sorriso.",
    buttons: [
      {
        text: "Agendar no WhatsApp",
        icon: "fab fa-whatsapp",
        href: "https://wa.me/5511999999999",
        target: "_blank",
        bgColor: "green-500",
        hoverColor: "green-600"
      },
      {
        text: "Ligar para o Consultório",
        icon: "fas fa-phone",
        href: "tel:+551133334444",
        bgColor: "blue-600",
        hoverColor: "blue-700"
      }
    ],
    backgroundPattern: "https://www.transparenttextures.com/patterns/clean-gray-paper.png",
    colors: {
      background: "brand-blue",
      textColor: "white"
    }
  },

  'footer-contact': {
    title: "Visite Nosso Consultório",
    address: {
      label: "Endereço",
      street: "Av. Paulista, 1000 - Conjunto 502",
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
        icon: "fab fa-instagram",
        href: "https://instagram.com/drsilvaodontologia",
        label: "Instagram"
      },
      {
        icon: "fab fa-facebook-f",
        href: "#",
        label: "Facebook"
      }
    ],
    copyright: "© 2024 Dr. Silva Odontologia. Todos os direitos reservados.",
    tags: ["Odontologia", "Implantes", "Clareamento", "Ortodontia"],
    colors: {
      background: "gray-50",         // Fundo cinza claro (#F9FAFB)
      titleColor: "gray-900",        // Título (#111827) - Contraste: 16:1 ✓
      textColor: "gray-700",         // Texto (#374151) - Contraste: 10.5:1 ✓
      textStrong: "gray-900",        // Labels em negrito (#111827) - Contraste: 16:1 ✓
      textMuted: "gray-600",         // Copyright (#4B5563) - Contraste: 7:1 ✓
      iconColor: "brand-blue",       // Ícones (#0A4D68) - Contraste: 9:1 ✓
      borderColor: "gray-300"        // Bordas (#D1D5DB)
    }
  },

  site: {
    title: "Dr. Silva Odontologia - Consultório Dentista",
    name: "Dr. Silva Odontologia",
    established: "CRO-SP 12345",
    logoAlt: "Logo Dr. Silva Odontologia",
    logoUrl: "https://placehold.co/100x100/0A4D68/FFFFFF?text=ODONTO",
    logoFallback: "https://placehold.co/100x100/0A4D68/FFFFFF?text=DS",
  },
};

window.config = config;
