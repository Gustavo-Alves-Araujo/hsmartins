/**
 * Hero Component
 * Componente de seção Hero reutilizável e autocontido
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
     * @param {Object} data.style - Configurações de estilo (opcional)
     * @param {Object} data.style.colors - Cores do componente
     * @param {string} data.style.colors.primary - Cor primária (ex: 'brand-dark')
     * @param {string} data.style.colors.accent - Cor de destaque (ex: 'brand-gold')
     * @param {string} data.style.colors.text - Cor do texto (ex: 'white')
     * @param {Object} data.style.overlay - Configuração do overlay da imagem de fundo
     * @param {string} data.style.overlay.color - Cor do overlay (ex: 'brand-dark')
     * @param {string} data.style.overlay.opacity - Opacidade do overlay (ex: '90')
     * @param {Object} data.style.spacing - Espaçamentos
     * @param {string} data.style.spacing.paddingTop - Padding top (ex: 'pt-32 lg:pt-48')
     * @param {string} data.style.spacing.paddingBottom - Padding bottom (ex: 'pb-20 lg:pb-32')
     */
    constructor(data) {
        // Validação dos campos obrigatórios
        this.validateData(data);

        // Interface explícita - textos
        this.badge = data.badge;
        this.title = data.title;
        this.titleHighlight = data.titleHighlight;
        this.subtitle = data.subtitle;
        this.ctaPrimary = data.ctaPrimary;
        this.ctaSecondary = data.ctaSecondary;
        this.backgroundImage = data.backgroundImage;
        this.backgroundAlt = data.backgroundAlt;
        this.whatsappNumber = data.whatsappNumber;

        // Interface explícita - estilos (com valores default)
        this.style = {
            colors: {
                primary: data.style?.colors?.primary || 'brand-dark',
                accent: data.style?.colors?.accent || 'brand-gold',
                text: data.style?.colors?.text || 'white'
            },
            overlay: {
                color: data.style?.overlay?.color || 'brand-dark',
                opacity: data.style?.overlay?.opacity || '90'
            },
            spacing: {
                paddingTop: data.style?.spacing?.paddingTop || 'pt-32 lg:pt-48',
                paddingBottom: data.style?.spacing?.paddingBottom || 'pb-20 lg:pb-32'
            }
        };
    }

    /**
     * Valida se todos os dados necessários foram fornecidos
     * @param {Object} data - Dados a serem validados
     */
    validateData(data) {
        const requiredFields = [
            'badge',
            'title',
            'titleHighlight',
            'subtitle',
            'ctaPrimary',
            'ctaSecondary',
            'backgroundImage',
            'backgroundAlt',
            'whatsappNumber'
        ];

        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            throw new Error(`HeroComponent: Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
        }
    }

    /**
     * Renderiza o HTML do componente Hero com os dados já aplicados
     * @returns {string} HTML string do componente
     */
    render() {
        const { colors, overlay, spacing } = this.style;

        return `
            <header class="relative ${spacing.paddingTop} ${spacing.paddingBottom} overflow-hidden" style="min-height: 100vh;">
                <div class="absolute inset-0" style="z-index: 0;">
                    <div class="absolute inset-0 bg-brand-dark opacity-90" style="mix-blend-mode: multiply; z-index: 10;"></div>
                    <img src="${this.backgroundImage}"
                         alt="${this.backgroundAlt}"
                         class="w-full h-full object-cover">
                </div>

                <div class="container mx-auto px-6 relative text-center" style="z-index: 20;">
                    <span class="inline-block py-1 px-3 border border-brand-gold rounded-full text-brand-gold text-xs uppercase mb-6" style="letter-spacing: 0.2em;" data-aos="fade-down">
                        ${this.badge}
                    </span>

                    <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight mb-8" data-aos="fade-up" data-aos-delay="100">
                        ${this.title} <br>
                        <span class="italic text-brand-gold">${this.titleHighlight}</span>
                    </h1>

                    <p class="text-white max-w-xl mx-auto text-lg mb-10 font-light" style="opacity: 0.8;" data-aos="fade-up" data-aos-delay="200">
                        ${this.subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
                        <a href="https://wa.me/${this.whatsappNumber}"
                           target="_blank"
                           class="px-8 py-4 bg-brand-gold text-brand-dark font-bold rounded-full hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2">
                            <i class="fab fa-whatsapp text-xl"></i> ${this.ctaPrimary}
                        </a>
                        <a href="#services"
                           class="px-8 py-4 border border-white text-white font-medium rounded-full hover:bg-white transition-all" style="border-opacity: 0.3; backdrop-filter: blur(4px);">
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
        } else {
            console.error(`Target element with id "${targetId}" not found`);
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários (veja construtor para interface completa)
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {HeroComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new HeroComponent(data);
        component.mount(targetId);
        return component;
    }

    /**
     * Método helper para criar o componente a partir do config padrão
     * @param {Object} config - Objeto config completo
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {HeroComponent} Instância do componente
     */
    static createFromConfig(config, targetId) {
        const data = {
            badge: config.hero.badge,
            title: config.hero.title,
            titleHighlight: config.hero.titleHighlight,
            subtitle: config.hero.subtitle,
            ctaPrimary: config.hero.ctaPrimary,
            ctaSecondary: config.hero.ctaSecondary,
            backgroundImage: config.hero.backgroundImage,
            backgroundAlt: config.hero.backgroundAlt,
            whatsappNumber: config.contact.whatsapp,
            style: config.hero.style
        };

        return HeroComponent.create(data, targetId);
    }
}

// Exporta o componente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroComponent;
}
