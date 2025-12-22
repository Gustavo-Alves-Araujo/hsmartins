/**
 * About Image Features Component
 * Seção sobre com imagem, texto e lista de características/features com ícones
 */

class AboutImageFeaturesComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.tag - Tag/categoria da seção
     * @param {string} data.title - Título principal
     * @param {Array} data.paragraphs - Array de parágrafos de texto
     * @param {Array} data.features - Array de características { icon: string, text: string }
     * @param {string} data.imageUrl - URL da imagem
     * @param {string} data.imageAlt - Texto alternativo da imagem
     * @param {boolean} data.reverse - Se true, inverte a ordem (imagem à direita)
     */
    constructor(data) {
        this.id = data.id || '';
        this.tag = data.tag || '';
        this.title = data.title || '';
        this.paragraphs = data.paragraphs || [];
        this.features = data.features || [];
        this.imageUrl = data.imageUrl || '';
        this.imageAlt = data.imageAlt || '';
        this.reverse = data.reverse || false;
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
        if (document.getElementById('about-image-features-styles')) return;

        const style = document.createElement('style');
        style.id = 'about-image-features-styles';
        style.textContent = `
            .about {
                padding: 80px 0;
                background-color: var(--white);
            }
            .about-content {
                display: flex;
                align-items: center;
                gap: 50px;
            }
            .about-img {
                flex: 1;
            }
            .about-img img {
                border-radius: var(--radius) 0 var(--radius) 0;
                box-shadow: -10px 10px 0 var(--primary);
            }
            .about-text {
                flex: 1;
            }
            .section-tag {
                color: var(--primary-dark);
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 10px;
                display: block;
            }
            .about-text h2 {
                font-size: 2.5rem;
                margin-bottom: 20px;
            }
            .about-list {
                margin-top: 20px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            .about-list li {
                display: flex;
                align-items: center;
                font-weight: 600;
            }
            .about-list li i {
                color: var(--primary-dark);
                margin-right: 10px;
            }
            .clinical {
                padding: 100px 0;
            }
            .clinical-content {
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                gap: 50px;
            }
            @media (max-width: 992px) {
                .about-content, .clinical-content { flex-direction: column; }
                .about-list { grid-template-columns: 1fr; }
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
        const paragraphsHtml = this.paragraphs
            .map(p => `<p>${p}</p>`)
            .join('');

        const featuresHtml = this.features
            .map(feature => `
                <li><i class="${feature.icon}"></i> ${feature.text}</li>
            `)
            .join('');

        const contentClass = this.reverse ? 'clinical-content' : 'about-content';

        return `
            <section id="${this.id}" class="${this.reverse ? 'clinical' : 'about'}">
                <div class="container ${contentClass}">
                    <div class="about-img">
                        <img src="${this.imageUrl}" alt="${this.imageAlt}">
                    </div>
                    <div class="about-text">
                        ${this.tag ? `<span class="section-tag">${this.tag}</span>` : ''}
                        <h2>${this.title}</h2>
                        ${paragraphsHtml}
                        ${this.features.length > 0 ? `
                            <ul class="about-list">
                                ${featuresHtml}
                            </ul>
                        ` : ''}
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
     * @returns {AboutImageFeaturesComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new AboutImageFeaturesComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('about-image-features', AboutImageFeaturesComponent);
}

