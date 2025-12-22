const config = {
  theme: {
    colors: {
      primary: '#7C3AED',        // brand-purple (cor principal - roxo)
      secondary: '#A78BFA',      // brand-light-purple - Cor secundária (mais claro)
      tertiary: '#8B5CF6',       // Cor terciária (roxinho complementar)
      primaryLight: '#DDD6FE',   // Tons ainda mais claros para botões/hover
      background: '#F5F3FF',     // brand-light (fundo claro lilás)
      accent: '#F472B6',         // rosa-accent (rosa quente para destaque)
      text: {
        dark: '#1E1B4B',     // Azul roxo bem escuro para títulos
        medium: '#6D28D9',   // Roxo médio para textos
        light: '#A78BFA',    // Roxo claro
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

  'contact-top-bar': {
    infoItems: [
      {
        icon: "fas fa-phone-alt",
        text: "(11) 2567-3012"
      },
      {
        icon: "fas fa-clock",
        text: "Emergência 24 Horas"
      }
    ],
    socialLinks: [
      {
        icon: "fab fa-facebook-f",
        href: "#"
      },
      {
        icon: "fab fa-instagram",
        href: "#"
      },
      {
        icon: "fab fa-whatsapp",
        href: "#"
      }
    ]
  },

  'sticky-header-navigation': {
    logoUrl: "https://maxvethospital.com.br/wp-content/webp-express/webp-images/uploads/2024/06/Logo-Site.png.webp",
    logoAlt: "Logo Pet Care Veterinária",
    menuItems: [
      {
        text: "Home",
        href: "#home",
        active: true
      },
      {
        text: "Especialidades",
        href: "#especialidades",
        active: false
      },
      {
        text: "O Hospital",
        href: "#equipe",
        active: false
      },
      {
        text: "Planos",
        href: "#planos",
        active: false
      },
      {
        text: "Contato",
        href: "#contato",
        active: false
      }
    ],
    clientButton: {
      text: "Área do Cliente",
      href: "#",
      icon: "fas fa-paw"
    }
  },

  'hero-image-badge': {
    tag: "Cuidado com Excelência",
    tagIcon: "fas fa-heart",
    title: "Seu pet merece um tratamento",
    titleHighlight: "Extraordinário",
    description: "Atendimento veterinário 24 horas com tecnologia de ponta e uma equipe apaixonada pelo que faz. A saúde do seu melhor amigo em primeiro lugar.",
    buttons: [
      {
        text: "Agendar Consulta",
        href: "#contato",
        class: "btn-primary",
        hero: true,
        icon: "fas fa-arrow-right"
      },
      {
        text: "Ver Planos",
        href: "#planos",
        class: "btn-outline",
        style: "padding: 15px 30px;"
      }
    ],
    rating: {
      stars: 5,
      text: "+ de 5.000 pets atendidos"
    },
    imageUrl: "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Cachorro feliz sendo abraçado",
    badge: {
      icon: "fas fa-ambulance",
      title: "Emergência 24h",
      text: "Equipe pronta para atender"
    }
  },

  'quick-service-cards': {
    cards: [
      {
        icon: "fas fa-stethoscope",
        title: "Consulta",
        description: "Agende um check-up hoje mesmo para seu pet, a prevenção é o melhor remédio.",
        buttonText: "Agendar",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-shower",
        title: "Banho e Tosa",
        description: "Mais higiene para seu pet e mais comodidade para você. Pelo macio, brilhante e cheiroso é garantia de saúde.",
        buttonText: "Agendar",
        buttonHref: "#contato"
      },
      {
        icon: "fas fa-hotel",
        title: "Hotel Pet",
        description: "Viaje tranquilo sabendo que seu pet está seguro, confortável e sendo bem cuidado em nosso hotel.",
        buttonText: "Saiba Mais",
        buttonHref: "#"
      }
    ]
  },

  'about-image-features': {
    id: "equipe",
    tag: "A Max Vet",
    title: "Hospital Veterinário 24Horas",
    paragraphs: [
      "Fundado em 2005, Max Vet Hospital Veterinário é um dos mais conceituados hospitais da região, com aprimoramento constante e excelência nos serviços.",
      "Oferecemos o mais completo serviço de atendimento para cães, gatos e silvestres."
    ],
    features: [
      {
        icon: "fas fa-check-circle",
        text: "Clínica Geral 24h"
      },
      {
        icon: "fas fa-check-circle",
        text: "Cirurgias e Internações"
      },
      {
        icon: "fas fa-check-circle",
        text: "RX e Ultra-som"
      },
      {
        icon: "fas fa-check-circle",
        text: "Laboratório Próprio"
      },
      {
        icon: "fas fa-check-circle",
        text: "Oftalmologia e Odontologia"
      },
      {
        icon: "fas fa-check-circle",
        text: "Pet Shop Completo"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Estrutura Hospitalar",
    reverse: false
  },

  'plans-callout-box': {
    id: "planos",
    title: "Saúde Garantida",
    subtitle: "O Plano de saúde completo para seu Pet.",
    description: "Garanta a tranquilidade que sua família merece com nossos planos exclusivos.",
    button: {
      text: "Conhecer Planos",
      href: "#"
    }
  },

  'about-image-features-clinical': {
    id: "especialidades",
    tag: "Especialidades",
    title: "Clínica Geral",
    paragraphs: [
      "Cuidados especializados para cães, gatos e animais silvestres!",
      "Nossa equipe experiente é altamente qualificada em medicina veterinária. Do básico ao complexo, proporcionamos serviços completos, incluindo emergências.",
      "Nossos veterinários clínicos gerais são os primeiros a avaliar os pacientes, determinando o tratamento adequado ou encaminhamento para especialistas, garantindo um atendimento confiável e seguro."
    ],
    features: [],
    imageUrl: "https://images.unsplash.com/photo-1576201836163-4975841e71cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Veterinário Examinando Gato",
    reverse: true
  },

  'achievements-numbers-grid': {
    id: "unidades",
    title: "O melhor tratamento para seu pet",
    stats: [
      {
        value: "3",
        label: "Unidades Completas"
      },
      {
        value: "15+",
        label: "Anos de Experiência"
      },
      {
        value: "24h",
        label: "Atendimento"
      }
    ],
    description: "Com uma estrutura completa, equipe qualificada e com mais de 15 anos de atuação no mercado, estamos preparados para garantir o melhor tratamento para seu pet."
  },

  'email-signup-form': {
    title: "Fique por dentro de todas as novidades!",
    placeholder: "Seu melhor e-mail",
    buttonText: "Inscrever",
    termsText: "Eu aceito receber os contatos com novidades, promoções e atualizações da MaxVet Hospital Veterinário."
  },

  'footer-multi-column-links': {
    id: "contato",
    columns: [
      {
        title: "Menu",
        links: [
          {
            text: "Home",
            href: "#home"
          },
          {
            text: "Equipe",
            href: "#equipe"
          },
          {
            text: "Blog",
            href: "#blog"
          },
          {
            text: "Planos",
            href: "#planos"
          },
          {
            text: "Cursos",
            href: "#"
          },
          {
            text: "Área do Cliente",
            href: "#"
          }
        ]
      },
      {
        title: "Especialidades",
        links: [
          {
            text: "Tratamentos",
            href: "#"
          },
          {
            text: "Exames laboratoriais",
            href: "#"
          },
          {
            text: "Exames por imagens",
            href: "#"
          },
          {
            text: "Cirurgias",
            href: "#"
          }
        ]
      },
      {
        title: "Fale conosco",
        links: [
          {
            text: "Unidades",
            href: "#unidades"
          },
          {
            text: "Política de privacidade",
            href: "#"
          },
          {
            text: "Termos e Condições",
            href: "#"
          },
          {
            text: "(11) 2567-3012",
            href: "tel:1125673012",
            style: "margin-top: 15px; font-weight: bold; font-size: 1.1rem; color: var(--primary);"
          }
        ]
      }
    ],
    socialLinks: [
      {
        icon: "fab fa-facebook",
        href: "#"
      },
      {
        icon: "fab fa-instagram",
        href: "#"
      }
    ],
    copyright: "MaxVet Hospital Veterinário © 2024 – CNPJ: 13.273.241/0001-56 – Todos os direitos reservados.",
    developer: "Desenvolvido por WolfWideWeb"
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Central 24h",
    href: "https://wa.me/551125673012",
    color: "#25D366"
  },

  site: {
    title: "Pet Care Veterinária - Cuidado Completo para seu Pet",
    name: "Pet Care Veterinária",
    established: "CRMV-SP 12345",
    logoAlt: "Logo Pet Care Veterinária",
    logoUrl: "https://placehold.co/100x100/7C3AED/FFFFFF?text=VET",
    logoFallback: "https://placehold.co/100x100/7C3AED/FFFFFF?text=PC",
  },
};

window.config = config;
