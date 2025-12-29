/**
 * Info Bar Component - Refatorado
 * Estilo: SaaS Minimalist / Premium Trust Bar
 * Design: High Contrast com Glassmorphism sutil
 */

class InfoBarComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para a Info Bar
     * @param {Array} data.items - Array de itens { icon, text }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.items = data.items || [];

        // RESOLUÇÃO DE CORES (Via BaseComponent)
        // Mantemos a lógica de cores primárias para elementos de destaque
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16A34A');
    }

    /**
     * Injeta estilos específicos para efeitos que o Tailwind CDN JIT pode não captar
     */
    injectStyles() {
        if (document.getElementById('info-bar-runtime-styles')) return;

        const style = document.createElement('style');
        style.id = 'info-bar-runtime-styles';
        style.textContent = `
            .info-bar-glass {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            .info-item-icon {
                color: ${this.primaryHex};
                background-color: ${this.hexToRgba(this.primaryHex, 0.08)};
            }
            .info-bar-border {
                border-top: 1px solid rgba(0, 0, 0, 0.03);
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML com classes estáticas do Tailwind
     */
    render() {
        this.injectStyles();

        const itemsHtml = this.items.map((item, index) => `
            <div class="flex items-center gap-3 group transition-all duration-500"
                 data-aos="fade-up"
                 data-aos-delay="${index * 100}">

                <div class="info-item-icon w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm">
                    <i class="${item.icon} text-sm"></i>
                </div>

                <span class="text-[11px] md:text-xs font-black uppercase tracking-[0.15em] text-slate-500 group-hover:text-slate-800 transition-colors">
                    ${item.text}
                </span>
            </div>
        `).join('');

        return `
            <div class="info-bar-glass info-bar-border py-6 relative z-30 overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div class="container mx-auto px-6 max-w-6xl">
                    <div class="flex flex-wrap justify-center lg:justify-between items-center gap-8 md:gap-12">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Monta o componente
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();

            // Inicializa AOS se disponível
            if (typeof AOS !== 'undefined') {
                setTimeout(() => {
                    AOS.init({ duration: 800, once: true });
                    AOS.refresh();
                }, 50);
            }
        }
    }

    static create(data, targetId) {
        const component = new InfoBarComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Registro
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('info-bar', InfoBarComponent);
}