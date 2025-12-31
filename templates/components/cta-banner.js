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

        // SEMPRE usa a cor primária do tema global - SEM FALLBACK FIXO
        const theme = this.getGlobalTheme();
        const primaryHex = theme?.colors?.primary;

        if (!primaryHex) {
            console.warn('⚠️ Cor primária não encontrada no tema. Verifique o config.json');
        }

        // Resolve cores usando sempre a cor primária do tema
        const primaryBase = this.resolveColor(data.colors?.primary, 'primary', 'blue');
        const useHex = primaryHex && primaryHex.startsWith('#');

        // Calcula variações se for hex
        const gradStartColor = useHex ? this.lightenColor(primaryHex, 0.85) : null; // 50
        const btnColor = useHex ? primaryHex : null; // 600
        const btnHoverColor = useHex ? this.darkenColor(primaryHex, 0.1) : null; // 700
        const badgeBgColor = useHex ? this.lightenColor(primaryHex, 0.9) : null; // Background muito claro
        const badgeTextColor = useHex ? primaryHex : null; // Texto da badge

        this.colors = {
            gradStart: useHex ? '' : `from-${primaryBase}-50`,
            gradEnd: `to-white`,
            primaryBtn: useHex ? '' : `bg-${primaryBase}-600`,
            primaryBtnHover: useHex ? '' : `hover:bg-${primaryBase}-700`,
            primaryText: useHex ? '' : `text-${primaryBase}-900`,
            primaryRing: useHex ? '' : `focus:ring-${primaryBase}-500/30`,
            primaryShadow: useHex ? '' : `hover:shadow-${primaryBase}-500/20`,
            titleText: 'text-slate-900',
            subtitleText: 'text-slate-600',
            // Cores hex para uso direto
            primaryHex: primaryHex,
            gradStartColor: gradStartColor,
            btnColor: btnColor,
            btnHoverColor: btnHoverColor,
            badgeBgColor: badgeBgColor,
            badgeTextColor: badgeTextColor,
            useHex: useHex
        };

        // Injeta estilos CSS se usar cores hex
        if (useHex) {
            this.injectStyles();
        }
    }

    /**
     * Injeta estilos CSS customizados para cores hex
     */
    injectStyles() {
        if (document.getElementById('cta-banner-styles')) return;

        const style = document.createElement('style');
        style.id = 'cta-banner-styles';
        const c = this.colors;

        style.textContent = `
            .cta-banner-btn-primary {
                background-color: ${c.btnColor} !important;
            }
            .cta-banner-btn-primary:hover {
                background-color: ${c.btnHoverColor} !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o botão em versão compacta
     */
    renderButton(button) {
        const tag = button.href ? 'a' : 'button';
        const hrefAttr = button.href ? `href="${button.href}"` : '';
        const targetAttr = button.target ? `target="${button.target}"` : '';

        const btnClass = this.colors.useHex
            ? 'cta-banner-btn-primary text-white font-bold rounded-xl text-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4'
            : `${this.colors.primaryBtn} ${this.colors.primaryBtnHover} text-white font-bold rounded-xl text-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg ${this.colors.primaryShadow} active:scale-[0.98] focus:outline-none focus:ring-4 ${this.colors.primaryRing}`;

        return `
            <${tag} ${hrefAttr} ${targetAttr}
                class="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 ${btnClass}">

                ${button.icon ? `<i class="${button.icon} text-base transition-transform group-hover:scale-110"></i>` : ''}
                <span class="tracking-tight">${button.text}</span>
            </${tag}>
        `;
    }

    render() {
        const c = this.colors;
        const buttonsHtml = this.buttons.map(btn => this.renderButton(btn)).join('');

        // Estilos para gradiente de fundo
        const gradStyle = c.useHex
            ? `style="background: linear-gradient(to bottom right, ${c.gradStartColor}, white);"`
            : '';
        const gradClass = c.useHex
            ? 'bg-gradient-to-br to-white overflow-hidden px-6'
            : `bg-gradient-to-br ${c.gradStart} ${c.gradEnd} overflow-hidden px-6`;

        // Estilos para badge "Novidade"
        const badgeStyle = c.useHex
            ? `style="background-color: ${c.badgeBgColor}; color: ${c.badgeTextColor};"`
            : '';
        const badgeClass = c.useHex
            ? 'inline-flex items-center px-3 py-1 rounded-full shadow-sm border border-slate-100 text-[10px] font-bold uppercase tracking-widest mb-4'
            : `inline-flex items-center px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 text-[10px] font-bold ${c.primaryText} uppercase tracking-widest mb-4`;

        return `
            <section class="relative py-12 md:py-16 ${gradClass}" ${gradStyle}>

                <div class="container mx-auto relative z-10">
                    <div class="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg p-6 md:p-10 rounded-[1.5rem]
                                shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-white/80 text-center">

                        <div class="${badgeClass}" ${badgeStyle}>
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