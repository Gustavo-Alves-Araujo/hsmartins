/**
 * Sticky Header Navigation Component - Refatorado
 * Estilo: Modern Clean / Glassmorphism com CTA em Gradiente
 */

class StickyHeaderNavigationComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     */
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            logoUrl: '',
            logoAlt: 'Logo H.S. Martins',
            siteName: 'H.S. Martins',
            established: 'Creci. 21.189',
            links: {
                venda: { text: 'Imóveis à Venda', href: '/imovel/venda' },
                sobre: { text: 'Sobre Nós', href: '/sobre' },
                correspondente: { text: 'Correspondente Caixa', href: '/correspondente' },
                noticias: { text: 'Notícias', href: '/noticias' },
                contato: { text: 'Contato', href: '/contato' },
                cta: { text: 'Fale Conosco', href: 'https://wa.me/551146382942', target: '_blank' }
            }
        };
        
        this.logoUrl = data.logoUrl !== undefined ? data.logoUrl : defaults.logoUrl;
        this.logoAlt = data.logoAlt || defaults.logoAlt;
        this.siteName = data.siteName || defaults.siteName;
        this.established = data.established || defaults.established;

        // Processamento de links/menuItems (Mantendo sua lógica original)
        const linksToUse = data.links || defaults.links;
        
        if (linksToUse && typeof linksToUse === 'object' && !Array.isArray(linksToUse)) {
            this.menuItems = [];
            for (const key in linksToUse) {
                if (key !== 'cta' && linksToUse[key] && typeof linksToUse[key] === 'object') {
                    this.menuItems.push({
                        text: linksToUse[key].text || key,
                        href: linksToUse[key].href || '#',
                        active: linksToUse[key].active || false
                    });
                }
            }
            if (linksToUse.cta) {
                this.clientButton = {
                    text: linksToUse.cta.text || 'Contato',
                    href: linksToUse.cta.href || '#',
                    icon: linksToUse.cta.icon || 'fab fa-whatsapp',
                    target: linksToUse.cta.target || null
                };
            } else {
                this.clientButton = data.clientButton || null;
            }
        } else {
            this.menuItems = data.menuItems || [];
            this.clientButton = data.clientButton || null;
        }

        // Resolução de Cores para o Gradiente
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16A34A');
        this.primaryDarkHex = this.darkenColor(this.primaryHex, 0.2);
    }

    /**
     * Injeta estilos necessários para estados dinâmicos e animações de menu
     */
    injectStyles() {
        if (document.getElementById('sticky-header-runtime-styles')) return;

        const style = document.createElement('style');
        style.id = 'sticky-header-runtime-styles';
        style.textContent = `
            #main-header {
                background-color: #ffffff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            #main-header.scrolled {
                background-color: #ffffff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
            }
            #navMenu.mobile-active {
                opacity: 1;
                transform: translateY(0);
                pointer-events: auto;
            }
            .nav-link-active::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 50%;
                transform: translateX(-50%);
                width: 12px;
                height: 4px;
                background-color: ${this.primaryHex};
                border-radius: 10px;
            }
        `;
        document.head.appendChild(style);
    }

    render() {
        this.injectStyles();

        const menuItemsHtml = this.menuItems
            .map(item => `
                <li class="relative">
                    <a href="${item.href}"
                       class="nav-link px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-all ${item.active ? 'nav-link-active' : ''}">
                        ${item.text}
                    </a>
                </li>
            `)
            .join('');

        const clientButtonHtml = this.clientButton ? `
            <a href="${this.clientButton.href}"
               ${this.clientButton.target ? `target="${this.clientButton.target}"` : ''}
               class="flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
               style="background: linear-gradient(135deg, ${this.primaryHex} 0%, ${this.primaryDarkHex} 100%);">
                ${this.clientButton.icon ? `<i class="${this.clientButton.icon}"></i> ` : ''}
                ${this.clientButton.text}
            </a>
        ` : '';

        return `
            <header id="main-header" class="fixed top-0 left-0 w-full z-[1000] py-2 bg-white" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <nav class="flex items-center justify-between w-full px-6 md:px-8 lg:px-12 py-2">
                        <a href="#" class="flex items-center gap-3 group transition-transform hover:scale-105">
                            ${this.logoUrl && this.logoUrl.trim() !== '' ? `
                                <picture>
                                    <source srcset="${this.logoUrl.replace(/\.(png|jpe?g)$/i, '.webp')}" type="image/webp">
                                    <img src="${this.logoUrl}" 
                                         alt="${this.logoAlt || 'Logo'}" 
                                     class="h-12 w-auto md:h-14 object-contain flex-shrink-0"
                                         width="90" height="84"
                                         loading="eager"
                                         fetchpriority="high"
                                         onerror="console.error('Erro ao carregar logo:', this.src); this.style.display='none';">
                                </picture>
                            ` : ''}
                            ${this.siteName ? `<span class="hidden md:block font-black tracking-tight" style="color: #1B2160; font-style: italic;">${this.siteName}</span>` : ''}
                        </a>

                        <ul class="hidden lg:flex items-center gap-2">
                            ${menuItemsHtml}
                        </ul>

                        <div class="hidden lg:block">
                            ${clientButtonHtml}
                        </div>

                        <button id="mobileMenuBtn" class="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600" aria-label="Abrir menu de navegação" aria-expanded="false">
                            <i class="fas fa-bars" aria-hidden="true"></i>
                        </button>
                    </nav>

                <div id="navMenu" class="absolute top-full left-0 w-full px-6 py-4 opacity-0 -translate-y-4 pointer-events-none transition-all duration-300 lg:hidden">
                    <ul class="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
                        ${this.menuItems.map(item => `
                            <li>
                                <a href="${item.href}" class="block text-base font-bold text-slate-700 hover:text-green-600 transition-colors">
                                    ${item.text}
                                </a>
                            </li>
                        `).join('')}
                        <li class="pt-2 border-t border-slate-50">
                            ${clientButtonHtml.replace('px-6 py-2.5', 'w-full justify-center py-3')}
                        </li>
                    </ul>
                </div>
            </header>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        const header = document.getElementById('main-header');
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        // Toggle Mobile Menu
        if (mobileBtn && navMenu) {
            mobileBtn.addEventListener('click', () => {
                navMenu.classList.toggle('mobile-active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
                const isExpanded = navMenu.classList.contains('mobile-active');
                mobileBtn.setAttribute('aria-expanded', isExpanded);
            });
        }

        // SCROLL DESABILITADO - causava problemas no iOS
        // Header fica sempre com mesma aparência, sem mudanças no scroll

        // Fechar ao clicar em link (mobile)
        if (navMenu) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('mobile-active');
                });
            });
        }

        // Links de navegação SEM smooth scroll (iOS não gosta)
        // Deixa o navegador fazer scroll nativo
    }

    static create(data, targetId) {
        const component = new StickyHeaderNavigationComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no sistema
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('sticky-header-navigation', StickyHeaderNavigationComponent);
}