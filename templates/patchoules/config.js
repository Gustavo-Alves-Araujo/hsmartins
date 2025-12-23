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

  'sticky-navbar-gradient': {
    logoText: 'NEXUS',
    menuItems: [
      { text: 'Recursos', href: '#recursos' },
      { text: 'Benefícios', href: '#beneficios' },
      { text: 'Planos', href: '#precos' }
    ],
    ctaButton: {
      text: 'Começar Agora',
      href: '#precos'
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


  'social-proof-logos': {
    title: 'Confiado por empresas inovadoras',
    logos: [
      { name: 'ACME Corp', icon: 'circle', style: 'rounded-full' },
      { name: 'GlobalTech', icon: 'square', style: 'rounded-sm' },
      { name: 'Nebula', icon: 'diamond', style: 'rotate-45' },
      { name: 'Velocity', icon: 'square', style: 'rounded-tr-xl' }
    ]
  },


  'features-grid-glass': {
    id: 'recursos',
    title: 'Construído para o impossível',
    subtitle: 'Ferramentas desenhadas meticulosamente para remover a fricção entre sua ideia e a execução.',
    features: [
      {
        icon: 'zap',
        title: 'Automação Flash',
        description: 'Crie fluxos de trabalho que rodam sozinhos enquanto você dorme.',
        color: 'yellow'
      },
      {
        icon: 'shield',
        title: 'Segurança de Nível Militar',
        description: 'Seus dados criptografados de ponta a ponta. Privacidade não é opcional.',
        color: 'blue'
      },
      {
        icon: 'bar-chart',
        title: 'Analytics Preditivo',
        description: 'Nossa IA prevê gargalos antes que eles aconteçam.',
        color: 'green'
      },
      {
        icon: 'users',
        title: 'Colaboração em Tempo Real',
        description: 'Trabalhe no mesmo documento, ao mesmo tempo, sem conflitos.',
        color: 'pink'
      },
      {
        icon: 'check-circle',
        title: 'Gestão de Tarefas',
        description: 'Kanban, Lista ou Calendário. Visualize seu trabalho como preferir.',
        color: 'purple'
      },
      {
        icon: 'star',
        title: 'Suporte Premium 24/7',
        description: 'Humanos reais prontos para ajudar, a qualquer hora do dia.',
        color: 'orange'
      }
    ]
  },

  'benefit-highlight-split': {
    id: 'beneficios',
    title: 'Foco total onde realmente importa',
    description: 'O modo "Deep Work" do Nexus bloqueia notificações, escurece a interface e coloca apenas a tarefa atual em destaque. Recupere sua atenção.',
    benefits: [
      { text: 'Sem distrações visuais' },
      { text: 'Temporizador Pomodoro integrado' },
      { text: 'Sons binaurais para concentração' }
    ],
    visual: {
      type: 'emoji',
      emoji: '🚀',
      title: 'Interface Imersiva'
    },
    layout: {
      reverse: false
    }
  },

  'pricing-grid-highlight': {
    id: 'precos',
    title: 'Investimento Simples',
    subtitle: 'Comece pequeno, escale rápido. Cancele quando quiser.',
    plans: [
      {
        name: 'Starter',
        price: 'R$ 0',
        period: '/mês',
        description: 'Perfeito para testar e organizar tarefas pessoais.',
        features: [
          '1 Usuário',
          '5 Projetos Ativos',
          'Histórico de 7 dias'
        ],
        button: {
          text: 'Cadastrar Grátis',
          href: '#precos'
        },
        highlighted: false
      },
      {
        name: 'Pro',
        price: 'R$ 29',
        period: '/mês',
        description: 'Para freelancers e profissionais que buscam performance.',
        features: [
          'Usuários Ilimitados',
          'Projetos Ilimitados',
          'Analytics Avançado',
          'Integrações (Slack, Gmail)'
        ],
        button: {
          text: 'Assinar Agora',
          href: '#precos'
        },
        highlighted: true,
        badge: 'Recomendado'
      },
      {
        name: 'Team',
        price: 'R$ 89',
        period: '/mês',
        description: 'Controle total para equipes em crescimento acelerado.',
        features: [
          'Tudo do Pro',
          'Gestão de Acessos (SSO)',
          'Suporte Dedicado'
        ],
        button: {
          text: 'Falar com Vendas',
          href: '#precos'
        },
        highlighted: false
      }
    ]
  },

  'faq-accordion': {
    title: 'Perguntas Frequentes',
    items: [
      {
        question: 'O Nexus funciona offline?',
        answer: 'Sim! Você pode continuar trabalhando sem internet. Assim que a conexão voltar, sincronizamos tudo automaticamente na nuvem.'
      },
      {
        question: 'Posso importar dados do Trello/Notion?',
        answer: 'Com certeza. Temos uma ferramenta de importação em um clique que traz todos os seus quadros e notas em segundos.'
      },
      {
        question: 'Existe período de teste?',
        answer: 'Oferecemos 14 dias de teste grátis no plano Pro, sem necessidade de cartão de crédito.'
      }
    ]
  },

  'footer-multi-column-dark': {
    logoText: 'NEXUS',
    description: 'Projetado na Califórnia. <br/>Codificado no Brasil.',
    columns: [
      {
        title: 'Produto',
        links: [
          { text: 'Recursos', href: '#recursos' },
          { text: 'Integrações', href: '#' },
          { text: 'Preços', href: '#precos' }
        ]
      },
      {
        title: 'Empresa',
        links: [
          { text: 'Sobre', href: '#' },
          { text: 'Blog', href: '#' },
          { text: 'Carreiras', href: '#' }
        ]
      },
      {
        title: 'Legal',
        links: [
          { text: 'Privacidade', href: '#' },
          { text: 'Termos', href: '#' }
        ]
      }
    ],
    copyright: '© 2024 Nexus Inc. Todos os direitos reservados.'
  },

  site: {
    title: 'NEXUS - Gerencie como um Visionário',
    name: 'NEXUS',
    logoAlt: 'Logo NEXUS',
    logoUrl: ''
  }
};

window.config = config;

