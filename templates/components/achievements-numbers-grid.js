/**
 * Achievements Numbers Grid Component
 * Grid de números/estatísticas de conquistas com valores grandes e labels
 */

class AchievementsNumbersGridComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.title - Título principal
     * @param {Array} data.stats - Array de estatísticas { value: string, label: string }
     * @param {string} data.description - Descrição adicional (opcional)
     */
    constructor(data) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.stats = data.stats || [];
        this.description = data.description || '';
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('achievements-numbers-grid-styles')) return;

        const style = document.createElement('style');
        style.id = 'achievements-numbers-grid-styles';
        style.textContent = `
            .units {
                padding: 80px 0;
                background: var(--light-bg);
                text-align: center;
            }
            .units h2 {
                margin-bottom: 40px;
            }
            .stats-grid {
                display: flex;
                justify-content: center;
                gap: 50px;
                flex-wrap: wrap;
            }
            .stat-item h3 {
                font-size: 3rem;
                color: var(--primary-dark);
            }
            .stat-item p {
                font-weight: 700;
                text-transform: uppercase;
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
        const statsHtml = this.stats
            .map(stat => `
                <div class="stat-item">
                    <h3>${stat.value}</h3>
                    <p>${stat.label}</p>
                </div>
            `)
            .join('');

        return `
            <section id="${this.id}" class="units">
                <div class="container">
                    <h2>${this.title}</h2>
                    <div class="stats-grid">
                        ${statsHtml}
                    </div>
                    ${this.description ? `
                        <p style="margin-top: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">
                            ${this.description}
                        </p>
                    ` : ''}
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
     * @returns {AchievementsNumbersGridComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new AchievementsNumbersGridComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('achievements-numbers-grid', AchievementsNumbersGridComponent);
}

