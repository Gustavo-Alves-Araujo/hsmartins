/**
 * Navbar E-commerce Component
 * Navbar genérica otimizada para e-commerce com logo, menu e ícones de ação
 * Reutilizável para qualquer tipo de loja/comércio
 */

class NavbarEcommerceComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Navbar
     * @param {string} data.logoText - Texto do logo (ou pode usar logoUrl)
     * @param {string} data.logoUrl - URL do logo (opcional, se não usar logoText)
     * @param {string} data.logoAlt - Texto alternativo do logo
     * @param {Object} data.links - Objeto com links de navegação { key: { text: string, href: string, highlight?: boolean } }
     * @param {Object} data.actions - Ações do navbar { search?: boolean, account?: { text: string, href: string }, cart?: boolean }
     * @param {boolean} data.sticky - Se a navbar deve ser sticky (padrão: true)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'white', 'transparent')
     * @param {string} data.colors.text - Cor do texto base (ex: 'black', 'gray')
     */
    constructor(data) {
        super();
        this.logoText = data.logoText || '';
        this.logoUrl = data.logoUrl || '';
        this.logoAlt = data.logoAlt || '';
        this.links = data.links || {};
        this.actions = data.actions || {};
        this.sticky = data.sticky !== false;

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const textBase = this.resolveColor(data.colors?.text, 'primary', 'black');

        // Aplica variações automáticas conforme o contexto
        this.colors = {
            background: bgBase,
            text: textBase === 'black' ? 'black' : this.getColorVariant(textBase, 900),
            hover: 'gray-100',
        };

        // Injeta estilos se necessário
        this.injectStyles();
    }

    /**
     * Injeta estilos CSS customizados
     */
    injectStyles() {
        if (document.getElementById('navbar-ecommerce-styles')) return;

        const style = document.createElement('style');
        style.id = 'navbar-ecommerce-styles';
        style.textContent = `
            .navbar-ecommerce-sticky {
                backdrop-filter: blur(12px);
            }
            .mobile-menu-overlay {
                transition: opacity 0.3s;
            }
            .mobile-menu-panel {
                transition: transform 0.3s;
            }
            @keyframes pop {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            .animate-pop {
                animation: pop 0.2s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza os links de navegação
     * @returns {string} HTML dos links
     */
    renderLinks() {
        return Object.values(this.links).map(link => {
            const highlightClass = link.highlight ? 'text-red-600 hover:text-red-700 font-bold' : '';
            return `
                <a href="${link.href}" class="hover:underline underline-offset-4 decoration-2 ${highlightClass}">
                    ${link.text}
                </a>
            `;
        }).join('');
    }

    /**
     * Renderiza as ações (search, account, cart)
     * @returns {string} HTML das ações
     */
    renderActions() {
        const actionsHtml = [];

        if (this.actions.search) {
            actionsHtml.push(`
                <button class="p-2 hover:bg-${this.colors.hover} rounded-full transition-colors hidden sm:block">
                    <i data-lucide="search" class="w-5 h-5"></i>
                </button>
            `);
        }

        if (this.actions.account) {
            actionsHtml.push(`
                <a href="${this.actions.account.href}" class="p-2 hover:bg-${this.colors.hover} rounded-full transition-colors hidden sm:block">
                    <i data-lucide="user" class="w-5 h-5"></i>
                </a>
            `);
        }

        if (this.actions.cart) {
            actionsHtml.push(`
                <button id="navbar-cart-btn" class="p-2 hover:bg-${this.colors.hover} rounded-full transition-colors relative group">
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                    <span id="navbar-cart-count" class="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full opacity-0 transition-opacity">0</span>
                </button>
            `);
        }

        return actionsHtml.join('');
    }

    /**
     * Renderiza o menu mobile
     * @returns {string} HTML do menu mobile
     */
    renderMobileMenu() {
        const linksHtml = Object.values(this.links).map(link => {
            const highlightClass = link.highlight ? 'text-red-600' : '';
            return `
                <a href="${link.href}" class="border-b pb-2 ${highlightClass}">
                    ${link.text}
                </a>
            `;
        }).join('');

        return `
            <!-- Mobile Menu Overlay -->
            <div id="navbar-mobile-menu" class="fixed inset-0 z-40 bg-black/50 hidden opacity-0 transition-opacity duration-300">
                <div class="bg-white w-4/5 h-full max-w-sm p-6 transform -translate-x-full transition-transform duration-300 mobile-menu-panel">
                    <div class="flex justify-between items-center mb-8">
                        <span class="font-bold text-xl">MENU</span>
                        <button id="navbar-close-mobile-menu" class="p-2 hover:bg-gray-100 rounded-full">
                            <i data-lucide="x" class="w-6 h-6"></i>
                        </button>
                    </div>
                    <div class="flex flex-col gap-4 text-lg font-medium">
                        ${linksHtml}
                        ${this.actions.account ? `
                            <a href="${this.actions.account.href}" class="pt-4 text-sm text-gray-500">Minha Conta</a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const stickyClass = this.sticky ? 'sticky top-0 z-50' : '';

        // Renderiza logo - se tiver logoUrl usa imagem, senão usa texto
        let logoHtml;
        if (this.logoUrl) {
            logoHtml = `<img src="${this.logoUrl}" alt="${this.logoAlt}" class="h-8">`;
        } else if (this.logoText) {
            // Formata logo text com BR destacado se existir
            const logoParts = this.logoText.split('BR');
            if (logoParts.length > 1) {
                logoHtml = `${logoParts[0]}<span class="text-xs bg-black text-white px-1 py-0.5 rounded-sm">BR</span>${logoParts[1]}`;
            } else {
                logoHtml = this.logoText;
            }
        } else {
            logoHtml = '';
        }

        return `
            <nav class="${stickyClass} bg-${c.background}/90 navbar-ecommerce-sticky border-b border-gray-100">
                <div class="container mx-auto px-4 h-20 flex items-center justify-between">
                    <!-- Mobile Menu Button -->
                    <button id="navbar-mobile-menu-btn" class="lg:hidden p-2 hover:bg-${c.hover} rounded-full">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>

                    <!-- Logo -->
                    <a href="#" class="text-2xl font-display font-bold tracking-tighter uppercase flex items-center gap-1">
                        ${logoHtml}
                    </a>

                    <!-- Desktop Links -->
                    <div class="hidden lg:flex items-center gap-8 font-medium text-sm">
                        ${this.renderLinks()}
                    </div>

                    <!-- Icons/Actions -->
                    <div class="flex items-center gap-2">
                        ${this.renderActions()}
                    </div>
                </div>
            </nav>
            ${this.renderMobileMenu()}
        `;
    }

    /**
     * Adiciona event listeners após montar
     */
    attachEventListeners() {
        const menuBtn = document.getElementById('navbar-mobile-menu-btn');
        const closeMenuBtn = document.getElementById('navbar-close-mobile-menu');
        const mobileMenu = document.getElementById('navbar-mobile-menu');
        const mobileMenuPanel = mobileMenu?.querySelector('.mobile-menu-panel');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0');
                    mobileMenuPanel?.classList.remove('-translate-x-full');
                }, 10);
            });
        }

        if (closeMenuBtn && mobileMenu && mobileMenuPanel) {
            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0');
                mobileMenuPanel.classList.add('-translate-x-full');
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            });
        }

        // Fechar menu ao clicar no overlay
        if (mobileMenu && mobileMenuPanel) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.add('opacity-0');
                    mobileMenuPanel.classList.add('-translate-x-full');
                    setTimeout(() => mobileMenu.classList.add('hidden'), 300);
                }
            });
        }
    }

    /**
     * Monta o componente no DOM
     * @param {string} targetId - ID do elemento onde o componente será montado
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            // Inicializa ícones Lucide se disponível
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            this.attachEventListeners();
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {NavbarEcommerceComponent} Instância do componente
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

