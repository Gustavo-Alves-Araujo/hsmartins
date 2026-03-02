/**
 * Card Grid Component
 * Grid genérico de cards com imagens, overlay e hover effects
 */

class CardGridComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Card Grid
     * @param {string} data.title - Título da seção
     * @param {string} data.subtitle - Subtítulo da seção (opcional)
     * @param {Array} data.items - Array de cards
     * @param {string} data.items[].image - URL da imagem
     * @param {string} data.items[].title - Título do card
     * @param {string} data.items[].description - Descrição do card
     * @param {string} data.items[].alt - Texto alternativo da imagem
     * @param {Object} data.layout - Configurações de layout (opcional)
     * @param {number} data.layout.columns - Número de colunas (padrão: 3)
     * @param {string} data.layout.aspectRatio - Proporção dos cards (padrão: '4/5')
     * @param {string} data.layout.gap - Espaçamento entre cards (padrão: '8')
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'white', 'gray', 'brand-cream')
     * @param {string} data.colors.titleColor - Cor do título base (ex: 'gray', 'brand-dark')
     * @param {string} data.colors.subtitleColor - Cor do subtítulo base (ex: 'gray')
     * @param {string} data.colors.cardOverlay - Cor do overlay base (ex: 'gray', 'brand-dark')
     * @param {string} data.colors.accentLine - Cor da linha decorativa base (ex: 'green', 'brand-dark')
     */
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            title: 'Notícias do Mercado Imobiliário',
            subtitle: 'Fique por dentro sobre notícias, investimento e mais!',
            items: [
                {
                    imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyODd8MHwxfHNlYXJjaHwxfHxncm93dGglMjBmaW5hbmNlfHxlbnwwfDB8fHwxNzA4MzcwODg4fDA&ixlib=rb-4.1.0&q=80&w=400',
                    imageAlt: 'Novas condições de financiamento',
                    title: 'NOVAS CONDIÇÕES DE FINANCIAMENTO',
                    description: 'Saiba mais sobre as recentes atualizações para facilitar a compra do seu imóvel.',
                    buttonText: 'Ler Mais',
                    buttonHref: '#'
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1549923755-a2c7a6f2b45e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyODd8MHwxfHNlYXJjaHwxfHxtYXJyaWVkJTIwY291cGxlfHxlbnwwfDB8fHwxNzA4MzcwODg4fDA&ixlib=rb-4.1.0&q=80&w=400',
                    imageAlt: 'Casal discutindo',
                    title: 'Sou casado. Posso financiar um imóvel sozinho?',
                    description: 'Entenda as regras e possibilidades para o financiamento individual em caso de casamento.',
                    buttonText: 'Ler Mais',
                    buttonHref: '#'
                },
                {
                    imageUrl: 'https://images.unsplash.com/photo-1554224155-c474ad691500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyODd8MHwxfHNlYXJjaHwxfHxtb3J0Z2FnZSUyMHByb2JsZW1zfHxlbnwwfDB8fHwxNzA4MzcwODg4fDA&ixlib=rb-4.1.0&q=80&w=400',
                    imageAlt: 'Pessoa preocupada com contas',
                    title: 'Não consigo pagar o financiamento da minha casa: o que faço?',
                    description: 'Opções e soluções para quem está com dificuldades no pagamento do financiamento imobiliário.',
                    buttonText: 'Ler Mais',
                    imageAlt: 'Pessoa preocupada com contas',
                    title: 'Não consigo pagar o financiamento da minha casa: o que faço?',
                    description: 'Opções e soluções para quem está com dificuldades no pagamento do financiamento imobiliário.',
                    buttonText: 'Ler Mais',
                    buttonHref: '#'
                }
            ]
        };
        
        this.id = data.id || '';
        this.title = data.title || defaults.title;
        this.subtitle = data.subtitle || data.description || defaults.subtitle;
        // Aceita tanto 'cards' quanto 'items'
        this.items = data.cards || data.items || defaults.items;

        // Layout
        this.layout = {
            columns: 3,
            aspectRatio: '4/5',
            gap: '8',
            ...data.layout
        };

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'brand-cream');
        const titleBase = this.resolveColor(data.colors?.titleColor, 'primary', 'brand-dark');
        const subtitleBase = this.resolveColor(data.colors?.subtitleColor, null, 'gray');
        const overlayBase = this.resolveColor(data.colors?.cardOverlay, 'primary', 'brand-dark');
        const accentBase = this.resolveColor(data.colors?.accentLine, 'accent', 'brand-dark');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase === 'white' ? 'white' : this.getColorVariant(bgBase, 50),
            titleColor: this.getColorVariant(titleBase, 900),
            subtitleColor: this.getColorVariant(subtitleBase, 700),
            cardOverlay: this.getColorVariant(overlayBase, 900),
            accentLine: this.getColorVariant(accentBase, 600),
        };
    }

    /**
     * Renderiza um card individual
     * @param {Object} item - Dados do card
     * @param {number} index - Índice do card
     * @returns {string} HTML do card
     */
    renderCard(item, index) {
        const c = this.colors;

        return `
            <div class="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                 style="aspect-ratio: ${this.layout.aspectRatio};">
                <img src="${item.image}"
                     alt="${item.alt || item.imageAlt || ''}"
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-${c.cardOverlay}/90 via-${c.cardOverlay}/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                    <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 class="text-2xl md:text-3xl font-serif text-white mb-2 font-medium">${item.title}</h3>
                        <p class="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            ${item.description}
                        </p>
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
        const cardsHtml = this.items.map((item, index) => this.renderCard(item, index)).join('');
        const gridCols = `md:grid-cols-${this.layout.columns}`;

        return `
            <section ${this.id ? `id="${this.id}"` : ''} class="py-20 md:py-24 bg-${c.background}">
                <div class="container mx-auto px-6">
                    <!-- Header -->
                    <div class="text-center mb-12 md:mb-16">
                        <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-${c.titleColor} mb-4 font-medium">
                            ${this.title}
                        </h2>
                        ${this.subtitle ? `
                            <p class="text-${c.subtitleColor} text-lg md:text-xl max-w-2xl mx-auto mb-6">
                                ${this.subtitle}
                            </p>
                        ` : ''}
                        <div class="w-24 h-1 bg-${c.accentLine} mx-auto opacity-20"></div>
                    </div>

                    <!-- Grid -->
                    <div class="grid ${gridCols} gap-${this.layout.gap}">
                        ${cardsHtml}
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
     * @returns {CardGridComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new CardGridComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('card-grid', CardGridComponent);
}

