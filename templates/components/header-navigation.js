/**
 * Header Navigation Component
 * Componente de navegação com menu responsivo
 */

class HeaderNavigationComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Header
     * @param {string} data.logoUrl - URL do logo
     * @param {string} data.logoAlt - Texto alternativo do logo
     * @param {string} data.siteName - Nome do site
     * @param {string} data.established - Texto de estabelecimento (Ex: "Est. 2020")
     * @param {string} data.whatsappNumber - Número do WhatsApp para o botão
     * @param {Object} data.links - Links do menu
     * @param {Object} data.links.about - Link "Sobre" { text: string, href: string }
     * @param {Object} data.links.services - Link "Serviços" { text: string, href: string }
     * @param {Object} data.links.location - Link "Localização" { text: string, href: string }
     * @param {Object} data.links.cta - Botão CTA { text: string, href: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'gray', 'brand-cream')
     * @param {string} data.colors.text - Cor do texto base (ex: 'gray', 'brand-dark')
     * @param {string} data.colors.ctaBg - Cor de fundo do botão CTA base (ex: 'green', 'brand-dark')
     * @param {string} data.colors.ctaText - Cor do texto do botão CTA (padrão: 'white')
     * @param {string} data.colors.border - Cor da borda base (ex: 'gray', 'brand-dark')
     */
    constructor(data) {
        super();
        this.logoUrl = data.logoUrl;
        this.logoAlt = data.logoAlt;
        this.siteName = data.siteName;
        this.established = data.established;
        this.whatsappNumber = data.whatsappNumber;

        // Links com valores padrão
        this.links = {
            about: { text: 'Sobre', href: '#about', ...data.links?.about },
            services: { text: 'Serviços', href: '#services', ...data.links?.services },
            location: { text: 'Localização', href: '#location', ...data.links?.location },
            cta: {
                text: 'Fazer Pedido',
                href: `https://wa.me/${data.whatsappNumber}`,
                target: '_blank',
                ...data.links?.cta
            }
        };

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'brand-cream');
        const textBase = this.resolveColor(data.colors?.text, 'primary', 'brand-dark');
        const ctaBgBase = this.resolveColor(data.colors?.ctaBg, 'primary', 'brand-dark');
        const ctaTextBase = this.resolveColor(data.colors?.ctaText, null, 'white');
        const borderBase = this.resolveColor(data.colors?.border, 'primary', 'brand-dark');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase === 'white' ? 'white' : this.getColorVariant(bgBase, 50),
            text: this.getColorVariant(textBase, 900),
            ctaBg: this.getColorVariant(ctaBgBase, 600),
            ctaText: ctaTextBase, // Geralmente white, não precisa variação
            border: this.getColorVariant(borderBase, 300),
        };
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        return `
            <nav class="fixed w-full z-50 transition-all duration-300 bg-${c.background}/90 backdrop-blur-md shadow-sm border-b border-${c.border}/10">
                <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" class="flex items-center gap-3 group">
                        <img src="${this.logoUrl}"
                             alt="${this.logoAlt}"
                             class="w-12 h-12 rounded-full border-2 border-${c.border} object-cover group-hover:rotate-12 transition-transform duration-300 shadow-md">
                        <div class="leading-tight">
                            <span class="block font-serif font-bold text-xl text-${c.text} tracking-wide">${this.siteName}</span>
                            <span class="block text-xs text-gray-500 uppercase tracking-wider">${this.established}</span>
                        </div>
                    </a>

                    <div class="hidden md:flex items-center gap-8">
                        <a href="${this.links.about.href}" class="text-sm font-medium text-${c.text} hover:opacity-70 transition-colors">${this.links.about.text}</a>
                        <a href="${this.links.services.href}" class="text-sm font-medium text-${c.text} hover:opacity-70 transition-colors">${this.links.services.text}</a>
                        <a href="${this.links.location.href}" class="text-sm font-medium text-${c.text} hover:opacity-70 transition-colors">${this.links.location.text}</a>
                        <a href="${this.links.cta.href}"
                           ${this.links.cta.target ? `target="${this.links.cta.target}"` : ''}
                           class="px-6 py-2 bg-${c.ctaBg} text-${c.ctaText} text-sm font-medium rounded-full hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
                            <i class="fab fa-whatsapp"></i> ${this.links.cta.text}
                        </a>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button class="mobile-menu-toggle md:hidden text-${c.text} text-2xl" aria-label="Toggle menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>

                <!-- Mobile Menu -->
                <div class="mobile-menu hidden absolute top-full left-0 w-full bg-${c.background} border-b border-${c.border}/10 shadow-lg md:hidden p-6 flex flex-col gap-4">
                    <a href="${this.links.about.href}" class="block text-lg font-serif text-${c.text}">${this.links.about.text}</a>
                    <a href="${this.links.services.href}" class="block text-lg font-serif text-${c.text}">${this.links.services.text}</a>
                    <a href="${this.links.location.href}" class="block text-lg font-serif text-${c.text}">${this.links.location.text}</a>
                    <a href="${this.links.cta.href}"
                       ${this.links.cta.target ? `target="${this.links.cta.target}"` : ''}
                       class="block text-center w-full py-3 bg-${c.ctaBg} text-${c.ctaText} rounded-lg">
                        <i class="fab fa-whatsapp"></i> ${this.links.cta.text}
                    </a>
                </div>
            </nav>
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
            this.attachEventListeners(targetId);
        }
    }

    /**
     * Adiciona event listeners após montar o componente
     * @param {string} targetId - ID do elemento onde o componente está montado
     */
    attachEventListeners(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const menuToggle = target.querySelector('.mobile-menu-toggle');
        const mobileMenu = target.querySelector('.mobile-menu');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Fecha menu ao clicar em um link
            const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }

        // Smooth scroll
        const allLinks = target.querySelectorAll('a[href^="#"]');
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {HeaderNavigationComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new HeaderNavigationComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('header-navigation', HeaderNavigationComponent);
}

