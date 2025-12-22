const config = {
  theme: {
    colors: {
      primary: '#48191B',        // brand-dark (cor principal)
      primaryLight: '#6D2B2E',   // brand-light
      background: '#F9F7F2',     // brand-cream
      accent: '#D4AF37',         // brand-gold
      text: {
        dark: '#1F2937',       // gray-800
        medium: '#4B5563',     // gray-600
        light: '#6B7280',      // gray-500
        white: '#FFFFFF'
      }
    },
    fonts: {
      primary: '"Playfair Display", serif',  // Títulos e elementos editoriais
      secondary: '"Inter", sans-serif',      // Texto corrido
      urls: {
        google: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'
      }
    }
  },

  'header-navigation': {
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRUt3aoT0TztOymfkQd7fzYBOjmjUbn8_q9Q&s",
    logoAlt: "Logo Flor da Tibúrcio",
    siteName: "Flor da Tibúrcio",
    established: "Itaim Paulista",
    whatsappNumber: "5511937304737",
    links: {
      about: {
        text: "Sobre",
        href: "#about"
      },
      services: {
        text: "Produtos",
        href: "#services"
      },
      location: {
        text: "Localização",
        href: "#location"
      },
      cta: {
        text: "Peça Agora",
        href: "https://wa.me/5511937304737",
        target: "_blank"
      }
    }
  },

  'hero-overlay': {
    badge: "Desde o coração do Itaim Paulista",
    title: "Sabor que cria",
    titleHighlight: "memórias.",
    subtitle: "Padaria, confeitaria e pizzaria. A tradição do pão quentinho e da pizza artesanal, entregue na sua porta.",
    ctaPrimary: {
      text: "Fazer Pedido",
      href: "https://wa.me/5511937304737",
      target: "_blank"
    },
    ctaSecondary: {
      text: "Explorar Cardápio",
      href: "#services"
    },
    backgroundImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
    backgroundAlt: "Pão Fresco",
    whatsappNumber: "5511937304737",
    colors: {
      primary: 'brand-dark',
      accent: 'brand-gold',
      text: 'white'
    }
  },

  'info-bar': {
    items: [
      {
        icon: "fas fa-motorcycle",
        text: "Entrega Rápida em 30min"
      },
      {
        icon: "fas fa-map-marker-alt",
        text: "Rua Tibúrcio de Sousa, 1351 - Itaim Paulista"
      },
      {
        icon: "far fa-clock",
        text: "Seg-Sáb: 6h-20h | Dom: 6h-14h"
      }
    ],
    colors: {
      background: "brand-dark",
      text: "white",
      accent: "brand-gold"
    }
  },

  'card-grid': {
    title: "Nossos Produtos",
    subtitle: "Do forno para sua mesa, com amor e tradição",
    items: [
      {
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
        title: "Pães Artesanais",
        description: "Variedade de pães fresquinhos assados todos os dias com ingredientes selecionados",
        alt: "Pães Artesanais Frescos"
      },
      {
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
        title: "Doces e Bolos",
        description: "Bolos decorados e doces caseiros irresistíveis para todas as ocasiões",
        alt: "Bolos e Doces Deliciosos"
      },
      {
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        title: "Pizzas Artesanais",
        description: "Massa fresca e ingredientes selecionados com carinho, sabor único",
        alt: "Pizzas Artesanais Deliciosas"
      }
    ],
    layout: {
      columns: 3,
      aspectRatio: "4/5",
      gap: "8"
    },
    colors: {
      background: "brand-cream",
      titleColor: "brand-dark",
      cardOverlay: "brand-dark",
      accentLine: "brand-dark"
    }
  },

  'feature-highlight': {
    badge: "Destaque do Dia",
    title: "Pizza Margherita Especial",
    description: "Nossa receita mais tradicional, preparada com massa fresca, molho de tomate caseiro e ingredientes importados diretamente da Itália.",
    features: [
      "Massa fermentada por 48 horas",
      "Queijo mussarela buffalo importado",
      "Tomates San Marzano frescos",
      "Manjericão orgânico",
      "Azeite extra virgem siciliano"
    ],
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    imageAlt: "Pizza Margherita Artesanal",
    cta: {
      text: "Peça Agora →",
      href: "https://wa.me/5511937304737",
      target: "_blank"
    },
    layout: {
      imagePosition: "left"
    },
    colors: {
      background: "white",
      titleColor: "brand-dark",
      badgeColor: "brand-dark",
      accentColor: "brand-gold",
      ctaColor: "brand-dark",
      ctaHoverColor: "brand-gold"
    }
  },

  'cta-banner': {
    title: "Faça seu pedido agora!",
    subtitle: "Receba quentinho na sua casa. Entrega rápida ou retire na loja.",
    buttons: [
      {
        text: "Pedir no WhatsApp",
        icon: "fab fa-whatsapp",
        href: "https://wa.me/5511937304737",
        target: "_blank",
        bgColor: "green-500",
        hoverColor: "green-600"
      },
      {
        text: "Pedir no iFood",
        icon: "fas fa-utensils",
        href: "#",
        bgColor: "red-600",
        hoverColor: "red-700"
      }
    ],
    backgroundPattern: "https://www.transparenttextures.com/patterns/food.png",
    colors: {
      background: "brand-dark",
      textColor: "white"
    }
  },

  'footer-contact': {
    title: "Visite Nossa Loja",
    address: {
      label: "Endereço",
      street: "Rua Tibúrcio de Sousa, 1351",
      city: "Itaim Paulista, São Paulo - SP",
      zipCode: "CEP: 08140-000",
      mapQuery: "Rua Tibúrcio de Sousa, 1351, São Paulo"
    },
    contact: {
      label: "Contato",
      phone: "(11) 93730-4737"
    },
    socialLinks: [
      {
        icon: "fab fa-instagram",
        href: "https://instagram.com/flordatiburciopadaria",
        label: "Instagram"
      },
      {
        icon: "fab fa-facebook-f",
        href: "#",
        label: "Facebook"
      }
    ],
    copyright: "© 2024 Flor da Tibúrcio. Todos os direitos reservados.",
    tags: ["Padaria", "Confeitaria", "Pizzaria", "Delivery"],
    colors: {
      background: "brand-cream",
      titleColor: "brand-dark",
      iconColor: "brand-dark",
      borderColor: "brand-dark"
    }
  },

  site: {
    title: "Padaria Flor da Tibúrcio",
    name: "Flor da Tibúrcio",
    established: "Est. Itaim Paulista",
    logoAlt: "Logo Flor da Tibúrcio",
    logoUrl: "https://instagram.fcgh10-2.fna.fbcdn.net/v/t51.2885-19/91290522_610703732816103_2400387192292638720_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fcgh10-2.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2QEBsobwS0IXDBSvjyAM04Kr7UBtKtf1H0zqs56r1s5W-3uAoz3FlEzZ1qVTG9uy0mLNvi27dbJwVtzFHYzTyo_V&_nc_ohc=gfNr5Rx2g8EQ7kNvwEKSPob&_nc_gid=3G5UEA6EQC2vEKyIp6mJkg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Afl6hCHOrZbCnaqscxh0sr7IZwQFZ_GnwPAwzmWGxogVVw&oe=69477C94&_nc_sid=7a9f4b",
    logoFallback: "https://placehold.co/100x100/48191B/FFFFFF?text=FT",
  },
};

window.config = config;