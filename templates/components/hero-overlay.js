/**
 * Hero Component
 * Componente de seção Hero simplificado
 * Design Aprimorado: Cinematic Look com Ambient Light e Glassmorphism
 */

class HeroComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Hero
     * @param {string} data.badge - Texto do badge superior
     * @param {string} data.title - Título principal
     * @param {string} data.titleHighlight - Parte destacada do título
     * @param {string} data.subtitle - Subtítulo/descrição
     * @param {Object} data.ctaPrimary - Botão primário { text: string, href: string, target?: string }
     * @param {Object} data.ctaSecondary - Botão secundário { text: string, href: string }
     * @param {string} data.backgroundImage - URL da imagem de fundo
     * @param {string} data.backgroundAlt - Texto alternativo da imagem
     * @param {string} data.whatsappNumber - Número do WhatsApp (formato: 5511999999999) - usado como fallback
     * @param {Object} data.colors - Cores do tema (opcional)
     * @param {string} data.colors.primary - Nome base da cor primária (ex: 'purple', 'green', 'brand-dark')
     * @param {string} data.colors.accent - Nome base da cor de destaque (ex: 'orange', 'amber', 'brand-gold')
     * @param {string} data.colors.text - Nome base da cor de texto (ex: 'white', 'slate', 'gray')
     */
    constructor(data) {
        super();
        this.badge = data.badge;
        this.title = data.title;
        this.titleHighlight = data.titleHighlight;
        this.subtitle = data.subtitle;

        // CTAs com suporte a objeto { text, href, target }
        this.ctaPrimary = typeof data.ctaPrimary === 'string'
            ? { text: data.ctaPrimary, href: `https://wa.me/${data.whatsappNumber}`, target: '_blank' }
            : { text: 'Fazer Pedido', href: `https://wa.me/${data.whatsappNumber}`, target: '_blank', ...data.ctaPrimary };

        this.ctaSecondary = typeof data.ctaSecondary === 'string'
            ? { text: data.ctaSecondary, href: '#services' }
            : { text: 'Explorar', href: '#services', ...data.ctaSecondary };

        this.backgroundImage = data.backgroundImage;
        this.backgroundAlt = data.backgroundAlt;
        this.whatsappNumber = data.whatsappNumber;

        // Define mapeamento padrão de cores (inferência do tema)
        const defaultColorMapping = {
            primary: { themeKey: 'primary', fallback: 'brand-dark', variant: null },
            accent: { themeKey: 'accent', fallback: 'brand-gold', variant: null },
            text: { themeKey: null, fallback: 'white', variant: null }
        };

        // Resolve cores base (override > tema > fallback)
        const primaryBase = this.resolveColor(data.colors?.primary, 'primary', 'brand-dark');
        const accentBase = this.resolveColor(data.colors?.accent, 'accent', 'brand-gold');
        const textBase = this.resolveColor(data.colors?.text, null, 'white');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            overlay: this.getColorVariant(primaryBase, 900),      // Overlay escuro
            badge: this.getColorVariant(accentBase, 400),         // Badge destaque médio
            title: this.getColorVariant(textBase, 100),           // Título claro
            titleHighlight: this.getColorVariant(accentBase, 400), // Destaque do título
            subtitle: this.getColorVariant(textBase, 200),        // Subtítulo claro
            ctaPrimaryBg: this.getColorVariant(accentBase, 500),  // Botão primário fundo (Ajustado para 500 para mais vibrance)
            ctaPrimaryText: this.getColorVariant(primaryBase, 900), // Botão primário texto
            ctaPrimaryHover: this.getColorVariant(accentBase, 400),  // Botão primário hover
            ctaSecondaryBorder: this.getColorVariant(textBase, 100), // Botão secundário borda
            ctaSecondaryText: this.getColorVariant(textBase, 100),   // Botão secundário texto
            ctaSecondaryHover: this.getColorVariant(primaryBase, 800) // Botão secundário hover
        };
    }

    /**
     * Renderiza o HTML do componente Hero
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;

        return `
            <header class="relative min-h-screen flex items-center justify-center overflow-hidden isolate">

                <div class="absolute inset-0 z-0">
                    <img src="${this.backgroundImage}"
                         alt="${this.backgroundAlt}"
                         class="w-full h-full object-cover scale-105"
                         style="filter: brightness(0.9);">

                    <div class="absolute inset-0 bg-${c.overlay} opacity-80 mix-blend-multiply"></div>

                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 opacity-90"></div>
                </div>

                <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-${c.titleHighlight}/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow"></div>
                <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-${c.ctaPrimaryBg}/10 blur-[100px] rounded-full pointer-events-none mix-blend-overlay"></div>

                <div class="container mx-auto px-6 relative z-10 text-center">

                    <div class="inline-flex items-center justify-center mb-8" data-aos="fade-down">
                        <span class="py-2 px-5 rounded-full text-${c.badge} text-xs md:text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
                            ${this.badge}
                        </span>
                    </div>

                    <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-${c.title} font-medium leading-[1.1] mb-8 tracking-tight drop-shadow-lg" data-aos="fade-up" data-aos-delay="100">
                        ${this.title} <br>
                        <span class="italic text-${c.titleHighlight} relative inline-block">
                            ${this.titleHighlight}
                            <svg class="absolute w-full h-3 -bottom-1 left-0 text-${c.titleHighlight} opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p class="text-${c.subtitle} max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl mb-12 font-light leading-relaxed opacity-90" data-aos="fade-up" data-aos-delay="200">
                        ${this.subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row justify-center items-center gap-5" data-aos="fade-up" data-aos-delay="300">

                        <a href="${this.ctaPrimary.href}"
                           ${this.ctaPrimary.target ? `target="${this.ctaPrimary.target}"` : ''}
                           class="group relative px-8 py-4 bg-${c.ctaPrimaryBg} text-${c.ctaPrimaryText} font-bold rounded-full
                                  hover:bg-${c.ctaPrimaryHover} hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]
                                  transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-xl">

                            <div class="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>

                            <i class="fab fa-whatsapp text-xl relative z-10"></i>
                            <span class="relative z-10 tracking-wide">${this.ctaPrimary.text}</span>
                        </a>

                        <a href="${this.ctaSecondary.href}"
                           class="px-8 py-4 text-${c.ctaSecondaryText} font-medium rounded-full
                                  border border-white/30 bg-white/5 backdrop-blur-sm
                                  hover:bg-white/10 hover:border-white/50 hover:-translate-y-1
                                  transition-all duration-300 flex items-center justify-center gap-2">
                            ${this.ctaSecondary.text}
                            <i class="fas fa-arrow-right text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
                        </a>
                    </div>
                </div>

                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-${c.title}">
                    <i class="fas fa-chevron-down text-xl"></i>
                </div>
            </header>
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
            if (typeof AOS !== 'undefined') {
                AOS.init();
            }
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {HeroComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new HeroComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Exporta o componente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroComponent;
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('hero-overlay', HeroComponent);
}