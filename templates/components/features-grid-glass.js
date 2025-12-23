/**
 * Features Grid Glass Component
 * Grid de features com efeito glassmorphism
 */

class FeaturesGridGlassComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.title - Título principal
     * @param {string} data.subtitle - Subtítulo
     * @param {Array} data.features - Array de features { icon: string, title: string, description: string, color: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.id = data.id || '';
        this.title = data.title || '';
        this.subtitle = data.subtitle || '';
        this.features = data.features || [];

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        this.textColor = this.getBestTextColor(this.resolveColorHex(data.colors?.background, 'background', '#0f0f13'), 4.5);
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('features-grid-glass-styles')) return;

        const style = document.createElement('style');
        style.id = 'features-grid-glass-styles';
        style.textContent = `
            .features-grid-section {
                padding: 96px 0;
                position: relative;
                z-index: 10;
            }
            .features-grid-header {
                text-align: center;
                margin-bottom: 64px;
            }
            .features-grid-title {
                font-size: 1.875rem;
                font-weight: 700;
                margin-bottom: 16px;
                color: ${this.textColor};
            }
            .features-grid-subtitle {
                color: #9CA3AF;
                max-width: 42rem;
                margin: 0 auto;
            }
            .features-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 32px;
            }
            .feature-card {
                padding: 32px;
                border-radius: 1rem;
                background: ${this.hexToRgba('#FFFFFF', 0.05)};
                border: 1px solid ${this.hexToRgba('#FFFFFF', 0.05)};
                transition: all 0.3s;
                backdrop-filter: blur(12px);
            }
            .feature-card:hover {
                background: ${this.hexToRgba('#FFFFFF', 0.1)};
                border-color: ${this.hexToRgba('#FFFFFF', 0.2)};
                transform: translateY(-8px);
            }
            .feature-icon-wrapper {
                margin-bottom: 24px;
                padding: 12px;
                background: ${this.hexToRgba('#FFFFFF', 0.05)};
                border-radius: 8px;
                width: fit-content;
                transition: background 0.3s;
            }
            .feature-card:hover .feature-icon-wrapper {
                background: ${this.hexToRgba('#FFFFFF', 0.1)};
            }
            .feature-icon {
                width: 32px;
                height: 32px;
            }
            .feature-title {
                font-size: 1.25rem;
                font-weight: 700;
                margin-bottom: 12px;
                color: ${this.textColor};
            }
            .feature-description {
                color: #9CA3AF;
                line-height: 1.75;
            }
            @media (min-width: 768px) {
                .features-grid-title { font-size: 3rem; }
                .features-grid { grid-template-columns: repeat(3, 1fr); }
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

        const featuresHtml = this.features.map(feature => {
            const colorMap = {
                yellow: '#FACC15',
                blue: '#60A5FA',
                green: '#4ADE80',
                pink: '#F472B6',
                purple: this.primaryHex,
                orange: '#FB923C'
            };
            const iconColor = colorMap[feature.color] || this.primaryHex;

            return `
                <div class="feature-card">
                    <div class="feature-icon-wrapper">
                        <i data-lucide="${feature.icon}" class="feature-icon" style="color: ${iconColor};"></i>
                    </div>
                    <h3 class="feature-title">${feature.title}</h3>
                    <p class="feature-description">${feature.description}</p>
                </div>
            `;
        }).join('');

        return `
            <section id="${this.id}" class="features-grid-section container mx-auto px-6">
                <div class="features-grid-header">
                    <h2 class="features-grid-title">${this.title}</h2>
                    ${this.subtitle ? `<p class="features-grid-subtitle">${this.subtitle}</p>` : ''}
                </div>
                <div class="features-grid">
                    ${featuresHtml}
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
     * @returns {FeaturesGridGlassComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new FeaturesGridGlassComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('features-grid-glass', FeaturesGridGlassComponent);
}

