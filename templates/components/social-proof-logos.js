/**
 * Social Proof Logos Component
 * Seção de logos/marcas de empresas que confiam
 */

class SocialProofLogosComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.title - Título da seção
     * @param {Array} data.logos - Array de logos { name: string, icon: string, style: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.title = data.title || 'Confiado por empresas inovadoras';
        this.logos = data.logos || [];

        // Resolve cores do tema
        const backgroundHex = this.resolveColorHex(data.colors?.background, 'background', '#0f0f13');
        this.isLightTheme = this.isLightColor(backgroundHex);

        // Resolve cores de texto do tema
        const theme = this.getGlobalTheme();
        if (theme && theme.colors && theme.colors.text) {
            this.textDark = theme.colors.text.dark || '#1F2937';
            this.textMedium = theme.colors.text.medium || '#4B5563';
            this.textLight = theme.colors.text.light || '#9CA3AF';
        } else {
            this.textDark = '#1F2937';
            this.textMedium = '#4B5563';
            this.textLight = '#9CA3AF';
        }

        this.textColor = this.isLightTheme ? this.textMedium : '#6B7280';
        this.borderColor = this.isLightTheme ? this.textDark : '#FFFFFF';
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('social-proof-logos-styles')) return;

        const style = document.createElement('style');
        style.id = 'social-proof-logos-styles';
        style.textContent = `
            .social-proof {
                border-top: 1px solid ${this.hexToRgba(this.borderColor, 0.1)};
                border-bottom: 1px solid ${this.hexToRgba(this.borderColor, 0.1)};
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.02) : this.hexToRgba('#000000', 0.2)};
                backdrop-filter: blur(4px);
                padding: 40px 0;
                position: relative;
                z-index: 10;
            }
            .social-proof-title {
                font-size: 0.875rem;
                font-weight: 600;
                color: ${this.textColor};
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 24px;
                text-align: center;
            }
            .social-proof-logos {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 32px;
                opacity: 0.6;
                filter: grayscale(100%);
                transition: all 0.5s;
            }
            .social-proof-logos:hover {
                filter: grayscale(0%);
            }
            .social-proof-logo {
                font-size: 1.25rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .social-proof-logo-icon {
                width: 28px;
                height: 28px;
                background: ${this.isLightTheme ? this.textDark : '#FFFFFF'};
                border-radius: 8px; /* Look moderno levemente arredondado */
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .social-proof-logo-icon i {
                font-size: 1rem;
                color: ${this.isLightTheme ? '#FFFFFF' : this.textDark};
            }
            @media (min-width: 768px) {
                .social-proof-logos { gap: 64px; }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string
     */
    render() {
        // Se os logos são apenas nomes (sem ícones), renderiza estilo simples como no HTML original
        const hasIcons = this.logos.some(logo => logo.icon);

        if (!hasIcons) {
            // Estilo simples para marcas (como no HTML original)
            const logosHtml = this.logos.map(logo => `
                <span class="text-xl font-display font-bold">${logo.name}</span>
            `).join('');

            return `
                <section class="border-y border-gray-200 py-8 bg-white">
                    <div class="container mx-auto px-4">
                        <p class="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">${this.title}</p>
                        <div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            ${logosHtml}
                        </div>
                    </div>
                </section>
            `;
        }

        // Estilo original com ícones (para outros casos)
        this.injectStyles();

        const logosHtml = this.logos.map(logo => {
            const iconStyle = logo.style || 'rounded-lg';
            const name = logo.name || logo.alt || '';
            const icon = logo.icon || '';
            return `
                <div class="social-proof-logo-item">
                    <div class="social-proof-logo">
                        <div class="social-proof-logo-icon ${iconStyle}">
                            ${icon ? `<i class="${icon}"></i>` : ''}
                        </div>
                        <span style="color: ${this.isLightTheme ? this.textDark : '#FFF'}">${name}</span>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="social-proof container mx-auto px-6 text-center">
                <p class="social-proof-title">${this.title}</p>
                <div class="social-proof-logos">
                    ${logosHtml}
                </div>
            </div>
        `;
    }

    /**
     * Monta o componente no DOM
     * @param {string} targetId - ID do elemento onde será montado
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            this.injectStyles();
            target.innerHTML = this.render();
        }
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {SocialProofLogosComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new SocialProofLogosComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('social-proof-logos', SocialProofLogosComponent);
}
