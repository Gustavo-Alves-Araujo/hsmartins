/**
 * Header Navigation Component (Modern Clean Style)
 * Navbar com efeito glassmorphism, scroll inteligente e design minimalista.
 */

class HeaderNavigationComponent extends BaseComponent {
    constructor(data) {
        super();
        this.logoUrl = data.logoUrl || '';
        this.logoAlt = data.logoAlt || '';
        this.siteName = data.siteName || '';
        this.established = data.established || '';
        this.whatsappNumber = data.whatsappNumber || '';

        this.links = {
            about: { text: 'Sobre', href: '#about', ...data.links?.about },
            services: { text: 'Serviços', href: '#services', ...data.links?.services },
            location: { text: 'Localização', href: '#location', ...data.links?.location },
            cta: {
                text: 'Agendar',
                href: `https://wa.me/${data.whatsappNumber}`,
                target: '_blank',
                ...data.links?.cta
            }
        };

        // Resolução de cores refinada para o estilo Clean
        // Background padrão é branco para permitir o efeito glass
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const textBase = this.resolveColor(data.colors?.text, 'primary', 'gray-900');
        const ctaBgBase = this.resolveColor(data.colors?.ctaBg, 'primary', 'black');

        // Resolve a cor primária para usar em detalhes (hover, active)
        const theme = this.getGlobalTheme();
        const primaryColor = theme?.colors?.primary || '#000000';

        // Converte cores para hex quando necessário
        const textHex = this.resolveColorHex(data.colors?.text, 'primary', '#1F2937'); // gray-800
        const ctaBgHex = this.resolveColorHex(data.colors?.ctaBg, 'primary', primaryColor);

        this.colors = {
            background: bgBase,
            text: textBase,
            textHex: textHex, // Hex para uso inline
            textLight: 'gray-500',
            textLightHex: '#6B7280', // gray-500
            ctaBg: ctaBgBase,
            ctaBgHex: ctaBgHex,
            ctaText: 'white',
            border: 'gray-200',
            primary: primaryColor
        };

        this.injectStyles();
    }

    /**
     * Injeta CSS específico para animações e estados
     */
    injectStyles() {
        if (document.getElementById('header-clean-styles')) return;

        const style = document.createElement('style');
        style.id = 'header-clean-styles';
        style.textContent = `
            .header-scrolled {
                background-color: rgba(255, 255, 255, 0.85) !important;
                backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
            }
            .header-scrolled .header-text {
                color: ${this.colors.textHex} !important;
            }
            .header-scrolled .header-text-light {
                color: ${this.colors.textLightHex} !important;
            }
            .header-scrolled .nav-link {
                color: ${this.colors.textHex} !important;
            }
            .header-transparent {
                background-color: transparent;
                border-bottom: 1px solid transparent;
                box-shadow: none;
            }
            .header-transparent .header-text {
                color: #FFFFFF !important;
            }
            .header-transparent .header-text-light {
                color: rgba(255, 255, 255, 0.8) !important;
            }
            .header-transparent .nav-link {
                color: #FFFFFF !important;
            }
            .nav-link {
                position: relative;
                transition: color 0.3s ease;
            }
            .nav-link::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: -4px;
                left: 0;
                background-color: ${this.colors.primary};
                transition: width 0.3s ease;
            }
            .header-transparent .nav-link::after {
                background-color: #FFFFFF;
            }
            .header-scrolled .nav-link::after {
                background-color: ${this.colors.primary};
            }
            .nav-link:hover::after {
                width: 100%;
            }
            /* Animação do Mobile Menu */
            .mobile-menu-enter {
                opacity: 0;
                transform: translateY(-10px);
            }
            .mobile-menu-enter-active {
                opacity: 1;
                transform: translateY(0);
                transition: opacity 0.3s, transform 0.3s;
            }
        `;
        document.head.appendChild(style);
    }

