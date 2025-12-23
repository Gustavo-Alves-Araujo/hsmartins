/**
 * Footer Multi Column Dark Component
 * Footer com múltiplas colunas em tema escuro
 */

class FooterMultiColumnDarkComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.logoText - Texto do logo
     * @param {string} data.description - Descrição/sobre
     * @param {Array} data.columns - Array de colunas { title: string, links: Array<{ text: string, href: string }> }
     * @param {string} data.copyright - Texto de copyright
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.logoText = data.logoText || '';
        this.description = data.description || '';
        this.columns = data.columns || [];
        this.copyright = data.copyright || '';

        // Resolve cores do tema
        this.backgroundHex = this.resolveColorHex(data.colors?.background, 'background', '#0a0a0e');
        this.textColor = this.getBestTextColor(this.backgroundHex, 4.5);
        this.borderColor = this.resolveColorHex(data.colors?.border, null, '#FFFFFF');
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('footer-multi-column-dark-styles')) return;

        const style = document.createElement('style');
        style.id = 'footer-multi-column-dark-styles';
        style.textContent = `
            .footer-dark {
                border-top: 1px solid ${this.hexToRgba(this.borderColor, 0.1)};
                background: ${this.backgroundHex};
                padding-top: 64px;
                padding-bottom: 32px;
                position: relative;
                z-index: 10;
                color: #9CA3AF;
                font-size: 0.875rem;
            }
            .footer-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 32px;
                margin-bottom: 48px;
            }
            .footer-logo {
                color: ${this.textColor};
                font-weight: 700;
                font-size: 1.25rem;
                margin-bottom: 16px;
            }
            .footer-description {
                opacity: 0.6;
            }
            .footer-column-title {
                color: ${this.textColor};
                font-weight: 700;
                margin-bottom: 16px;
            }
            .footer-links {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .footer-link {
                color: #9CA3AF;
                transition: color 0.3s;
                cursor: pointer;
            }
            .footer-link:hover {
                color: ${this.textColor};
            }
            .footer-bottom {
                text-align: center;
                border-top: 1px solid ${this.hexToRgba(this.borderColor, 0.05)};
                padding-top: 32px;
                opacity: 0.4;
            }
            @media (min-width: 768px) {
                .footer-grid { grid-template-columns: repeat(4, 1fr); }
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

        const columnsHtml = this.columns.map(column => {
            const linksHtml = column.links.map(link => `
                <li><a href="${link.href}" class="footer-link">${link.text}</a></li>
            `).join('');

            return `
                <div>
                    <h4 class="footer-column-title">${column.title}</h4>
                    <ul class="footer-links">
                        ${linksHtml}
                    </ul>
                </div>
            `;
        }).join('');

        return `
            <footer class="footer-dark container mx-auto px-6">
                <div class="footer-grid">
                    <div>
                        <div class="footer-logo">${this.logoText}</div>
                        <p class="footer-description">${this.description}</p>
                    </div>
                    ${columnsHtml}
                </div>
                <div class="footer-bottom">
                    ${this.copyright}
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
     * @returns {FooterMultiColumnDarkComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new FooterMultiColumnDarkComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('footer-multi-column-dark', FooterMultiColumnDarkComponent);
}

