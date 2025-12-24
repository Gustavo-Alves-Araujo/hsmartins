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

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'primary', 'black');
        const textBase = this.resolveColor(data.colors?.text, null, 'white');
        const accentBase = this.resolveColor(data.colors?.accent, 'accent', 'yellow');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase === 'black' ? 'black' : this.getColorVariant(bgBase, 900),
            text: textBase,
            accent: accentBase === 'yellow' ? 'yellow-400' : this.getColorVariant(accentBase, 400),
            textSecondary: 'gray-400',
        };
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const layoutClass = this.reverse ? 'flex-row-reverse' : '';

        return `
            <section class="py-10 px-4">
                <div class="container mx-auto bg-black text-white rounded-2xl overflow-hidden relative">
                    <div class="flex flex-col md:flex-row ${layoutClass} items-center">
                        <!-- Content -->
                        <div class="p-10 md:w-1/2 z-10">
                            ${this.badge ? `
                                <span class="bg-yellow-400 text-black text-xs font-bold px-2 py-1 uppercase mb-4 inline-block">
                                    ${this.badge}
                                </span>
                            ` : ''}
                            <h3 class="text-3xl md:text-5xl font-display font-bold mb-4 uppercase">
                                ${this.title}
                            </h3>
                            ${this.description ? `
                                <p class="text-gray-400 mb-6">
                                    ${this.description}
                                </p>
                            ` : ''}
                            ${this.price || this.originalPrice ? `
                                <div class="flex items-center gap-4 mb-6">
                                    ${this.price ? `
                                        <span class="text-2xl font-bold text-yellow-400">
                                            ${this.price}
                                        </span>
                                    ` : ''}
                                    ${this.originalPrice ? `
                                        <span class="text-sm text-gray-500 line-through">
                                            ${this.originalPrice}
                                        </span>
                                    ` : ''}
                                </div>
                            ` : ''}
                            ${this.button ? `
                                <button onclick="window.location.href='${this.button.href}'"
                                        class="${this.button.class || 'bg-white text-black px-8 py-3 font-bold uppercase hover:bg-gray-200 transition-colors'}">
                                    ${this.button.text}
                                </button>
                            ` : ''}
                        </div>
                        <!-- Image -->
                        <div class="md:w-1/2 relative h-64 md:h-96 w-full bg-gray-900 flex items-center justify-center overflow-hidden">
                            ${this.imageUrl ? `
                                <div class="absolute w-full h-full bg-[url('${this.imageUrl}')] bg-cover bg-center opacity-40"></div>
                            ` : ''}
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

