/**
 * Product Grid E-commerce Component
 * Grid de produtos para e-commerce com preço, badge, botão de ação
 * Genérico mas otimizado para produtos físicos/digitais
 */

class ProductGridEcommerceComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Product Grid
     * @param {string} data.title - Título da seção
     * @param {string} data.subtitle - Subtítulo da seção (opcional)
     * @param {string} data.linkText - Texto do link "Ver todos" (opcional)
     * @param {string} data.linkHref - URL do link "Ver todos" (opcional)
     * @param {Array} data.products - Array de produtos
     * @param {string} data.products[].id - ID do produto
     * @param {string} data.products[].name - Nome do produto
     * @param {number} data.products[].price - Preço do produto
     * @param {string} data.products[].image - URL da imagem
     * @param {string} data.products[].imageAlt - Texto alternativo da imagem
     * @param {string} data.products[].badge - Badge do produto (ex: "NOVO", "HOT", "SALE") (opcional)
     * @param {string} data.products[].category - Categoria do produto (opcional)
     * @param {boolean} data.products[].showInstallment - Se deve mostrar parcelamento (padrão: true)
     * @param {number} data.products[].installmentMonths - Número de parcelas (padrão: 10)
     * @param {number} data.layout.columns - Número de colunas no grid (padrão: 4)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.title = data.title || '';
        this.subtitle = data.subtitle || '';
        this.linkText = data.linkText || '';
        this.linkHref = data.linkHref || '#';
        this.products = data.products || [];
        this.columns = data.layout?.columns || 4;

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const titleBase = this.resolveColor(data.colors?.title, 'primary', 'black');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase,
            title: titleBase === 'black' ? 'black' : this.getColorVariant(titleBase, 900),
            subtitle: 'gray-500',
        };

        // Injeta estilos se necessário
        this.injectStyles();
    }

    /**
     * Injeta estilos CSS customizados
     */
    injectStyles() {
        if (document.getElementById('product-grid-ecommerce-styles')) return;

        const style = document.createElement('style');
        style.id = 'product-grid-ecommerce-styles';
        style.textContent = `
            .product-card-hover-zoom {
                overflow: hidden;
            }
            .product-card-hover-zoom img {
                transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .product-card:hover .product-card-hover-zoom img {
                transform: scale(1.05);
            }
            .product-add-btn {
                transition: transform 0.3s;
            }
            .product-card:hover .product-add-btn {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Formata preço para moeda brasileira
     * @param {number} price - Preço a ser formatado
     * @returns {string} Preço formatado
     */
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price);
    }

    /**
     * Renderiza um produto individual
     * @param {Object} product - Dados do produto
     * @returns {string} HTML do produto
     */
    renderProduct(product) {
        const installmentMonths = product.installmentMonths || 10;
        const showInstallment = product.showInstallment !== false;
        const installmentPrice = product.price / installmentMonths;

        return `
            <div class="product-card group cursor-pointer">
                <div class="relative bg-gray-100 mb-4 overflow-hidden rounded-lg product-card-hover-zoom h-[300px] flex items-center justify-center">
                    ${product.badge ? `
                        <span class="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 z-10">
                            ${product.badge}
                        </span>
                    ` : ''}
                    <img src="${product.image}"
                         alt="${product.imageAlt || product.name}"
                         class="w-full h-full object-cover">

                    <button onclick="window.productGridAddToCart && window.productGridAddToCart('${product.id}')"
                            class="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg translate-y-16 product-add-btn hover:bg-black hover:text-white transition-all">
                        <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                    </button>
                </div>
                <div>
                    <h3 class="font-bold text-lg leading-tight mb-1 group-hover:underline text-${this.colors.title}">
                        ${product.name}
                    </h3>
                    ${product.category ? `
                        <p class="text-gray-500 text-sm mb-2">${product.category}</p>
                    ` : ''}
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-${this.colors.title}">
                            ${this.formatPrice(product.price)}
                        </span>
                        ${showInstallment ? `
                            <span class="text-xs text-gray-400">
                                ${installmentMonths}x de ${this.formatPrice(installmentPrice)}
                            </span>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const gridCols = `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${this.columns}`;
        const productsHtml = this.products.map(product => this.renderProduct(product)).join('');

        return `
            <section id="lancamentos" class="py-20 container mx-auto px-4">
                ${this.title || this.subtitle ? `
                    <div class="flex justify-between items-end mb-10">
                        <div>
                            ${this.title ? `
                                <h2 class="text-3xl md:text-4xl font-display font-bold uppercase text-${c.title}">
                                    ${this.title}
                                </h2>
                            ` : ''}
                            ${this.subtitle ? `
                                <p class="text-gray-500 mt-2">${this.subtitle}</p>
                            ` : ''}
                        </div>
                        ${this.linkText ? `
                            <a href="${this.linkHref}" class="hidden md:flex items-center font-bold text-sm border-b border-black pb-1 hover:text-gray-600">
                                ${this.linkText}
                                <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
                            </a>
                        ` : ''}
                    </div>
                ` : ''}

                <!-- Product Grid -->
                <div class="grid ${gridCols} gap-8" id="product-grid-content">
                    ${productsHtml}
                </div>

                ${this.linkText ? `
                    <div class="mt-10 text-center md:hidden">
                        <a href="${this.linkHref}" class="inline-block border border-black px-6 py-3 font-bold text-sm uppercase">
                            ${this.linkText}
                        </a>
                    </div>
                ` : ''}
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
     * @returns {ProductGridEcommerceComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new ProductGridEcommerceComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('product-grid-ecommerce', ProductGridEcommerceComponent);
}

