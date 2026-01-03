/**
 * Footer Multi Column Links Component
 * Footer com múltiplas colunas de links, redes sociais, copyright e informações do desenvolvedor
 */

class FooterMultiColumnLinksComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {Array} data.columns - Array de colunas { title: string, links: Array<{ text: string, href: string, style?: string }> }
     * @param {Array} data.socialLinks - Array de links sociais { icon: string, href: string }
     * @param {string} data.copyright - Texto de copyright
     * @param {string} data.developer - Texto do desenvolvedor (opcional)
     */
    constructor(data) {
        this.id = data.id || '';
        this.columns = data.columns || [];
        this.socialLinks = data.socialLinks || [];
        this.copyright = data.copyright || '';
        this.developer = data.developer || '';
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
        if (document.getElementById('footer-multi-column-links-styles')) return;

        const style = document.createElement('style');
        style.id = 'footer-multi-column-links-styles';
        style.textContent = `
            footer {
                background: #1a252f;
                color: #ecf0f1;
                padding: 70px 0 20px;
            }
            .footer-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 40px;
                margin-bottom: 50px;
            }
            .footer-col h4 {
                color: var(--primary);
                margin-bottom: 20px;
                font-size: 1.2rem;
            }
            .footer-col ul li {
                margin-bottom: 10px;
            }
            .footer-col ul li a:hover {
                color: var(--primary);
                padding-left: 5px;
            }
            .social-links a {
                font-size: 1.5rem;
                margin-right: 15px;
            }
            .social-links a:hover {
                color: var(--primary);
            }
            .footer-bottom {
                border-top: 1px solid #34495e;
                padding-top: 20px;
                text-align: center;
                font-size: 0.9rem;
                color: #95a5a6;
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
        const columnsHtml = this.columns
            .map(column => {
                const linksHtml = column.links
                    .map(link => {
                        // Se o link tem style, usa ele (ex: telefone destacado)
                        if (link.style) {
                            return `<li style="${link.style}">${link.text}</li>`;
                        }
                        return `<li><a href="${link.href}">${link.text}</a></li>`;
                    })
                    .join('');

                return `
                    <div class="footer-col">
                        <h4>${column.title}</h4>
                        <ul>
                            ${linksHtml}
                        </ul>
                    </div>
                `;
            })
            .join('');

        const socialLinksHtml = this.socialLinks
            .map(link => `<a href="${link.href}"><i class="${link.icon}"></i></a>`)
            .join('');

        return `
            <footer id="${this.id}">
                <div class="container">
                    <div class="footer-grid">
                        ${columnsHtml}
                        ${this.socialLinks.length > 0 ? `
                            <div class="footer-col">
                                <h4>Redes Sociais</h4>
                                <div class="social-links">
                                    ${socialLinksHtml}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <div class="footer-bottom">
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                            ${this.copyright ? `<p>${this.copyright}</p>` : ''}
                            <p style="font-size: 0.9rem;">
                                Feito por: <a href="https://www.axolutions.com.br" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: none; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8';" onmouseout="this.style.opacity='1';">www.axolutions.com.br</a>
                            </p>
                            ${this.developer ? `<p style="font-size: 0.8rem; margin-top: 5px;">${this.developer}</p>` : ''}
                        </div>
                    </div>
                </div>
            </footer>
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
     * @returns {FooterMultiColumnLinksComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new FooterMultiColumnLinksComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('footer-multi-column-links', FooterMultiColumnLinksComponent);
}

