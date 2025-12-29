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
        this.isLightTheme = this.isLightColor(this.backgroundHex);
        this.textColor = this.getBestTextColor(this.backgroundHex, 4.5);
        this.borderColor = this.isLightTheme ? this.resolveColorHex(data.colors?.border, null, '#1F2937') : this.resolveColorHex(data.colors?.border, null, '#FFFFFF');

        // Resolve cores de texto do tema
        const theme = this.getGlobalTheme();
        if (theme && theme.colors && theme.colors.text) {
            this.textDark = theme.colors.text.dark || '#1F2937';
            this.textMedium = theme.colors.text.medium || '#4B5563';
            this.textLight = theme.colors.text.light || '#9CA3AF';
        } else {
            this.textDark = '#1F2937';
            this.textMedium = '#4B5563';
            this.textLight = '#9CA3AF';
        }
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
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.02) : this.backgroundHex};
                padding-top: 64px;
                padding-bottom: 32px;
                position: relative;
                z-index: 10;
                color: ${this.isLightTheme ? this.textMedium : '#9CA3AF'};
                font-size: 0.875rem;
            }
            .footer-dark-ecommerce {
                background-color: ${this.backgroundHex};
                padding-top: 64px;
                padding-bottom: 32px;
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
                font-size: 1.5rem;
                font-family: 'Space Grotesk', sans-serif;
                letter-spacing: -0.02em;
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
                color: ${this.isLightTheme ? this.textMedium : '#9CA3AF'};
                transition: color 0.3s;
                cursor: pointer;
            }
            .footer-link:hover {
                color: ${this.isLightTheme ? this.textDark : this.textColor};
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
            const linksHtml = column.links.map(link => {
                const linkClass = link.text === 'Outlet' ? 'hover:text-white transition-colors text-red-400' : 'hover:text-white transition-colors';
                return `
                    <li><a href="${link.href}" class="text-gray-400 text-sm ${linkClass}">${link.text}</a></li>
                `;
            }).join('');

            return `
                <div>
                    <h4 class="font-bold uppercase text-sm mb-6 tracking-wider text-white">${column.title}</h4>
                    <ul class="space-y-3">
                        ${linksHtml}
                    </ul>
                </div>
            `;
        }).join('');

        return `
            <footer class="bg-brand-black text-white pt-16 pb-8" style="background-color: ${this.backgroundHex};">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h3 class="text-2xl font-display font-bold tracking-tighter uppercase mb-6">${this.logoText}</h3>
                            <p class="text-gray-400 text-sm mb-6">${this.description}</p>
                        </div>
                        ${columnsHtml}
                    </div>
                    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p class="text-gray-500 text-xs">${this.copyright}</p>
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

