/**
 * Footer E-commerce Advanced Component
 * Footer completo para e-commerce com múltiplas colunas, newsletter e redes sociais
 */

class FooterEcommerceAdvancedComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Object} data.brand - { logoText: string, logoIcon?: string, logoUrl?: string, description: string }
     * @param {Array} data.socialLinks - Array de redes sociais { icon: string, href: string }
     * @param {Array} data.columns - Array de colunas { title: string, links: Array<{ text: string, href: string }> }
     * @param {Object} data.newsletter - { title: string, description: string, placeholder: string, buttonText: string }
     * @param {string} data.copyright - Texto de copyright
     * @param {Array} data.paymentMethods - Array de ícones de métodos de pagamento { icon: string }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.brand = data.brand || {};
        this.socialLinks = data.socialLinks || [];
        this.columns = data.columns || [];
        this.newsletter = data.newsletter || {};
        this.copyright = data.copyright || '';
        this.paymentMethods = data.paymentMethods || [];

        // Resolve cores com contraste adequado (fundo escuro, texto claro)
        const bgHex = this.resolveColorHex(data.colors?.background, 'background', '#111827');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');
        const primaryLightHex = this.lightenColor(primaryHex, 0.2);

        this.colors = {
            background: bgHex,
            primary: primaryHex,
            primaryLight: primaryLightHex,
            text: '#FFFFFF', // Sempre branco em fundo escuro
            textSecondary: '#9CA3AF', // Cinza claro para contraste adequado
            border: '#374151'
        };
    }

    render() {
        const c = this.colors;
        const logoHtml = this.brand.logoUrl
            ? `<img src="${this.brand.logoUrl}" alt="${this.brand.logoText}" class="h-8 w-auto">`
            : `<div class="flex items-center gap-2">
                ${this.brand.logoIcon ? `<div class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xl" style="background-color: ${c.primary};">${this.brand.logoIcon}</div>` : ''}
                <span class="text-2xl font-bold tracking-tight text-white">${this.brand.logoText || 'Store'}<span style="color: ${c.primary};">.</span></span>
               </div>`;

        const socialLinksHtml = this.socialLinks.map(social => `
            <a href="${social.href}" class="w-10 h-10 rounded-full flex items-center justify-center transition text-white hover:opacity-90" style="background-color: ${c.primary};">
                <i class="${social.icon}"></i>
            </a>
        `).join('');

        const columnsHtml = this.columns.map(col => `
            <div>
                <h4 class="text-white font-bold mb-6">${col.title}</h4>
                <ul class="space-y-3 text-sm">
                    ${col.links.map(link => `
                        <li><a href="${link.href}" class="transition hover:opacity-80" style="color: ${c.primaryLight};">${link.text}</a></li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        const paymentMethodsHtml = this.paymentMethods.map(pm => `
            <i class="${pm.icon} hover:text-white transition"></i>
        `).join('');

        return `
            <footer class="bg-gray-900 text-gray-300 pt-16 pb-8" style="background-color: ${c.background};">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        <!-- Brand Info -->
                        <div>
                            <a href="#" class="flex items-center gap-2 mb-6">
                                ${logoHtml}
                            </a>
                            ${this.brand.description ? `
                                <p class="text-sm text-gray-400 mb-6 leading-relaxed">${this.brand.description}</p>
                            ` : ''}
                            ${this.socialLinks.length > 0 ? `
                                <div class="flex gap-4">
                                    ${socialLinksHtml}
                                </div>
                            ` : ''}
                        </div>

                        ${columnsHtml}

                        <!-- Newsletter -->
                        ${this.newsletter.title ? `
                            <div>
                                <h4 class="text-white font-bold mb-6">${this.newsletter.title}</h4>
                                ${this.newsletter.description ? `
                                    <p class="text-sm text-gray-400 mb-4">${this.newsletter.description}</p>
                                ` : ''}
                                <form class="flex flex-col gap-3">
                                    <input type="email"
                                           placeholder="${this.newsletter.placeholder || 'Seu melhor e-mail'}"
                                           class="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none text-sm"
                                           style="border-color: ${c.primary};">
                                    <button class="text-white px-4 py-3 rounded-lg font-bold transition text-sm uppercase tracking-wide hover:opacity-90" style="background-color: ${c.primary};">
                                        ${this.newsletter.buttonText || 'Inscrever-se'}
                                    </button>
                                </form>
                            </div>
                        ` : ''}
                    </div>

                    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style="border-color: ${c.border};">
                        ${this.copyright ? `<p class="text-sm text-gray-500">${this.copyright}</p>` : ''}
                        ${this.paymentMethods.length > 0 ? `
                            <div class="flex gap-4 text-2xl text-gray-500">
                                ${paymentMethodsHtml}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </footer>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
        }
    }

    static create(data, targetId) {
        const component = new FooterEcommerceAdvancedComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('footer-ecommerce-advanced', FooterEcommerceAdvancedComponent);
}

