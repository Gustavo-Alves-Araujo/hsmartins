/**
 * CTA Banner Component
 * Banner centralizado de call-to-action com botões customizáveis
 * Design Aprimorado: Cinematic Look (Matches Hero Component)
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

        // Colors com variações automáticas
        const bgBase = data.colors?.background || 'brand-dark';
        const textBase = data.colors?.textColor || 'white';

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: this.getColorVariant(bgBase, 800), // Base um pouco mais escura para contraste
            textColor: textBase,
            accentGlow: this.getColorVariant(bgBase, 400)  // Cor para o brilho ambiente
        };
    }

    /**
     * Renderiza um botão individual com acabamento Premium
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
        const hoverColor = this.getColorVariant(hoverBase, 500);

        return `
            <${tag} ${hrefAttr} ${targetAttr}
                class="group relative px-8 py-4 bg-${bgColor} text-white font-bold rounded-full
                       transition-all duration-300 ease-out
                       hover:bg-${hoverColor} hover:-translate-y-1
                       shadow-xl hover:shadow-2xl hover:shadow-${bgColor}/40
                       ring-1 ring-inset ring-white/20
                       focus:outline-none focus:ring-4 focus:ring-${bgColor}/30
                       flex items-center justify-center gap-3 overflow-hidden">

                <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out skew-x-12"></div>

                ${button.icon ? `<i class="${button.icon} text-xl relative z-10 transition-transform group-hover:scale-110 duration-300"></i>` : ''}
                <span class="relative z-10 tracking-wide text-sm md:text-base">${button.text}</span>
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

        // Background pattern com blending
        const backgroundStyle = this.backgroundPattern
            ? `background-image: url('${this.backgroundPattern}'); background-blend-mode: overlay; background-size: cover;`
            : '';

        return `
            <section class="relative py-24 md:py-32 bg-${c.background} text-${c.textColor} overflow-hidden isolate border-y border-white/5">

                ${this.backgroundPattern ? `
                    <div class="absolute inset-0 opacity-20 mix-blend-overlay" style="${backgroundStyle}"></div>
                ` : ''}

                <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none"></div>

                <div class="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[30rem] h-[30rem] bg-${c.accentGlow} opacity-20 blur-[100px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow"></div>
                <div class="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[40rem] h-[40rem] bg-white opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-overlay"></div>

                <div class="container mx-auto px-6 relative z-10">
                    <div class="max-w-4xl mx-auto text-center flex flex-col items-center">

                        <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 font-medium tracking-tight drop-shadow-lg leading-[1.2]">
                            ${this.title}
                        </h2>

                        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-${c.textColor}/30 to-transparent mb-8 rounded-full"></div>

                        <p class="text-${c.textColor} text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90 font-light drop-shadow-md">
                            ${this.subtitle}
                        </p>

                        <div class="flex flex-col sm:flex-row justify-center items-center gap-6 w-full sm:w-auto">
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