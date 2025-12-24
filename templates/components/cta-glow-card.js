/**
 * CTA Glow Card Component
 * Card de call-to-action com efeito glow e gradiente
 */

class CtaGlowCardComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.title - Título principal
     * @param {string} data.description - Descrição
     * @param {Object} data.button - Botão CTA { text: string, href: string }
     * @param {string} data.footerText - Texto do rodapé (opcional)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.title = data.title || '';
        this.description = data.description || '';
        this.button = data.button || { text: 'Começar Agora', href: '#' };
        this.footerText = data.footerText || '';

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        this.secondaryHex = this.resolveColorHex(data.colors?.secondary, 'secondary', '#3B82F6');
        this.textColor = this.getBestTextColor(this.resolveColorHex(data.colors?.background, 'background', '#0f0f13'), 4.5);
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('cta-glow-card-styles')) return;

        const style = document.createElement('style');
        style.id = 'cta-glow-card-styles';
        style.textContent = `
            .cta-glow-section {
                padding: 96px 0;
                position: relative;
                z-index: 10;
            }
            .cta-glow-card {
                position: relative;
                background: linear-gradient(to right, ${this.hexToRgba(this.primaryHex, 0.5)}, ${this.hexToRgba(this.secondaryHex, 0.5)});
                border: 1px solid ${this.hexToRgba('#FFFFFF', 0.1)};
                border-radius: 1.5rem;
                padding: 40px;
                text-align: center;
                overflow: hidden;
                backdrop-filter: blur(12px);
            }
            .cta-glow-effect {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 500px;
                height: 500px;
                background: ${this.hexToRgba(this.primaryHex, 0.2)};
                filter: blur(100px);
                border-radius: 50%;
                pointer-events: none;
            }
            .cta-content {
                position: relative;
            }
            .cta-title {
                font-size: 2.25rem;
                font-weight: 700;
                margin-bottom: 24px;
                color: ${this.textColor};
            }
            .cta-description {
                color: #D1D5DB;
                font-size: 1.125rem;
                max-width: 42rem;
                margin: 0 auto 40px;
            }
            .cta-buttons {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
            }
            .cta-button {
                background: #FFFFFF;
                color: #000000;
                padding: 16px 40px;
                border-radius: 9999px;
                font-weight: 700;
                font-size: 1.125rem;
                transition: all 0.3s;
                box-shadow: 0 0 20px ${this.hexToRgba('#FFFFFF', 0.4)};
            }
            .cta-button:hover {
                background: #F3F4F6;
            }
            .cta-footer {
                color: #6B7280;
                font-size: 0.875rem;
                margin-top: 16px;
            }
            @media (min-width: 768px) {
                .cta-glow-card { padding: 80px; }
                .cta-title { font-size: 3.75rem; }
                .cta-buttons { flex-direction: row; }
                .cta-footer { position: absolute; bottom: 40px; right: 40px; margin-top: 0; }
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

        return `
            <section class="cta-glow-section container mx-auto px-6">
                <div class="cta-glow-card">
                    <div class="cta-glow-effect"></div>
                    <div class="cta-content">
                        <h2 class="cta-title">${this.title}</h2>
                        <p class="cta-description">${this.description}</p>
                        <div class="cta-buttons">
                            <a href="${this.button.href}" class="cta-button">${this.button.text}</a>
                            ${this.footerText ? `<p class="cta-footer">${this.footerText}</p>` : ''}
                        </div>
                    </div>
                </div>
            </section>
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
     * @returns {CtaGlowCardComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new CtaGlowCardComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('cta-glow-card', CtaGlowCardComponent);
}


