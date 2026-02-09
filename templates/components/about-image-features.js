/**
 * About Image Features Component
 * Seção sobre compacta com imagem orgânica e lista de benefícios.
 * Design: Modern Clean / SaaS Health (Foco em Contraste e Whitespace)
 */

class AboutImageFeaturesComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.tag - Texto do badge superior
     * @param {string} data.title - Título principal
     * @param {Array} data.paragraphs - Array de strings para os parágrafos
     * @param {Array} data.features - Lista de features { icon: string, text: string }
     * @param {string} data.imageUrl - URL da imagem principal
     * @param {string} data.imageAlt - Texto alternativo
     * @param {boolean} data.reverse - Inverte a posição da imagem
     * @param {Object} data.colors - Cores do tema (opcional)
     * @param {string} data.colors.primary - Nome base da cor primária (ex: 'green', 'blue')
     * @param {string} data.colors.accent - Nome base da cor de destaque
     */
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            id: 'sobre',
            tag: 'Sobre a Imobiliária H.S Martins',
            title: 'Atendimento completo para comprar, vender e financiar seu imóvel',
            paragraphs: [
                'Somos a Imobiliária H.S Martins (Creci. 21.189), com foco em imóveis em Poá e região: apartamentos, casas, terrenos e oportunidades para diferentes perfis.',
                'Da busca ao fechamento, você conta com atendimento personalizado e suporte na negociação — além de orientação completa para financiamento como Correspondente Caixa.'
            ],
            features: [
                { icon: 'fas fa-home', text: 'Compra e Venda de Imóveis' },
                { icon: 'fas fa-building', text: 'Apartamentos, Casas e Terrenos' },
                { icon: 'fas fa-university', text: 'Correspondente Caixa (Financiamento)' },
                { icon: 'fas fa-user-tie', text: 'Atendimento e Suporte na Documentação' }
            ],
            imageUrl: 'img/imobi.jpeg',
            imageAlt: 'Fachada da Imobiliária H.S Martins'
        };
        
        this.id = data.id || defaults.id;
        this.tag = data.tag !== undefined ? data.tag : defaults.tag;
        this.title = data.title || defaults.title;
        this.paragraphs = data.paragraphs || defaults.paragraphs;
        this.features = data.features || defaults.features;
        this.imageUrl = data.imageUrl || defaults.imageUrl;
        this.imageAlt = data.imageAlt || defaults.imageAlt;
        this.reverse = data.reverse || false;

        // SEMPRE usa a cor primária do tema global - SEM FALLBACK FIXO
        const theme = this.getGlobalTheme();
        const primaryHex = theme?.colors?.primary;

        if (!primaryHex) {
            console.warn('⚠️ Cor primária não encontrada no tema. Verifique o config.json');
        }

        // RESOLUÇÃO DE CORES (Interface Padronizada)
        const primaryBase = this.resolveColor(data.colors?.primary, 'primary', 'green');
        const useHex = primaryHex && primaryHex.startsWith('#');

        // Calcula variações se for hex
        const badgeIconBgHex = useHex ? primaryHex : null;
        const badgeIconBgShadowHex = useHex ? this.hexToRgba(primaryHex, 0.3) : null;

        this.colors = {
            tagBg: this.getColorVariant(primaryBase, 100),
            tagText: this.getColorVariant(primaryBase, 500), // Cor primária padrão
            title: 'slate-900', // Alto contraste (Light Theme)
            text: 'slate-600',  // Alto contraste (Light Theme)
            featureBg: 'slate-50',
            featureIcon: this.getColorVariant(primaryBase, 600),
            badgeIconBg: useHex ? '' : this.getColorVariant(primaryBase, 600), // Usa primary ao invés de accent
            badgeIconBgHex: badgeIconBgHex,
            badgeIconBgShadowHex: badgeIconBgShadowHex,
            accentGlow: this.getColorVariant(primaryBase, 400),
            useHex: useHex
        };
    }

    /**
     * Renderiza o HTML do componente com Tailwind CSS
     */
    render() {
        const c = this.colors;

        // Observação: com Tailwind via CDN, classes montadas dinamicamente (ex: "text-${c.text}")
        // podem não ser geradas. Aqui usamos classes fixas + estilos inline quando necessário,
        // garantindo que o texto nunca "suma".
        // Tailwind via CDN pode não gerar classes vindas de JS externo.
        // Para garantir visibilidade do texto, usamos cor inline.
        const paragraphsHtml = this.paragraphs
            .map(p => `<p class="text-sm md:text-base mb-4 leading-relaxed" style="color: #334155;">${p}</p>`)
            .join('');

        const primaryHex = this.getThemeColorHex('primary') || '#005CA9';
        const accentHex = this.getThemeColorHex('accent') || '#F39200';
        const featuresHtml = this.features
            .map(f => `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm border border-slate-100"
                         style="color: ${primaryHex};">
                        <i class="${f.icon} text-xs"></i>
                    </div>
                    <span class="text-xs font-bold text-slate-800">${f.text}</span>
                </div>
            `)
            .join('');

        return `
            <section ${this.id ? `id="${this.id}"` : ''} class="relative py-12 md:py-24 bg-white overflow-hidden isolate mb-6">
                <div class="container mx-auto px-6 max-w-6xl relative z-10">
                    <div class="flex flex-col ${this.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16">

                        <div class="w-full lg:w-1/2 relative">
                            <div class="absolute -top-10 -left-10 w-48 h-48 blur-[80px] rounded-full pointer-events-none"
                                 style="background-color: ${this.hexToRgba(accentHex, 0.18)};"></div>

                            <div class="relative inline-block">
                                <img src="${this.imageUrl}" alt="${this.imageAlt}"
                                     class="w-full max-w-[460px] h-auto object-cover shadow-xl border-4 border-white"
                                     style="border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;">

                                <div class="absolute bottom-6 -right-4 md:right-4 bg-white p-3 md:p-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-slate-50 flex items-center gap-3 animate-float">
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white ${c.useHex ? '' : `bg-${c.badgeIconBg} shadow-lg shadow-${c.badgeIconBg}/30`}" ${c.useHex ? `style="background-color: ${c.badgeIconBgHex}; box-shadow: 0 10px 15px -3px ${c.badgeIconBgShadowHex}, 0 4px 6px -2px ${c.badgeIconBgShadowHex};"` : ''}>
                                        <i class="fas fa-check text-base"></i>
                                    </div>
                                    <div class="pr-2">
                                        <h4 class="text-xs font-extrabold text-slate-900 whitespace-nowrap">Qualidade Garantida</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full lg:w-1/2">
                            ${this.tag ? `
                                <div class="inline-flex items-center gap-2 py-1 px-3 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4"
                                     style="background-color: ${this.hexToRgba(accentHex, 0.14)}; color: ${primaryHex}; border: 1px solid ${this.hexToRgba(accentHex, 0.28)};">
                                    <i class="fas fa-sparkles text-[8px]"></i> ${this.tag}
                                </div>
                            ` : ''}

                            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight leading-tight" style="color: #0f172a;">
                                ${this.title}
                            </h2>

                            <div class="mb-6">
                                ${paragraphsHtml}
                            </div>

                            ${this.features.length > 0 ? `
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    ${featuresHtml}
                                </div>
                            ` : ''}
                        </div>

                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Monta o componente no DOM
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
        }
    }

    /**
     * Método estático para criação rápida
     */
    static create(data, targetId) {
        const component = new AboutImageFeaturesComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('about-image-features', AboutImageFeaturesComponent);
}