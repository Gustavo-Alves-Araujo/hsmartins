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

        // Detecta se o tema é claro (background claro)
        const backgroundHex = this.resolveColorHex(null, 'background', '#0f0f13');
        this.isLightTheme = this.isLightColor(backgroundHex);

        // Resolve cores de texto do tema
        const theme = this.getGlobalTheme();
        if (theme && theme.colors && theme.colors.text) {
            this.textDark = theme.colors.text.dark || '#1F2937';
            this.textMedium = theme.colors.text.medium || '#4B5563';
            this.textLight = theme.colors.text.light || '#9CA3AF';
            this.textWhite = theme.colors.text.white || '#FFFFFF';
        } else {
            this.textDark = '#1F2937';
            this.textMedium = '#4B5563';
            this.textLight = '#9CA3AF';
            this.textWhite = '#FFFFFF';
        }
    }

    /**
     * Verifica se uma cor é clara (para detectar tema claro)
     * @param {string} hex - Cor hexadecimal
     * @returns {boolean} true se a cor for clara
     */
    isLightColor(hex) {
        if (!hex || !hex.startsWith('#')) return false;
        const color = hex.substring(1);
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        // Calcula luminância relativa
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5;
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('hero-badge-preview-styles')) return;

        // Cores adaptativas baseadas no tema claro/escuro
        const badgeBg = this.isLightTheme
            ? this.hexToRgba(this.textDark, 0.05)
            : this.hexToRgba('#FFFFFF', 0.05);
        const badgeBorder = this.isLightTheme
            ? this.hexToRgba(this.textDark, 0.1)
            : this.hexToRgba('#FFFFFF', 0.1);
        const titleColor = this.isLightTheme ? this.textDark : this.textWhite;
        const descriptionColor = this.isLightTheme ? this.textMedium : '#9CA3AF';
        const buttonPrimaryBg = this.isLightTheme ? this.primaryHex : '#FFFFFF';
        const buttonPrimaryColor = this.isLightTheme ? this.textWhite : '#000000';
        const buttonPrimaryHover = this.isLightTheme
            ? this.darkenColor(this.primaryHex, 0.1)
            : '#F3F4F6';
        const buttonSecondaryBg = this.isLightTheme
            ? this.hexToRgba(this.textDark, 0.05)
            : this.hexToRgba('#FFFFFF', 0.05);
        const buttonSecondaryBorder = this.isLightTheme
            ? this.hexToRgba(this.textDark, 0.2)
            : this.hexToRgba('#FFFFFF', 0.1);
        const buttonSecondaryColor = this.isLightTheme ? this.textDark : '#FFFFFF';
        const buttonSecondaryHover = this.isLightTheme
            ? this.hexToRgba(this.textDark, 0.1)
            : this.hexToRgba('#FFFFFF', 0.1);

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
                background: ${badgeBg};
                border: 1px solid ${badgeBorder};
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
                color: ${titleColor};
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
                color: ${descriptionColor};
                font-size: 1.125rem;
                max-width: 42rem;
                margin: 0 auto 40px;
                line-height: 1.75;
            }
            .hero-buttons {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                margin: 0 auto 80px;
                width: 100%;
            }
            .hero-button-primary,
            .hero-button-secondary {
                width: 100%;
                max-width: 100%;
                padding: 16px 32px;
                border-radius: 9999px;
                font-weight: 700;
                font-size: 1.125rem;
                transition: all 0.3s;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                text-align: center;
                text-decoration: none;
                border: none;
                cursor: pointer;
            }
            .hero-button-primary {
                background: ${buttonPrimaryBg};
                color: ${buttonPrimaryColor};
                box-shadow: 0 0 30px ${this.hexToRgba(this.primaryHex, 0.2)};
            }
            .hero-button-primary:hover {
                background: ${buttonPrimaryHover};
            }
            .hero-button-secondary {
                background: ${buttonSecondaryBg};
                border: 1px solid ${buttonSecondaryBorder};
                color: ${buttonSecondaryColor};
                backdrop-filter: blur(12px);
            }
            .hero-button-secondary:hover {
                background: ${buttonSecondaryHover};
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
                background: ${this.isLightTheme ? this.hexToRgba('#FFFFFF', 0.9) : this.hexToRgba('#1a1a24', 0.8)};
                backdrop-filter: blur(24px);
                border: 1px solid ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.1) : this.hexToRgba('#FFFFFF', 0.1)};
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
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.03) : this.hexToRgba('#FFFFFF', 0.05)};
                border-radius: 0.75rem;
                padding: 20px;
                border: 1px solid ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.05) : this.hexToRgba('#FFFFFF', 0.05)};
            }
            @media (min-width: 768px) {
                .hero-badge-preview { padding-top: 192px; padding-bottom: 128px; }
                .hero-title { font-size: 4.5rem; }
                .hero-buttons {
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 24px;
                }
                .hero-button-primary,
                .hero-button-secondary {
                    width: auto;
                    min-width: auto;
                    flex-shrink: 0;
                }
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

