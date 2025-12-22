/**
 * Contact Top Bar Component
 * Barra superior com informações de contato e redes sociais
 */

class ContactTopBarComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.infoItems - Array de itens de informação { icon: string, text: string }
     * @param {Array} data.socialLinks - Array de links sociais { icon: string, href: string }
     */
    constructor(data) {
        this.infoItems = data.infoItems || [];
        this.socialLinks = data.socialLinks || [];
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('contact-top-bar-styles')) return;

        const style = document.createElement('style');
        style.id = 'contact-top-bar-styles';
        style.textContent = `
            .top-bar {
                background-color: var(--secondary, #2c3e50);
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
                color: var(--primary, #16A34A);
            }
            .top-social a {
                color: white;
                margin-left: 15px;
                transition: color 0.3s;
            }
            .top-social a:hover {
                color: var(--primary, #16A34A);
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

