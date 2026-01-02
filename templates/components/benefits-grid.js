/**
 * Benefits Flow Component (Compact & Elegant)
 * - Fontes reduzidas para um visual mais delicado e profissional
 * - Ícones redimensionados proporcionalmente
 * - Mantém a largura total e o layout fluido
 */

class BenefitsGridComponent extends BaseComponent {
    constructor(data) {
        super();
        this.benefits = data.benefits || [];
        this.columns = data.columns || 3;

        // --- CORES & TEMA ---
        const theme = this.getGlobalTheme();
        const primaryHex = theme?.colors?.primary || '#6d28d9';
        const titleBase = this.resolveColor(data.colors?.title, 'primary', '#111827');

        // Gradiente de Fundo (Mantido)
        let backgroundStyle;
        if (data.colors?.background && data.colors.background !== 'transparent') {
            backgroundStyle = `background-color: ${data.colors.background};`;
        } else {
            backgroundStyle = `background: linear-gradient(135deg, #ffffff 0%, ${primaryHex}08 50%, #ffffff 100%);`;
        }

        // Estilo do Ícone (Squircle)
        const iconBgStyle = `background-color: ${primaryHex}1A; color: ${primaryHex};`;

        this.colors = {
            backgroundStyle: backgroundStyle,
            iconBgStyle: iconBgStyle,
            icon: primaryHex,
            title: titleBase,
            description: '#4b5563',
        };

        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('benefits-flow-styles')) return;

        const style = document.createElement('style');
        style.id = 'benefits-flow-styles';
        style.textContent = `
            .benefit-flow-row {
                /* Reduzi um pouco a margem inferior já que os itens são menores */
                margin-bottom: 3.5rem;
            }
            .benefit-flow-row:last-child {
                margin-bottom: 0;
            }

            .flow-icon-box {
                /* REDUÇÃO: de 4.5rem (72px) para 3.5rem (56px) */
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 0.75rem; /* Ajuste no arredondamento */
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            }

            .benefit-flow-row:hover .flow-icon-box {
                transform: scale(1.1) rotate(-3deg);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 768px) {
                .benefit-flow-row, .benefit-flow-row-reverse {
                    flex-direction: column !important;
                    align-items: flex-start !important;
                    text-align: left !important;
                }
                .benefit-flow-gap {
                    gap: 1rem !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    renderIcon(benefit) {
        let iconType = benefit.iconType;
        const icon = benefit.icon || '';
        if (!iconType) {
            const iconLower = icon.toLowerCase().trim();
            iconType = (iconLower.includes('fa-') || iconLower.startsWith('fas ')) ? 'fontawesome' : 'lucide';
        }

        // Ícones menores para harmonizar com o texto
        if (iconType === 'fontawesome') {
            return `<i class="${icon}" style="font-size: 1.25rem; color: inherit;"></i>`;
        } else {
            return `<i data-lucide="${icon}" class="w-6 h-6" style="color: inherit;"></i>`;
        }
    }

    renderBenefit(benefit, index) {
        const c = this.colors;
        const isEven = index % 2 === 0;
        const directionClass = isEven ? 'flex-row' : 'flex-row-reverse benefit-flow-row-reverse';

        return `
            <div class="benefit-flow-row flex ${directionClass} items-center gap-6 md:gap-16 benefit-flow-gap w-full group">

                <div class="flow-icon-box" style="${c.iconBgStyle}">
                    ${this.renderIcon(benefit)}
                </div>

                <div class="flex-1 text-left">
                    <h3 class="font-bold text-lg md:text-xl mb-2 tracking-tight leading-snug" style="color: ${c.title};">
                        ${benefit.title}
                    </h3>

                    <p class="text-sm md:text-base leading-relaxed text-gray-600 font-normal max-w-2xl" style="color: ${c.description};">
                        ${benefit.description}
                    </p>
                </div>
            </div>
        `;
    }

    render() {
        const benefitsHtml = this.benefits.map((b, i) => this.renderBenefit(b, i)).join('');

        return `
            <section class="py-20 md:py-24 w-full" style="${this.colors.backgroundStyle}">
                <div class="container mx-auto px-4 md:px-8">
                    <div class="flex flex-col w-full">
                        ${benefitsHtml}
                    </div>
                </div>
            </section>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    static create(data, targetId) {
        const component = new BenefitsGridComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('benefits-grid', BenefitsGridComponent);
    window.componentRegistry.register('benefits-flow', BenefitsGridComponent);
}