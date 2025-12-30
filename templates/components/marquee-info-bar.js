/**
 * Marquee Info Bar Component - Refatorado
 * Design: Modern Clean / High Contrast com Máscara de Gradiente
 */

class MarqueeInfoBarComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para a Marquee Info Bar
     * @param {Array} data.items - Array de textos ou objetos {text, separator}
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        const rawItems = data.items || [];
        this.items = rawItems.map(item => {
            if (typeof item === 'string') return { text: item };
            return item;
        });

        // RESOLUÇÃO DE CORES (Interface do Projeto)
        // Resolvemos para classes Tailwind estáticas para evitar quebra no JIT do CDN
        const bgBase = this.resolveColor(data.colors?.background, 'primary', 'black');
        const textBase = this.resolveColor(data.colors?.text, null, 'white');

        this.colors = {
            // Se for preto, mantém preto puro para contraste máximo, senão usa variante 950
            background: bgBase === 'black' ? 'bg-black' : `bg-${bgBase}-950`,
            text: `text-${textBase}`,
            accent: bgBase === 'black' ? 'text-white/40' : `text-${bgBase}-400/50`
        };

        this.injectStyles();
    }

    /**
     * Injeta a animação do marquee (não nativa do Tailwind core)
     */
    injectStyles() {
        if (document.getElementById('marquee-animation-runtime')) return;

        const style = document.createElement('style');
        style.id = 'marquee-animation-runtime';
        style.textContent = `
            @keyframes marquee-infinite {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee-infinite 40s linear infinite;
            }
            .marquee-fade-mask {
                mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML do componente
     */
    render() {
        const c = this.colors;

        // Triplicamos os itens para garantir que em telas ultra-wide não haja "buracos"
        const itemsDuplicated = [...this.items, ...this.items, ...this.items];

        const itemsHtml = itemsDuplicated.map((item) => {
            const separator = item.separator || '•';
            return `
                <div class="flex items-center gap-8 whitespace-nowrap">
                    <span class="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">${item.text}</span>
                    <span class="${c.accent} text-[10px]">${separator}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="${c.background} ${c.text} py-2.5 overflow-hidden relative z-[100] border-b border-white/5">
                <div class="marquee-fade-mask relative w-full overflow-hidden">
                    <div class="animate-marquee gap-8 hover:[animation-play-state:paused] cursor-default">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Monta o componente no DOM
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();

            // Força o Tailwind a processar as novas classes injetadas
            if (window.tailwind && typeof window.tailwind.track === 'function') {
                window.tailwind.track();
            }
        }
    }

    /**
     * Método estático para criação rápida
     */
    static create(data, targetId) {
        const component = new MarqueeInfoBarComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('marquee-info-bar', MarqueeInfoBarComponent);
}