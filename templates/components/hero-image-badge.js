/**
 * Hero Image Badge Component
 * Seção hero com imagem, texto destacado, badge flutuante e avaliação com estrelas
 */

class HeroImageBadgeComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.tag - Texto do badge/tag superior
     * @param {string} data.tagIcon - Ícone do badge (opcional)
     * @param {string} data.title - Título principal
     * @param {string} data.titleHighlight - Parte destacada do título
     * @param {string} data.description - Descrição
     * @param {Array} data.buttons - Array de botões { text: string, href: string, style: string, icon: string, class: string, hero: boolean }
     * @param {Object} data.rating - Informações de avaliação { stars: number, text: string }
     * @param {string} data.imageUrl - URL da imagem
     * @param {string} data.imageAlt - Texto alternativo da imagem
     * @param {Object} data.badge - Badge flutuante { icon: string, title: string, text: string }
     */
    constructor(data) {
        this.tag = data.tag || '';
        this.tagIcon = data.tagIcon || '';
        this.title = data.title || '';
        this.titleHighlight = data.titleHighlight || '';
        this.description = data.description || '';
        this.buttons = data.buttons || [];
        this.rating = data.rating || null;
        this.imageUrl = data.imageUrl || '';
        this.imageAlt = data.imageAlt || '';
        this.badge = data.badge || null;
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('hero-image-badge-styles')) return;

        const style = document.createElement('style');
        style.id = 'hero-image-badge-styles';
        style.textContent = `
            .hero {
                padding-top: 80px;
                padding-bottom: 100px;
                background: linear-gradient(180deg, #f7fbf5 0%, #ffffff 100%);
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                min-height: 90vh;
            }
            .hero-blob {
                position: absolute;
                border-radius: 50%;
                filter: blur(60px);
                z-index: 0;
                opacity: 0.6;
                animation: floatBlob 10s infinite alternate;
            }
            .blob-1 {
                top: -10%;
                right: -5%;
                width: 500px;
                height: 500px;
                background: var(--primary);
            }
            .blob-2 {
                bottom: 10%;
                left: -10%;
                width: 400px;
                height: 400px;
                background: var(--primary-light);
                animation-delay: -5s;
            }
            @keyframes floatBlob {
                0% { transform: translate(0, 0) scale(1); }
                100% { transform: translate(20px, 40px) scale(1.1); }
            }
            .hero-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 60px;
                position: relative;
                z-index: 2;
                width: 100%;
            }
            .hero-text {
                flex: 1;
                max-width: 600px;
            }
            .hero-tag {
                display: inline-block;
                background: var(--primary-light);
                color: var(--secondary);
                padding: 8px 20px;
                border-radius: 30px;
                font-weight: 700;
                font-size: 0.9rem;
                margin-bottom: 20px;
                border: 1px solid var(--primary);
            }
            .hero-text h1 {
                font-size: 3.5rem;
                line-height: 1.1;
                margin-bottom: 25px;
                color: var(--secondary);
            }
            .highlight-text {
                color: var(--primary-dark);
                position: relative;
                z-index: 1;
            }
            .highlight-text::after {
                content: '';
                position: absolute;
                bottom: 5px;
                left: 0;
                width: 100%;
                height: 15px;
                background-color: var(--primary);
                opacity: 0.3;
                z-index: -1;
                border-radius: 10px;
            }
            .hero-text p {
                font-size: 1.15rem;
                margin-bottom: 35px;
                color: #666;
                max-width: 90%;
            }
            .hero-img-wrapper {
                flex: 1;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .hero-main-img {
                width: 100%;
                max-width: 550px;
                height: 500px;
                object-fit: cover;
                border-radius: 46% 54% 66% 34% / 58% 68% 32% 42%;
                box-shadow: 20px 20px 60px rgba(0,0,0,0.1);
                animation: morphing 8s ease-in-out infinite;
                border: 5px solid rgba(255,255,255,0.8);
            }
            .floating-badge {
                position: absolute;
                bottom: 60px;
                left: 40px;
                background: white;
                padding: 15px 25px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 15px;
                animation: floatBadge 4s ease-in-out infinite;
                border-left: 5px solid var(--primary);
            }
            .badge-icon {
                width: 50px;
                height: 50px;
                background: var(--primary-light);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary-dark);
                font-size: 1.5rem;
            }
            .badge-text h4 {
                margin: 0;
                font-size: 1rem;
                color: var(--secondary);
            }
            .badge-text span {
                font-size: 0.8rem;
                color: #888;
            }
            @keyframes morphing {
                0% { border-radius: 46% 54% 66% 34% / 58% 68% 32% 42%; }
                50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                100% { border-radius: 46% 54% 66% 34% / 58% 68% 32% 42%; }
            }
            @keyframes floatBadge {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            @media (max-width: 992px) {
                .hero-content {
                    flex-direction: column-reverse;
                    text-align: center;
                }
                .hero-text { margin: 0 auto; }
                .hero-img-wrapper { width: 100%; }
                .floating-badge { left: 50%; transform: translateX(-50%); bottom: 20px; width: max-content; }
                .hero-text h1 { font-size: 2.5rem; }
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
        const tagHtml = this.tag ? `
            <span class="hero-tag">
                ${this.tagIcon ? `<i class="${this.tagIcon}"></i> ` : ''}
                ${this.tag}
            </span>
        ` : '';

        const titleHtml = this.titleHighlight
            ? `${this.title} <span class="highlight-text">${this.titleHighlight}</span>`
            : this.title;

        const buttonsHtml = this.buttons
            .map(btn => {
                const style = btn.style || '';
                const icon = btn.icon ? ` <i class="${btn.icon}"></i>` : '';
                return `<a href="${btn.href}" class="btn ${btn.class || 'btn-primary'} ${btn.hero ? 'btn-hero' : ''}" style="${style}">${btn.text}${icon}</a>`;
            })
            .join('');

        const ratingHtml = this.rating ? `
            <div style="margin-top: 30px; display: flex; align-items: center; gap: 10px;">
                <div style="display: flex;">
                    ${Array(this.rating.stars || 5).fill(0).map(() =>
                        '<i class="fas fa-star" style="color: #f1c40f;"></i>'
                    ).join('')}
                </div>
                <span style="font-size: 0.9rem; font-weight: 600; color: #777;">${this.rating.text}</span>
            </div>
        ` : '';

        const badgeHtml = this.badge ? `
            <div class="floating-badge">
                <div class="badge-icon">
                    <i class="${this.badge.icon}"></i>
                </div>
                <div class="badge-text">
                    <h4>${this.badge.title}</h4>
                    <span>${this.badge.text}</span>
                </div>
            </div>
        ` : '';

        return `
            <section id="home" class="hero">
                <div class="hero-blob blob-1"></div>
                <div class="hero-blob blob-2"></div>

                <div class="container hero-content">
                    <div class="hero-text">
                        ${tagHtml}
                        <h1>${titleHtml}</h1>
                        <p>${this.description}</p>

                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            ${buttonsHtml}
                        </div>

                        ${ratingHtml}
                    </div>

                    <div class="hero-img-wrapper">
                        <img src="${this.imageUrl}" alt="${this.imageAlt}" class="hero-main-img">
                        ${badgeHtml}
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
     * @returns {HeroImageBadgeComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new HeroImageBadgeComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('hero-image-badge', HeroImageBadgeComponent);
}

