/**
 * FAQ Accordion Component - Refatorado e Corrigido
 * Estilo: Modern Clean Compacto com Glassmorphism e Blobs
 */

class FaqAccordionComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.title - Título da seção
     * @param {Array} data.items - Array de itens FAQ { question: string, answer: string }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.id = data.id || '';
        this.title = data.title || 'Perguntas Frequentes';
        this.items = data.items || data.questions || [];

        // RESOLUÇÃO DE CORES (Usando métodos do BaseComponent)
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16A34A');
        this.primaryLightRgba = this.hexToRgba(this.primaryHex, 0.1);
        this.primaryMediumRgba = this.hexToRgba(this.primaryHex, 0.2);
    }

    /**
     * Injeta estilos específicos para animação de abertura (max-height)
     * que o Tailwind não consegue gerenciar dinamicamente sem o JIT quebrar.
     */
    injectStyles() {
        if (document.getElementById('faq-accordion-runtime-styles')) return;

        const style = document.createElement('style');
        style.id = 'faq-accordion-runtime-styles';
        style.textContent = `
            .faq-content-wrapper {
                max-height: 0;
                transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
                opacity: 0;
            }
            .faq-item.active .faq-content-wrapper {
                opacity: 1;
            }
            .faq-item.active .faq-chevron {
                transform: rotate(180deg);
            }
            .faq-item.active {
                border-color: ${this.hexToRgba(this.primaryHex, 0.3)};
                background-color: #ffffff;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML usando classes Tailwind ESTÁTICAS (para o JIT detectar)
     */
    render() {
        this.injectStyles();

        const itemsHtml = this.items.map((item, index) => `
            <div
                class="faq-item group bg-slate-50/50 backdrop-blur-sm border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="${index * 50}"
            >
                <button class="faq-toggle w-full flex items-center justify-between p-5 md:p-6 text-left outline-none">
                    <span class="text-base md:text-lg font-bold text-slate-800 pr-8 transition-colors group-hover:text-slate-900">
                        ${item.question}
                    </span>
                    <div class="faq-chevron-container flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300">
                        <i data-lucide="chevron-down" class="faq-chevron w-4 h-4 transition-transform duration-300"></i>
                    </div>
                </button>

                <div class="faq-content-wrapper overflow-hidden">
                    <div class="px-6 pb-6 text-slate-600 leading-relaxed pt-2">
                        <div class="h-px w-full bg-slate-100 mb-4"></div>
                        ${item.answer}
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <section ${this.id ? `id="${this.id}"` : ''} class="relative py-16 md:py-24 overflow-hidden isolate">
                <div class="absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-[100px] -z-10 opacity-30" style="background-color: ${this.primaryHex}"></div>
                <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-200 rounded-full blur-[120px] -z-10 opacity-50"></div>

                <div class="container mx-auto px-6 max-w-3xl relative">
                    <div class="text-center mb-12" data-aos="fade-up">
                        <span class="inline-block py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                              style="background-color: ${this.primaryLightRgba}; color: ${this.primaryHex}">
                            FAQ
                        </span>
                        <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            ${this.title}
                        </h2>
                    </div>

                    <div class="flex flex-col gap-3">
                        ${itemsHtml}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Lógica de montagem e eventos
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        target.innerHTML = this.render();

        const items = target.querySelectorAll('.faq-item');
        items.forEach(item => {
            const btn = item.querySelector('.faq-toggle');
            const content = item.querySelector('.faq-content-wrapper');
            const chevronContainer = item.querySelector('.faq-chevron-container');

            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Fecha outros itens (Comportamento exclusivo)
                items.forEach(other => {
                    other.classList.remove('active');
                    other.querySelector('.faq-content-wrapper').style.maxHeight = '0';
                    const otherChevron = other.querySelector('.faq-chevron-container');
                    otherChevron.style.backgroundColor = '#ffffff';
                    otherChevron.style.color = '#94a3b8'; // slate-400
                });

                // Abre o item atual
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    chevronContainer.style.backgroundColor = this.primaryHex;
                    chevronContainer.style.color = '#ffffff';
                }
            });
        });

        // Inicializa ícones e animações
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 100);
        }
    }

    static create(data, targetId) {
        const component = new FaqAccordionComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Registro no sistema
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('faq-accordion', FaqAccordionComponent);
}