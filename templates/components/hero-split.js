/**
 * Hero Split Component
 * Hero section com layout split (texto à esquerda, imagem à direita)
 * Genérico para qualquer tipo de hero que precise de layout dividido
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

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'gray');
        const titleBase = this.resolveColor(data.colors?.title, 'primary', 'black');
        const highlightBase = this.resolveColor(data.colors?.titleHighlight, 'primary', 'gray');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase === 'gray' ? 'brand-gray' : this.getColorVariant(bgBase, 50),
            title: titleBase === 'black' ? 'black' : this.getColorVariant(titleBase, 900),
            titleHighlight: highlightBase === 'gray' ? 'gray-500' : this.getColorVariant(highlightBase, 500),
            description: 'gray-600',
        };
    }

    /**
     * Renderiza os botões
     * @returns {string} HTML dos botões
     */
    renderButtons() {
        if (this.buttons.length === 0) return '';

        return this.buttons.map(button => {
            const btnClass = button.class || 'bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-900 transition-all hover:scale-105 shadow-xl';
            const iconHtml = button.icon ? `<i class="${button.icon}"></i>` : '';

            return `
                <a href="${button.href}" class="${btnClass}">
                    ${iconHtml}
                    ${button.text}
                </a>
            `;
        }).join('');
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const layoutClass = this.reverse ? 'flex-row-reverse' : '';
        const textAlignment = this.reverse ? 'lg:text-right' : 'lg:text-left';

        return `
            <section class="relative overflow-hidden p-16" style="background-color: #F5F5F5;">
                <div class="container mx-auto px-4 py-16 lg:py-24 flex flex-col-reverse lg:flex-row ${layoutClass} items-center gap-0">
                    <!-- Text Content -->
                    <div class="lg:w-1/2 z-10 text-center ${textAlignment} mt-10 lg:mt-0 animate-slide-up">
                        ${this.badge ? `
                            <span class="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4 block">
                                ${this.badge}
                            </span>
                        ` : ''}
                        <h1 class="text-5xl lg:text-7xl font-display font-bold leading-[0.9] mb-6 text-${c.title}">
                            ${this.title}
                            ${this.titleHighlight ? `
                                <br>
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">
                                    ${this.titleHighlight}
                                </span>
                            ` : ''}
                        </h1>
                        ${this.description ? `
                            <p class="text-gray-600 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                                ${this.description}
                            </p>
                        ` : ''}
                        ${this.buttons.length > 0 ? `
                            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                ${this.renderButtons()}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Image -->
                    <div class="lg:w-1/2 relative flex justify-center items-center">
                        <!-- Abstract BG shape -->
                        <div class="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-gray-300 rounded-full blur-[80px] opacity-60 animate-pulse"></div>
                        <!-- Image -->
                        <img src="${this.imageUrl}"
                             alt="${this.imageAlt}"
                             class="w-full max-w-md drop-shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-700 cursor-pointer relative z-10">
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

