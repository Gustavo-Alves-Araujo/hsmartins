const config = {
  theme: {
    colors: {
      primary: '#DC2626',        // Red-600
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
      primary: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      secondary: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      urls: {
        google: ''
      }
    }
  },

  'hero-badge-preview': {
    badge: {
      text: 'Seja feliz',
      icon: 'circle',
      color: 'white'
    },
    title: 'Gerencie seu tempo como um',
    titleHighlight: 'Visionário',
    description: 'O Nexus unifica suas tarefas, metas e equipe em uma única plataforma intuitiva. Pare de sobreviver ao seu dia e comece a desenhar seu futuro.',
    buttons: [
      {
        text: 'Começar Gratuitamente',
        href: '#precos',
        style: 'primary',
        icon: 'arrow-right'
      },
      {
        text: 'Ver Demonstração',
        href: '#',
        style: 'secondary'
      }
    ]
  },

  site: {
    title: 'NEXUS - Gerencie como um Visionário',
    name: 'NEXUS',
    logoAlt: 'Logo NEXUS',
    logoUrl: ''
  }
};

window.config = config;

// Aplica fontes e cores do tema automaticamente
(function() {
  function applyTheme() {
    if (window.config && window.config.theme) {
      // Aplica fontes
      if (window.config.theme.fonts) {
        // Injeta Google Fonts se houver URL
        if (window.config.theme.fonts.urls && window.config.theme.fonts.urls.google) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = window.config.theme.fonts.urls.google;
          document.head.appendChild(link);
        }

        // Aplica fonte primária ao body
        if (window.config.theme.fonts.primary) {
          document.documentElement.style.setProperty('--theme-font-primary', window.config.theme.fonts.primary);
          if (document.body) {
            document.body.style.fontFamily = window.config.theme.fonts.primary;
          }
        }
      }

      // Aplica cores e background
      if (window.config.theme.colors) {
        const bgColor = window.config.theme.colors.background || '#0f0f13';
        const textColor = window.config.theme.colors.text?.dark || '#1F2937';
        const isLight = bgColor === '#FFFFFF' || bgColor.toLowerCase() === '#ffffff' || bgColor.toLowerCase() === 'white';

        document.documentElement.style.setProperty('--theme-background', bgColor);
        document.documentElement.style.setProperty('--theme-text-color', isLight ? textColor : '#FFFFFF');
        if (document.body) {
          document.body.style.backgroundColor = bgColor;
          document.body.style.color = isLight ? textColor : '#FFFFFF';
        }
      }
    }
  }

  // Aplica imediatamente se DOM já estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  } else {
    applyTheme();
  }

  // Também aplica quando a página carregar completamente
  window.addEventListener('load', applyTheme);
})();

