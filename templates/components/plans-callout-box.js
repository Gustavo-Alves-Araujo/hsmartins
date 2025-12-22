/**
 * Plans Callout Box Component
 * Caixa de destaque para planos com fundo colorido, título, subtítulo e botão CTA
 */

class PlansCalloutBoxComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.title - Título principal
     * @param {string} data.subtitle - Subtítulo
     * @param {string} data.description - Descrição
     * @param {Object} data.button - Botão CTA { text: string, href: string }
     */
    constructor(data) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.subtitle = data.subtitle || '';
        this.description = data.description || '';
        this.button = data.button || { text: 'Saiba Mais', href: '#' };
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('plans-callout-box-styles')) return;

        const style = document.createElement('style');
        style.id = 'plans-callout-box-styles';
        style.textContent = `
            .plans {
                padding: 80px 0;
                background-color: var(--primary);
                color: var(--secondary);
                text-align: center;
                position: relative;
            }
            .plans h2 {
                color: var(--secondary);
                margin-bottom: 15px;
            }
            .plans-container {
                background: rgba(255,255,255,0.4);
                padding: 50px;
                border-radius: var(--radius);
                backdrop-filter: blur(5px);
                max-width: 800px;
                margin: 0 auto;
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
        return `
            <section id="${this.id}" class="plans">
                <div class="container">
                    <div class="plans-container">
                        <h2>${this.title}</h2>
                        ${this.subtitle ? `<h3>${this.subtitle}</h3>` : ''}
                        <p>${this.description}</p>
                        <br>
                        <a href="${this.button.href}" class="btn btn-secondary" style="background: var(--secondary); color: white;">${this.button.text}</a>
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
     * @returns {PlansCalloutBoxComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new PlansCalloutBoxComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('plans-callout-box', PlansCalloutBoxComponent);
}

