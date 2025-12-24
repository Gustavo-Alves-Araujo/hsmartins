const config = {
  theme: {
    colors: {
      primary: '#DC2626',        // Red-600 - Cor energética para fitness
      secondary: '#EF4444',      // Red-500
      tertiary: '#F87171',        // Red-400
      accent: '#FCA5A5',          // Red-300
      background: '#FFFFFF',      // White background
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
      {
        icon: "fab fa-instagram",
        href: "https://instagram.com",
        label: "Instagram"
      },
      {
        icon: "fab fa-facebook-f",
        href: "https://facebook.com",
        label: "Facebook"
      },
      {
        icon: "fab fa-youtube",
        href: "https://youtube.com",
        label: "YouTube"
      },
      {
        icon: "fab fa-whatsapp",
        href: "https://wa.me/5511987654321",
        label: "WhatsApp"
      }
    ],
    copyright: "Personal Trainer © 2024 – Todos os direitos reservados.",
    tags: ["Personal Trainer", "Treino Personalizado", "Fitness", "Nutrição Esportiva", "Treino em Casa"],
    colors: {
      background: "white",
      titleColor: "red",
      textColor: "gray",
      textStrong: "gray",
      textMuted: "gray",
      iconColor: "red",
      borderColor: "gray"
    }
  },
};

window.config = config;

