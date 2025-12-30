/**
 * Benefits Grid Component
 * Grid de benefícios com ícones, títulos e descrições
 * Genérico para destacar vantagens, benefícios, características
 */

class BenefitsGridComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Benefits Grid
     * @param {Array} data.benefits - Array de benefícios
     * @param {string} data.benefits[].icon - Classe do ícone ou nome do ícone Lucide (ex: 'credit-card', 'zap', 'truck')
     * @param {string} data.benefits[].iconType - Tipo do ícone: 'lucide' ou 'fontawesome' (padrão: 'lucide')
     * @param {string} data.benefits[].title - Título do benefício
     * @param {string} data.benefits[].description - Descrição do benefício
     * @param {number} data.columns - Número de colunas no grid (padrão: 3)
     * @param {Object} data.colors - Cores customizáveis (opcional)
     * @param {string} data.colors.background - Cor de fundo base (ex: 'white', 'gray')
     * @param {string} data.colors.iconBackground - Cor de fundo do ícone (ex: 'gray', 'primary')
     * @param {string} data.colors.title - Cor do título base (ex: 'black', 'primary')
     */
    constructor(data) {
        super();
        this.benefits = data.benefits || [];
        this.columns = data.columns || 3;

        // Resolve cores base (override > tema > fallback)
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const iconBgBase = data.colors?.iconBackground || 'primary';
        const titleBase = this.resolveColor(data.colors?.title, 'primary', 'black');

        // Para o background do ícone, usa a cor primária em versão clara
        // SEMPRE pega do tema, nunca usa valores fixos
        const theme = this.getGlobalTheme();
        const primaryHexForBg = theme?.colors?.primary;

        let iconBgColor;
        if (iconBgBase === 'primary' && primaryHexForBg) {
            // Usa a cor primária em versão clara para o background
            iconBgColor = this.lightenColor(primaryHexForBg, 0.85); // Versão muito clara da cor primária
        } else if (iconBgBase === 'gray' || iconBgBase === 'gray-50') {
            iconBgColor = '#f3f4f6'; // gray-50
        } else {
            // Tenta pegar do tema primeiro
            const customColor = theme?.colors?.[iconBgBase] || this.getThemeColorHex(iconBgBase);
            if (customColor) {
                iconBgColor = customColor;
                // Se não for uma cor clara, clareia ela
                if (!iconBgBase.includes('gray') && !iconBgBase.includes('50')) {
                    iconBgColor = this.lightenColor(iconBgColor, 0.85);
                }
            } else {
                // Fallback apenas para gray
                iconBgColor = '#f3f4f6';
            }
        }

        // Aplica variações automáticas conforme o contexto
        // Para o ícone, SEMPRE usa a cor primária do tema - SEM FALLBACK FIXO
        // Pega SEMPRE do tema, nunca usa valores fixos
        const primaryHex = theme?.colors?.primary;

        if (!primaryHex) {
            console.error('❌ Cor primária não encontrada no tema! Verifique o config.json');
        }

        this.colors = {
            background: bgBase,
            iconBackground: iconBgColor,
            icon: primaryHex, // SEMPRE cor primária do tema
            title: titleBase === 'black' ? '#000000' : primaryHex, // Título também usa primary
            description: '#6b7280', // gray-500
        };

        // Debug: verifica se a cor foi definida
        if (this.colors.icon) {
            console.log('✅ Cor do ícone definida:', this.colors.icon);
        } else {
            console.error('❌ Cor do ícone não definida!');
        }

        // Injeta estilos se necessário
        this.injectStyles();
    }

    /**
     * Injeta estilos CSS customizados
     */
    injectStyles() {
        if (document.getElementById('benefits-grid-styles')) return;

        const style = document.createElement('style');
        style.id = 'benefits-grid-styles';
        style.textContent = `
            .benefit-card {
                transition: box-shadow 0.3s;
            }
            .benefit-card:hover {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o ícone
     * @param {Object} benefit - Dados do benefício
     * @returns {string} HTML do ícone
     */
    renderIcon(benefit) {
        const c = this.colors;
        const icon = benefit.icon || '';

        // Detecta automaticamente o tipo de ícone
        let iconType = benefit.iconType;
        if (!iconType) {
            // Se contém "fa-" ou começa com "fa", "fas", "far", "fal", "fab", é FontAwesome
            const iconLower = icon.toLowerCase().trim();
            if (iconLower.includes('fa-') || iconLower.startsWith('fas ') || iconLower.startsWith('far ') ||
                iconLower.startsWith('fal ') || iconLower.startsWith('fab ') || iconLower.startsWith('fa ')) {
                iconType = 'fontawesome';
            } else {
                // Caso contrário, assume Lucide
                iconType = 'lucide';
            }
        }

        // Resolve cor do ícone em hex para usar em style inline
        // SEMPRE usa a cor primária do tema
        const iconColorHex = c.icon;

        if (!iconColorHex) {
            console.warn('⚠️ Cor do ícone não definida. Verificando tema...');
            const theme = this.getGlobalTheme();
            const fallbackColor = theme?.colors?.primary;
            if (!fallbackColor) {
                console.error('❌ Cor primária não encontrada no tema!');
            }
        }

        if (iconType === 'fontawesome') {
            // FontAwesome - usa classes e style inline para garantir visibilidade
            // Garante que a classe está correta (pode ter espaços extras)
            const cleanIcon = icon.trim();
            const finalColor = iconColorHex || this.getGlobalTheme()?.colors?.primary || '#6d28d9';
            return `<i class="${cleanIcon}" style="font-size: 1.75rem; color: ${finalColor} !important; display: inline-block; width: 1.75rem; height: 1.75rem; line-height: 1.75rem; text-align: center;"></i>`;
        } else if (iconType === 'lucide' && typeof lucide !== 'undefined') {
            // Ícone Lucide será renderizado via data-lucide
            const finalColor = iconColorHex || this.getGlobalTheme()?.colors?.primary || '#6d28d9';
            return `<i data-lucide="${icon}" class="w-8 h-8" style="color: ${finalColor} !important;"></i>`;
        } else {
            // Fallback para FontAwesome se não detectou corretamente
            const cleanIcon = icon.trim();
            const finalColor = iconColorHex || this.getGlobalTheme()?.colors?.primary || '#6d28d9';
            return `<i class="${cleanIcon}" style="font-size: 1.75rem; color: ${finalColor} !important; display: inline-block; width: 1.75rem; height: 1.75rem; line-height: 1.75rem; text-align: center;"></i>`;
        }
    }

    /**
     * Renderiza um benefício individual
     * @param {Object} benefit - Dados do benefício
     * @returns {string} HTML do benefício
     */
    renderBenefit(benefit) {
        const c = this.colors;

        return `
            <div class="flex flex-col items-center text-center p-6 border border-gray-100 rounded-lg benefit-card">
                <div class="p-4 rounded-full mb-4 flex items-center justify-center w-16 h-16" style="background-color: ${c.iconBackground};">
                    ${this.renderIcon(benefit)}
                </div>
                <h4 class="font-bold text-lg mb-2" style="color: ${c.title};">
                    ${benefit.title}
                </h4>
                <p class="text-sm" style="color: ${c.description};">
                    ${benefit.description}
                </p>
            </div>
        `;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string do componente
     */
    render() {
        const c = this.colors;
        const gridCols = `grid-cols-1 md:grid-cols-${this.columns}`;
        const benefitsHtml = this.benefits.map(benefit => this.renderBenefit(benefit)).join('');

        return `
            <section class="py-16 border-b border-gray-100">
                <div class="container mx-auto px-4 grid ${gridCols} gap-8">
                    ${benefitsHtml}
                </div>
            </section>
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
            // Inicializa ícones Lucide se disponível
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    /**
     * Método estático para criar e montar o componente
     * @param {Object} data - Dados necessários
     * @param {string} targetId - ID do elemento onde o componente será montado
     * @returns {BenefitsGridComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new BenefitsGridComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('benefits-grid', BenefitsGridComponent);
}

