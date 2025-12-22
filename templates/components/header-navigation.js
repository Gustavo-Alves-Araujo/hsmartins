/**
 * Header Navigation Component
 * Componente de navegação com menu responsivo
 */

class HeaderNavigationComponent {
    /**
     * @param {Object} data - Dados necessários para o Header
     * @param {string} data.logoUrl - URL do logo
     * @param {string} data.logoAlt - Texto alternativo do logo
     * @param {string} data.siteName - Nome do site
     * @param {string} data.established - Texto de estabelecimento (Ex: "Est. 2020")
     * @param {string} data.whatsappNumber - Número do WhatsApp para o botão
     * @param {Object} data.links - Links do menu
     * @param {string} data.links.about - Texto do link "Sobre"
     * @param {string} data.links.services - Texto do link "Serviços"
     * @param {string} data.links.location - Texto do link "Localização"
     * @param {string} data.links.orderNow - Texto do botão "Fazer Pedido"
     */
    constructor(data) {
        this.logoUrl = data.logoUrl;
        this.logoAlt = data.logoAlt;
        this.siteName = data.siteName;
        this.established = data.established;
        this.whatsappNumber = data.whatsappNumber;
        this.links = data.links || {};
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        return `
            <nav class="fixed w-full z-50 transition-all duration-300 bg-brand-cream/90 backdrop-blur-md shadow-sm border-b border-brand-dark/10">
                <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" class="flex items-center gap-3 group">
                        <img src="${this.logoUrl}"
                             alt="${this.logoAlt}"
                             class="w-12 h-12 rounded-full border-2 border-brand-dark object-cover group-hover:rotate-12 transition-transform duration-300 shadow-md">
                        <div class="leading-tight">
                            <span class="block font-serif font-bold text-xl text-brand-dark tracking-wide">${this.siteName}</span>
                            <span class="block text-xs text-gray-500 uppercase tracking-wider">${this.established}</span>
                        </div>
                    </a>

                    <div class="hidden md:flex items-center gap-8">
                        <a href="#about" class="text-sm font-medium hover:text-brand-dark transition-colors">${this.links.about || 'Sobre'}</a>
                        <a href="#services" class="text-sm font-medium hover:text-brand-dark transition-colors">${this.links.services || 'Serviços'}</a>
                        <a href="#location" class="text-sm font-medium hover:text-brand-dark transition-colors">${this.links.location || 'Localização'}</a>
                        <a href="https://wa.me/${this.whatsappNumber}"
                           target="_blank"
                           class="px-6 py-2 bg-brand-dark text-white text-sm font-medium rounded-full hover:bg-brand-light transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
                            <i class="fab fa-whatsapp"></i> ${this.links.orderNow || 'Fazer Pedido'}
                        </a>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button class="mobile-menu-toggle md:hidden text-brand-dark text-2xl" aria-label="Toggle menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>

                <!-- Mobile Menu -->
                <div class="mobile-menu hidden absolute top-full left-0 w-full bg-brand-cream border-b border-brand-dark/10 shadow-lg md:hidden p-6 flex flex-col gap-4">
                    <a href="#about" class="block text-lg font-serif text-brand-dark">${this.links.about || 'Sobre'}</a>
                    <a href="#services" class="block text-lg font-serif text-brand-dark">${this.links.services || 'Serviços'}</a>
                    <a href="#location" class="block text-lg font-serif text-brand-dark">${this.links.location || 'Localização'}</a>
                    <a href="https://wa.me/${this.whatsappNumber}"
                       target="_blank"
                       class="block text-center w-full py-3 bg-brand-dark text-white rounded-lg">
                        <i class="fab fa-whatsapp"></i> ${this.links.orderNow || 'Fazer Pedido'}
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

