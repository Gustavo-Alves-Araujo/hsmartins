/**
 * Marquee Info Bar Component
 * Barra superior com texto em scroll horizontal (marquee)
 * Genérico para qualquer tipo de informação que precise ser destacada
 */

class MarqueeInfoBarComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para a Marquee Info Bar
     * @param {Array} data.items - Array de textos a serem exibidos no marquee
     * @param {string} data.items[].text - Texto do item
     * @param {string} data.items[].separator - Separador opcional (padrão: '•')
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'black', 'primary', 'brand-dark')
     * @param {string} data.colors.text - Cor do texto base (ex: 'white', 'yellow')
     */
    constructor(data) {
        super();
        this.items = data.items || [];

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'primary', 'black');
        const textBase = this.resolveColor(data.colors?.text, null, 'white');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase === 'black' ? 'black' : this.getColorVariant(bgBase, 900),
            text: textBase,
        };

        // Injetar estilos do marquee se necessário
        this.injectStyles();
    }

    /**
     * Injeta estilos CSS para animação do marquee
     */
    injectStyles() {
        if (document.getElementById('marquee-info-bar-styles')) return;

        const style = document.createElement('style');
        style.id = 'marquee-info-bar-styles';
        style.textContent = `
            .marquee-wrapper {
                display: inline-flex;
                width: max-content;
            }
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .marquee-container {
                display: inline-flex;
                gap: 2rem;
                animation: marquee 30s linear infinite;
            }
            .marquee-container:hover {
                animation-play-state: paused;
            }
            @keyframes slideUp {
                0% { transform: translateY(20px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-up {
                animation: slideUp 0.5s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;

        // Duplica os itens para criar loop contínuo
        const itemsDuplicated = [...this.items, ...this.items];

        const itemsHtml = itemsDuplicated.map((item, index) => {
            const separator = item.separator !== undefined ? item.separator : '•';
            return `
                <span>${item.text}</span>
                ${index < itemsDuplicated.length - 1 ? `<span>${separator}</span>` : ''}
            `;
        }).join('');

        return `
            <div class="bg-${c.background} text-${c.text} text-xs font-bold py-2 overflow-hidden whitespace-nowrap relative">
                <div class="marquee-wrapper">
                    <div class="inline-flex gap-8 marquee-container">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Monta o componente no DOM
     * @param {string} targetId - ID do elemento onde o componente será montado
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {MarqueeInfoBarComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new MarqueeInfoBarComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('marquee-info-bar', MarqueeInfoBarComponent);
}

