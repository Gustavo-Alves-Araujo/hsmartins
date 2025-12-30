/**
 * Hero Product Showcase Component
 * Hero section com produto em destaque, preço, avaliações e especificações técnicas
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

        // Resolve cores com contraste adequado (fundo escuro, texto branco)
        const bgHex = this.resolveColorHex(data.colors?.background, 'primary', '#000000');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');
        const primaryLightHex = this.lightenColor(primaryHex, 0.2);
        const primaryDarkHex = this.darkenColor(primaryHex, 0.3);

        this.colors = {
            background: bgHex,
            primary: primaryHex,
            primaryLight: primaryLightHex,
            primaryDark: primaryDarkHex,
            title: '#FFFFFF', // Sempre branco em fundo escuro
            description: '#D1D5DB', // Cinza claro para contraste adequado
            accent: primaryLightHex // Cor primária clara para gradiente
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
            const style = badge.style === 'outline'
                ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                : 'bg-white text-gray-900';
            return `<span class="inline-block px-3 py-1 ${style} text-xs font-bold uppercase tracking-wider rounded-sm">${badge.text}</span>`;
        }).join('');

        const buttonsHtml = this.buttons.map(btn => {
            const isPrimary = btn.primary !== false;
            const shadowColor = this.hexToRgba(c.primary, 0.4);
            if (isPrimary) {
                const btnStyle = `background-color: ${c.primary}; box-shadow: 0 0 20px ${shadowColor};`;
                const iconHtml = btn.icon ? `<i class="${btn.icon}"></i>` : '';
                return `<a href="${btn.href || '#'}" class="text-white px-10 py-4 rounded-full font-bold transition transform hover:-translate-y-1 text-sm uppercase tracking-wide flex items-center gap-2 hover:opacity-90" style="${btnStyle}">${btn.text} ${iconHtml}</a>`;
            } else {
                const iconHtml = btn.icon ? `<i class="${btn.icon}"></i>` : '';
                return `<a href="${btn.href || '#'}" class="px-8 py-4 rounded-full font-bold text-white hover:bg-white/10 transition border border-gray-600 flex items-center gap-2 text-sm uppercase tracking-wide backdrop-blur-sm">${btn.text} ${iconHtml}</a>`;
            }
        }).join('');

        const specsHtml = this.specs.map(spec => `
            <div class="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl flex-1 lg:flex-none lg:w-32 text-center hover:bg-white/20 transition cursor-default">
                <i class="${spec.icon} text-xl mb-1" style="color: ${c.primaryLight};"></i>
                <p class="text-white font-bold text-sm">${spec.value}</p>
                <p class="text-gray-400 text-[10px] uppercase">${spec.label}</p>
            </div>
        `).join('');

        return `
            <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div class="relative bg-black rounded-3xl overflow-hidden shadow-2xl animate-fade-in group">
                    <!-- Background Gradients/Effects -->
                    <div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 z-0"></div>
                    <div class="absolute top-0 right-0 w-2/3 h-full z-0" style="background: linear-gradient(to left, ${this.hexToRgba(c.primaryDark, 0.4)}, transparent);"></div>
                    <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse-slow z-0" style="background-color: ${this.hexToRgba(c.primary, 0.2)};"></div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[550px] relative z-10">
                        <!-- Text Content -->
                        <div class="p-8 md:p-14 lg:p-20 flex flex-col justify-center order-2 lg:order-1">
                            ${this.badges.length > 0 ? `
                                <div class="flex items-center gap-3 mb-6">
                                    ${badgesHtml}
                                </div>
                            ` : ''}

                            <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-none tracking-tight">
                                ${this.title}
                                ${this.titleHighlight ? `
                                    <br>
                                    <span style="background: linear-gradient(to right, ${c.primaryLight}, ${c.accent}, ${c.primaryLight}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${this.titleHighlight}</span>
                                ` : ''}
                            </h1>

                            ${this.description ? `
                                <p class="text-gray-300 text-lg mb-8 max-w-md leading-relaxed font-light pl-4" style="border-left: 2px solid ${c.primary};">
                                    ${this.description}
                                </p>
                            ` : ''}

                            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
                                ${this.price.value ? `
                                    <div class="flex flex-col">
                                        <span class="text-4xl font-bold text-white tracking-tight">${this.price.value}</span>
                                        ${this.price.installments ? `
                                            <span class="text-sm text-gray-400">${this.price.installments}</span>
                                        ` : ''}
                                    </div>
                                ` : ''}
                                ${this.price.value && this.rating.value ? '<div class="h-10 w-px bg-gray-700 hidden sm:block"></div>' : ''}
                                ${this.rating.value ? `
                                    <div class="flex items-center gap-2">
                                        <div class="flex text-yellow-400 text-sm">
                                            ${this.renderStars(this.rating.stars || 5)}
                                        </div>
                                        <span class="text-white font-medium text-sm">${this.rating.value}</span>
                                    </div>
                                ` : ''}
                            </div>

                            ${this.buttons.length > 0 ? `
                                <div class="flex flex-wrap gap-4">
                                    ${buttonsHtml}
                                </div>
                            ` : ''}
                        </div>

                        <!-- Image Content -->
                        <div class="relative h-72 lg:h-auto order-1 lg:order-2 overflow-hidden">
                            ${this.imageUrl ? `
                                <img src="${this.imageUrl}"
                                     class="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
                                     alt="${this.imageAlt}">
                            ` : ''}

                            <!-- Gradient Overlays -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black"></div>
                            <div class="absolute inset-0 mix-blend-overlay" style="background-color: ${this.hexToRgba(c.primaryDark, 0.2)};"></div>

                            <!-- Floating Tech Specs -->
                            ${this.specs.length > 0 ? `
                                <div class="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-12 lg:bottom-12 flex gap-3 animate-slide-up">
                                    ${specsHtml}
                                </div>
                            ` : ''}
                        </div>
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

