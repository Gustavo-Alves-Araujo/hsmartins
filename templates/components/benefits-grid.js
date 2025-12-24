/**
 * Benefits Grid Component
 * Grid de benefícios com ícones, títulos e descrições
 * Genérico para destacar vantagens, benefícios, características
 */

class BenefitsGridComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Benefits Grid
     * @param {Array} data.benefits - Array de benefícios
     * @param {string} data.benefits[].icon - Classe do ícone ou nome do ícone Lucide (ex: 'credit-card', 'zap', 'truck')
     * @param {string} data.benefits[].iconType - Tipo do ícone: 'lucide' ou 'fontawesome' (padrão: 'lucide')
     * @param {string} data.benefits[].title - Título do benefício
     * @param {string} data.benefits[].description - Descrição do benefício
     * @param {number} data.columns - Número de colunas no grid (padrão: 3)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'white', 'gray')
     * @param {string} data.colors.iconBackground - Cor de fundo do ícone (ex: 'gray', 'primary')
     * @param {string} data.colors.title - Cor do título base (ex: 'black', 'primary')
     */
    constructor(data) {
        super();
        this.benefits = data.benefits || [];
        this.columns = data.columns || 3;

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const iconBgBase = this.resolveColor(data.colors?.iconBackground, 'primary', 'gray');
        const titleBase = this.resolveColor(data.colors?.title, 'primary', 'black');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase,
            iconBackground: iconBgBase === 'gray' ? 'gray-50' : this.getColorVariant(iconBgBase, 50),
            icon: titleBase === 'black' ? 'black' : this.getColorVariant(titleBase, 900),
            title: titleBase === 'black' ? 'black' : this.getColorVariant(titleBase, 900),
            description: 'gray-500',
        };

        // Injeta estilos se necessário
        this.injectStyles();
    }

    /**
     * Injeta estilos CSS customizados
     */
    injectStyles() {
        if (document.getElementById('benefits-grid-styles')) return;

        const style = document.createElement('style');
        style.id = 'benefits-grid-styles';
        style.textContent = `
            .benefit-card {
                transition: box-shadow 0.3s;
            }
            .benefit-card:hover {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o ícone
     * @param {Object} benefit - Dados do benefício
     * @returns {string} HTML do ícone
     */
    renderIcon(benefit) {
        const iconType = benefit.iconType || 'lucide';
        const c = this.colors;

        if (iconType === 'lucide' && typeof lucide !== 'undefined') {
            // Ícone Lucide será renderizado via data-lucide
            return `<i data-lucide="${benefit.icon}" class="w-8 h-8 text-${c.icon}"></i>`;
        } else {
            // FontAwesome ou outro
            return `<i class="${benefit.icon} w-8 h-8 text-${c.icon}"></i>`;
        }
    }

    /**
     * Renderiza um benefício individual
     * @param {Object} benefit - Dados do benefício
     * @returns {string} HTML do benefício
     */
    renderBenefit(benefit) {
        const c = this.colors;

        return `
            <div class="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg benefit-card">
                <div class="bg-${c.iconBackground} p-4 rounded-full mb-4">
                    ${this.renderIcon(benefit)}
                </div>
                <h4 class="font-bold text-lg mb-2 text-${c.title}">
                    ${benefit.title}
                </h4>
                <p class="text-${c.description} text-sm">
                    ${benefit.description}
                </p>
            </div>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const gridCols = `grid-cols-1 md:grid-cols-${this.columns}`;
        const benefitsHtml = this.benefits.map(benefit => this.renderBenefit(benefit)).join('');

        return `
            <section class="py-16 border-b border-gray-100">
                <div class="container mx-auto px-4 grid ${gridCols} gap-8">
                    ${benefitsHtml}
                </div>
            </section>
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
            // Inicializa ícones Lucide se disponível
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {BenefitsGridComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new BenefitsGridComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('benefits-grid', BenefitsGridComponent);
}

