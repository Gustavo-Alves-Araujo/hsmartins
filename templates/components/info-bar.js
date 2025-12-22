/**
 * Info Bar Component
 * Barra de informações genérica com ícones e textos customizáveis
 */

class InfoBarComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para a Info Bar
     * @param {Array} data.items - Array de itens a serem exibidos
     * @param {string} data.items[].icon - Classe do ícone (ex: 'fas fa-motorcycle')
     * @param {string} data.items[].text - Texto do item
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'green', 'brand-dark')
     * @param {string} data.colors.text - Cor do texto base (ex: 'white')
     * @param {string} data.colors.accent - Cor dos ícones base (ex: 'orange', 'brand-gold')
     */
    constructor(data) {
        super();
        // Items genéricos
        this.items = data.items || [];

        // Colors com variações automáticas (seguindo padrão do HERO)
        const bgBase = data.colors?.background || 'brand-dark';
        const accentBase = data.colors?.accent || 'brand-gold';
        const textBase = data.colors?.text || 'white';

        // Aplica variações automáticas conforme o contexto (NÃO sobrescreve com ...data.colors)
        this.colors = {
            background: this.getColorVariant(bgBase, 700),  // Fundo escuro
            text: textBase,                                   // Texto (geralmente white)
            accent: this.getColorVariant(accentBase, 400),   // Accent médio
        };
    }

    /**
     * Renderiza um item individual
     * @param {Object} item - Dados do item
     * @returns {string} HTML do item
     */
    renderItem(item) {
        const c = this.colors;

        return `
            <div class="flex items-center gap-3 group cursor-default transform transition-all duration-300 hover:scale-105">
                <div class="w-10 h-10 rounded-full bg-${c.accent}/20 flex items-center justify-center group-hover:bg-${c.accent}/30 transition-colors duration-300">
                    <i class="${item.icon} text-${c.accent} text-lg group-hover:scale-110 transition-transform duration-300"></i>
                </div>
                <span class="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300">${item.text}</span>
            </div>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const itemsHtml = this.items.map(item => this.renderItem(item)).join('');

        return `
            <div class="bg-${c.background} text-${c.text} py-5 relative overflow-hidden" style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                <!-- Background decoration -->
                <div class="absolute inset-0 opacity-5" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>

                <div class="container mx-auto px-6 relative z-10">
                    <div class="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
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
     * @returns {InfoBarComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new InfoBarComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('info-bar', InfoBarComponent);
}
