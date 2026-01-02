/**
 * Benefits Grid Component
 * Grid de benefícios com design moderno e limpo (Modern Clean)
 */

class BenefitsGridComponent extends BaseComponent {
    constructor(data) {
        super();
        this.id = data.id || '';
        this.tag = data.tag || '';
        this.title = data.title || '';
        this.description = data.description || '';
        this.paragraphs = data.paragraphs || [];

        // Normaliza os benefícios para suportar tanto 'text' quanto 'title'/'description'
        this.benefits = (data.benefits || []).map(benefit => ({
            icon: benefit.icon || '',
            title: benefit.title || benefit.text || '',
            description: benefit.description || '',
            text: benefit.text || benefit.title || '' // Mantém compatibilidade
        }));

        this.columns = data.columns || 3;

        // Resolve cores usando o sistema de cores do site
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#2563eb');
        const bgHex = this.resolveColorHex(data.colors?.background, 'background', '#ffffff');
        const primary50Hex = this.hexToRgba(primaryHex, 0.1);

        this.colors = {
            background: bgBase,
            backgroundHex: bgHex,
            primary: primaryHex,
            primary50: primary50Hex,
            title: 'gray-900',
            description: 'gray-600'
        };
    }


    getDefaultIcon(index) {
        // Ícones variados baseados no índice para evitar repetição
        const icons = [
            'fas fa-rocket',
            'fas fa-lightbulb',
            'fas fa-shield-alt',
            'fas fa-chart-line',
            'fas fa-users',
            'fas fa-cog',
            'fas fa-star',
            'fas fa-heart',
            'fas fa-trophy',
            'fas fa-gem',
            'fas fa-bolt',
            'fas fa-fire'
        ];
        return icons[index % icons.length];
    }

    renderBenefit(benefit, index) {
        const c = this.colors;
        const benefitTitle = benefit.title || benefit.text || '';
        const benefitDescription = benefit.description || '';
        // Usa o ícone fornecido ou um ícone padrão variado
        const icon = benefit.icon || this.getDefaultIcon(index);
        const isEven = index % 2 === 0;
        const alignment = isEven ? 'lg:flex-row' : 'lg:flex-row-reverse';
        const textAlign = isEven ? 'lg:text-left' : 'lg:text-right';

        return `
            <div class="group relative mb-16 lg:mb-20 last:mb-0">
                <div class="flex flex-col ${alignment} items-center gap-8 lg:gap-12">
                    <!-- Ícone com número -->
                    <div class="relative flex-shrink-0">
                        <div class="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style="background: linear-gradient(135deg, ${c.primary} 0%, ${this.darkenColor(c.primary, 0.15)} 100%); box-shadow: 0 10px 30px ${this.hexToRgba(c.primary, 0.3)};">
                            <i class="${icon} text-2xl lg:text-3xl text-white"></i>
                        </div>
                        <div class="absolute -top-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-white text-sm lg:text-base" style="background-color: ${c.primary};">
                            ${index + 1}
                        </div>
                    </div>
                    
                    <!-- Conteúdo -->
                    <div class="flex-1 ${textAlign} text-center lg:text-left max-w-xl">
                        ${benefitTitle ? `
                            <h3 class="font-bold text-xl lg:text-2xl text-gray-900 mb-2 leading-tight">
                                ${benefitTitle}
                            </h3>
                        ` : ''}
                        ${benefitDescription ? `
                            <p class="text-sm lg:text-base text-gray-600 leading-relaxed">
                                ${benefitDescription}
                            </p>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Linha conectora decorativa (apenas desktop) -->
                ${index < this.benefits.length - 1 ? `
                    <div class="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-8" style="top: 100px;">
                        <div class="w-0.5 h-16" style="background: linear-gradient(to bottom, ${c.primary}, transparent);"></div>
                        <div class="absolute left-1/2 transform -translate-x-1/2 -top-2 w-4 h-4 rounded-full" style="background-color: ${c.primary};"></div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    render() {
        const c = this.colors;
        const benefitsHtml = this.benefits.map((b, i) => this.renderBenefit(b, i)).join('');

        return `
            <section id="${this.id || ''}" class="py-16 lg:py-24 px-4 sm:px-6 lg:px-8" style="background-color: ${c.backgroundHex};">
                <div class="max-w-4xl mx-auto">
                    ${this.tag || this.title || this.description || this.paragraphs.length > 0 ? `
                        <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                            ${this.tag ? `
                                <span class="inline-block px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider mb-6" style="background-color: ${c.primary50}; color: ${c.primary};">
                                    ${this.tag}
                                </span>
                            ` : ''}
                            ${this.title ? `
                                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    ${this.title}
                                </h2>
                            ` : ''}
                            ${this.description ? `
                                <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                                    ${this.description}
                                </p>
                            ` : ''}
                            ${this.paragraphs.length > 0 ? this.paragraphs.map(p => `
                                <p class="text-base text-gray-600 mb-4 last:mb-0 leading-relaxed">
                                    ${p}
                                </p>
                            `).join('') : ''}
                        </div>
                    ` : ''}
                    <div class="relative">
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