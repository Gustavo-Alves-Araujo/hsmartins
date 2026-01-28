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
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            id: 'faq',
            title: 'Tire suas Dúvidas sobre Financiamento',
            subtitle: 'Informações úteis para quem busca realizar o sonho da casa própria.',
            questions: [
                {
                    question: 'O FGTS pode ser usado para quitar parcelas atrasadas?',
                    answer: 'Sim, o FGTS poderá ser usado para quitar até 12 parcelas de financiamento atrasado, seguindo as regras da Caixa Econômica Federal.'
                },
                {
                    question: 'Tenho um imóvel quitado, posso financiar outro?',
                    answer: 'Sim, é possível financiar um segundo imóvel mesmo já possuindo um quitado, desde que atenda aos requisitos de crédito e endividamento.'
                },
                {
                    question: 'Quais as dicas para comprar um imóvel antes dos 30?',
                    answer: 'Planejamento financeiro, pesquisa de mercado, uso do FGTS, simulação de financiamento e busca por um bom corretor são essenciais.'
                }
            ]
        };

        // --- CORREÇÃO AQUI ---
        // Se o JSON não tiver 'id', usamos 'faq' como padrão para garantir que renderize
        this.id = data.id || defaults.id;

        this.title = data.title || defaults.title;
        this.subtitle = data.subtitle || defaults.subtitle;
        // Aceita tanto 'questions' quanto 'items'
        this.items = data.questions || data.items || defaults.questions;

        // RESOLUÇÃO DE CORES (Usando métodos do BaseComponent)
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#000000');
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
                opacity: 0;
                overflow: hidden;
                transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                            opacity 0.3s ease-in-out,
                            padding 0.3s ease-in-out;
                padding: 0;
            }
            .faq-item.active .faq-content-wrapper {
                max-height: 1000px;
                opacity: 1;
                padding: 0;
                transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                            opacity 0.4s ease-in-out 0.1s,
                            padding 0.3s ease-in-out;
            }
            .faq-chevron {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .faq-item.active .faq-chevron {
                transform: rotate(180deg);
            }
            .faq-chevron-container {
                transition: background-color 0.3s ease-in-out, 
                            color 0.3s ease-in-out,
                            transform 0.2s ease-in-out;
            }
            .faq-item.active .faq-chevron-container {
                transform: scale(1.05);
            }
            .faq-item {
                transition: border-color 0.3s ease-in-out, 
                            background-color 0.3s ease-in-out,
                            box-shadow 0.3s ease-in-out;
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

        // Valida se há items para renderizar
        if (!this.items || this.items.length === 0) {
            console.warn('⚠️ FAQ Accordion: Nenhum item encontrado. Verifique se há "questions" ou "items" no config.');
            return '<div></div>';
        }

        const itemsHtml = this.items.map((item, index) => `
            <div
                class="faq-item group bg-slate-50/50 backdrop-blur-sm border border-slate-100 rounded-2xl overflow-hidden"
            >
                <button class="faq-toggle w-full flex items-center justify-between p-5 md:p-6 text-left outline-none">
                    <span class="text-base md:text-lg font-bold text-slate-800 pr-8 group-hover:text-slate-900">
                        ${item.question}
                    </span>
                    <div class="faq-chevron-container flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
                        <i data-lucide="chevron-down" class="faq-chevron w-4 h-4"></i>
                    </div>
                </button>

                <div class="faq-content-wrapper">
                    <div class="px-6 pb-6 text-slate-600 leading-relaxed pt-2">
                        <div class="h-px w-full bg-slate-100 mb-4"></div>
                        ${item.answer}
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <section id="${this.id}" class="relative py-16 md:py-24 overflow-hidden isolate bg-white">
                <div class="absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-[100px] -z-10 opacity-30" style="background-color: ${this.primaryHex}"></div>
                <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-200 rounded-full blur-[120px] -z-10 opacity-50"></div>

                <div class="container mx-auto px-6 max-w-3xl relative z-10">
                    <div class="text-center mb-12">
                        <span class="inline-block py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                              style="background-color: ${this.primaryLightRgba}; color: ${this.primaryHex}">
                            FAQ
                        </span>
                        <h2 class="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
                            ${this.title}
                        </h2>
                        ${this.subtitle ? `<p class="text-lg text-slate-600 max-w-2xl mx-auto">${this.subtitle}</p>` : ''}
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
        if (!target) {
            console.error(`❌ FAQ Accordion: Elemento com id "${targetId}" não encontrado`);
            return;
        }

        const html = this.render();
        if (!html) {
            console.error('❌ FAQ Accordion: Erro ao renderizar componente');
            return;
        }

        target.innerHTML = html;

        const items = target.querySelectorAll('.faq-item');
        items.forEach(item => {
            const btn = item.querySelector('.faq-toggle');
            const content = item.querySelector('.faq-content-wrapper');
            const chevronContainer = item.querySelector('.faq-chevron-container');

            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Fecha outros itens (Comportamento exclusivo) com animação
                items.forEach(other => {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                        const otherChevron = other.querySelector('.faq-chevron-container');
                        setTimeout(() => {
                            otherChevron.style.backgroundColor = '#ffffff';
                            otherChevron.style.color = '#94a3b8'; // slate-400
                        }, 150);
                    }
                });

                // Abre/fecha o item atual com animação
                if (isActive) {
                    item.classList.remove('active');
                    setTimeout(() => {
                        chevronContainer.style.backgroundColor = '#ffffff';
                        chevronContainer.style.color = '#94a3b8';
                    }, 150);
                } else {
                    item.classList.add('active');
                    setTimeout(() => {
                        chevronContainer.style.backgroundColor = this.primaryHex;
                        chevronContainer.style.color = '#ffffff';
                    }, 50);
                }
            });
        });

        // Inicializa ícones
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    static create(data, targetId) {
        const component = new FaqAccordionComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('faq-accordion', FaqAccordionComponent);
}