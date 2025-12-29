/**
 * Achievements Numbers Grid Component
 * Estilo: Modern Clean Compacto
 * Tecnologia: 100% Tailwind CSS (Compatível com CDN) + AOS
 */

class AchievementsNumbersGridComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.id - ID da seção
     * @param {string} data.title - Título principal
     * @param {Array} data.stats - Array de estatísticas { value: string, label: string }
     * @param {string} data.description - Descrição adicional (opcional)
     */
    constructor(data) {
        this.id = data.id || 'achievements';
        this.title = data.title || '';
        this.stats = data.stats || [];
        this.description = data.description || '';
    }

    render() {
        // Grid responsivo ajustado para ser mais denso
        const gridCols = this.stats.length >= 4 ? 'lg:grid-cols-4' : `lg:grid-cols-${this.stats.length}`;

        const statsHtml = this.stats
            .map((stat, index) => `
                <div
                    class="group relative bg-white p-6 md:p-8 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center"
                    data-aos="fade-up"
                    data-aos-delay="${index * 100}"
                >
                    <div class="relative z-10">
                        <span class="block text-4xl md:text-5xl font-black text-green-600 mb-3 tracking-tight leading-none">
                            ${stat.value}
                        </span>

                        <div class="h-1 w-6 bg-slate-100 mx-auto mb-3 rounded-full group-hover:w-10 group-hover:bg-green-300 transition-all duration-300"></div>

                        <p class="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-700 transition-colors">
                            ${stat.label}
                        </p>
                    </div>
                </div>
            `)
            .join('');

        return `
            <section id="${this.id}" class="relative py-16 md:py-24 bg-white overflow-hidden isolate">
                <div class="absolute top-[-15%] left-[-15%] w-[350px] h-[350px] bg-green-50/50 rounded-full blur-[90px] -z-10 pointer-events-none"></div>
                <div class="absolute bottom-[-15%] right-[-15%] w-[300px] h-[300px] bg-slate-50/80 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

                <div class="container mx-auto px-6 max-w-5xl relative">
                    ${this.title || this.description ? `
                        <div class="text-center max-w-2xl mx-auto mb-12">
                            ${this.title ? `
                                <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight" data-aos="fade-up">
                                    ${this.title}
                                </h2>
                            ` : ''}

                            ${this.description ? `
                                <p class="text-base text-slate-600 leading-relaxed font-medium" data-aos="fade-up" data-aos-delay="50">
                                    ${this.description}
                                </p>
                            ` : ''}
                        </div>
                    ` : ''}

                    <div class="grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6">
                        ${statsHtml}
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
            target.innerHTML = this.render();

            // 1. Força o Tailwind CDN a processar as novas classes
            if (window.tailwind && typeof window.tailwind.track === 'function') {
                window.tailwind.track();
            }

            // 2. Inicializa/Refresh no AOS com animações mais rápidas para combinar com o estilo compacto
            if (typeof AOS !== 'undefined') {
                setTimeout(() => {
                    AOS.init({
                        duration: 800, // Duração menor para parecer mais ágil
                        once: true,
                        easing: 'ease-out-quad'
                    });
                    AOS.refresh();
                }, 50);
            }
        }
    }

    /**
     * Método estático para criar e montar
     */
    static create(data, targetId) {
        const component = new AchievementsNumbersGridComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('achievements-numbers-grid', AchievementsNumbersGridComponent);
}