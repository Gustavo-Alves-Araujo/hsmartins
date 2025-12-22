/**
 * Hero Component
 * Componente de seção Hero simplificado
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

        // Cores base com fallback
        const primaryBase = data.colors?.primary || 'brand-dark';
        const accentBase = data.colors?.accent || 'brand-gold';
        const textBase = data.colors?.text || 'white';

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            overlay: this.getColorVariant(primaryBase, 900),      // Overlay escuro
            badge: this.getColorVariant(accentBase, 400),         // Badge destaque médio
            title: this.getColorVariant(textBase, 100),           // Título claro
            titleHighlight: this.getColorVariant(accentBase, 400), // Destaque do título
            subtitle: this.getColorVariant(textBase, 200),        // Subtítulo claro
            ctaPrimaryBg: this.getColorVariant(accentBase, 400),  // Botão primário fundo
            ctaPrimaryText: this.getColorVariant(primaryBase, 900), // Botão primário texto
            ctaPrimaryHover: this.getColorVariant(textBase, 50),  // Botão primário hover
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
            <header class="relative pt-32 lg:pt-48 pb-20 lg:pb-32 overflow-hidden" style="min-height: 100vh;">
                <div class="absolute inset-0" style="z-index: 0;">
                    <div class="absolute inset-0 bg-${c.overlay} opacity-90" style="mix-blend-mode: multiply; z-index: 10;"></div>
                    <img src="${this.backgroundImage}"
                         alt="${this.backgroundAlt}"
                         class="w-full h-full object-cover">
                </div>

                <div class="container mx-auto px-6 relative text-center" style="z-index: 20;">
                    <span class="inline-block py-1 px-3 border border-${c.badge} rounded-full text-${c.badge} text-xs uppercase mb-6" style="letter-spacing: 0.2em;" data-aos="fade-down">
                        ${this.badge}
                    </span>

                    <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-${c.title} font-medium leading-tight mb-8" data-aos="fade-up">
                        ${this.title} <br>
                        <span class="italic text-${c.titleHighlight}">${this.titleHighlight}</span>
                    </h1>

                    <p class="text-${c.subtitle} max-w-xl mx-auto text-lg mb-10 font-light" style="opacity: 0.8;" data-aos="fade-up">
                        ${this.subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up">
                        <a href="${this.ctaPrimary.href}"
                           ${this.ctaPrimary.target ? `target="${this.ctaPrimary.target}"` : ''}
                           class="px-8 py-4 bg-${c.ctaPrimaryBg} text-${c.ctaPrimaryText} font-bold rounded-full hover:bg-${c.ctaPrimaryHover} transition-all shadow-xl flex items-center justify-center gap-2">
                            <i class="fab fa-whatsapp text-xl"></i> ${this.ctaPrimary.text}
                        </a>
                        <a href="${this.ctaSecondary.href}"
                           class="px-8 py-4 border border-${c.ctaSecondaryBorder} text-${c.ctaSecondaryText} font-medium rounded-full hover:bg-${c.ctaSecondaryHover} hover:bg-opacity-50 transition-all" style="border-opacity: 0.3; backdrop-filter: blur(4px);">
                            ${this.ctaSecondary.text}
                        </a>
                    </div>
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

