/**
 * Exemplo de Config para Clínicas / Consultórios
 *
 * Este é um exemplo completo de config.js para um site de clínica ou consultório.
 * Use este como base e adapte conforme suas necessidades.
 */

const config = {
  theme: {
    colors: {
      primary: '#0A4D68',        // Azul profissional
      primaryLight: '#088395',   // Teal
      background: '#F8FAFB',     // Fundo claro e limpo
      accent: '#05BFDB',         // Cyan (destaque)
      text: {
        dark: '#1F2937',
        medium: '#4B5563',
        light: '#6B7280',
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

  // Componentes recomendados para Clínicas
  'contact-top-bar': {
    infoItems: [
      { icon: "fas fa-phone-alt", text: "(11) 3333-4444" },
      { icon: "fas fa-map-marker-alt", text: "Av. Paulista, 1000 - São Paulo" },
      { icon: "fas fa-clock", text: "Seg-Sex: 8h-19h | Sáb: 8h-13h" }
    ],
    socialLinks: [
      { icon: "fab fa-instagram", href: "https://instagram.com" },
      { icon: "fab fa-facebook-f", href: "https://facebook.com" }
    ]
  },

  'sticky-header-navigation': {
    logoUrl: "https://placehold.co/100x100/0A4D68/FFFFFF?text=CLINICA",
    logoAlt: "Logo Clínica",
    siteName: "Clínica Saúde & Bem-Estar",
    established: "CRM 12345",
    links: {
      about: { text: "Sobre", href: "#sobre" },
      services: { text: "Especialidades", href: "#servicos" },
      location: { text: "Localização", href: "#localizacao" },
      cta: { text: "Agendar Consulta", href: "https://wa.me/5511999999999", target: "_blank" }
    }
  },

  'hero-overlay': {
    badge: "Cuidando da sua saúde com excelência",
    title: "Sua saúde",
    titleHighlight: "merece o melhor.",
    subtitle: "Tratamentos modernos com tecnologia de ponta e atendimento humanizado. Transforme sua saúde conosco.",
    ctaPrimary: {
      text: "Agendar Consulta",
      href: "https://wa.me/5511999999999",
      target: "_blank"
    },
    ctaSecondary: {
      text: "Nossas Especialidades",
      href: "#servicos"
    },
    backgroundImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920",
    backgroundAlt: "Consultório Médico Moderno",
    whatsappNumber: "5511999999999"
  },

  'info-bar': {
    items: [
      { icon: "fas fa-hospital", text: "Tecnologia de Ponta" },
      { icon: "fas fa-map-marker-alt", text: "Av. Paulista, 1000 - Bela Vista, São Paulo" },
      { icon: "far fa-clock", text: "Seg-Sex: 8h-19h | Sáb: 8h-13h" }
    ],
    colors: {
      background: "brand-blue",
      text: "white",
      accent: "brand-cyan"
    }
  },

  'quick-service-cards': {
    cards: [
      {
        icon: "fas fa-heartbeat",
        title: "Cardiologia",
        description: "Cuidados especializados para o coração e sistema cardiovascular.",
        buttonText: "Saiba Mais",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-stethoscope",
        title: "Clínica Geral",
        description: "Atendimento completo para toda a família com profissionais qualificados.",
        buttonText: "Agendar",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-user-md",
        title: "Pediatria",
        description: "Cuidados especializados para bebês, crianças e adolescentes.",
        buttonText: "Conhecer",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-x-ray",
        title: "Exames",
        description: "Exames laboratoriais e de imagem com tecnologia avançada.",
        buttonText: "Ver Mais",
        buttonHref: "#contato"
      }
    ]
  },

  'about-image-features-clinical': {
    id: "sobre",
    tag: "Sobre Nós",
    title: "Excelência em Cuidados de Saúde",
    paragraphs: [
      "Nossa clínica foi fundada com o compromisso de oferecer cuidados de saúde de alta qualidade.",
      "Contamos com uma equipe multidisciplinar de profissionais qualificados e tecnologia de ponta.",
      "Nosso objetivo é proporcionar um atendimento humanizado e eficiente para todos os nossos pacientes."
    ],
    features: [
      { icon: "fas fa-certificate", text: "Certificações e Credenciamentos" },
      { icon: "fas fa-users", text: "Equipe Multidisciplinar" },
      { icon: "fas fa-hospital", text: "Infraestrutura Moderna" },
      { icon: "fas fa-heart", text: "Atendimento Humanizado" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
    imageAlt: "Equipe médica profissional"
  },

  'footer-contact': {
    title: "Entre em Contato",
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
      { icon: "fab fa-instagram", href: "https://instagram.com", label: "Instagram" },
      { icon: "fab fa-facebook-f", href: "https://facebook.com", label: "Facebook" }
    ],
    copyright: "© 2024 Clínica Saúde & Bem-Estar. Todos os direitos reservados.",
    tags: ["Clínica", "Saúde", "Médico", "Consultório"]
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Fale Conosco",
    href: "https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.",
    color: "#25D366"
  },

  site: {
    title: "Clínica Saúde & Bem-Estar - Cuidados de Saúde de Excelência",
    name: "Clínica Saúde & Bem-Estar",
    established: "CRM 12345",
    logoAlt: "Logo Clínica",
    logoUrl: "https://placehold.co/100x100/0A4D68/FFFFFF?text=CLINICA"
  }
};

window.config = config;


