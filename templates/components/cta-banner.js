/**
 * CTA Banner Component (Compact Version)
 * Design Moderno: SaaS / Clean Bootstrap
 * Fundo: Gradiente sutil do tema principal
 */

class CtaBannerComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o CTA Banner
     * @param {string} data.title - Título principal
     * @param {string} data.subtitle - Subtítulo/descrição
     * @param {Array} data.buttons - Array de botões
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (opcional)
     * @param {string} data.colors.primary - Cor primária para botões e gradiente
     */
    constructor(data) {
        super();
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.buttons = data.buttons || [];
        this.backgroundPattern = data.backgroundPattern || '';

        // Resolve a cor primária do tema
        const primaryBase = this.resolveColor(data.colors?.primary, 'primary', 'blue');

        this.colors = {
            gradStart: `from-${primaryBase}-50`,
            gradEnd: `to-white`,
            primaryBtn: `bg-${primaryBase}-600`,
            primaryBtnHover: `hover:bg-${primaryBase}-700`,
            primaryText: `text-${primaryBase}-900`,
            primaryRing: `focus:ring-${primaryBase}-500/30`,
            primaryShadow: `hover:shadow-${primaryBase}-500/20`,
            titleText: 'text-slate-900',
            subtitleText: 'text-slate-600'
        };
    }

    /**
     * Renderiza o botão em versão compacta
     */
    renderButton(button) {
        const tag = button.href ? 'a' : 'button';
        const hrefAttr = button.href ? `href="${button.href}"` : '';
        const targetAttr = button.target ? `target="${button.target}"` : '';

        return `
            <${tag} ${hrefAttr} ${targetAttr}
                class="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5
                       ${this.colors.primaryBtn} ${this.colors.primaryBtnHover}
                       text-white font-bold rounded-xl text-sm
                       transition-all duration-300 ease-out
                       hover:-translate-y-0.5 hover:shadow-lg ${this.colors.primaryShadow}
                       active:scale-[0.98]
                       focus:outline-none focus:ring-4 ${this.colors.primaryRing}">

                ${button.icon ? `<i class="${button.icon} text-base transition-transform group-hover:scale-110"></i>` : ''}
                <span class="tracking-tight">${button.text}</span>
            </${tag}>
        `;
    }

    render() {
        const c = this.colors;
        const buttonsHtml = this.buttons.map(btn => this.renderButton(btn)).join('');

        return `
            <section class="relative py-12 md:py-16 bg-gradient-to-br ${c.gradStart} ${c.gradEnd} overflow-hidden px-6">

                <div class="container mx-auto relative z-10">
                    <div class="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg p-6 md:p-10 rounded-[1.5rem]
                                shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-white/80 text-center">

                        <div class="inline-flex items-center px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 text-[10px] font-bold ${c.primaryText} uppercase tracking-widest mb-4">
                            Novidade
                        </div>

                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold ${c.titleText} mb-3 tracking-tight leading-tight">
                            ${this.title}
                        </h2>

                        <p class="text-sm md:text-base ${c.subtitleText} max-w-xl mx-auto mb-6 leading-relaxed font-medium">
                            ${this.subtitle}
                        </p>

                        <div class="flex flex-col sm:flex-row justify-center items-center gap-3">
                            ${buttonsHtml}
                        </div>

                        <div class="mt-8 flex justify-center items-center gap-6 opacity-40 grayscale">
                             <div class="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-slate-900">
                                <i class="fas fa-check text-[8px]"></i> Ativação Instantânea
                             </div>
                             <div class="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-slate-900">
                                <i class="fas fa-shield-alt text-[8px]"></i> Seguro
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) target.innerHTML = this.render();
    }

    static create(data, targetId) {
        const component = new CtaBannerComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('cta-banner', CtaBannerComponent);
}