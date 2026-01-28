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
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            id: 'contato',
            title: 'HS Martins Empreendimentos Imobiliários Ltda.',
            address: {
                label: 'Localização',
                street: 'Av. Leonor Bolsoni Marques da Silva, 230',
                city: 'Centro - Poá / SP',
                zipCode: 'CEP: 08557-000',
                mapQuery: 'Av. Leonor Bolsoni Marques da Silva, 230, Poá'
            },
            contact: {
                label: 'Contato',
                phone: '(11) 4638-2942',
                email: 'contato@hsmartins.com.br',
                hours: 'Atendimento: Segunda á Sexta-feira - 09:00 ás 17:00 hs | Sábado - 09:00 ás 12:00 hs'
            },
            socialLinks: [
                { icon: 'fab fa-facebook', href: 'https://facebook.com/hsmartins', label: 'Facebook' },
                { icon: 'fab fa-instagram', href: 'https://instagram.com/hsmartins', label: 'Instagram' },
                { icon: 'fab fa-whatsapp', href: 'https://wa.me/551146382942', label: 'WhatsApp' }
            ],
            copyright: 'www.hsmartins.com.br © 2026. Todos os direitos reservados.',
            tags: ['Imobiliária Poá', 'Imóveis Poá', 'Venda de Imóveis', 'Financiamento Imobiliário']
        };
        
        this.id = data.id || defaults.id;
        this.title = data.title || defaults.title;
        this.address = data.address || defaults.address;
        this.contact = data.contact || defaults.contact;
        this.socialLinks = data.socialLinks || defaults.socialLinks;
        this.copyright = data.copyright || defaults.copyright;
        this.tags = data.tags || defaults.tags;

        // Resolve cores hexadecimais para usar em estilos inline
        const bgHex = this.resolveColorHex(data.colors?.background, 'background', '#FFFFFF');
        const titleHex = this.resolveColorHex(data.colors?.titleColor, 'primary', '#1F2937');
        const textHex = this.resolveColorHex(data.colors?.textColor, null, '#4B5563');
        const textStrongHex = this.resolveColorHex(data.colors?.textStrong, 'primary', '#1F2937');
        const textMutedHex = this.resolveColorHex(data.colors?.textMuted, null, '#6B7280');
        const iconHex = this.resolveColorHex(data.colors?.iconColor, 'primary', '#DC2626');
        const borderHex = this.resolveColorHex(data.colors?.borderColor, null, '#D1D5DB');

        // Armazena cores hexadecimais para usar em estilos inline
        this.colors = {
            background: bgHex,
            titleColor: titleHex,
            textColor: textHex,
            textStrong: textStrongHex,
            textMuted: textMutedHex,
            iconColor: iconHex,
            borderColor: borderHex,
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
               style="width: 3rem; height: 3rem; border: 1px solid ${c.borderColor}; color: ${c.iconColor};"
               class="rounded-full flex items-center justify-center transition-all hover:opacity-80"
               onmouseover="this.style.backgroundColor='${c.iconColor}'; this.style.color='white';"
               onmouseout="this.style.backgroundColor='transparent'; this.style.color='${c.iconColor}';">
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
            <footer id="location" style="background-color: ${c.background}; border-top: 1px solid ${this.hexToRgba(c.borderColor, 0.1)};" class="pt-16 md:pt-20 pb-10">
                <div class="container mx-auto px-6">
                    <div class="grid md:grid-cols-2 gap-12 items-start mb-16">
                        <!-- Contact Info -->
                        <div>
                            <h3 style="color: ${c.titleColor};" class="font-serif text-2xl md:text-3xl mb-6 font-medium">
                                ${this.title}
                            </h3>

                            <address style="color: ${c.textColor};" class="not-italic space-y-4 mb-8">
                                <!-- Address -->
                                ${this.address.street ? `
                                    <div class="flex items-start gap-4">
                                        <i style="color: ${c.iconColor};" class="fas fa-map-pin mt-1"></i>
                                        <div>
                                            <strong style="color: ${c.textStrong};" class="block mb-1">${this.address.label}</strong>
                                            <span>${this.address.street}</span><br>
                                            <span>${this.address.city}</span><br>
                                            ${this.address.zipCode ? `<span>${this.address.zipCode}</span>` : ''}
                                        </div>
                                    </div>
                                ` : ''}

                                <!-- Contact -->
                                ${this.contact.phone ? `
                                    <div class="flex items-start gap-4">
                                        <i style="color: ${c.iconColor};" class="fas fa-phone-alt mt-1"></i>
                                        <div>
                                            <strong style="color: ${c.textStrong};" class="block mb-1">${this.contact.label}</strong>
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
                                    style="filter: grayscale(100%); transition: filter 0.5s;"
                                    onmouseover="this.style.filter='grayscale(0%)';"
                                    onmouseout="this.style.filter='grayscale(100%)';">
                                </iframe>
                                <div style="background-color: ${this.hexToRgba(c.iconColor, 0.1)}; transition: background-color 0.3s;"
                                     class="absolute inset-0 pointer-events-none"
                                     onmouseover="this.style.backgroundColor='transparent';"
                                     onmouseout="this.style.backgroundColor='${this.hexToRgba(c.iconColor, 0.1)}';"></div>
                            </a>
                        ` : ''}
                    </div>

                    <!-- Bottom Bar -->
                    <div style="border-top: 1px solid ${c.borderColor}; color: ${c.textMuted};" class="pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
                        <div class="flex flex-col md:flex-row items-center gap-2">
                            ${this.copyright ? `<p>${this.copyright}</p>` : ''}
                            ${this.copyright ? '<span>•</span>' : ''}
                            <p>
                                Feito por: <a href="https://www.axolutions.com.br" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition" style="color: ${c.iconColor};">www.axolutions.com.br</a>
                            </p>
                        </div>
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

