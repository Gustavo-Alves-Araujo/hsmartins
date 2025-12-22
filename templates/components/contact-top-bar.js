/**
 * Contact Top Bar Component
 * Barra superior com informações de contato e redes sociais
 */

class ContactTopBarComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.infoItems - Array de itens de informação { icon: string, text: string }
     * @param {Array} data.socialLinks - Array de links sociais { icon: string, href: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo hexadecimal (ex: '#2c3e50')
     * @param {string} data.colors.primary - Cor primária hexadecimal (ex: '#16A34A')
     */
    constructor(data) {
        super();
        this.infoItems = data.infoItems || [];
        this.socialLinks = data.socialLinks || [];

        // Resolve cores do tema (override > tema > fallback)
        this.backgroundHex = this.resolveColorHex(data.colors?.background, 'secondary', '#2c3e50');
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16A34A');
    }

    /**
     * Injeta estilos base compartilhados (apenas uma vez)
     */
    injectBaseStyles() {
        if (document.getElementById('base-styles-global')) return;

        // Resolve cores do tema para estilos base (usa do primeiro componente que injeta)
        const primaryHex = this.resolveColorHex(null, 'primary', '#16A34A');
        const secondaryHex = this.resolveColorHex(null, 'secondary', '#2c3e50');
        const primaryDarkHex = this.darkenColor(primaryHex, 0.15);
        const primaryLightHex = this.lightenColor(primaryHex, 0.85);

        const style = document.createElement('style');
        style.id = 'base-styles-global';
        style.textContent = `
            :root {
                --primary: ${primaryHex};
                --primary-dark: ${primaryDarkHex};
                --primary-light: ${primaryLightHex};
                --secondary: ${secondaryHex};
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
                box-shadow: 0 4px 15px ${this.hexToRgba(primaryHex, 0.4)};
            }
            .btn-primary:hover {
                background-color: var(--primary-dark);
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px ${this.hexToRgba(primaryHex, 0.6)};
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
                box-shadow: 0 10px 25px ${this.hexToRgba(primaryHex, 0.5)};
            }
            .btn-hero:hover {
                box-shadow: 0 15px 35px ${this.hexToRgba(primaryHex, 0.7)};
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
        if (document.getElementById('contact-top-bar-styles')) return;

        const style = document.createElement('style');
        style.id = 'contact-top-bar-styles';
        style.textContent = `
            .top-bar {
                background-color: ${this.backgroundHex};
                color: white;
                padding: 8px 0;
                font-size: 0.85rem;
                position: relative;
                z-index: 1001;
            }
            .top-bar-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .top-info {
                display: flex;
                gap: 20px;
            }
            .top-info span {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .top-info i {
                color: ${this.primaryHex};
            }
            .top-social a {
                color: white;
                margin-left: 15px;
                transition: color 0.3s;
            }
            .top-social a:hover {
                color: ${this.primaryHex};
            }
            @media (max-width: 992px) {
                .top-bar { display: none; }
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

        const infoItemsHtml = this.infoItems
            .map(item => `<span><i class="${item.icon}"></i> ${item.text}</span>`)
            .join('');

        const socialLinksHtml = this.socialLinks
            .map(link => `<a href="${link.href}"><i class="${link.icon}"></i></a>`)
            .join('');

        return `
            <div class="top-bar">
                <div class="container top-bar-content">
                    <div class="top-info">
                        ${infoItemsHtml}
                    </div>
                    <div class="top-social">
                        ${socialLinksHtml}
                    </div>
                </div>
            </div>
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
        }
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {ContactTopBarComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new ContactTopBarComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('contact-top-bar', ContactTopBarComponent);
}

