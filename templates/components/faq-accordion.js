/**
 * FAQ Accordion Component
 * Seção de perguntas frequentes com accordion
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
        this.title = data.title || 'Perguntas Frequentes';
        // Aceita tanto 'items' quanto 'questions' para compatibilidade
        this.items = data.items || data.questions || [];

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        const backgroundHex = this.resolveColorHex(data.colors?.background, 'background', '#0f0f13');
        this.isLightTheme = this.isLightColor(backgroundHex);
        this.textColor = this.getBestTextColor(backgroundHex, 4.5);

        // Resolve cores de texto do tema
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
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('faq-accordion-styles')) return;

        const style = document.createElement('style');
        style.id = 'faq-accordion-styles';
        style.textContent = `
            .faq-section {
                padding: 80px 0;
                position: relative;
                z-index: 10;
            }
            .faq-title {
                font-size: 1.875rem;
                font-weight: 700;
                margin-bottom: 40px;
                text-align: center;
                color: ${this.textColor};
            }
            .faq-list {
                display: flex;
                flex-direction: column;
                gap: 16px;
                max-width: 48rem;
                margin: 0 auto;
            }
            .faq-item {
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.02) : this.hexToRgba('#FFFFFF', 0.05)};
                border: 1px solid ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.1) : this.hexToRgba('#FFFFFF', 0.05)};
                border-radius: 0.75rem;
                overflow: hidden;
                backdrop-filter: blur(4px);
            }
            .faq-button {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                text-align: left;
                font-weight: 500;
                color: ${this.textColor};
                background: transparent;
                border: none;
                cursor: pointer;
                transition: background 0.3s;
            }
            .faq-button:hover {
                background: ${this.isLightTheme ? this.hexToRgba(this.textDark, 0.05) : this.hexToRgba('#FFFFFF', 0.05)};
            }
            .faq-icon {
                width: 20px;
                height: 20px;
                transition: transform 0.3s, color 0.3s;
                color: ${this.textColor};
            }
            .faq-content {
                transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
                max-height: 0;
                overflow: hidden;
                padding: 0 20px;
            }
            .faq-content.active {
                max-height: 200px;
                padding: 0 20px 20px;
            }
            .faq-answer {
                color: ${this.isLightTheme ? this.textMedium : '#9CA3AF'};
                padding-bottom: 20px;
            }
            .faq-item.active .faq-icon {
                transform: rotate(180deg);
                color: ${this.primaryHex};
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

        const itemsHtml = this.items.map((item, index) => `
            <div class="faq-item" data-faq-index="${index}">
                <button class="faq-button">
                    ${item.question}
                    <i data-lucide="chevron-down" class="faq-icon"></i>
                </button>
                <div class="faq-content">
                    <p class="faq-answer">${item.answer}</p>
                </div>
            </div>
        `).join('');

        return `
            <section class="faq-section container mx-auto px-6">
                <h2 class="faq-title">${this.title}</h2>
                <div class="faq-list">
                    ${itemsHtml}
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
            this.attachEventListeners();
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    /**
     * Adiciona event listeners
     */
    attachEventListeners() {
        const faqButtons = document.querySelectorAll('.faq-button');

        faqButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const content = btn.nextElementSibling;
                const icon = btn.querySelector('.faq-icon');

                // Close others
                document.querySelectorAll('.faq-item').forEach(el => {
                    if (el !== item) {
                        el.classList.remove('active');
                        el.querySelector('.faq-content').classList.remove('active');
                        const otherIcon = el.querySelector('.faq-icon');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                            otherIcon.style.color = this.textColor;
                        }
                    }
                });

                // Toggle current
                item.classList.toggle('active');
                content.classList.toggle('active');

                if (item.classList.contains('active')) {
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                        icon.style.color = this.primaryHex;
                    }
                } else {
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                        icon.style.color = this.textColor;
                    }
                }
            });
        });
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {FaqAccordionComponent} Instância do componente
     */
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

