/**
 * Footer Contact Component
 * Footer com informações de contato, redes sociais e mapa
 */

class FooterContactComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Footer
     * @param {string} data.title - Título da seção
     * @param {Object} data.address - Informações de endereço
     * @param {string} data.address.label - Label do endereço (ex: "Endereço")
     * @param {string} data.address.street - Rua e número
     * @param {string} data.address.city - Cidade/bairro
     * @param {string} data.address.zipCode - CEP
     * @param {string} data.address.mapQuery - Query para Google Maps
     * @param {Object} data.contact - Informações de contato
     * @param {string} data.contact.label - Label do contato (ex: "Contato")
     * @param {string} data.contact.phone - Telefone
     * @param {Array} data.socialLinks - Array de links de redes sociais
     * @param {string} data.socialLinks[].icon - Classe do ícone (ex: 'fab fa-instagram')
     * @param {string} data.socialLinks[].href - Link da rede social
     * @param {string} data.socialLinks[].label - Label acessível
     * @param {string} data.copyright - Texto de copyright
     * @param {Array} data.tags - Tags/categorias do footer (opcional)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'gray', 'brand-cream')
     * @param {string} data.colors.titleColor - Cor do título base (ex: 'gray', 'brand-dark')
     * @param {string} data.colors.textColor - Cor do texto base (ex: 'gray')
     * @param {string} data.colors.textStrong - Cor do texto forte base (ex: 'gray')
     * @param {string} data.colors.textMuted - Cor do texto muted base (ex: 'gray')
     * @param {string} data.colors.iconColor - Cor dos ícones base (ex: 'green', 'brand-dark')
     * @param {string} data.colors.borderColor - Cor das bordas base (ex: 'gray', 'brand-dark')
     */
    constructor(data) {
        super();
        this.title = data.title;
        this.address = data.address || {};
        this.contact = data.contact || {};
        this.socialLinks = data.socialLinks || [];
        this.copyright = data.copyright;
        this.tags = data.tags || [];

        // Colors com variações automáticas (seguindo padrão do HERO)
        const bgBase = data.colors?.background || 'brand-cream';
        const titleBase = data.colors?.titleColor || 'brand-dark';
        const textBase = data.colors?.textColor || 'gray';
        const textStrongBase = data.colors?.textStrong || 'gray';
        const textMutedBase = data.colors?.textMuted || 'gray';
        const iconBase = data.colors?.iconColor || 'brand-dark';
        const borderBase = data.colors?.borderColor || 'brand-dark';

        // Aplica variações automáticas conforme o contexto (NÃO sobrescreve com ...data.colors)
        this.colors = {
            background: bgBase === 'white' ? 'white' : this.getColorVariant(bgBase, 50),
            titleColor: this.getColorVariant(titleBase, 900),
            textColor: this.getColorVariant(textBase, 700),
            textStrong: this.getColorVariant(textStrongBase, 900),
            textMuted: this.getColorVariant(textMutedBase, 600),
            iconColor: this.getColorVariant(iconBase, 600),
            borderColor: this.getColorVariant(borderBase, 300),
        };
    }

    /**
     * Renderiza um link de rede social
     * @param {Object} link - Dados do link
     * @returns {string} HTML do link
     */
    renderSocialLink(link) {
        const c = this.colors;

        return `
            <a href="${link.href}"
               target="_blank"
               aria-label="${link.label}"
               class="w-12 h-12 rounded-full border border-${c.borderColor} text-${c.iconColor} flex items-center justify-center hover:bg-${c.iconColor} hover:text-white transition-all">
                <i class="${link.icon} text-xl"></i>
            </a>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const socialLinksHtml = this.socialLinks.map(link => this.renderSocialLink(link)).join('');
        const tagsHtml = this.tags.map((tag, index) => {
            const separator = index > 0 ? '<span class="mx-2">•</span>' : '';
            return `${separator}<span>${tag}</span>`;
        }).join('');

        // Gera URL do mapa do Google Maps
        const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(this.address.mapQuery || this.address.street)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

        return `
            <footer id="location" class="bg-${c.background} border-t border-${c.borderColor}/10 pt-16 md:pt-20 pb-10">
                <div class="container mx-auto px-6">
                    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <!-- Contact Info -->
                        <div>
                            <h3 class="font-serif text-2xl md:text-3xl text-${c.titleColor} mb-6 font-medium">
                                ${this.title}
                            </h3>

                            <address class="not-italic text-${c.textColor} space-y-4 mb-8">
                                <!-- Address -->
                                ${this.address.street ? `
                                    <div class="flex items-start gap-4">
                                        <i class="fas fa-map-pin mt-1 text-${c.iconColor}"></i>
                                        <div>
                                            <strong class="block text-${c.textStrong} mb-1">${this.address.label}</strong>
                                            <span>${this.address.street}</span><br>
                                            <span>${this.address.city}</span><br>
                                            ${this.address.zipCode ? `<span>${this.address.zipCode}</span>` : ''}
                                        </div>
                                    </div>
                                ` : ''}

                                <!-- Contact -->
                                ${this.contact.phone ? `
                                    <div class="flex items-start gap-4">
                                        <i class="fas fa-phone-alt mt-1 text-${c.iconColor}"></i>
                                        <div>
                                            <strong class="block text-${c.textStrong} mb-1">${this.contact.label}</strong>
                                            <span>${this.contact.phone}</span>
                                        </div>
                                    </div>
                                ` : ''}
                            </address>

                            <!-- Social Links -->
                            ${this.socialLinks.length > 0 ? `
                                <div class="flex gap-4">
                                    ${socialLinksHtml}
                                </div>
                            ` : ''}
                        </div>

                        <!-- Map -->
                        ${this.address.mapQuery ? `
                            <a href="https://maps.google.com/?q=${encodeURIComponent(this.address.mapQuery)}"
                               target="_blank"
                               class="block h-80 w-full bg-gray-200 rounded-2xl overflow-hidden relative group shadow-inner">
                                <iframe
                                    src="${mapEmbedUrl}"
                                    width="100%"
                                    height="100%"
                                    frameborder="0"
                                    scrolling="no"
                                    marginheight="0"
                                    marginwidth="0"
                                    class="grayscale group-hover:grayscale-0 transition-all duration-500">
                                </iframe>
                                <div class="absolute inset-0 bg-${c.iconColor}/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                            </a>
                        ` : ''}
                    </div>

                    <!-- Bottom Bar -->
                    <div class="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-${c.textMuted} gap-4">
                        <p>${this.copyright}</p>
                        ${this.tags.length > 0 ? `
                            <div class="flex flex-wrap justify-center items-center gap-1">
                                ${tagsHtml}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Monta o componente no DOM
     * @param {string} targetId - ID do elemento onde o componente será montado
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {FooterContactComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new FooterContactComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('footer-contact', FooterContactComponent);
}

