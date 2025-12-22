/**
 * Hero Component
 * Componente de seção Hero simplificado
 */

class HeroComponent {
    /**
     * @param {Object} data - Dados necessários para o Hero
     * @param {string} data.badge - Texto do badge superior
     * @param {string} data.title - Título principal
     * @param {string} data.titleHighlight - Parte destacada do título
     * @param {string} data.subtitle - Subtítulo/descrição
     * @param {string} data.ctaPrimary - Texto do botão primário
     * @param {string} data.ctaSecondary - Texto do botão secundário
     * @param {string} data.backgroundImage - URL da imagem de fundo
     * @param {string} data.backgroundAlt - Texto alternativo da imagem
     * @param {string} data.whatsappNumber - Número do WhatsApp (formato: 5511999999999)
     * @param {Object} data.styles - Configurações de estilo (opcional)
     */
    constructor(data) {
        this.badge = data.badge;
        this.title = data.title;
        this.titleHighlight = data.titleHighlight;
        this.subtitle = data.subtitle;
        this.ctaPrimary = data.ctaPrimary;
        this.ctaSecondary = data.ctaSecondary;
        this.backgroundImage = data.backgroundImage;
        this.backgroundAlt = data.backgroundAlt;
        this.whatsappNumber = data.whatsappNumber;
        this.styles = {
            overlay: {
                bg: data.styles?.overlay?.bg || 'bg-brand-dark',
                opacity: data.styles?.overlay?.opacity || 'opacity-90'
            },
            badge: {
                border: data.styles?.badge?.border || 'border-brand-gold',
                text: data.styles?.badge?.text || 'text-brand-gold'
            },
            title: {
                text: data.styles?.title?.text || 'text-white'
            },
            titleHighlight: {
                text: data.styles?.titleHighlight?.text || 'text-brand-gold'
            },
            subtitle: {
                text: data.styles?.subtitle?.text || 'text-white'
            },
            ctaPrimary: {
                bg: data.styles?.ctaPrimary?.bg || 'bg-brand-gold',
                text: data.styles?.ctaPrimary?.text || 'text-brand-dark',
                hover: data.styles?.ctaPrimary?.hover || 'hover:bg-white'
            },
            ctaSecondary: {
                border: data.styles?.ctaSecondary?.border || 'border-white',
                text: data.styles?.ctaSecondary?.text || 'text-white',
                hover: data.styles?.ctaSecondary?.hover || 'hover:bg-white'
            }
        };
    }

    /**
     * Renderiza o HTML do componente Hero
     * @returns {string} HTML string do componente
     */
    render() {
        const s = this.styles;

        return `
            <header class="relative pt-32 lg:pt-48 pb-20 lg:pb-32 overflow-hidden" style="min-height: 100vh;">
                <div class="absolute inset-0" style="z-index: 0;">
                    <div class="absolute inset-0 ${s.overlay.bg} ${s.overlay.opacity}" style="mix-blend-mode: multiply; z-index: 10;"></div>
                    <img src="${this.backgroundImage}"
                         alt="${this.backgroundAlt}"
                         class="w-full h-full object-cover">
                </div>

                <div class="container mx-auto px-6 relative text-center" style="z-index: 20;">
                    <span class="inline-block py-1 px-3 border ${s.badge.border} rounded-full ${s.badge.text} text-xs uppercase mb-6" style="letter-spacing: 0.2em;" data-aos="fade-down">
                        ${this.badge}
                    </span>

                    <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl ${s.title.text} font-medium leading-tight mb-8" data-aos="fade-up">
                        ${this.title} <br>
                        <span class="italic ${s.titleHighlight.text}">${this.titleHighlight}</span>
                    </h1>

                    <p class="${s.subtitle.text} max-w-xl mx-auto text-lg mb-10 font-light" style="opacity: 0.8;" data-aos="fade-up">
                        ${this.subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up">
                        <a href="https://wa.me/${this.whatsappNumber}"
                           target="_blank"
                           class="px-8 py-4 ${s.ctaPrimary.bg} ${s.ctaPrimary.text} font-bold rounded-full ${s.ctaPrimary.hover} transition-all shadow-xl flex items-center justify-center gap-2">
                            <i class="fab fa-whatsapp text-xl"></i> ${this.ctaPrimary}
                        </a>
                        <a href="#services"
                           class="px-8 py-4 border ${s.ctaSecondary.border} ${s.ctaSecondary.text} font-medium rounded-full ${s.ctaSecondary.hover} transition-all" style="border-opacity: 0.3; backdrop-filter: blur(4px);">
                            ${this.ctaSecondary}
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
