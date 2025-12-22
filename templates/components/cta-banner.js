/**
 * CTA Banner Component
 * Banner centralizado de call-to-action com botões customizáveis
 * Design Aprimorado: Modern UI com Ambient Light e Glassmorphism leve
 */

class CtaBannerComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o CTA Banner
     * @param {string} data.title - Título principal
     * @param {string} data.subtitle - Subtítulo/descrição
     * @param {Array} data.buttons - Array de botões
     * @param {string} data.buttons[].text - Texto do botão
     * @param {string} data.buttons[].icon - Classe do ícone (opcional)
     * @param {string} data.buttons[].href - Link do botão
     * @param {string} data.buttons[].target - Target do link (opcional)
     * @param {string} data.buttons[].bgColor - Cor de fundo do botão base (ex: 'green', 'orange')
     * @param {string} data.buttons[].hoverColor - Cor de hover base (ex: 'green', 'orange')
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'green', 'brand-dark')
     * @param {string} data.colors.textColor - Cor do texto base (ex: 'white')
     * @param {string} data.backgroundPattern - URL do padrão de fundo (opcional)
     */
    constructor(data) {
        super();
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.buttons = data.buttons || [];
        this.backgroundPattern = data.backgroundPattern || '';

        // Colors com variações automáticas (seguindo padrão do HERO)
        const bgBase = data.colors?.background || 'brand-dark';
        const textBase = data.colors?.textColor || 'white';

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: this.getColorVariant(bgBase, 700),
            textColor: textBase,
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

        // Cores
        const bgBase = button.bgColor || 'blue';
        const hoverBase = button.hoverColor || bgBase;
        const bgColor = this.getColorVariant(bgBase, 600);
        const hoverColor = this.getColorVariant(hoverBase, 500); // Usei 500 para ficar mais brilhante no hover

        return `
            <${tag} ${hrefAttr} ${targetAttr}
                class="group relative px-8 py-4 bg-${bgColor} text-white font-bold rounded-full
                       transition-all duration-300 ease-out
                       hover:bg-${hoverColor} hover:-translate-y-1 hover:shadow-2xl hover:shadow-${bgColor}/50
                       focus:outline-none focus:ring-4 focus:ring-${bgColor}/30
                       flex items-center justify-center gap-3 overflow-hidden">

                <div class="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>

                ${button.icon ? `<i class="${button.icon} text-xl transition-transform group-hover:scale-110"></i>` : ''}
                <span class="relative z-10 tracking-wide">${button.text}</span>
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

        // Background pattern com blending melhorado
        const backgroundStyle = this.backgroundPattern
            ? `background-image: url('${this.backgroundPattern}'); background-blend-mode: overlay;`
            : '';

        return `
            <section class="relative py-20 md:py-28 bg-${c.background} text-${c.textColor} overflow-hidden isolate">

                ${this.backgroundPattern ? `
                    <div class="absolute inset-0 opacity-10 bg-center bg-repeat" style="${backgroundStyle}"></div>
                ` : ''}

                <div class="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-white opacity-10 blur-3xl rounded-full pointer-events-none mix-blend-soft-light"></div>
                <div class="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[30rem] h-[30rem] bg-white opacity-5 blur-3xl rounded-full pointer-events-none mix-blend-overlay"></div>

                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none"></div>

                <div class="container mx-auto px-6 relative z-10">
                    <div class="max-w-4xl mx-auto text-center flex flex-col items-center">

                        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 font-medium tracking-tight drop-shadow-sm leading-tight">
                            ${this.title}
                        </h2>

                        <p class="text-${c.textColor} text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90 font-light">
                            ${this.subtitle}
                        </p>

                        <div class="flex flex-col sm:flex-row justify-center items-center gap-5 w-full sm:w-auto">
                            ${buttonsHtml}
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