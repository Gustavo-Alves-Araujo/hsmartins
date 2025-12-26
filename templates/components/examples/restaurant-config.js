/**
 * Exemplo de Config para Restaurantes / Delivery
 *
 * Este é um exemplo completo de config.js para um site de restaurante ou delivery.
 * Use este como base e adapte conforme suas necessidades.
 */

const config = {
  theme: {
    colors: {
      primary: '#F97316',        // Orange - Apetitoso para comida
      secondary: '#FB923C',      // Orange light
      tertiary: '#FDBA74',       // Orange lighter
      accent: '#F59E0B',         // Amber
      background: '#FFFFFF',     // White background
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
        google: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap'
      }
    }
  },

  // Componentes recomendados para Restaurantes
  'header-navigation': {
    logoUrl: "https://placehold.co/100x100/F97316/FFFFFF?text=REST",
    logoAlt: "Logo Restaurante",
    siteName: "Restaurante Sabor & Arte",
    established: "Desde 2015",
    whatsappNumber: "5511999999999",
    links: {
      menu: { text: "Cardápio", href: "#cardapio" },
      about: { text: "Sobre", href: "#sobre" },
      location: { text: "Localização", href: "#localizacao" },
      cta: { text: "Fazer Pedido", href: "https://wa.me/5511999999999", target: "_blank" }
    }
  },

  'hero-overlay': {
    badge: "Comida deliciosa desde 2015",
    title: "Sabor autêntico",
    titleHighlight: "na sua mesa.",
    subtitle: "Receitas tradicionais com toque moderno. Entrega rápida e sabor inesquecível.",
    ctaPrimary: {
      text: "Fazer Pedido",
      href: "https://wa.me/5511999999999",
      target: "_blank"
    },
    ctaSecondary: {
      text: "Ver Cardápio",
      href: "#cardapio"
    },
    backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920",
    backgroundAlt: "Pratos deliciosos do restaurante",
    whatsappNumber: "5511999999999"
  },

  'info-bar': {
    items: [
      { icon: "fas fa-motorcycle", text: "Entrega em 30min" },
      { icon: "fas fa-map-marker-alt", text: "Centro da cidade" },
      { icon: "far fa-clock", text: "Seg-Dom: 11h-23h" }
    ],
    colors: {
      background: "brand-orange",
      text: "white",
      accent: "brand-amber"
    }
  },

  'quick-service-cards': {
    cards: [
      {
        icon: "fas fa-utensils",
        title: "Pratos Principais",
        description: "Nossos pratos principais preparados com ingredientes frescos e selecionados.",
        buttonText: "Ver Cardápio",
        buttonHref: "#cardapio"
      },
      {
        icon: "fas fa-pizza-slice",
        title: "Pizzas",
        description: "Pizzas artesanais com massa fresca e ingredientes de primeira qualidade.",
        buttonText: "Pedir Agora",
        buttonHref: "#cardapio"
      },
      {
        icon: "fas fa-hamburger",
        title: "Lanches",
        description: "Hambúrgueres artesanais e lanches deliciosos para todos os gostos.",
        buttonText: "Ver Opções",
        buttonHref: "#cardapio"
      },
      {
        icon: "fas fa-birthday-cake",
        title: "Sobremesas",
        description: "Sobremesas caseiras e doces especiais para finalizar sua refeição.",
        buttonText: "Experimentar",
        buttonHref: "#cardapio"
      }
    ]
  },

  'card-grid': {
    title: "Nosso Cardápio",
    subtitle: "Pratos selecionados com muito carinho",
    items: [
      {
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        title: "Risotto de Camarão",
        description: "Risotto cremoso com camarões frescos e ervas finas",
        alt: "Risotto de Camarão"
      },
      {
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        title: "Pizza Margherita",
        description: "Pizza clássica italiana com molho de tomate e manjericão",
        alt: "Pizza Margherita"
      },
      {
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        title: "Hambúrguer Artesanal",
        description: "Hambúrguer com carne selecionada e ingredientes frescos",
        alt: "Hambúrguer Artesanal"
      }
    ],
    layout: {
      columns: 3,
      aspectRatio: "4/5",
      gap: "8"
    }
  },

  'footer-contact': {
    title: "Venha nos Visitar",
    address: {
      label: "Endereço",
      street: "Rua das Flores, 123",
      city: "Centro, São Paulo - SP",
      zipCode: "CEP: 01000-000",
      mapQuery: "Rua das Flores, 123, São Paulo"
    },
    contact: {
      label: "Contato",
      phone: "(11) 3333-4444"
    },
    socialLinks: [
      { icon: "fab fa-instagram", href: "https://instagram.com", label: "Instagram" },
      { icon: "fab fa-facebook-f", href: "https://facebook.com", label: "Facebook" },
      { icon: "fab fa-whatsapp", href: "https://wa.me/5511999999999", label: "WhatsApp" }
    ],
    copyright: "© 2024 Restaurante Sabor & Arte. Todos os direitos reservados.",
    tags: ["Restaurante", "Delivery", "Comida", "Gastronomia"]
  },

  'whatsapp-float-button': {
    icon: "fab fa-whatsapp",
    text: "Fazer Pedido",
    href: "https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido.",
    color: "#25D366"
  },

  site: {
    title: "Restaurante Sabor & Arte - Comida Deliciosa e Entrega Rápida",
    name: "Restaurante Sabor & Arte",
    established: "Desde 2015",
    logoAlt: "Logo Restaurante",
    logoUrl: "https://placehold.co/100x100/F97316/FFFFFF?text=REST"
  }
};

window.config = config;


