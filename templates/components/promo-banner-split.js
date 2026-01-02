/**
 * Promo Banner Split Component
 * Banner promocional com layout split (texto + imagem)
 * Genérico para promoções, ofertas, destaque de produtos/serviços
 */

class PromoBannerSplitComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Promo Banner
     * @param {string} data.badge - Badge/texto de destaque (ex: "Oferta Relâmpago", "Novidade")
     * @param {string} data.title - Título principal
     * @param {string} data.description - Descrição/texto
     * @param {string} data.price - Preço principal (formatado como string, ex: "R$ 499,90")
     * @param {string} data.originalPrice - Preço original riscado (opcional)
     * @param {Object} data.button - Botão CTA { text: string, href: string, class?: string }
     * @param {string} data.imageUrl - URL da imagem
     * @param {string} data.imageAlt - Texto alternativo da imagem
     * @param {boolean} data.reverse - Se true, inverte o layout (imagem à esquerda)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'black', 'primary')
     * @param {string} data.colors.text - Cor do texto base (ex: 'white')
     * @param {string} data.colors.accent - Cor de destaque/badge (ex: 'yellow', 'orange')
     */
    constructor(data) {
        super();
        this.badge = data.badge || '';
        this.title = data.title;
        this.description = data.description || '';
        this.price = data.price || '';
        this.originalPrice = data.originalPrice || '';
        this.button = data.button || null;
        this.imageUrl = data.imageUrl;
        this.imageAlt = data.imageAlt || '';
        this.reverse = data.reverse || false;

        // Resolve cores usando o sistema de cores do site (primary)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#2563eb');
        const textBase = this.resolveColor(data.colors?.text, 'text', 'gray-900');
        const accentBase = this.resolveColor(data.colors?.accent, 'primary', 'primary');

        // Cores modernas e limpas
        this.colors = {
            background: bgBase,
            primary: primaryHex,
            text: textBase,
            accent: accentBase,
            textSecondary: 'gray-600',
        };
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const layoutClass = this.reverse ? 'lg:flex-row-reverse' : '';

        return `
            <section class="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                <div class="max-w-7xl mx-auto">
                    <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="flex flex-col lg:flex-row ${layoutClass}">
                            <!-- Content -->
                            <div class="p-8 lg:p-12 xl:p-16 lg:w-1/2 flex flex-col justify-center">
                                ${this.badge ? `
                                    <span class="inline-block px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider mb-6" style="background-color: ${c.primary}; color: white;">
                                        ${this.badge}
                                    </span>
                                ` : ''}
                                <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    ${this.title}
                                </h3>
                                ${this.description ? `
                                    <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                                        ${this.description}
                                    </p>
                                ` : ''}
                                ${this.price || this.originalPrice ? `
                                    <div class="flex items-baseline gap-4 mb-8">
                                        ${this.price ? `
                                            <span class="text-3xl lg:text-4xl font-bold text-gray-900" style="color: ${c.primary};">
                                                ${this.price}
                                            </span>
                                        ` : ''}
                                        ${this.originalPrice ? `
                                            <span class="text-lg text-gray-400 line-through">
                                                ${this.originalPrice}
                                            </span>
                                        ` : ''}
                                    </div>
                                ` : ''}
                                ${this.button ? `
                                    <div>
                                        <a href="${this.button.href || '#'}" 
                                           class="${this.button.class || `inline-flex items-center justify-center px-8 py-3.5 font-semibold rounded-lg text-white hover:opacity-90 transition-opacity duration-200`}"
                                           style="${!this.button.class ? `background-color: ${c.primary};` : ''}">
                                            ${this.button.text}
                                        </a>
                                    </div>
                                ` : ''}
                            </div>
                            <!-- Image -->
                            <div class="lg:w-1/2 relative h-64 md:h-80 lg:h-auto min-h-[400px] bg-gray-50">
                                ${this.imageUrl ? `
                                    <img src="${this.imageUrl}" 
                                         alt="${this.imageAlt || ''}" 
                                         class="w-full h-full object-cover">
                                ` : `
                                    <div class="w-full h-full flex items-center justify-center bg-gray-100">
                                        <div class="w-32 h-32 rounded-full bg-gray-200"></div>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
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
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {PromoBannerSplitComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new PromoBannerSplitComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('promo-banner-split', PromoBannerSplitComponent);
}

