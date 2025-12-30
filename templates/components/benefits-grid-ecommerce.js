/**
 * Benefits Grid E-commerce Component
 * Grid de benefícios para e-commerce (frete, garantia, etc)
 */

class BenefitsGridEcommerceComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.benefits - Array de benefícios { icon: string, title: string, description: string }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.benefits = data.benefits || [];

        // Resolve cores com contraste adequado
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');
        const primary50Hex = this.hexToRgba(primaryHex, 0.1);

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            primary50: primary50Hex,
            title: 'gray-900',
            description: 'gray-500'
        };
    }

    render() {
        const c = this.colors;
        const benefitsHtml = this.benefits.map(benefit => `
            <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" style="background-color: ${c.primary50}; color: ${c.primary};">
                    <i class="${benefit.icon} text-lg"></i>
                </div>
                <h5 class="font-bold text-sm">${benefit.title}</h5>
                ${benefit.description ? `<p class="text-xs text-gray-500 mt-1">${benefit.description}</p>` : ''}
            </div>
        `).join('');

        const colsClass = this.benefits.length === 2 ? 'grid-cols-2' :
                         this.benefits.length === 3 ? 'grid-cols-3' :
                         'grid-cols-2 md:grid-cols-4';

        return `
            <section class="py-12 border-t border-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid ${colsClass} gap-8 text-center">
                        ${benefitsHtml}
                    </div>
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
        const component = new BenefitsGridEcommerceComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('benefits-grid-ecommerce', BenefitsGridEcommerceComponent);
}

