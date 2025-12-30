/**
 * Product Grid E-commerce Component - Versão Final Ultra-Compatível
 * Estilo: Modern Clean / Boutique
 * MANTIDA A INTERFACE E LÓGICA ORIGINAL DE PROPRIEDADES
 */

class ProductGridEcommerceComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados originais
     */
    constructor(data) {
        super();
        this.title = data.title || '';
        this.subtitle = data.subtitle || '';
        this.linkText = data.linkText || '';
        this.linkHref = data.linkHref || '#';
        this.products = data.products || [];
        this.columns = data.layout?.columns || 4;

        // RESOLUÇÃO DE CORES ORIGINAL - MANTIDA
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const titleBase = this.resolveColor(data.colors?.title, 'primary', 'black');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase,
            title: titleBase === 'black' ? 'black' : this.getColorVariant(titleBase, 900),
            subtitle: 'gray-500',
        };

        // Mapeamento de colunas explícito para o scanner do Tailwind ver as strings
        const colMap = {
            1: 'lg:grid-cols-1',
            2: 'lg:grid-cols-2',
            3: 'lg:grid-cols-3',
            4: 'lg:grid-cols-4'
        };
        this.gridColsClass = colMap[this.columns] || 'lg:grid-cols-4';
    }

    /**
     * Formata preço para moeda brasileira - MANTIDO ORIGINAL
     */
    formatPrice(price) {
        const numPrice = typeof price === 'string'
            ? parseFloat(price.replace(/[^\d,.-]/g, '').replace(',', '.'))
            : Number(price);

        if (isNaN(numPrice) || numPrice < 0) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0);
        }

        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numPrice);
    }

    /**
     * Renderiza um produto individual
     */
    renderProduct(product, index) {
        const price = typeof product.price === 'string'
            ? parseFloat(product.price.replace(/[^\d,.-]/g, '').replace(',', '.'))
            : Number(product.price) || 0;

        const installmentMonths = product.installmentMonths || 10;
        const showInstallment = product.showInstallment !== false;
        const installmentPrice = price / installmentMonths;

        return `
            <div class="group flex flex-col bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-500"
                 data-aos="fade-up" data-aos-delay="${index * 50}">

                <div class="relative bg-gray-50 overflow-hidden rounded-2xl aspect-[4/5] flex items-center justify-center">
                    ${product.badge ? `
                        <span class="absolute top-4 left-4 z-10 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            ${product.badge}
                        </span>
                    ` : ''}

                    <img src="${product.image}"
                         alt="${product.imageAlt || product.name}"
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">

                    <button onclick="window.productGridAddToCart && window.productGridAddToCart('${product.id}')"
                            class="absolute bottom-4 right-4 bg-white p-4 rounded-2xl shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white">
                        <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                    </button>
                </div>

                <div class="pt-5 pb-2 px-2">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        ${product.category || 'Premium'}
                    </p>
                    <h3 class="font-bold text-lg leading-tight mb-3 transition-colors text-${this.colors.title}">
                        ${product.name}
                    </h3>

                    <div class="flex flex-col">
                        <span class="text-xl font-black text-${this.colors.title}">
                            ${this.formatPrice(price)}
                        </span>
                        ${showInstallment ? `
                            <span class="text-[11px] text-gray-400 font-medium">
                                ${installmentMonths}x de ${this.formatPrice(installmentPrice)}
                            </span>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza o HTML principal
     */
    render() {
        const c = this.colors;
        const productsHtml = this.products.map((p, i) => this.renderProduct(p, i)).join('');

        return `
            <section id="lancamentos" class="py-20 container mx-auto px-6">
                ${this.title || this.subtitle ? `
                    <div class="flex justify-between items-end mb-12">
                        <div>
                            ${this.title ? `
                                <h2 class="text-3xl md:text-5xl font-bold tracking-tighter text-${c.title}">
                                    ${this.title}
                                </h2>
                            ` : ''}
                            ${this.subtitle ? `
                                <p class="text-gray-500 mt-3 text-lg">${this.subtitle}</p>
                            ` : ''}
                        </div>
                        ${this.linkText ? `
                            <a href="${this.linkHref}" class="hidden md:flex items-center font-bold text-xs uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-50 transition-all">
                                ${this.linkText}
                                <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
                            </a>
                        ` : ''}
                    </div>
                ` : ''}

                <div class="grid grid-cols-1 sm:grid-cols-2 ${this.gridColsClass} gap-8">
                    ${productsHtml}
                </div>

                ${this.linkText ? `
                    <div class="mt-12 text-center md:hidden">
                        <a href="${this.linkHref}" class="inline-block border-2 border-black px-8 py-3 font-bold text-xs uppercase tracking-widest rounded-xl">
                            ${this.linkText}
                        </a>
                    </div>
                ` : ''}
            </section>
        `;
    }

    /**
     * Monta o componente - MANTIDO ORIGINAL
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();

            // Força o Tailwind a escanear o novo HTML injetado
            if (window.tailwind && typeof window.tailwind.track === 'function') {
                window.tailwind.track();
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    /**
     * Método estático - MANTIDO ORIGINAL
     */
    static create(data, targetId) {
        const component = new ProductGridEcommerceComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registro
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('product-grid-ecommerce', ProductGridEcommerceComponent);
}