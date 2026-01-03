const config = {
  theme: {
    colors: {
      primary: '#9333EA',        // Purple-600
      secondary: '#3B82F6',      // Blue-500
      tertiary: '#EC4899',        // Pink-500
      accent: '#F97316',          // Orange-500
      background: '#0f0f13',      // Dark background
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

  'ambient-background-effects': {
    blobs: [
      { color: 'purple', size: '40vw', position: { top: '-10%', left: '-10%' }, delay: 0 },
      { color: 'blue', size: '35vw', position: { bottom: '-10%', right: '-10%' }, delay: 1000 },
      { color: 'pink', size: '25vw', position: { top: '40%', left: '30%' }, delay: 700 }
    ]
  },



  'hero-badge-preview': {
    badge: {
      text: 'Disponível: Nova Versão 2.0',
      icon: 'circle',
      color: 'green'
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
    ],
    preview: {
      enabled: true,
      content: `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px;">
          <div style="width: 12px; height: 12px; border-radius: 50%; background: rgba(239,68,68,0.8);"></div>
          <div style="width: 12px; height: 12px; border-radius: 50%; background: rgba(234,179,8,0.8);"></div>
          <div style="width: 12px; height: 12px; border-radius: 50%; background: rgba(34,197,94,0.8);"></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
          <div style="background: rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 20px; border: 1px solid rgba(255,255,255,0.05);">
            <div style="color: #9CA3AF; font-size: 0.875rem; margin-bottom: 8px;">Produtividade Semanal</div>
            <div style="font-size: 1.875rem; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">84%</div>
            <div style="width: 100%; height: 8px; background: #374151; border-radius: 9999px; overflow: hidden;">
              <div style="width: 84%; height: 100%; background: linear-gradient(to right, #9333EA, #EC4899);"></div>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            <div style="background: rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 16px; height: 96px; border: 1px solid rgba(255,255,255,0.05);"></div>
            <div style="background: rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 16px; height: 96px; border: 1px solid rgba(255,255,255,0.05);"></div>
            <div style="background: rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 16px; height: 96px; border: 1px solid rgba(255,255,255,0.05); grid-column: span 2;"></div>
          </div>
        </div>
      `
    }
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

  'cta-glow-card': {
    title: 'Pronto para assumir o controle?',
    description: 'Junte-se a mais de 10.000 visionários que transformaram sua rotina.',
    button: {
      text: 'Começar Agora',
      href: '#precos'
    },
    footerText: 'Não requer cartão de crédito'
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

