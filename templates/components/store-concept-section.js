/**
 * Store Concept Section Component
 * Seção genérica para explicar conceito/valores com cards de features
 */

class StoreConceptSectionComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.tag - Tag/título superior
     * @param {string} data.title - Título principal
     * @param {string} data.description - Descrição
     * @param {Array} data.features - Array de features { icon: string, title: string, description: string, iconBg?: string }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.tag = data.tag || '';
        this.title = data.title || '';
        this.description = data.description || '';
        this.features = data.features || [];

        // Resolve cores com contraste adequado (fundo claro, texto escuro)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'gray-50');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');
        const primaryLightHex = this.lightenColor(primaryHex, 0.4);

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            primaryLight: primaryLightHex,
            title: 'gray-900', // Sempre escuro em fundo claro
            description: 'gray-500',
            text: 'gray-900'
        };
    }

    render() {
        const c = this.colors;
        const featuresHtml = this.features.map((feature, index) => {
            // Usa variações da cor primária para os backgrounds
            const primary50 = this.hexToRgba(c.primary, 0.1);
            const primary100 = this.hexToRgba(c.primary, 0.2);
            const primary150 = this.hexToRgba(c.primaryLight, 0.15);
            const iconBgs = [primary50, primary100, primary150];
            const bgIndex = index % iconBgs.length;

            // Se o feature tem iconBg customizado, usa ele, senão usa a variação baseada no índice
            const bgColor = feature.iconBg ?
                (feature.iconBg.includes('-') ? `var(--${feature.iconBg})` : feature.iconBg) :
                iconBgs[bgIndex];

            // Se o feature tem iconColor customizado, usa ele, senão usa a cor primária
            const iconColorValue = feature.iconColor || c.primary;

            return `
                <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" style="background-color: ${bgColor};"></div>
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-6 relative z-10" style="background-color: ${bgColor}; color: ${iconColorValue};">
                        <i class="${feature.icon}"></i>
                    </div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3 relative z-10">${feature.title}</h4>
                    <p class="text-gray-500 leading-relaxed relative z-10">
                        ${feature.description}
                    </p>
                </div>
            `;
        }).join('');

        return `
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div class="text-center max-w-3xl mx-auto mb-12">
                    ${this.tag ? `
                        <h2 class="text-base font-bold tracking-wide uppercase mb-2" style="color: ${c.primary};">${this.tag}</h2>
                    ` : ''}
                    ${this.title ? `
                        <h3 class="text-3xl font-bold text-gray-900 sm:text-4xl">${this.title}</h3>
                    ` : ''}
                    ${this.description ? `
                        <p class="mt-4 text-lg text-gray-500">${this.description}</p>
                    ` : ''}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${featuresHtml}
                </div>
            </section>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
        }
    }

    static create(data, targetId) {
        const component = new StoreConceptSectionComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('store-concept-section', StoreConceptSectionComponent);
}

