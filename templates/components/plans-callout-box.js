/**
 * Plans Callout Box Component
 * Caixa de destaque para planos com fundo colorido, título, subtítulo e botão CTA
 */

class PlansCalloutBoxComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.title - Título principal
     * @param {string} data.subtitle - Subtítulo
     * @param {string} data.description - Descrição
     * @param {Object} data.button - Botão CTA { text: string, href: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo hexadecimal (ex: '#16A34A')
     * @param {string} data.colors.cardBackground - Cor de fundo do card (opcional)
     * @param {string} data.colors.text - Cor do texto (opcional, será calculada automaticamente se não fornecida)
     */
    constructor(data) {
        super();
        this.id = data.id || '';
        this.title = data.title || '';
        this.subtitle = data.subtitle || '';
        this.description = data.description || '';
        this.button = data.button || { text: 'Saiba Mais', href: '#' };

        // Resolve cores do tema
        this.backgroundHex = this.resolveColorHex(data.colors?.background, 'primary', '#16A34A');
        this.cardBackgroundHex = data.colors?.cardBackground || this.lightenColor(this.backgroundHex, 0.3);

        // Calcula cor de texto com contraste adequado usando método do BaseComponent
        this.textColor = data.colors?.text || this.getBestTextColor(this.cardBackgroundHex, 4.5);
        this.titleColor = data.colors?.title || this.getBestTextColor(this.cardBackgroundHex, 4.5);
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
        if (document.getElementById('plans-callout-box-styles')) return;

        // Converte hex para rgba para o card com transparência
        const cardRgba = this.hexToRgba(this.cardBackgroundHex, 0.95);

        const style = document.createElement('style');
        style.id = 'plans-callout-box-styles';
        style.textContent = `
            .plans {
                padding: 80px 0;
                background-color: ${this.backgroundHex};
                text-align: center;
                position: relative;
            }
            .plans h2 {
                color: ${this.titleColor};
                margin-bottom: 15px;
            }
            .plans h3 {
                color: ${this.titleColor};
                margin-bottom: 10px;
            }
            .plans p {
                color: ${this.textColor};
            }
            .plans-container {
                background: ${cardRgba};
                padding: 50px;
                border-radius: var(--radius);
                backdrop-filter: blur(5px);
                max-width: 800px;
                margin: 0 auto;
                box-shadow: 0 10px 30px ${this.hexToRgba('#000000', 0.2)};
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

        // Calcula cor do botão com contraste adequado
        const buttonBg = this.resolveColorHex(null, 'secondary', '#2c3e50');
        const buttonTextColor = this.getBestTextColor(buttonBg, 4.5);

        return `
            <section id="${this.id}" class="plans">
                <div class="container">
                    <div class="plans-container">
                        <h2>${this.title}</h2>
                        ${this.subtitle ? `<h3>${this.subtitle}</h3>` : ''}
                        <p>${this.description}</p>
                        <br>
                        <a href="${this.button.href}" class="btn" style="background: ${buttonBg}; color: ${buttonTextColor}; box-shadow: 0 4px 15px ${this.hexToRgba(buttonBg, 0.4)};">${this.button.text}</a>
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

