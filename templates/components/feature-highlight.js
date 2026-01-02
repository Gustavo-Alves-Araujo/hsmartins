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

        // Resolve cores usando o sistema de cores do site
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#2563eb');
        const bgHex = this.resolveColorHex(data.colors?.background, 'background', '#ffffff');

        this.colors = {
            background: bgBase,
            backgroundHex: bgHex,
            primary: primaryHex,
            title: 'gray-900',
            description: 'gray-600',
        };
    }

    /**
     * Renderiza um item da lista de features
     * @param {Object|string} feature - Objeto com {icon, text} ou string simples
     * @returns {string} HTML do item
     */
    renderFeature(feature) {
        const c = this.colors;

        // Suporta tanto objeto {icon, text, label, name} quanto string simples
        let icon = 'fas fa-check';
        let text = '';
        
        if (typeof feature === 'object' && feature !== null) {
            icon = feature.icon || feature.iconClass || 'fas fa-check';
            text = feature.text || feature.label || feature.name || feature.title || '';
        } else if (typeof feature === 'string' && feature.trim() !== '') {
            text = feature;
        }

        // Se ainda não tiver texto válido, não renderiza
        if (!text || text.trim() === '' || text === 'undefined') {
            return '';
        }

        return `
            <li class="flex items-start gap-4">
                <span class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: ${this.hexToRgba(c.primary, 0.1)}; color: ${c.primary};">
                    <i class="${icon} text-sm"></i>
                </span>
                <span class="text-gray-700 font-medium text-base leading-relaxed pt-2">${text}</span>
            </li>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const featuresHtml = this.features
            .map(f => this.renderFeature(f))
            .filter(html => html !== '') // Remove itens vazios
            .join('');
        const imageFirst = this.layout.imagePosition === 'left';
        const flexOrder = imageFirst ? '' : 'lg:flex-row-reverse';

        return `
            <section class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8" style="background-color: ${c.backgroundHex};">
                <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${flexOrder}">
                        <!-- Image Side -->
                        <div class="order-1 ${imageFirst ? 'lg:order-1' : 'lg:order-2'}">
                            <div class="relative">
                                <div class="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
                                    ${this.image ? `
                                        <img src="${this.image}"
                                             alt="${this.imageAlt || ''}"
                                             class="w-full h-full object-cover">
                                    ` : `
                                        <div class="w-full h-full flex items-center justify-center bg-gray-100">
                                            <div class="w-32 h-32 rounded-full bg-gray-200"></div>
                                        </div>
                                    `}
                                </div>
                            </div>
                        </div>

                        <!-- Content Side -->
                        <div class="order-2 ${imageFirst ? 'lg:order-2' : 'lg:order-1'} space-y-8">
                            ${this.badge ? `
                                <div>
                                    <span class="inline-block px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider mb-6" style="background-color: ${c.primary}; color: white;">
                                        ${this.badge}
                                    </span>
                                </div>
                            ` : ''}

                            <div class="space-y-4">
                                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    ${this.title || ''}
                                </h2>
                            </div>

                            ${this.description ? `
                                <p class="text-lg text-gray-600 leading-relaxed max-w-xl">
                                    ${this.description}
                                </p>
                            ` : ''}

                            ${featuresHtml ? `
                                <ul class="space-y-4">
                                    ${featuresHtml}
                                </ul>
                            ` : ''}

                            ${this.cta ? `
                                <div class="pt-2">
                                    <a href="${this.cta.href || '#'}"
                                       ${this.cta.target ? `target="${this.cta.target}"` : ''}
                                       class="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-lg text-white hover:opacity-90 transition-opacity duration-200"
                                       style="background-color: ${c.primary};">
                                        ${this.cta.text || 'Saiba Mais'}
                                    </a>
                                </div>
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

