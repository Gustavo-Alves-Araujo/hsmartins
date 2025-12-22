/**
 * Quick Service Cards Component
 * Grid de cards de serviços rápidos com ícones, títulos e botões de ação
 */

class QuickServiceCardsComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.cards - Array de cards { icon: string, title: string, description: string, buttonText: string, buttonHref: string }
     */
    constructor(data) {
        this.cards = data.cards || [];
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('quick-service-cards-styles')) return;

        const style = document.createElement('style');
        style.id = 'quick-service-cards-styles';
        style.textContent = `
            .quick-services {
                margin-top: -60px;
                position: relative;
                z-index: 10;
                margin-bottom: 80px;
            }
            .cards-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
            }
            .card {
                background: white;
                padding: 40px 30px;
                border-radius: var(--radius);
                box-shadow: var(--shadow);
                text-align: center;
                transition: transform 0.3s;
                border-bottom: 5px solid var(--primary);
            }
            .card:hover {
                transform: translateY(-10px);
            }
            .card-icon {
                font-size: 2.5rem;
                color: var(--primary-dark);
                margin-bottom: 20px;
            }
            .card h3 {
                margin-bottom: 15px;
                font-size: 1.4rem;
            }
            .card p {
                font-size: 0.95rem;
                margin-bottom: 25px;
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
        const cardsHtml = this.cards
            .map(card => `
                <div class="card">
                    <div class="card-icon"><i class="${card.icon}"></i></div>
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                    <a href="${card.buttonHref || '#'}" class="btn btn-primary">${card.buttonText || 'Saiba Mais'}</a>
                </div>
            `)
            .join('');

        return `
            <section class="quick-services">
                <div class="container">
                    <div class="cards-grid">
                        ${cardsHtml}
                    </div>
                </div>
            </section>
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
     * @returns {QuickServiceCardsComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new QuickServiceCardsComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('quick-service-cards', QuickServiceCardsComponent);
}

