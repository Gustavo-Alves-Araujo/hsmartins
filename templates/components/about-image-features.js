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
    constructor(data) {
        super();
        this.id = data.id || '';
        this.tag = data.tag || '';
        this.title = data.title || '';
        this.paragraphs = data.paragraphs || [];
        this.features = data.features || [];
        this.imageUrl = data.imageUrl || '';
        this.imageAlt = data.imageAlt || '';
        this.reverse = data.reverse || false;

        // RESOLUÇÃO DE CORES (Interface Padronizada)
        const primaryBase = this.resolveColor(data.colors?.primary, 'primary', 'green');
        const accentBase = this.resolveColor(data.colors?.accent, 'accent', 'green');

        this.colors = {
            tagBg: this.getColorVariant(primaryBase, 100),
            tagText: this.getColorVariant(primaryBase, 500), // Cor primária padrão
            title: 'slate-900', // Alto contraste (Light Theme)
            text: 'slate-600',  // Alto contraste (Light Theme)
            featureBg: 'slate-50',
            featureIcon: this.getColorVariant(primaryBase, 600),
            badgeIconBg: this.getColorVariant(accentBase, 600),
            accentGlow: this.getColorVariant(primaryBase, 400)
        };
    }

    /**
     * Renderiza o HTML do componente com Tailwind CSS
     */
    render() {
        const c = this.colors;

        const paragraphsHtml = this.paragraphs
            .map(p => `<p class="text-sm md:text-base mb-4 leading-relaxed text-${c.text}">${p}</p>`)
            .join('');

        const featuresHtml = this.features
            .map(f => `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-${c.featureBg} border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm text-${c.featureIcon} border border-slate-100">
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

                        <div class="w-full lg:w-1/2 relative" data-aos="${this.reverse ? 'fade-left' : 'fade-right'}">
                            <div class="absolute -top-10 -left-10 w-48 h-48 bg-${c.accentGlow}/10 blur-[80px] rounded-full pointer-events-none"></div>

                            <div class="relative inline-block">
                                <img src="${this.imageUrl}" alt="${this.imageAlt}"
                                     class="w-full max-w-[460px] h-auto object-cover shadow-xl border-4 border-white"
                                     style="border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;">

                                <div class="absolute bottom-6 -right-4 md:right-4 bg-white p-3 md:p-4 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-slate-50 flex items-center gap-3 animate-float">
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-${c.badgeIconBg} shadow-lg shadow-${c.badgeIconBg}/30">
                                        <i class="fas fa-check text-base"></i>
                                    </div>
                                    <div class="pr-2">
                                        <h4 class="text-xs font-extrabold text-slate-900 whitespace-nowrap">Qualidade Garantida</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full lg:w-1/2" data-aos="${this.reverse ? 'fade-right' : 'fade-left'}">
                            ${this.tag ? `
                                <div class="inline-flex items-center gap-2 py-1 px-3 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4 bg-${c.tagBg} text-${c.tagText} border border-${c.tagText}/20">
                                    <i class="fas fa-leaf text-[8px]"></i> ${this.tag}
                                </div>
                            ` : ''}

                            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight leading-tight text-${c.title}">
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
            if (typeof AOS !== 'undefined') AOS.init();
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