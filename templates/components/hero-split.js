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
        const primaryDark = this.darkenColor(c.primary, 0.1);
        
        return this.buttons.map((button, index) => {
            const isPrimary = index === 0;
            const iconHtml = button.icon ? `<i class="${button.icon}"></i>` : '';
            
            // SEMPRE aplica o estilo moderno redondo, mesmo se tiver classe customizada
            if (isPrimary) {
                return `
                    <a href="${button.href || '#'}" 
                       class="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-semibold text-sm rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95"
                       style="background: linear-gradient(135deg, ${c.primary} 0%, ${primaryDark} 100%) !important; box-shadow: 0 4px 15px ${this.hexToRgba(c.primary, 0.4)} !important; border-radius: 9999px !important;"
                       onmouseover="this.style.boxShadow='0 6px 20px ${this.hexToRgba(c.primary, 0.5)}' !important;"
                       onmouseout="this.style.boxShadow='0 4px 15px ${this.hexToRgba(c.primary, 0.4)}' !important;">
                        ${iconHtml} ${button.text}
                    </a>
                `;
            } else {
                return `
                    <a href="${button.href || '#'}" 
                       class="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-semibold text-sm rounded-full bg-white text-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-200"
                       style="border-radius: 9999px !important; box-shadow: 0 2px 8px ${this.hexToRgba('#000000', 0.08)} !important;"
                       onmouseover="this.style.backgroundColor='#f9fafb' !important; this.style.boxShadow='0 4px 12px ${this.hexToRgba('#000000', 0.12)}' !important; this.style.borderColor='#d1d5db' !important;"
                       onmouseout="this.style.backgroundColor='white' !important; this.style.boxShadow='0 2px 8px ${this.hexToRgba('#000000', 0.08)}' !important; this.style.borderColor='#e5e7eb' !important;">
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
        const textOrder = this.reverse ? 'lg:order-2' : 'lg:order-1';
        const imageOrder = this.reverse ? 'lg:order-1' : 'lg:order-2';

        return `
            <section class="relative pt-24 lg:pt-32 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden" style="background: linear-gradient(to bottom, ${c.backgroundHex} 0%, ${this.hexToRgba(c.primary, 0.02)} 100%);">
                <!-- Background decorative elements -->
                <div class="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30" style="background-color: ${c.primary}; transform: translate(30%, -30%);"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20" style="background-color: ${c.primary}; transform: translate(-30%, 30%);"></div>
                
                <div class="max-w-7xl mx-auto relative z-10">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <!-- Text Content -->
                        <div class="${textOrder} space-y-6 lg:space-y-8">
                            ${this.badge ? `
                                <div class="inline-block">
                                    <span class="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider" style="background-color: ${this.hexToRgba(c.primary, 0.1)}; color: ${c.primary};">
                                        ${this.badge}
                                    </span>
                                </div>
                            ` : ''}
                            
                            <div class="space-y-4">
                                <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                                    ${this.title}
                                    ${this.titleHighlight ? `
                                        <br>
                                        <span class="font-normal" style="color: ${c.primary};">${this.titleHighlight}</span>
                                    ` : ''}
                                </h1>
                            </div>

                            ${this.description ? `
                                <p class="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                                    ${this.description}
                                </p>
                            ` : ''}

                            ${this.buttons.length > 0 ? `
                                <div class="flex flex-wrap gap-4 pt-4">
                                    ${this.renderButtons()}
                                </div>
                            ` : ''}
                        </div>

                        <!-- Image -->
                        <div class="${imageOrder} relative">
                            <div class="relative">
                                <!-- Decorative border/gradient -->
                                <div class="absolute -inset-4 rounded-3xl opacity-20" style="background: linear-gradient(135deg, ${c.primary} 0%, transparent 100%); transform: rotate(-2deg);"></div>
                                
                                <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
                                    <div class="aspect-[4/5] lg:aspect-square">
                                        <img src="${this.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbmNxhl6aFUDwBtyelBzun4EnBJLblVb56w&s'}"
                                             alt="${this.imageAlt || ''}"
                                             class="w-full h-full object-cover">
                                    </div>
                                </div>
                                
                                <!-- Floating decorative element -->
                                <div class="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl opacity-10 rotate-12 hidden lg:block" style="background-color: ${c.primary};"></div>
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

