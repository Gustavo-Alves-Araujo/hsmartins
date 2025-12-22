/**
 * CTA Banner Component
 * Banner centralizado de call-to-action com botões customizáveis
 */

class CtaBannerComponent {
    /**
     * @param {Object} data - Dados necessários para o CTA Banner
     * @param {string} data.title - Título principal
     * @param {string} data.subtitle - Subtítulo/descrição
     * @param {Array} data.buttons - Array de botões
     * @param {string} data.buttons[].text - Texto do botão
     * @param {string} data.buttons[].icon - Classe do ícone (opcional)
     * @param {string} data.buttons[].href - Link do botão
     * @param {string} data.buttons[].target - Target do link (opcional)
     * @param {string} data.buttons[].bgColor - Cor de fundo do botão (ex: 'green-500')
     * @param {string} data.buttons[].hoverColor - Cor de hover (ex: 'green-600')
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo (padrão: 'brand-dark')
     * @param {string} data.colors.textColor - Cor do texto (padrão: 'white')
     * @param {string} data.backgroundPattern - URL do padrão de fundo (opcional)
     */
    constructor(data) {
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.buttons = data.buttons || [];
        this.backgroundPattern = data.backgroundPattern || '';

        // Colors
        this.colors = {
            background: 'brand-dark',
            textColor: 'white',
            ...data.colors
        };
    }

    /**
     * Renderiza um botão individual
     * @param {Object} button - Dados do botão
     * @returns {string} HTML do botão
     */
    renderButton(button) {
        const tag = button.href ? 'a' : 'button';
        const hrefAttr = button.href ? `href="${button.href}"` : '';
        const targetAttr = button.target ? `target="${button.target}"` : '';
        const bgColor = button.bgColor || 'blue-600';
        const hoverColor = button.hoverColor || 'blue-700';

        return `
            <${tag} ${hrefAttr} ${targetAttr}
                class="px-8 py-4 bg-${bgColor} text-white font-bold rounded-full hover:bg-${hoverColor} transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105">
                ${button.icon ? `<i class="${button.icon} text-xl"></i>` : ''}
                <span>${button.text}</span>
            </${tag}>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const buttonsHtml = this.buttons.map(btn => this.renderButton(btn)).join('');
        const backgroundStyle = this.backgroundPattern
            ? `background-image: url('${this.backgroundPattern}');`
            : '';

        return `
            <section class="py-16 md:py-20 bg-${c.background} text-${c.textColor} text-center relative overflow-hidden">
                ${this.backgroundPattern ? `
                    <div class="absolute inset-0 opacity-10" style="${backgroundStyle}"></div>
                ` : ''}

                <div class="container mx-auto px-6 relative z-10">
                    <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 font-medium">
                        ${this.title}
                    </h2>

                    <p class="text-${c.textColor}/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        ${this.subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
                        ${buttonsHtml}
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
     * @returns {CtaBannerComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new CtaBannerComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('cta-banner', CtaBannerComponent);
}

