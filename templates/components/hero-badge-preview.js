/**
 * Hero Badge Preview Component
 * Seção hero com badge, título com gradiente, descrição, botões e preview de dashboard
 */

class HeroBadgePreviewComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Object} data.badge - Badge { text: string, icon: string, color: string }
     * @param {string} data.title - Título principal
     * @param {string} data.titleHighlight - Parte destacada do título
     * @param {string} data.description - Descrição
     * @param {Array} data.buttons - Array de botões { text: string, href: string, style: string }
     * @param {Object} data.preview - Preview do dashboard { enabled: boolean, content: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.badge = data.badge || { text: 'Disponível: Nova Versão 2.0', icon: 'circle', color: 'green' };
        this.title = data.title || '';
        this.titleHighlight = data.titleHighlight || '';
        this.description = data.description || '';
        this.buttons = data.buttons || [];
        this.preview = data.preview || { enabled: true, content: '' };

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        this.secondaryHex = this.resolveColorHex(data.colors?.secondary, 'secondary', '#EC4899');
        this.accentHex = this.resolveColorHex(data.colors?.accent, 'accent', '#F97316');
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('hero-badge-preview-styles')) return;

        const style = document.createElement('style');
        style.id = 'hero-badge-preview-styles';
        style.textContent = `
            .hero-badge-preview {
                position: relative;
                z-index: 10;
                padding-top: 160px;
                padding-bottom: 80px;
                text-align: center;
                width: 100%;
            }
            .hero-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: ${this.hexToRgba('#FFFFFF', 0.05)};
                border: 1px solid ${this.hexToRgba('#FFFFFF', 0.1)};
                border-radius: 9999px;
                padding: 6px 16px;
                margin-bottom: 32px;
                backdrop-filter: blur(12px);
                margin-left: auto;
                margin-right: auto;
            }
            .hero-badge-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #4ADE80;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            .hero-title {
                font-size: 3rem;
                font-weight: 800;
                line-height: 1.1;
                margin-bottom: 24px;
                letter-spacing: -0.025em;
                text-align: center;
            }
            .hero-title br {
                display: none;
            }
            @media (min-width: 768px) {
                .hero-title br {
                    display: block;
                }
            }
            .hero-title-highlight {
                background: linear-gradient(to right, ${this.primaryHex}, ${this.secondaryHex}, ${this.accentHex});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .hero-description {
                color: #9CA3AF;
                font-size: 1.125rem;
                max-width: 42rem;
                margin: 0 auto 40px;
                line-height: 1.75;
            }
            .hero-buttons {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
                margin-bottom: 80px;
            }
            .hero-button-primary {
                width: 100%;
                padding: 16px 32px;
                background: #FFFFFF;
                color: #000000;
                border-radius: 9999px;
                font-weight: 700;
                font-size: 1.125rem;
                transition: all 0.3s;
                box-shadow: 0 0 30px ${this.hexToRgba('#FFFFFF', 0.2)};
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            .hero-button-primary:hover {
                background: #F3F4F6;
            }
            .hero-button-secondary {
                width: 100%;
                padding: 16px 32px;
                background: ${this.hexToRgba('#FFFFFF', 0.05)};
                border: 1px solid ${this.hexToRgba('#FFFFFF', 0.1)};
                color: #FFFFFF;
                border-radius: 9999px;
                font-weight: 700;
                font-size: 1.125rem;
                transition: all 0.3s;
                backdrop-filter: blur(12px);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .hero-button-secondary:hover {
                background: ${this.hexToRgba('#FFFFFF', 0.1)};
            }
            .hero-preview {
                position: relative;
                margin: 0 auto;
                max-width: 80rem;
            }
            .hero-preview-glow {
                position: absolute;
                inset: -4px;
                background: linear-gradient(to right, ${this.primaryHex}, ${this.secondaryHex});
                border-radius: 1rem;
                filter: blur(8px);
                opacity: 0.3;
            }
            .hero-preview-card {
                position: relative;
                background: ${this.hexToRgba('#1a1a24', 0.8)};
                backdrop-filter: blur(24px);
                border: 1px solid ${this.hexToRgba('#FFFFFF', 0.1)};
                border-radius: 1rem;
                padding: 16px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .hero-preview-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 24px;
            }
            .hero-preview-grid-item {
                background: ${this.hexToRgba('#FFFFFF', 0.05)};
                border-radius: 0.75rem;
                padding: 20px;
                border: 1px solid ${this.hexToRgba('#FFFFFF', 0.05)};
            }
            @media (min-width: 768px) {
                .hero-badge-preview { padding-top: 192px; padding-bottom: 128px; }
                .hero-title { font-size: 4.5rem; }
                .hero-buttons { flex-direction: row; }
                .hero-button-primary, .hero-button-secondary { width: auto; }
                .hero-preview-card { padding: 32px; }
                .hero-preview-grid { grid-template-columns: 1fr 2fr; }
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

        const badgeHtml = this.badge ? `
            <div class="hero-badge">
                <span class="hero-badge-dot"></span>
                <span style="font-size: 0.75rem; font-weight: 500; color: ${this.hexToRgba(this.primaryHex, 0.8)};">${this.badge.text}</span>
            </div>
        ` : '';

        const titleHtml = this.titleHighlight
            ? `${this.title} <br class="hidden md:block" /> <span class="hero-title-highlight">${this.titleHighlight}</span>`
            : this.title;

        const buttonsHtml = this.buttons.map(btn => {
            const isPrimary = btn.style === 'primary' || !btn.style;
            const buttonClass = isPrimary ? 'hero-button-primary' : 'hero-button-secondary';
            const iconHtml = btn.icon ? `<i data-lucide="${btn.icon}" class="w-5 h-5"></i>` : '';
            return `<a href="${btn.href}" class="${buttonClass}">${btn.text}${iconHtml}</a>`;
        }).join('');

        const previewHtml = this.preview.enabled ? `
            <div class="hero-preview">
                <div class="hero-preview-glow"></div>
                <div class="hero-preview-card">
                    ${this.preview.content || ''}
                </div>
            </div>
        ` : '';

        return `
            <section class="hero-badge-preview container mx-auto px-6 text-center">
                ${badgeHtml}
                <h1 class="hero-title">${titleHtml}</h1>
                <p class="hero-description">${this.description}</p>
                <div class="hero-buttons">
                    ${buttonsHtml}
                </div>
                ${previewHtml}
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
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {HeroBadgePreviewComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new HeroBadgePreviewComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('hero-badge-preview', HeroBadgePreviewComponent);
}

