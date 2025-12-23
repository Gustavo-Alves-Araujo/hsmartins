/**
 * Benefit Highlight Split Component
 * Seção split com imagem/visual e lista de benefícios
 */

class BenefitHighlightSplitComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.title - Título principal
     * @param {string} data.description - Descrição
     * @param {Array} data.benefits - Array de benefícios { text: string }
     * @param {Object} data.visual - Visual { type: string, content: string, emoji: string }
     * @param {Object} data.layout - Layout { reverse: boolean }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.id = data.id || '';
        this.title = data.title || '';
        this.description = data.description || '';
        this.benefits = data.benefits || [];
        this.visual = data.visual || { type: 'emoji', emoji: '🚀', title: 'Interface Imersiva' };
        this.layout = { reverse: false, ...data.layout };

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        this.secondaryHex = this.resolveColorHex(data.colors?.secondary, 'secondary', '#3B82F6');
        this.textColor = this.getBestTextColor(this.resolveColorHex(data.colors?.background, 'background', '#0f0f13'), 4.5);
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('benefit-highlight-split-styles')) return;

        const style = document.createElement('style');
        style.id = 'benefit-highlight-split-styles';
        style.textContent = `
            .benefit-highlight {
                padding: 96px 0;
                position: relative;
                z-index: 10;
                background: linear-gradient(to bottom, transparent, ${this.hexToRgba('#000000', 0.3)});
            }
            .benefit-highlight-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 64px;
            }
            .benefit-visual {
                width: 100%;
            }
            .benefit-visual-wrapper {
                position: relative;
            }
            .benefit-visual-glow {
                position: absolute;
                inset: 0;
                background: linear-gradient(to right, ${this.secondaryHex}, ${this.primaryHex});
                border-radius: 1rem;
                filter: blur(40px);
                opacity: 0.4;
            }
            .benefit-visual-card {
                position: relative;
                background: #1a1a24;
                border: 1px solid ${this.hexToRgba('#FFFFFF', 0.1)};
                border-radius: 1rem;
                padding: 32px;
                height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .benefit-visual-content {
                text-align: center;
            }
            .benefit-visual-emoji {
                font-size: 4rem;
                margin-bottom: 16px;
            }
            .benefit-visual-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: ${this.textColor};
            }
            .benefit-text {
                width: 100%;
            }
            .benefit-title {
                font-size: 1.875rem;
                font-weight: 700;
                margin-bottom: 24px;
                color: ${this.textColor};
            }
            .benefit-description {
                color: #9CA3AF;
                font-size: 1.125rem;
                margin-bottom: 32px;
            }
            .benefit-list {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .benefit-item {
                display: flex;
                align-items: center;
                color: #D1D5DB;
            }
            .benefit-item-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: ${this.hexToRgba('#4ADE80', 0.2)};
                color: #4ADE80;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.875rem;
                margin-right: 12px;
            }
            @media (min-width: 768px) {
                .benefit-highlight-content { flex-direction: row; }
                .benefit-title { font-size: 3rem; }
                .benefit-visual, .benefit-text { width: 50%; }
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

        const visualHtml = `
            <div class="benefit-visual">
                <div class="benefit-visual-wrapper">
                    <div class="benefit-visual-glow"></div>
                    <div class="benefit-visual-card">
                        <div class="benefit-visual-content">
                            ${this.visual.emoji ? `<div class="benefit-visual-emoji">${this.visual.emoji}</div>` : ''}
                            ${this.visual.title ? `<div class="benefit-visual-title">${this.visual.title}</div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const benefitsHtml = this.benefits.map(benefit => `
            <li class="benefit-item">
                <div class="benefit-item-icon">✓</div>
                <span>${benefit.text}</span>
            </li>
        `).join('');

        const contentClass = 'benefit-highlight-content';
        const order = this.layout.reverse ? [visualHtml, ''] : ['', visualHtml];

        return `
            <section id="${this.id}" class="benefit-highlight container mx-auto px-6">
                <div class="${contentClass}">
                    ${order[0]}
                    <div class="benefit-text">
                        <h2 class="benefit-title">${this.title}</h2>
                        <p class="benefit-description">${this.description}</p>
                        <ul class="benefit-list">
                            ${benefitsHtml}
                        </ul>
                    </div>
                    ${order[1]}
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
     * @returns {BenefitHighlightSplitComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new BenefitHighlightSplitComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('benefit-highlight-split', BenefitHighlightSplitComponent);
}

