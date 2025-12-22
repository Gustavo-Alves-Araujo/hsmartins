const config = {
  theme: {
    colors: {
      primary: '#16A34A',        // brand-green (verde veterinário)
      primaryLight: '#22C55E',   // brand-light-green
      background: '#F9FAFB',     // brand-light (fundo claro)
      accent: '#F97316',         // brand-orange (destaque quente)
      text: {
        dark: '#1F2937',       // gray-800 - Contraste: 14:1 ✓
        medium: '#4B5563',     // gray-600 - Contraste: 7:1 ✓
        light: '#6B7280',      // gray-500 - Contraste: 5:1 ✓
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Nunito", sans-serif',    // Títulos amigáveis e modernos
      secondary: '"Inter", sans-serif',   // Texto corrido
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Nunito:wght@400;600;700;800&display=swap'
      }
    }
  },

  'header-navigation': {
    logoUrl: "https://placehold.co/100x100/16A34A/FFFFFF?text=VET",
    logoAlt: "Logo Pet Care Veterinária",
    siteName: "Pet Care Veterinária",
    established: "CRMV-SP 12345",
    whatsappNumber: "5511988887777",
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
        href: "https://wa.me/5511988887777",
        target: "_blank"
      }
    }
  },

  'hero-overlay': {
    badge: "Cuidando com amor dos seus melhores amigos",
    title: "Saúde e bem-estar",
    titleHighlight: "para seu pet.",
    subtitle: "Clínica veterinária completa com atendimento 24h, cirurgias, exames e muito carinho para cães e gatos. Sua família merece o melhor cuidado.",
    ctaPrimary: {
      text: "Agendar Consulta",
      href: "https://wa.me/5511988887777",
      target: "_blank"
    },
    ctaSecondary: {
      text: "Nossos Serviços",
      href: "#services"
    },
    backgroundImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop",
    backgroundAlt: "Veterinário cuidando de cachorro",
    whatsappNumber: "5511988887777",
    colors: {
      primary: 'green',      // Verde escuro para overlay
      accent: 'orange',      // Laranja para destaques
      text: 'white'              // Texto branco
    }
  },

  'info-bar': {
    items: [
      {
        icon: "fas fa-clock",
        text: "Atendimento 24h"
      },
      {
        icon: "fas fa-map-marker-alt",
        text: "Rua das Flores, 500 - Vila Madalena, São Paulo"
      },
      {
        icon: "fas fa-ambulance",
        text: "Emergências: (11) 98888-7777"
      }
    ],
    colors: {
      background: "green",
      text: "white",
      accent: "orange"
    }
  },

  'card-grid': {
    title: "Nossos Serviços",
    subtitle: "Atendimento completo e humanizado para cães, gatos e outros pets",
    items: [
      {
        image: "https://images.unsplash.com/photo-1530041539828-114de669390e?w=800",
        title: "Consultas Veterinárias",
        description: "Check-ups completos, vacinação e acompanhamento da saúde do seu pet com veterinários especializados",
        alt: "Veterinário examinando cachorro"
      },
      {
        image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800",
        title: "Cirurgias",
        description: "Centro cirúrgico equipado para procedimentos simples e complexos com total segurança",
        alt: "Cirurgia veterinária"
      },
      {
        image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800",
        title: "Banho e Tosa",
        description: "Serviços de estética pet com profissionais capacitados e produtos de qualidade",
        alt: "Cachorro tomando banho"
      }
    ],
    layout: {
      columns: 3,
      aspectRatio: "4/5",
      gap: "8"
    },
    colors: {
      background: "white",
      titleColor: "gray",
      subtitleColor: "gray",
      cardOverlay: "gray",
      accentLine: "green"
    }
  },

  'feature-highlight': {
    badge: "Destaque do Mês",
    title: "Pacote Filhote Completo",
    description: "Tudo que seu filhote precisa nos primeiros meses de vida: consultas, vacinas, vermífugos e orientações nutricionais. Garanta um desenvolvimento saudável com acompanhamento profissional.",
    features: [
      "3 consultas com veterinário",
      "Protocolo completo de vacinação",
      "Vermífugos e antiparasitários",
      "Orientações de nutrição e comportamento",
      "Carteirinha de vacinação digital"
    ],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
    imageAlt: "Filhote de cachorro fofo",
    cta: {
      text: "Contratar Pacote →",
      href: "https://wa.me/5511988887777",
      target: "_blank"
    },
    layout: {
      imagePosition: "right"
    },
    colors: {
      background: "gray",
      titleColor: "gray",
      badgeColor: "green",
      accentColor: "orange",
      ctaColor: "green",
      ctaHoverColor: "green"
    }
  },

  'cta-banner': {
    title: "Emergência? Estamos aqui 24h!",
    subtitle: "Atendimento veterinário urgente a qualquer hora. Entre em contato agora e traga seu pet para cuidados imediatos.",
    buttons: [
      {
        text: "WhatsApp 24h",
        icon: "fab fa-whatsapp",
        href: "https://wa.me/5511988887777",
        target: "_blank",
        bgColor: "green",
        hoverColor: "green"
      },
      {
        text: "Ligar Agora",
        icon: "fas fa-phone",
        href: "tel:+551133335555",
        bgColor: "orange",
        hoverColor: "orange"
      }
    ],
    backgroundPattern: "https://www.transparenttextures.com/patterns/paw-print.png",
    colors: {
      background: "green",
      textColor: "white"
    }
  },

  'footer-contact': {
    title: "Visite Nossa Clínica",
    address: {
      label: "Endereço",
      street: "Rua das Flores, 500",
      city: "Vila Madalena, São Paulo - SP",
      zipCode: "CEP: 05435-020",
      mapQuery: "Rua das Flores, 500, São Paulo"
    },
    contact: {
      label: "Contato",
      phone: "(11) 3333-5555"
    },
    socialLinks: [
      {
        icon: "fab fa-instagram",
        href: "https://instagram.com/petcareveterinaria",
        label: "Instagram"
      },
      {
        icon: "fab fa-facebook-f",
        href: "#",
        label: "Facebook"
      }
    ],
    copyright: "© 2024 Pet Care Veterinária. Todos os direitos reservados.",
    tags: ["Veterinária", "Cirurgia", "Emergência 24h", "Banho e Tosa"],
    colors: {
      background: "gray",
      titleColor: "gray",
      textColor: "gray",
      textStrong: "gray",
      textMuted: "gray",
      iconColor: "green",
      borderColor: "gray"
    }
  },

  site: {
    title: "Pet Care Veterinária - Cuidado Completo para seu Pet",
    name: "Pet Care Veterinária",
    established: "CRMV-SP 12345",
    logoAlt: "Logo Pet Care Veterinária",
    logoUrl: "https://placehold.co/100x100/16A34A/FFFFFF?text=VET",
    logoFallback: "https://placehold.co/100x100/16A34A/FFFFFF?text=PC",
  },
};

window.config = config;
