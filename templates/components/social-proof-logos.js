/**
 * Social Proof Logos Component - Refatorado
 * Estilo: Modern Clean / SaaS High-End
 * MANTIDA A INTERFACE E LÓGICA DE DECISÃO ORIGINAL
 */

class SocialProofLogosComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     */
    constructor(data) {
        super();
        this.title = data.title || 'Confiado por empresas inovadoras';
        this.logos = data.logos || [];

        // Lógica de cores original preservada
        const backgroundHex = this.resolveColorHex(data.colors?.background, 'background', '#0f0f13');
        this.isLightTheme = this.isLightColor(backgroundHex);

        const theme = this.getGlobalTheme();
        if (theme && theme.colors && theme.colors.text) {
            this.textDark = theme.colors.text.dark || '#1F2937';
            this.textMedium = theme.colors.text.medium || '#4B5563';
            this.textLight = theme.colors.text.light || '#9CA3AF';
        } else {
            this.textDark = '#1F2937';
            this.textMedium = '#4B5563';
            this.textLight = '#9CA3AF';
        }

        this.textColor = this.isLightTheme ? this.textMedium : '#6B7280';
        this.borderColor = this.isLightTheme ? this.textDark : '#FFFFFF';
    }

    /**
     * Injeta estilos no head - Refatorado para Modern Clean
     */
    injectStyles() {
        if (document.getElementById('social-proof-logos-styles')) return;

        const style = document.createElement('style');
        style.id = 'social-proof-logos-styles';
        style.textContent = `
            .social-proof {
                border-top: 1px solid ${this.hexToRgba(this.borderColor, 0.08)};
                border-bottom: 1px solid ${this.hexToRgba(this.borderColor, 0.08)};
                background: ${this.isLightTheme ? '#FFFFFF' : this.hexToRgba('#000000', 0.2)};
                padding: 60px 0;
                position: relative;
                z-index: 10;
                overflow: hidden;
            }
            .social-proof-title {
                font-size: 0.75rem;
                font-weight: 800;
                color: ${this.textColor};
                text-transform: uppercase;
                letter-spacing: 0.3em;
                margin-bottom: 40px;
                text-align: center;
                opacity: 0.8;
            }
            .social-proof-logos {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 40px;
                /* Máscara de fade lateral para look moderno */
                mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
            .social-proof-logo-item {
                opacity: 0.4;
                filter: grayscale(100%);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .social-proof-logo-item:hover {
                opacity: 1;
                filter: grayscale(0%);
                transform: translateY(-2px);
            }
            .social-proof-logo {
                font-size: 1.15rem;
                font-weight: 800;
                display: flex;
                align-items: center;
                gap: 12px;
                letter-spacing: -0.02em;
            }
            .social-proof-logo-icon {
                width: 28px;
                height: 28px;
                background: ${this.isLightTheme ? this.textDark : '#FFFFFF'};
                border-radius: 8px; /* Look moderno levemente arredondado */
            }
            @media (min-width: 768px) {
                .social-proof-logos { gap: 80px; }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML - Mantendo a lógica de decisão original
     */
    render() {
        const hasUrls = this.logos.some(logo => logo.url);
        const hasIcons = this.logos.some(logo => logo.icon);

        // Caso 1: Logos com URL de imagem
        if (hasUrls) {
            const logosHtml = this.logos.map(logo => {
                const name = logo.name || logo.alt || '';
                return `
                    <div class="social-proof-logo-item">
                        <img src="${logo.url}" alt="${logo.alt || name}" class="h-8 md:h-10 w-auto object-contain">
                    </div>
                `;
            }).join('');

            return `
                <section class="social-proof">
                    <div class="container mx-auto px-4 text-center">
                        <p class="social-proof-title">${this.title}</p>
                        <div class="social-proof-logos">
                            ${logosHtml}
                        </div>
                    </div>
                </section>
            `;
        }

        // Caso 2: Somente Nomes (Texto)
        if (!hasIcons) {
            const logosHtml = this.logos.map(logo => {
                const name = logo.name || logo.alt || '';
                return `
                    <div class="social-proof-logo-item">
                        <span class="text-xl md:text-2xl font-black tracking-tighter uppercase" style="color: ${this.isLightTheme ? this.textDark : '#FFF'}">${name}</span>
                    </div>
                `;
            }).join('');

            return `
                <section class="social-proof">
                    <div class="container mx-auto px-4 text-center">
                        <p class="social-proof-title">${this.title}</p>
                        <div class="social-proof-logos">
                            ${logosHtml}
                        </div>
                    </div>
                </section>
            `;
        }

        // Caso 3: Estilo com Ícones (Original)
        this.injectStyles();
        const logosHtml = this.logos.map(logo => {
            const iconStyle = logo.style || 'rounded-lg';
            const name = logo.name || logo.alt || '';
            return `
                <div class="social-proof-logo-item">
                    <div class="social-proof-logo">
                        <div class="social-proof-logo-icon ${iconStyle}"></div>
                        <span style="color: ${this.isLightTheme ? this.textDark : '#FFF'}">${name}</span>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <section class="social-proof">
                <div class="container mx-auto px-6 text-center">
                    <p class="social-proof-title">${this.title}</p>
                    <div class="social-proof-logos">
                        ${logosHtml}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Monta o componente no DOM - Assinatura original
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            this.injectStyles();
            target.innerHTML = this.render();
        }
    }

    /**
     * Método estático - Assinatura original
     */
    static create(data, targetId) {
        const component = new SocialProofLogosComponent(data);
        component.mount(targetId);
        return component;
    }
}