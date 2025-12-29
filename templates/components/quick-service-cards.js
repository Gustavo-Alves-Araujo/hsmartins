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
                color: var(--secondary);
            }
            .card p {
                font-size: 0.95rem;
                margin-bottom: 25px;
                color: var(--text-body);
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

