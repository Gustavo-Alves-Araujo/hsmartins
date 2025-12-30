/**
 * Product Grid Advanced Component
 * Grid de produtos avançado com cards completos, hover effects e múltiplas imagens
 */

class ProductGridAdvancedComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.products - Array de produtos
     * @param {string} data.linkText - Texto do botão "Carregar Mais"
     * @param {string} data.linkHref - Link do botão "Carregar Mais"
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.products = data.products || [];
        this.linkText = data.linkText || 'Carregar Mais Produtos';
        this.linkHref = data.linkHref || '#';

        // Resolve cores com contraste adequado
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            text: 'gray-900',
            textSecondary: 'gray-500'
        };
    }

    renderProductCard(product, primaryColor) {
        const badgeHtml = product.badge ? `
            <span class="absolute top-3 left-3 ${product.badge.style === 'new' ? 'bg-gray-900' : 'bg-red-500'} text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10">${product.badge.text}</span>
        ` : '';

        const hasMultipleImages = product.images && product.images.length > 1;
        const imagesHtml = product.images && product.images.length > 0 ? `
            ${product.images[0] ? `
                <img src="${product.images[0]}" class="object-cover w-full h-full transition duration-500 ${hasMultipleImages ? 'group-hover:opacity-0' : 'group-hover:scale-105'}" alt="${product.title}">
            ` : ''}
            ${product.images[1] ? `
                <img src="${product.images[1]}" class="absolute inset-0 object-cover w-full h-full opacity-0 transition duration-500 group-hover:opacity-100" alt="${product.title}">
            ` : ''}
        ` : '';

        const priceHtml = product.price ? `
            <div>
                ${product.price.current ? `<span class="text-gray-900 font-bold">${product.price.current}</span>` : ''}
                ${product.price.original ? `<span class="text-gray-400 text-sm line-through ml-2">${product.price.original}</span>` : ''}
            </div>
        ` : '';

        const ratingHtml = product.rating ? `
            <div class="flex text-yellow-400 text-xs">
                <i class="fas fa-star"></i>
                <span class="text-gray-400 ml-1">${product.rating}</span>
            </div>
        ` : '';

        return `
            <div class="group relative bg-white">
                <div class="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                    ${badgeHtml}
                    <button class="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition z-10 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 duration-300">
                        <i class="far fa-heart"></i>
                    </button>
                    ${imagesHtml}
                    <div class="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                        <button class="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                            <i class="fas fa-shopping-cart"></i> Adicionar
                        </button>
                    </div>
                </div>
                <div>
                    ${product.category ? `<p class="text-gray-500 text-xs mb-1">${product.category}</p>` : ''}
                    <h3 class="font-medium text-lg leading-tight mb-2 transition group-hover:opacity-80" style="color: ${primaryColor};">${product.title}</h3>
                    <div class="flex items-center justify-between">
                        ${priceHtml}
                        ${ratingHtml}
                    </div>
                    ${product.installments ? `<p class="text-xs text-green-600 mt-2 font-medium">${product.installments}</p>` : ''}
                </div>
            </div>
        `;
    }

    render() {
        const c = this.colors;
        const productsHtml = this.products.map(product => this.renderProductCard(product, c.primary)).join('');

        return `
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    ${productsHtml}
                </div>

                ${this.linkText ? `
                    <div class="text-center mt-12">
                        <a href="${this.linkHref}" class="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition uppercase tracking-wide text-sm inline-block">
                            ${this.linkText}
                        </a>
                    </div>
                ` : ''}
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
        const component = new ProductGridAdvancedComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('product-grid-advanced', ProductGridAdvancedComponent);
}

