/**
 * Hero Split Component
 * Hero section com layout split (texto à esquerda, imagem à direita)
 * Estilo moderno e limpo (Modern Clean)
 */

class HeroSplitComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Hero Split
     * @param {string} data.badge - Badge/texto superior opcional
     * @param {string} data.title - Título principal
     * @param {string} data.titleHighlight - Parte destacada do título (opcional)
     * @param {string} data.description - Descrição/subtítulo
     * @param {Array} data.buttons - Array de botões { text: string, href: string, class?: string, icon?: string }
     * @param {string} data.imageUrl - URL da imagem
     * @param {string} data.imageAlt - Texto alternativo da imagem
     * @param {boolean} data.reverse - Se true, inverte o layout (imagem à esquerda, texto à direita)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'gray', 'brand-cream')
     * @param {string} data.colors.title - Cor do título base (ex: 'black', 'brand-dark')
     * @param {string} data.colors.titleHighlight - Cor do destaque do título base (ex: 'gray', 'primary')
     */
    constructor(data) {
        super();
        this.badge = data.badge || '';
        this.title = data.title;
        this.titleHighlight = data.titleHighlight || '';
        this.description = data.description || '';
        this.buttons = data.buttons || [];
        this.imageUrl = data.imageUrl;
        this.imageAlt = data.imageAlt || '';
        this.reverse = data.reverse || false;

        // Resolve cores usando o sistema de cores do site
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#2563eb');
        const bgHex = this.resolveColorHex(data.colors?.background, 'background', '#ffffff');

        this.colors = {
            background: bgBase,
            backgroundHex: bgHex,
            primary: primaryHex,
            title: 'gray-900',
            titleHighlight: 'gray-600',
            description: 'gray-600',
        };
    }

    /**
     * Renderiza os botões
     * @returns {string} HTML dos botões
     */
    renderButtons() {
        if (this.buttons.length === 0) return '';

        const c = this.colors;
        return this.buttons.map((button, index) => {
            const isPrimary = index === 0;
            const iconHtml = button.icon ? `<i class="${button.icon}"></i>` : '';
            
            if (button.class) {
                return `
                    <a href="${button.href || '#'}" class="${button.class}">
                        ${iconHtml} ${button.text}
                    </a>
                `;
            }
            
            if (isPrimary) {
                return `
                    <a href="${button.href || '#'}" 
                       class="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-lg text-white hover:opacity-90 transition-opacity duration-200"
                       style="background-color: ${c.primary};">
                        ${iconHtml} ${button.text}
                    </a>
                `;
            } else {
                return `
                    <a href="${button.href || '#'}" 
                       class="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        ${iconHtml} ${button.text}
                    </a>
                `;
            }
        }).join('');
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const layoutClass = this.reverse ? 'lg:flex-row-reverse' : '';

        return `
            <section class="relative pt-24 lg:pt-32 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8" style="background-color: ${c.backgroundHex};">
                <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <!-- Text Content -->
                        <div class="order-2 lg:order-1 space-y-8">
                            ${this.badge ? `
                                <div>
                                    <span class="inline-block px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider mb-6" style="background-color: ${c.primary}; color: white;">
                                        ${this.badge}
                                    </span>
                                </div>
                            ` : ''}
                            
                            <div class="space-y-4">
                                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
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

                            ${this.buttons.length > 0 ? `
                                <div class="flex flex-wrap gap-4 pt-2">
                                    ${this.renderButtons()}
                                </div>
                            ` : ''}
                        </div>

                        <!-- Image -->
                        <div class="order-1 lg:order-2 relative">
                            <div class="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
                                <img src="${this.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbmNxhl6aFUDwBtyelBzun4EnBJLblVb56w&s'}"
                                     alt="${this.imageAlt || ''}"
                                     class="w-full h-full object-cover">
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
     * @returns {HeroSplitComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new HeroSplitComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('hero-split', HeroSplitComponent);
}