    render() {
        const c = this.colors;

        return `
            <nav id="main-header" class="fixed w-full z-50 transition-all duration-300 header-transparent py-4">
                <div class="container mx-auto px-6 flex justify-between items-center">

                    <a href="#" class="flex items-center gap-3 group z-50 relative">
                        ${this.logoUrl ? `
                            <img src="${this.logoUrl}"
                                 alt="${this.logoAlt}"
                                 class="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300">
                        ` : ''}
                        <div class="flex flex-col">
                            <span class="font-bold text-xl tracking-tight leading-none header-text">
                                ${this.siteName}
                            </span>
                            ${this.established ? `
                                <span class="text-[0.65rem] uppercase tracking-widest font-medium mt-1 header-text-light">
                                    ${this.established}
                                </span>
                            ` : ''}
                        </div>
                    </a>

                    <div class="hidden md:flex items-center gap-10">
                        <div class="flex items-center gap-8">
                            <a href="${this.links.about.href}" class="nav-link text-sm font-medium transition-colors">
                                ${this.links.about.text}
                            </a>
                            <a href="${this.links.services.href}" class="nav-link text-sm font-medium transition-colors">
                                ${this.links.services.text}
                            </a>
                            <a href="${this.links.location.href}" class="nav-link text-sm font-medium transition-colors">
                                ${this.links.location.text}
                            </a>
                        </div>

                        <a href="${this.links.cta.href}"
                           ${this.links.cta.target ? `target="${this.links.cta.target}"` : ''}
                           class="px-6 py-2.5 text-sm font-semibold rounded-full transition-all transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
                           style="background-color: ${c.ctaBgHex}; color: ${c.ctaText}; box-shadow: 0 4px 14px 0 rgba(0,0,0,0.15);">
                            <span>${this.links.cta.text}</span>
                            <i class="fas fa-arrow-right text-xs"></i>
                        </a>
                    </div>

                    <button class="mobile-menu-toggle md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors header-text"
                            aria-label="Toggle menu">
                        <i class="fas fa-bars text-lg transition-transform duration-300"></i>
                    </button>
                </div>

                <div class="mobile-menu hidden fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 opacity-0 transition-opacity duration-300">
                    <a href="${this.links.about.href}" class="text-2xl font-bold tracking-tight hover:text-gray-600 transition-colors" style="color: ${c.textHex}">${this.links.about.text}</a>
                    <a href="${this.links.services.href}" class="text-2xl font-bold tracking-tight hover:text-gray-600 transition-colors" style="color: ${c.textHex}">${this.links.services.text}</a>
                    <a href="${this.links.location.href}" class="text-2xl font-bold tracking-tight hover:text-gray-600 transition-colors" style="color: ${c.textHex}">${this.links.location.text}</a>

                    <a href="${this.links.cta.href}"
                       ${this.links.cta.target ? `target="${this.links.cta.target}"` : ''}
                       class="mt-4 px-8 py-4 rounded-full text-lg font-bold shadow-xl transform active:scale-95 transition-all"
                       style="background-color: ${c.ctaBgHex}; color: ${c.ctaText};">
                        ${this.links.cta.text}
                    </a>
                </div>
            </nav>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            this.attachEventListeners(targetId);
        }
    }

    attachEventListeners(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const header = target.querySelector('#main-header');
        const menuToggle = target.querySelector('.mobile-menu-toggle');
        const toggleIcon = menuToggle.querySelector('i');
        const mobileMenu = target.querySelector('.mobile-menu');

        // 1. Scroll Effect Logic
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.remove('header-transparent', 'py-4');
                header.classList.add('header-scrolled', 'py-2'); // Reduz padding ao rolar
            } else {
                header.classList.add('header-transparent', 'py-4');
                header.classList.remove('header-scrolled', 'py-2');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on load in case page starts scrolled
        handleScroll();

        // 2. Mobile Menu Logic
        if (menuToggle && mobileMenu) {
            const toggleMenu = () => {
                const isHidden = mobileMenu.classList.contains('hidden');

                if (isHidden) {
                    // Open
                    mobileMenu.classList.remove('hidden');
                    // Pequeno delay para permitir a transição de opacidade
                    setTimeout(() => {
                        mobileMenu.classList.remove('opacity-0');
                        document.body.style.overflow = 'hidden'; // Previne scroll do fundo
                    }, 10);

                    // Muda ícone para X
                    toggleIcon.classList.remove('fa-bars');
                    toggleIcon.classList.add('fa-times', 'rotate-90');
                } else {
                    // Close
                    mobileMenu.classList.add('opacity-0');
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                        document.body.style.overflow = '';
                    }, 300); // Espera a transição acabar

                    // Muda ícone para Bars
                    toggleIcon.classList.remove('fa-times', 'rotate-90');
                    toggleIcon.classList.add('fa-bars');
                }
            };

            menuToggle.addEventListener('click', toggleMenu);

            // Fecha ao clicar nos links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });
        }
    }

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