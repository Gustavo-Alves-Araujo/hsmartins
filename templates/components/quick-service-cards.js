/**
 * Quick Service Cards Component
 * Grid de cards de serviços rápidos com design "Modern Clean"
 * Foco em: Espaçamento orgânico, sombras suaves e CTAs funcionais.
 */

class QuickServiceCardsComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.cards - Array de cards { icon: string, title: string, description: string, buttonText: string, buttonHref: string, badge: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.primary - Cor primária do tema (ex: '#16A34A')
     * @param {string} data.colors.text - Cor do texto principal
     */
    constructor(data) {
        super();
        this.cards = data.cards || [];

        // Resolve cores dinâmicas (sempre usando o resolvedor do tema)
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16A34A');
        this.textHex = this.resolveColorHex(data.colors?.text, 'secondary', '#1e293b');

        // Variações para profundidade
        this.primaryLightHex = this.hexToRgba(this.primaryHex, 0.08);
        this.primaryDarkHex = this.darkenColor(this.primaryHex, 0.1);
    }

    /**
     * Renderiza um card individual seguindo as regras de "Modern Clean"
     */
    renderCard(card) {
        return `
            <div class="group relative bg-white p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 border border-slate-100/50"
                 style="box-shadow: 0 30px 60px -12px rgba(0,0,0,0.05), 0 18px 36px -18px rgba(0,0,0,0.05);">

                ${card.badge ? `
                    <span class="absolute top-6 right-8 py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                          style="color: ${this.primaryHex}; background-color: ${this.primaryLightHex}; border-color: ${this.hexToRgba(this.primaryHex, 0.2)};">
                        ${card.badge}
                    </span>
                ` : ''}

                <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500"
                     style="background-color: ${this.primaryLightHex}; color: ${this.primaryHex};">
                    <i class="${card.icon} text-2xl"></i>
                </div>

                <h3 class="text-xl font-bold mb-4 tracking-tight" style="color: ${this.textHex};">
                    ${card.title}
                </h3>

                <p class="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                    ${card.description}
                </p>

                <a href="${card.buttonHref || '#'}"
                   class="inline-flex items-center gap-2 font-bold text-sm transition-all duration-300 group/btn"
                   style="color: ${this.primaryHex};">
                    ${card.buttonText || 'Saiba Mais'}
                    <i class="fas fa-arrow-right text-xs transition-transform group-hover/btn:translate-x-1"></i>
                    <div class="h-0.5 w-0 group-hover/btn:w-full transition-all duration-300 rounded-full" style="background-color: ${this.primaryHex}; margin-top: -2px;"></div>
                </a>
            </div>
        `;
    }

    /**
     * Renderiza o container principal
     */
    render() {
        const cardsHtml = this.cards.map(card => this.renderCard(card)).join('');

        return `
            <section class="relative z-20 -mt-16 pb-20 px-6">
                <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${cardsHtml}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Monta o componente
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
        }
    }

    static create(data, targetId) {
        const component = new QuickServiceCardsComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('quick-service-cards', QuickServiceCardsComponent);
}