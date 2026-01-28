/**
 * Contact Top Bar Component
 * Barra de contato no topo com informações e redes sociais
 */

class ContactTopBarComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     */
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            infoItems: [
                { icon: "fas fa-phone-alt", text: "(11) 4638-2942" },
                { icon: "fas fa-map-marker-alt", text: "Av. Leonor Bolsoni Marques da Silva, 230, Poá - SP" },
                { icon: "fas fa-clock", text: "Seg-Sex: 9h às 17h | Sáb: 9h às 12h" }
            ],
            socialLinks: [
                { icon: "fab fa-facebook", href: "https://facebook.com/hsmartins" },
                { icon: "fab fa-instagram", href: "https://instagram.com/hsmartins" },
                { icon: "fab fa-whatsapp", href: "https://wa.me/551146382942" }
            ]
        };

        this.infoItems = data.infoItems || defaults.infoItems;
        this.socialLinks = data.socialLinks || defaults.socialLinks;

        const theme = this.getGlobalTheme();
        this.backgroundColor = theme?.colors?.primary || '#3A47E5';
        this.textColor = '#FFFFFF';
    }

    render() {
        const infoItemsHtml = this.infoItems
            .map(item => `
                <div class="flex items-center space-x-2">
                    <i class="${item.icon} text-sm"></i>
                    <span class="text-sm">${item.text}</span>
                </div>
            `)
            .join('');

        const socialLinksHtml = this.socialLinks
            .map(link => `
                <a href="${link.href}" target="_blank" rel="noopener noreferrer" 
                   class="hover:opacity-80 transition-opacity">
                    <i class="${link.icon} text-lg"></i>
                </a>
            `)
            .join('');

        return `
            <div class="w-full py-2 px-4" style="background-color: ${this.backgroundColor}; color: ${this.textColor};">
                <div class="container mx-auto">
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <div class="flex flex-wrap items-center gap-4 md:gap-6">
                            ${infoItemsHtml}
                        </div>
                        <div class="flex items-center space-x-4">
                            ${socialLinksHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Registro do componente
if (typeof window !== 'undefined' && window.ComponentRegistry) {
    window.ComponentRegistry.register('contact-top-bar', ContactTopBarComponent);
}
