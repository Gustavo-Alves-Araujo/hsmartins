/**
 * Navbar E-commerce Component - Refatorado
 * Estilo: Modern Clean / SaaS com Glassmorphism e Micro-interações
 */

class NavbarEcommerceComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Navbar
     * (Interface e assinatura mantidas rigorosamente)
     */
    constructor(data) {
        super();
        this.logoText = data.logoText || '';
        this.logoUrl = data.logoUrl || '';
        this.logoAlt = data.logoAlt || '';

        const rawLinks = data.links || {};
        if (Array.isArray(rawLinks)) {
            this.links = {};
            rawLinks.forEach((link, index) => {
                this.links[`link${index}`] = link;
            });
        } else {
            this.links = rawLinks;
        }

        this.actions = data.actions || {};
        this.sticky = data.sticky !== false;

        // RESOLUÇÃO DE CORES (Usando BaseComponent para consistência)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const textBase = this.resolveColor(data.colors?.text, 'primary', 'slate');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16A34A'); // Cor de destaque

        this.colors = {
            // Background com fallback para white e suporte a nomes do Tailwind
            background: bgBase.startsWith('#') ? `[${bgBase}]` : bgBase,
            // Texto com fallback para slate e suporte a nomes do Tailwind
            text: textBase.startsWith('#') ? `[${textBase}]` : textBase === 'slate' ? 'slate-700' : textBase,
            // Cor de destaque (links ativos, badges)
            highlight: primaryHex,
            // Hover sutil para o estilo Modern Clean
            hoverBg: 'slate-100/50'
        };

        this.injectStyles();
    }

    /**
     * Injeta estilos específicos para efeitos de glassmorphism e transições
     */
    injectStyles() {
        if (document.getElementById('navbar-ecommerce-runtime-styles')) return;

        const style = document.createElement('style');
        style.id = 'navbar-ecommerce-runtime-styles';
        style.textContent = `
            .navbar-glass {
                background-color: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .nav-link-modern {
                position: relative;
            }
            .nav-link-modern::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 0;
                height: 2px;
                background-color: ${this.colors.highlight};
                transition: width 0.3s ease;
            }
            .nav-link-modern:hover::after {
                width: 100%;
            }
            .nav-link-highlight {
                color: ${this.colors.highlight};
                font-weight: 700;
            }
            .mobile-menu-panel-modern {
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza os links de navegação com estilo moderno
     */
    renderLinks() {
        return Object.values(this.links).map(link => {
            const highlightClass = link.highlight ? 'nav-link-highlight' : `text-${this.colors.text} hover:text-slate-900`;
            return `
                <a href="${link.href}" class="nav-link-modern text-sm font-bold transition-colors ${highlightClass}">
                    ${link.text}
                </a>
            `;
        }).join('');
    }

    /**
     * Renderiza as ações com ícones modernos e micro-interações
     */
    renderActions() {
        const c = this.colors;
        const actionsHtml = [];

        if (this.actions.search) {
            actionsHtml.push(`
                <button class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-${c.hoverBg} text-${c.text} transition-all active:scale-95 hidden sm:flex">
                    <i data-lucide="search" class="w-5 h-5"></i>
                </button>
            `);
        }

        if (this.actions.account) {
            actionsHtml.push(`
                <a href="${this.actions.account.href}" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-${c.hoverBg} text-${c.text} transition-all active:scale-95 hidden sm:flex">
                    <i data-lucide="user" class="w-5 h-5"></i>
                </a>
            `);
        }

        if (this.actions.cart) {
            actionsHtml.push(`
                <button id="navbar-cart-btn" class="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-${c.hoverBg} text-${c.text} transition-all active:scale-95 group">
                    <i data-lucide="shopping-bag" class="w-5 h-5 group-hover:animate-bounce-short"></i>
                    <span id="navbar-cart-count" class="absolute -top-1 -right-1 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full opacity-0 transition-all scale-0 group-[.has-items]:opacity-100 group-[.has-items]:scale-100" style="background-color: ${c.highlight}">0</span>
                </button>
            `);
        }

        return actionsHtml.join('');
    }

    /**
     * Renderiza o menu mobile com estilo glassmorphism
     */
    renderMobileMenu() {
        const c = this.colors;
        const linksHtml = Object.values(this.links).map(link => {
            const highlightStyle = link.highlight ? `color: ${c.highlight}; font-weight: 700;` : `color: ${c.text};`;
            return `
                <a href="${link.href}" class="block py-3 text-base font-bold border-b border-slate-100" style="${highlightStyle}">
                    ${link.text}
                </a>
            `;
        }).join('');

        return `
            <div id="navbar-mobile-menu" class="fixed inset-0 z-50 bg-black/40 hidden opacity-0 transition-opacity duration-300 backdrop-blur-sm">
                <div class="mobile-menu-panel-modern w-4/5 max-w-sm h-full p-6 transform -translate-x-full transition-transform duration-300 shadow-2xl ml-auto rounded-l-2xl">
                    <div class="flex justify-between items-center mb-8">
                        <span class="font-black text-lg text-slate-900 tracking-tight">MENU</span>
                        <button id="navbar-close-mobile-menu" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-${c.hoverBg} text-slate-500 transition-all">
                            <i data-lucide="x" class="w-6 h-6"></i>
                        </button>
                    </div>
                    <div class="flex flex-col gap-1">
                        ${linksHtml}
                        ${this.actions.account ? `
                            <a href="${this.actions.account.href}" class="block py-3 text-sm font-bold text-slate-500 mt-4 flex items-center gap-2">
                                <i data-lucide="user" class="w-4 h-4"></i>
                                Minha Conta
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza o HTML do componente
     */
    render() {
        const c = this.colors;
        const stickyClass = this.sticky ? 'sticky top-0 z-40' : '';
        const navbarClass = this.sticky ? 'navbar-glass shadow-sm' : `bg-${c.background}`;

        let logoHtml;
        if (this.logoUrl) {
            logoHtml = `<img src="${this.logoUrl}" alt="${this.logoAlt}" class="h-9 w-auto object-contain">`;
        } else if (this.logoText) {
            logoHtml = `<span class="text-xl font-black tracking-tighter text-slate-900">${this.logoText}</span>`;
        } else {
            logoHtml = '';
        }

        return `
            <nav class="${stickyClass} ${navbarClass} transition-all duration-300">
                <div class="container mx-auto px-6 h-20 flex items-center justify-between">

                    <a href="#" class="flex items-center gap-2 group transition-transform hover:scale-105">
                        ${logoHtml}
                    </a>

                    <div class="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        ${this.renderLinks()}
                    </div>

                    <div class="flex items-center gap-2">
                        ${this.renderActions()}

                        <button id="navbar-mobile-menu-btn" class="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-${c.hoverBg} text-${c.text} transition-all active:scale-95">
                            <i data-lucide="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
            </nav>
            ${this.renderMobileMenu()}

            <style>
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-short {
                    animation: bounce-short 0.3s ease-in-out;
                }
            </style>
        `;
    }

    /**
     * Adiciona event listeners e inicializa Lucide
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            if (typeof lucide !== 'undefined') lucide.createIcons();

            const menuBtn = document.getElementById('navbar-mobile-menu-btn');
            const closeMenuBtn = document.getElementById('navbar-close-mobile-menu');
            const mobileMenu = document.getElementById('navbar-mobile-menu');
            const mobileMenuPanel = mobileMenu?.querySelector('.mobile-menu-panel-modern');

            const openMenu = () => {
                mobileMenu.classList.remove('hidden');
                // Força reflow para a transição funcionar
                void mobileMenu.offsetWidth;
                mobileMenu.classList.remove('opacity-0');
                mobileMenuPanel?.classList.remove('-translate-x-full');
            };

            const closeMenu = () => {
                mobileMenu.classList.add('opacity-0');
                mobileMenuPanel?.classList.add('-translate-x-full');
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            };

            if (menuBtn) menuBtn.addEventListener('click', openMenu);
            if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
            if (mobileMenu) mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) closeMenu();
            });
        }
    }

    /**
     * Método estático para criar e montar o componente
     */
    static create(data, targetId) {
        const component = new NavbarEcommerceComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('navbar-ecommerce', NavbarEcommerceComponent);
}