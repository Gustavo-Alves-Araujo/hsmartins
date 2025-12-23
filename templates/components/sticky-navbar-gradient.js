/**
 * Sticky Navbar Gradient Component
 * Navbar fixa com gradiente no logo e menu responsivo
 */

class StickyNavbarGradientComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.logoText - Texto do logo
     * @param {Array} data.menuItems - Array de itens do menu { text: string, href: string }
     * @param {Object} data.ctaButton - Botão CTA { text: string, href: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.logoText = data.logoText || 'NEXUS';
        this.menuItems = data.menuItems || [];
        this.ctaButton = data.ctaButton || { text: 'Começar Agora', href: '#precos' };

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        this.secondaryHex = this.resolveColorHex(data.colors?.secondary, 'secondary', '#EC4899');
        this.backgroundHex = this.resolveColorHex(data.colors?.background, 'background', '#0f0f13');
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('sticky-navbar-gradient-styles')) return;

        const style = document.createElement('style');
        style.id = 'sticky-navbar-gradient-styles';
        style.textContent = `
            .sticky-navbar {
                position: fixed;
                width: 100%;
                z-index: 50;
                transition: all 0.3s;
                border-bottom: 1px solid transparent;
                background: transparent;
                padding: 24px 0;
            }
            .sticky-navbar.scrolled {
                background: ${this.hexToRgba(this.backgroundHex, 0.8)};
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-bottom-color: ${this.hexToRgba('#FFFFFF', 0.1)};
                padding: 16px 0;
            }
            .navbar-logo {
                font-size: 1.5rem;
                font-weight: 700;
                background: linear-gradient(to right, ${this.primaryHex}, ${this.secondaryHex});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                cursor: pointer;
            }
            .navbar-menu-desktop {
                display: none;
            }
            .navbar-menu-item {
                color: #D1D5DB;
                font-size: 0.875rem;
                font-weight: 500;
                transition: color 0.3s;
            }
            .navbar-menu-item:hover {
                color: #FFFFFF;
            }
            .navbar-cta {
                background: #FFFFFF;
                color: #000000;
                padding: 8px 20px;
                border-radius: 9999px;
                font-weight: 700;
                transition: all 0.3s;
                box-shadow: 0 0 20px ${this.hexToRgba('#FFFFFF', 0.3)};
            }
            .navbar-cta:hover {
                background: #F3F4F6;
                transform: scale(1.05);
            }
            .navbar-mobile-toggle {
                display: block;
                color: #FFFFFF;
            }
            .navbar-mobile-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: #16161d;
                border-bottom: 1px solid ${this.hexToRgba('#FFFFFF', 0.1)};
                padding: 24px;
                flex-direction: column;
                gap: 16px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .navbar-mobile-menu.active {
                display: flex;
            }
            .navbar-mobile-link {
                text-align: left;
                color: #D1D5DB;
                padding: 8px 0;
            }
            .navbar-mobile-cta {
                background: linear-gradient(to right, ${this.primaryHex}, ${this.secondaryHex});
                width: 100%;
                padding: 12px;
                border-radius: 8px;
                font-weight: 700;
                text-align: center;
                color: #FFFFFF;
            }
            @media (min-width: 768px) {
                .navbar-menu-desktop { display: flex; align-items: center; gap: 32px; }
                .navbar-mobile-toggle { display: none; }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string
     */
    render() {
        this.injectStyles();

        const menuItemsHtml = this.menuItems
            .map(item => `<a href="${item.href}" class="navbar-menu-item">${item.text}</a>`)
            .join('');

        const mobileMenuItemsHtml = this.menuItems
            .map(item => `<a href="${item.href}" class="navbar-mobile-link">${item.text}</a>`)
            .join('');

        return `
            <nav id="navbar" class="sticky-navbar">
                <div class="container mx-auto px-6 flex justify-between items-center">
                    <div class="navbar-logo">${this.logoText}</div>
                    <div class="navbar-menu-desktop">
                        ${menuItemsHtml}
                        <a href="${this.ctaButton.href}" class="navbar-cta">${this.ctaButton.text}</a>
                    </div>
                    <button id="menu-btn" class="navbar-mobile-toggle">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>
                <div id="mobile-menu" class="navbar-mobile-menu">
                    ${mobileMenuItemsHtml}
                    <a href="${this.ctaButton.href}" class="navbar-mobile-cta">${this.ctaButton.text}</a>
                </div>
            </nav>
        `;
    }

    /**
     * Monta o componente no DOM
     * @param {string} targetId - ID do elemento onde será montado
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            this.injectStyles();
            target.innerHTML = this.render();
            this.attachEventListeners();
        }
    }

    /**
     * Adiciona event listeners
     */
    attachEventListeners() {
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Mobile menu toggle
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        document.querySelectorAll('.navbar-mobile-link, .navbar-mobile-cta').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            });
        });

        // Initialize Lucide icons if available
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {StickyNavbarGradientComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new StickyNavbarGradientComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('sticky-navbar-gradient', StickyNavbarGradientComponent);
}

