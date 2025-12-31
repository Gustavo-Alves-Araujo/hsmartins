/**
 * Feature Highlight Component
 * Seção split com imagem e lista de features/benefícios
 */

class FeatureHighlightComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Feature Highlight
     * @param {string} data.badge - Badge/etiqueta superior (opcional)
     * @param {string} data.title - Título principal
     * @param {string} data.description - Descrição/parágrafo
     * @param {Array} data.features - Lista de features/benefícios
     * @param {string} data.image - URL da imagem
     * @param {string} data.imageAlt - Texto alternativo da imagem
     * @param {Object} data.cta - Call to action (opcional)
     * @param {string} data.cta.text - Texto do CTA
     * @param {string} data.cta.href - Link do CTA
     * @param {string} data.cta.target - Target do link (opcional)
     * @param {Object} data.layout - Configurações de layout (opcional)
     * @param {string} data.layout.imagePosition - Posição da imagem: 'left' ou 'right' (padrão: 'left')
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'white', 'gray')
     * @param {string} data.colors.titleColor - Cor do título base (ex: 'gray', 'brand-dark')
     * @param {string} data.colors.badgeColor - Cor do badge base (ex: 'green', 'brand-dark')
     * @param {string} data.colors.accentColor - Cor de destaque base (ex: 'orange', 'brand-gold')
     * @param {string} data.colors.ctaColor - Cor do CTA base (ex: 'green', 'brand-dark')
     * @param {string} data.colors.ctaHoverColor - Cor do CTA hover base (ex: 'green', 'brand-gold')
     */
    constructor(data) {
        super();
        this.badge = data.badge || data.tag || ''; // Suporta tanto 'badge' quanto 'tag'
        this.title = data.title;
        this.description = data.description;
        this.features = data.features || [];
        this.image = data.image;
        this.imageAlt = data.imageAlt || '';

        // CTA
        this.cta = data.cta ? {
            text: data.cta.text || 'Saiba Mais',
            href: data.cta.href || '#',
            target: data.cta.target || ''
        } : null;

        // Layout - suporta tanto string direta quanto objeto
        this.layout = {
            imagePosition: typeof data.layout === 'string'
                ? data.layout.replace('image-', '') // 'image-right' -> 'right'
                : (data.layout?.imagePosition || 'left')
        };

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const titleBase = this.resolveColor(data.colors?.titleColor, 'primary', 'gray');
        const badgeBase = this.resolveColor(data.colors?.badgeColor, 'primary', 'green');
        const accentBase = this.resolveColor(data.colors?.accentColor, 'accent', 'orange');
        const ctaBase = this.resolveColor(data.colors?.ctaColor, 'primary', 'green');
        const ctaHoverBase = this.resolveColor(data.colors?.ctaHoverColor, 'primary', 'green');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase === 'white' ? 'white' : this.getColorVariant(bgBase, 50),
            titleColor: this.getColorVariant(titleBase, 900),
            badgeColor: this.getColorVariant(badgeBase, 700),
            accentColor: this.getColorVariant(accentBase, 500),
            ctaColor: this.getColorVariant(ctaBase, 600),
            ctaHoverColor: this.getColorVariant(ctaHoverBase, 700),
        };
    }

    /**
     * Renderiza um item da lista de features
     * @param {Object|string} feature - Objeto com {icon, text} ou string simples
     * @returns {string} HTML do item
     */
    renderFeature(feature) {
        const c = this.colors;

        // Suporta tanto objeto {icon, text} quanto string simples
        const icon = typeof feature === 'object' ? (feature.icon || 'fas fa-check') : 'fas fa-check';
        const text = typeof feature === 'object' ? feature.text : feature;

        return `
            <li class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-${c.accentColor}/20 flex items-center justify-center text-${c.titleColor} flex-shrink-0">
                    <i class="${icon} text-xs"></i>
                </span>
                <span class="text-gray-700 font-medium">${text}</span>
            </li>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const featuresHtml = this.features.map(f => this.renderFeature(f)).join('');
        const imageFirst = this.layout.imagePosition === 'left';
        const flexOrder = imageFirst ? '' : 'flex-row-reverse';

        return `
            <section class="py-20 md:py-24 bg-${c.background}">
                <div class="container mx-auto px-6">
                    <div class="flex flex-col md:flex-row ${flexOrder} items-center gap-12 md:gap-16">
                        <!-- Image Side -->
                        <div class="w-full md:w-1/2">
                            <div class="relative">
                                <!-- Decorative Circle -->
                                <div class="absolute -top-4 -left-4 w-24 h-24 bg-${c.accentColor}/20 rounded-full -z-10"></div>
                                <img src="${this.image}"
                                     alt="${this.imageAlt}"
                                     class="relative rounded-lg shadow-2xl w-full object-cover">
                            </div>
                        </div>

                        <!-- Content Side -->
                        <div class="w-full md:w-1/2">
                            ${this.badge ? `
                                <span class="text-${c.badgeColor} font-bold uppercase tracking-widest text-sm mb-2 block">
                                    ${this.badge}
                                </span>
                            ` : ''}

                            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-${c.titleColor} mb-6 leading-tight font-medium">
                                ${this.title}
                            </h2>

                            <p class="text-gray-600 mb-8 leading-relaxed text-lg">
                                ${this.description}
                            </p>

                            ${this.features.length > 0 ? `
                                <ul class="space-y-4 mb-8">
                                    ${featuresHtml}
                                </ul>
                            ` : ''}

                            ${this.cta ? `
                                <a href="${this.cta.href}"
                                   ${this.cta.target ? `target="${this.cta.target}"` : ''}
                                   class="inline-block border-b-2 border-${c.ctaColor} text-${c.ctaColor} font-serif text-xl pb-1 hover:text-${c.ctaHoverColor} hover:border-${c.ctaHoverColor} transition-colors">
                                    ${this.cta.text}
                                </a>
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
     * @returns {FeatureHighlightComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new FeatureHighlightComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('feature-highlight', FeatureHighlightComponent);
}

