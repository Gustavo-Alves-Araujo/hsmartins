/**
 * Sticky Header Navigation Component
 * Header fixo sticky com logo, menu de navegação responsivo e botão CTA
 */

class StickyHeaderNavigationComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.logoUrl - URL do logo
     * @param {string} data.logoAlt - Texto alternativo do logo
     * @param {Array} data.menuItems - Array de itens do menu { text: string, href: string, active: boolean }
     * @param {Object} data.clientButton - Botão área do cliente { text: string, href: string, icon: string }
     */
    constructor(data) {
        this.logoUrl = data.logoUrl || '';
        this.logoAlt = data.logoAlt || '';
        this.menuItems = data.menuItems || [];
        this.clientButton = data.clientButton || null;
    }

    /**
     * Injeta estilos base compartilhados (apenas uma vez)
     */
    injectBaseStyles() {
        if (document.getElementById('base-styles-global')) return;

        const style = document.createElement('style');
        style.id = 'base-styles-global';
        style.textContent = `
            :root {
                --primary: #16A34A;
                --primary-dark: #15803d;
                --primary-light: #dcfce7;
                --secondary: #2c3e50;
                --text-body: #555;
                --light-bg: #f9fdf7;
                --white: #ffffff;
                --shadow: 0 10px 30px rgba(0,0,0,0.08);
                --radius: 20px;
            }
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            html {
                scroll-behavior: smooth;
            }
            body {
                font-family: 'Nunito', sans-serif;
                color: var(--text-body);
                background-color: var(--white);
                line-height: 1.6;
                overflow-x: hidden;
            }
            h1, h2, h3, h4 {
                font-family: 'Poppins', sans-serif;
                color: var(--secondary);
                font-weight: 700;
            }
            a {
                text-decoration: none;
                color: inherit;
                transition: 0.3s;
            }
            ul {
                list-style: none;
            }
            img {
                max-width: 100%;
                height: auto;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 12px 30px;
                border-radius: 50px;
                font-weight: 700;
                cursor: pointer;
                border: none;
                transition: all 0.3s ease;
                text-align: center;
                gap: 10px;
            }
            .btn-primary {
                background-color: var(--primary);
                color: white;
                box-shadow: 0 4px 15px rgba(22, 163, 74, 0.4);
            }
            .btn-primary:hover {
                background-color: var(--primary-dark);
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(22, 163, 74, 0.6);
            }
            .btn-outline {
                border: 2px solid var(--secondary);
                color: var(--secondary);
                background: transparent;
            }
            .btn-outline:hover {
                background: var(--secondary);
                color: white;
            }
            .btn-secondary {
                background: var(--secondary);
                color: white;
            }
            .btn-hero {
                padding: 15px 40px;
                font-size: 1.1rem;
                box-shadow: 0 10px 25px rgba(22, 163, 74, 0.5);
            }
            .btn-hero:hover {
                box-shadow: 0 15px 35px rgba(22, 163, 74, 0.7);
                transform: translateY(-3px);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        this.injectBaseStyles();
        if (document.getElementById('sticky-header-navigation-styles')) return;

        const style = document.createElement('style');
        style.id = 'sticky-header-navigation-styles';
        style.textContent = `
            header {
                position: sticky;
                top: 0;
                width: 100%;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(255,255,255,0.3);
                box-shadow: 0 4px 30px rgba(0,0,0,0.03);
                transition: padding 0.3s;
            }
            .nav-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
            }
            .logo img {
                height: 55px;
                transition: transform 0.3s;
            }
            .logo:hover img {
                transform: scale(1.05);
            }
            .nav-menu {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .nav-link {
                font-weight: 600;
                color: var(--secondary);
                font-size: 0.95rem;
                padding: 10px 18px;
                border-radius: 30px;
                transition: all 0.3s ease;
            }
            .nav-link:hover {
                color: var(--secondary);
                background-color: var(--primary-light);
            }
            .nav-link.active {
                color: var(--secondary);
                background-color: var(--primary-light);
                font-weight: 700;
            }
            .header-btn {
                margin-left: 15px;
                background: var(--secondary);
                color: white;
                padding: 10px 25px;
                border-radius: 50px;
                font-size: 0.9rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 10px rgba(44, 62, 80, 0.2);
            }
            .header-btn:hover {
                background: var(--primary);
                color: white;
                transform: translateY(-2px);
            }
            .hamburger {
                display: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--secondary);
                padding: 10px;
            }
            @media (max-width: 992px) {
                .hamburger { display: block; }
                .nav-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 20px;
                    box-shadow: 0 10px 15px rgba(0,0,0,0.05);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                }
                .nav-menu.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                .nav-link { width: 100%; }
                .header-btn { margin: 10px 0 0; width: 100%; justify-content: center; }
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
            .map(item => {
                const activeClass = item.active ? 'active' : '';
                return `<li><a href="${item.href}" class="nav-link ${activeClass}">${item.text}</a></li>`;
            })
            .join('');

        const clientButtonHtml = this.clientButton ? `
            <li>
                <a href="${this.clientButton.href}" class="header-btn">
                    ${this.clientButton.icon ? `<i class="${this.clientButton.icon}"></i> ` : ''}
                    ${this.clientButton.text}
                </a>
            </li>
        ` : '';

        return `
            <header id="main-header">
                <div class="container">
                    <div class="nav-container">
                        <a href="#" class="logo">
                            <img src="${this.logoUrl}" alt="${this.logoAlt}">
                        </a>

                        <div class="hamburger" onclick="toggleMenu()">
                            <i class="fas fa-bars"></i>
                        </div>

                        <nav>
                            <ul class="nav-menu" id="navMenu">
                                ${menuItemsHtml}
                                ${clientButtonHtml}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
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
        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const menu = document.getElementById('navMenu');
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }

                // Atualiza link ativo
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Efeito de Scroll na Navbar
        window.addEventListener('scroll', function() {
            const header = document.getElementById('main-header');
            if (header) {
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                } else {
                    header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.03)';
                }
            }
        });
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {StickyHeaderNavigationComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new StickyHeaderNavigationComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Função global para toggle menu (mantida para compatibilidade)
if (typeof window !== 'undefined') {
    window.toggleMenu = function() {
        const menu = document.getElementById('navMenu');
        if (menu) {
            menu.classList.toggle('active');
        }
    };
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('sticky-header-navigation', StickyHeaderNavigationComponent);
}

