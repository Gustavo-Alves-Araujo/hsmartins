/**
 * Pricing Grid Highlight Component
 * Grid de planos/preços com destaque em um plano
 */

class PricingGridHighlightComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.title - Título principal
     * @param {string} data.subtitle - Subtítulo
     * @param {Array} data.plans - Array de planos { name: string, price: string, period: string, description: string, features: Array, button: Object, highlighted: boolean, badge: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.id = data.id || '';
        this.title = data.title || '';
        this.subtitle = data.subtitle || '';
        this.plans = data.plans || [];

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        this.secondaryHex = this.resolveColorHex(data.colors?.secondary, 'secondary', '#EC4899');
        const backgroundHex = this.resolveColorHex(data.colors?.background, 'background', '#0f0f13');
        this.isLightTheme = this.isLightColor(backgroundHex);
        this.textColor = this.getBestTextColor(backgroundHex, 4.5);

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
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('pricing-grid-highlight-styles')) return;

        const style = document.createElement('style');
        style.id = 'pricing-grid-highlight-styles';
        style.textContent = `
            .pricing-section {
                padding: 96px 0;
                position: relative;
                z-index: 10;
            }
            .pricing-header {
                text-align: center;
                margin-bottom: 64px;
            }
            .pricing-title {
                font-size: 1.875rem;
                font-weight: 700;
                margin-bottom: 16px;
                color: ${this.textColor};
            }
            .pricing-subtitle {
                color: ${this.isLightTheme ? this.textMedium : '#9CA3AF'};
            }
            .pricing-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 32px;
                max-width: 75rem;
                margin: 0 auto;
            }
            .pricing-card {
                padding: 32px;
                border-radius: 1.5rem;
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.02) : this.hexToRgba('#FFFFFF', 0.05)};
                border: 1px solid ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.1) : this.hexToRgba('#FFFFFF', 0.05)};
                display: flex;
                flex-direction: column;
                backdrop-filter: blur(4px);
            }
            .pricing-card-highlighted {
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.08) : this.hexToRgba('#1e1e2d', 0.8)};
                border-color: ${this.hexToRgba(this.primaryHex, 0.5)};
                box-shadow: 0 0 40px ${this.hexToRgba(this.primaryHex, 0.15)};
                transform: translateY(-16px);
            }
            .pricing-badge {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                background: linear-gradient(to right, ${this.primaryHex}, ${this.secondaryHex});
                font-size: 0.75rem;
                font-weight: 700;
                padding: 4px 12px;
                border-radius: 9999px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .pricing-card-name {
                font-size: 1.25rem;
                font-weight: 500;
                margin-bottom: 8px;
                color: ${this.textColor};
            }
            .pricing-card-price {
                font-size: 2.25rem;
                font-weight: 700;
                margin-bottom: 24px;
                color: ${this.textColor};
            }
            .pricing-card-period {
                font-size: 1.125rem;
                color: ${this.isLightTheme ? this.textMedium : '#6B7280'};
                font-weight: 400;
            }
            .pricing-card-description {
                color: ${this.isLightTheme ? this.textMedium : '#9CA3AF'};
                font-size: 0.875rem;
                margin-bottom: 32px;
            }
            .pricing-features {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-bottom: 32px;
                flex: 1;
            }
            .pricing-feature {
                display: flex;
                align-items: center;
                font-size: 0.875rem;
                color: ${this.textColor};
            }
            .pricing-feature-icon {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }
            .pricing-button {
                width: 100%;
                padding: 12px;
                border-radius: 0.75rem;
                font-weight: 500;
                transition: all 0.3s;
            }
            .pricing-button-outline {
                border: 1px solid ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.2) : this.hexToRgba('#FFFFFF', 0.2)};
                color: ${this.textColor};
                background: transparent;
            }
            .pricing-button-outline:hover {
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.05) : this.hexToRgba('#FFFFFF', 0.05)};
            }
            .pricing-button-primary {
                background: ${this.isLightTheme ? this.primaryHex : '#FFFFFF'};
                color: ${this.isLightTheme ? this.getBestTextColor(this.primaryHex) : '#000000'};
                font-weight: 700;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .pricing-button-primary:hover {
                background: ${this.isLightTheme ? this.darkenColor(this.primaryHex, 0.1) : '#F3F4F6'};
            }
            @media (min-width: 768px) {
                .pricing-title { font-size: 3rem; }
                .pricing-grid { grid-template-columns: repeat(3, 1fr); }
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

        const plansHtml = this.plans.map(plan => {
            const isHighlighted = plan.highlighted || false;
            const cardClass = isHighlighted ? 'pricing-card pricing-card-highlighted' : 'pricing-card';
            const badgeHtml = plan.badge && isHighlighted ? `<div class="pricing-badge" style="color: ${this.getBestTextColor(this.primaryHex)};">${plan.badge}</div>` : '';
            const nameColor = isHighlighted ? this.textColor : (this.isLightTheme ? this.textDark : '#D1D5DB');

            const featuresHtml = plan.features.map(feature => `
                <li class="pricing-feature" style="color: ${this.isLightTheme ? this.textDark : this.textColor};">
                    <i data-lucide="check-circle" class="pricing-feature-icon" style="color: ${isHighlighted ? this.primaryHex : (this.isLightTheme ? this.textMedium : '#6B7280')};"></i>
                    ${feature}
                </li>
            `).join('');

            const buttonClass = isHighlighted ? 'pricing-button pricing-button-primary' : 'pricing-button pricing-button-outline';
            const buttonHtml = plan.button ? `<button class="${buttonClass}">${plan.button.text}</button>` : '';

            return `
                <div class="${cardClass}" style="position: relative;">
                    ${badgeHtml}
                    <h3 class="pricing-card-name" style="color: ${nameColor};">${plan.name}</h3>
                    <div class="pricing-card-price">
                        ${plan.price}<span class="pricing-card-period">${plan.period}</span>
                    </div>
                    <p class="pricing-card-description">${plan.description}</p>
                    <ul class="pricing-features">
                        ${featuresHtml}
                    </ul>
                    ${buttonHtml}
                </div>
            `;
        }).join('');

        return `
            <section id="${this.id}" class="pricing-section container mx-auto px-6">
                <div class="pricing-header">
                    <h2 class="pricing-title">${this.title}</h2>
                    ${this.subtitle ? `<p class="pricing-subtitle">${this.subtitle}</p>` : ''}
                </div>
                <div class="pricing-grid">
                    ${plansHtml}
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
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {PricingGridHighlightComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new PricingGridHighlightComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('pricing-grid-highlight', PricingGridHighlightComponent);
}

