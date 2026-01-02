/**
 * Navbar E-commerce Advanced Component
 * Navbar completa para e-commerce com busca, categorias, ações e menu responsivo
 */

class NavbarEcommerceAdvancedComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.logoText - Texto do logo
     * @param {string} data.logoUrl - URL da imagem do logo (opcional)
     * @param {string} data.logoAlt - Alt text do logo
     * @param {string} data.logoIcon - Ícone/letra do logo (opcional)
     * @param {string} data.searchPlaceholder - Placeholder da busca
     * @param {Array} data.categories - Array de categorias { text: string, href: string, highlight?: boolean }
     * @param {Object} data.actions - Ações do navbar { favorites?: { href: string }, account?: { href: string }, cart?: { href: string, count?: number } }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.logoText = data.logoText || 'Store';
        this.logoUrl = data.logoUrl || '';
        this.logoAlt = data.logoAlt || 'Logo';
        this.logoIcon = data.logoIcon || '';
        this.searchPlaceholder = data.searchPlaceholder || 'O que você está procurando hoje?';
        this.categories = data.categories || [];
        this.actions = data.actions || {};

        // Resolve cores com contraste adequado
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            text: this.getBestTextColor(primaryHex, 4.5) === '#FFFFFF' ? 'white' : 'gray-900',
            textSecondary: 'gray-600',
            border: 'gray-100'
        };
    }

    render() {
        const c = this.colors;
        const logoHtml = this.logoUrl
            ? `<img src="${this.logoUrl}" alt="${this.logoAlt}" class="h-10 w-10 rounded-full object-cover">`
            : `<div class="flex items-center gap-2">
                ${this.logoIcon ? `<div class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xl" style="background-color: ${c.primary};">${this.logoIcon}</div>` : ''}
                <span class="text-2xl font-bold tracking-tight text-gray-900">${this.logoText}<span style="color: ${c.primary};">.</span></span>
               </div>`;

        const categoriesHtml = this.categories.map(cat => {
            if (cat.highlight) {
                return `<a href="${cat.href || '#'}" class="text-red-500 hover:text-red-700 font-semibold transition">${cat.text}</a>`;
            } else {
                return `<a href="${cat.href || '#'}" class="transition hover:opacity-80" style="color: ${c.primary};">${cat.text}</a>`;
            }
        }).join('');

        return `
            <nav id="navbar-ecommerce-advanced" class="fixed w-full z-50 transition-all duration-300 bg-white border-b border-gray-100 py-4">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-12">
                        <!-- Logo & Mobile Menu Button -->
                        <div class="flex items-center">
                            <button id="mobile-menu-btn" class="p-2 -ml-2 mr-2 md:hidden transition hover:opacity-80" style="color: ${c.primary};">
                                <i class="fas fa-bars text-xl"></i>
                            </button>
                            <a href="#" class="flex items-center gap-2 group">
                                ${logoHtml}
                            </a>
                        </div>

                        <!-- Desktop Search & Categories -->
                        <div class="hidden md:flex flex-1 max-w-2xl mx-8 items-center gap-4">
                            <div class="relative w-full group">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="fas fa-search text-gray-400 transition"></i>
                                </div>
                                <input type="text"
                                       id="search-input"
                                       class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white transition-all sm:text-sm"
                                       style="--primary-color: ${c.primary};"
                                       onfocus="this.style.borderColor=this.style.getPropertyValue('--primary-color'); this.style.boxShadow='0 0 0 4px ' + '${this.hexToRgba(c.primary, 0.1)}';"
                                       onblur="this.style.borderColor='rgb(229, 231, 235)'; this.style.boxShadow='none';"
                                       placeholder="${this.searchPlaceholder}">
                            </div>
                        </div>

                        <!-- Icons & Actions -->
                        <div class="flex items-center gap-4 md:gap-6">
                            ${this.actions.favorites ? `
                                <a href="${this.actions.favorites.href}" class="hidden md:flex flex-col items-center transition group hover:opacity-80" style="color: ${c.primary};">
                                    <i class="far fa-heart text-xl mb-0.5 group-hover:scale-110 transition-transform"></i>
                                    <span class="text-[10px] font-medium uppercase tracking-wide">Favoritos</span>
                                </a>
                            ` : ''}
                            ${this.actions.account ? `
                                <a href="${this.actions.account.href}" class="hidden md:flex flex-col items-center transition group hover:opacity-80" style="color: ${c.primary};">
                                    <i class="far fa-user text-xl mb-0.5 group-hover:scale-110 transition-transform"></i>
                                    <span class="text-[10px] font-medium uppercase tracking-wide">Conta</span>
                                </a>
                            ` : ''}
                            ${this.actions.cart ? `
                                <a href="${this.actions.cart.href || '#'}" class="relative flex flex-col items-center transition group hover:opacity-80" style="color: ${c.primary};">
                                    <div class="relative">
                                        <i class="fas fa-shopping-bag text-2xl group-hover:scale-110 transition-transform"></i>
                                        ${this.actions.cart.count ? `
                                            <span class="absolute -top-1.5 -right-1.5 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white" style="background-color: ${c.primary};">${this.actions.cart.count}</span>
                                        ` : ''}
                                    </div>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </nav>
            <div class="h-[80px]"></div>
        `;
    }

    attachEventListeners() {
        // Sticky navbar effect
        const nav = document.getElementById('navbar-ecommerce-advanced');
        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    nav.classList.add('shadow-md');
                    nav.classList.add('py-2');
                    nav.classList.remove('py-4');
                } else {
                    nav.classList.remove('shadow-md');
                    nav.classList.remove('py-2');
                    nav.classList.add('py-4');
                }
            });
        }
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            this.attachEventListeners();
        }
    }

    static create(data, targetId) {
        const component = new NavbarEcommerceAdvancedComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('navbar-ecommerce-advanced', NavbarEcommerceAdvancedComponent);
}

