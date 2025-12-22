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
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
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
                        <p>${this.copyright}</p>
                        ${this.developer ? `<p style="font-size: 0.8rem; margin-top: 5px;">${this.developer}</p>` : ''}
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

