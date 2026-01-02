/**
 * Hero Product Showcase Component
 * Hero section com produto em destaque, preço, avaliações e especificações técnicas
 * Estilo moderno e limpo (Modern Clean)
 */

class HeroProductShowcaseComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.badges - Array de badges { text: string, style?: string }
     * @param {string} data.title - Título principal
     * @param {string} data.titleHighlight - Parte destacada do título (com gradiente)
     * @param {string} data.description - Descrição do produto
     * @param {Object} data.price - { value: string, installments?: string }
     * @param {Object} data.rating - { value: string, stars: number }
     * @param {Array} data.buttons - Array de botões { text: string, href: string, primary?: boolean, icon?: string }
     * @param {string} data.imageUrl - URL da imagem do produto
     * @param {string} data.imageAlt - Alt text da imagem
     * @param {Array} data.specs - Array de especificações { icon: string, value: string, label: string }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.badges = data.badges || [];
        this.title = data.title || '';
        this.titleHighlight = data.titleHighlight || '';
        this.description = data.description || '';
        this.price = data.price || {};
        this.rating = data.rating || {};
        this.buttons = data.buttons || [];
        this.imageUrl = data.imageUrl || '';
        this.imageAlt = data.imageAlt || '';
        this.specs = data.specs || [];

        // Resolve cores com estilo moderno e limpo (fundo claro)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#2563eb');

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            title: 'gray-900',
            description: 'gray-600'
        };
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHtml = '';

        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }

        return starsHtml;
    }

    render() {
        const c = this.colors;
        const badgesHtml = this.badges.map(badge => {
            if (badge.style === 'outline') {
                return `<span class="inline-block px-4 py-1.5 border border-gray-200 text-gray-700 bg-transparent text-xs font-semibold uppercase tracking-wider rounded-md">${badge.text}</span>`;
            } else {
                return `<span class="inline-block px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-wider rounded-md">${badge.text}</span>`;
            }
        }).join('');

        const buttonsHtml = this.buttons.map(btn => {
            const isPrimary = btn.primary !== false;
            const iconHtml = btn.icon ? `<i class="${btn.icon}"></i>` : '';
            if (isPrimary) {
                return `<a href="${btn.href || '#'}" class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm" style="background-color: ${c.primary};">
                    ${btn.text} ${iconHtml}
                </a>`;
            } else {
                return `<a href="${btn.href || '#'}" class="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
                    ${btn.text} ${iconHtml}
                </a>`;
            }
        }).join('');

        const specsHtml = this.specs.map(spec => `
            <div class="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                <i class="${spec.icon} text-2xl mb-3" style="color: ${c.primary};"></i>
                <p class="text-gray-900 font-bold text-lg mb-1">${spec.value}</p>
                <p class="text-gray-500 text-xs uppercase tracking-wider">${spec.label}</p>
            </div>
        `).join('');

        return `
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <!-- Text Content -->
                    <div class="order-2 lg:order-1 space-y-8">
                        ${this.badges.length > 0 ? `
                            <div class="flex items-center gap-3 flex-wrap">
                                ${badgesHtml}
                            </div>
                        ` : ''}

                        <div class="space-y-4">
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                                ${this.title}
                                ${this.titleHighlight ? `
                                    <br>
                                    <span class="text-gray-600 font-normal">${this.titleHighlight}</span>
                                ` : ''}
                            </h1>
                        </div>

                        ${this.description ? `
                            <p class="text-lg text-gray-600 leading-relaxed max-w-xl">
                                ${this.description}
                            </p>
                        ` : ''}

                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
                            ${this.price.value ? `
                                <div class="flex flex-col">
                                    <span class="text-4xl font-bold text-gray-900">${this.price.value}</span>
                                    ${this.price.installments ? `
                                        <span class="text-sm text-gray-500 mt-1">${this.price.installments}</span>
                                    ` : ''}
                                </div>
                            ` : ''}
                            ${this.price.value && this.rating.value ? '<div class="h-12 w-px bg-gray-200 hidden sm:block"></div>' : ''}
                            ${this.rating.value ? `
                                <div class="flex items-center gap-3">
                                    <div class="flex text-yellow-400 text-base">
                                        ${this.renderStars(this.rating.stars || 5)}
                                    </div>
                                    <span class="text-gray-700 font-medium">${this.rating.value}</span>
                                </div>
                            ` : ''}
                        </div>

                        ${this.buttons.length > 0 ? `
                            <div class="flex flex-wrap gap-4 pt-2">
                                ${buttonsHtml}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Image Content -->
                    <div class="relative order-1 lg:order-2">
                        <div class="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
                            <img src="${this.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbmNxhl6aFUDwBtyelBzun4EnBJLblVb56w&s'}"
                                 class="w-full h-full object-cover"
                                 alt="${this.imageAlt || 'Product image'}">
                        </div>

                        <!-- Tech Specs -->
                        ${this.specs.length > 0 ? `
                            <div class="grid grid-cols-3 gap-4 mt-8">
                                ${specsHtml}
                            </div>
                        ` : ''}
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
        const component = new HeroProductShowcaseComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('hero-product-showcase', HeroProductShowcaseComponent);
}

