/**
 * About Image Features Clinical Component
 * Seção sobre com imagem à direita, texto e lista de características/features com ícones
 * Versão com layout invertido (imagem à direita)
 */

class AboutImageFeaturesClinicalComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.tag - Tag/categoria da seção
     * @param {string} data.title - Título principal
     * @param {Array} data.paragraphs - Array de parágrafos de texto
     * @param {Array} data.features - Array de características { icon: string, text: string }
     * @param {string} data.imageUrl - URL da imagem
     * @param {string} data.imageAlt - Texto alternativo da imagem
     * @param {boolean} data.reverse - Se true, inverte a ordem (imagem à direita) - sempre true neste componente
     */
    constructor(data) {
        this.id = data.id || '';
        this.tag = data.tag || '';
        this.title = data.title || '';
        this.paragraphs = data.paragraphs || [];
        this.features = data.features || [];
        this.imageUrl = data.imageUrl || '';
        this.imageAlt = data.imageAlt || '';
        this.reverse = true; // Sempre invertido neste componente
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     * Usa os mesmos estilos do about-image-features
     */
    injectStyles() {
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

        return `
            <section id="${this.id}" class="clinical">
                <div class="container clinical-content">
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
     * @returns {AboutImageFeaturesClinicalComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new AboutImageFeaturesClinicalComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('about-image-features-clinical', AboutImageFeaturesClinicalComponent);
}
