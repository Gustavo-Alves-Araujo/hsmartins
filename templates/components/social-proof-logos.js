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
        this.textColor = this.resolveColorHex(data.colors?.text, null, '#6B7280');
        this.borderColor = this.resolveColorHex(data.colors?.border, null, '#FFFFFF');
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
                border-top: 1px solid ${this.hexToRgba(this.borderColor, 0.05)};
                border-bottom: 1px solid ${this.hexToRgba(this.borderColor, 0.05)};
                background: ${this.hexToRgba('#000000', 0.2)};
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
                width: 24px;
                height: 24px;
                background: #FFFFFF;
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
        this.injectStyles();

        const logosHtml = this.logos.map(logo => {
            const iconStyle = logo.style || 'rounded-full';
            return `
                <div class="social-proof-logo">
                    <div class="social-proof-logo-icon ${iconStyle}"></div>
                    <span>${logo.name}</span>
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

