/**
 * Base Component
 * Classe base para todos os componentes com funcionalidades compartilhadas
 *
 * Fornece sistema de inferência de cores baseado no tema global quando não há override.
 * Segue princípios SOLID:
 * - Single Responsibility: Resolve cores do tema
 * - Open/Closed: Aberto para extensão via getDefaultColorMapping(), fechado para modificação
 * - Dependency Inversion: Componentes dependem da abstração (tema global)
 */

class BaseComponent {
    /**
     * Helper para aplicar variação de cor automaticamente
     * @param {string} colorBase - Nome base da cor (ex: 'purple', 'green', 'brand-dark')
     * @param {number} variant - Variação desejada (50-900)
     * @returns {string} Cor com variação aplicada (ex: 'purple-900', 'green-700')
     */
    getColorVariant(colorBase, variant) {
        // Se já tem uma variação ou é uma cor especial (white, black), retorna como está
        if (colorBase.includes('-') || colorBase === 'white' || colorBase === 'black') {
            return colorBase;
        }
        // Adiciona a variação
        return `${colorBase}-${variant}`;
    }

    /**
     * Obtém o tema global do config
     * @returns {Object|null} Tema global ou null se não existir
     */
    getGlobalTheme() {
        if (typeof window !== 'undefined' && window.config && window.config.theme) {
            return window.config.theme;
        }
        return null;
    }

    /**
     * Converte cor hexadecimal para nome de cor Tailwind aproximado
     * @param {string} hex - Cor hexadecimal (ex: '#16A34A')
     * @returns {string} Nome aproximado da cor (ex: 'green')
     */
    hexToColorName(hex) {
        if (!hex || !hex.startsWith('#')) {
            return null;
        }

        // Remove #
        const color = hex.substring(1);
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);

        // Mapeamento aproximado de cores comuns do Tailwind
        // Verde
        if (g > r && g > b && g > 100) return 'green';
        // Azul
        if (b > r && b > g && b > 100) return 'blue';
        // Vermelho/Laranja
        if (r > g && r > b && r > 100) {
            if (g > 150) return 'orange';
            return 'red';
        }
        // Roxo
        if (r > 100 && b > 100 && g < 150) return 'purple';
        // Amarelo/Dourado
        if (r > 200 && g > 200 && b < 150) return 'amber';
        // Cinza
        if (Math.abs(r - g) < 30 && Math.abs(g - b) < 30) {
            if (r > 200) return 'gray';
            return 'gray';
        }

        // Fallback: retorna null para usar brand-* customizado
        return null;
    }

    /**
     * Obtém a cor do tema global baseada na chave (primary, secondary, tertiary, accent)
     * @param {string} themeKey - Chave do tema ('primary', 'secondary', 'tertiary', 'accent')
     * @returns {string|null} Nome da cor ou null
     */
    getThemeColor(themeKey) {
        const theme = this.getGlobalTheme();
        if (!theme || !theme.colors) {
            return null;
        }

        const colorValue = theme.colors[themeKey];
        if (!colorValue) {
            return null;
        }

        // Se já é uma string (nome de cor), retorna
        if (typeof colorValue === 'string' && !colorValue.startsWith('#')) {
            return colorValue;
        }

        // Se é hexadecimal, converte para nome aproximado
        if (typeof colorValue === 'string' && colorValue.startsWith('#')) {
            const colorName = this.hexToColorName(colorValue);
            // Se não conseguiu converter, usa brand-* customizado
            return colorName || `brand-${themeKey}`;
        }

        return null;
    }

    /**
     * Resolve uma cor específica: usa override se fornecido, senão infere do tema
     * @param {string} override - Cor fornecida no override (pode ser null/undefined)
     * @param {string} themeKey - Chave do tema para inferir ('primary', 'secondary', 'tertiary', 'accent')
     * @param {string} fallback - Fallback caso não encontre no tema
     * @returns {string} Cor resolvida
     */
    resolveColor(override, themeKey, fallback) {
        // Se há override, usa ele
        if (override !== null && override !== undefined) {
            return override;
        }

        // Tenta inferir do tema
        const themeColor = this.getThemeColor(themeKey);
        if (themeColor) {
            return themeColor;
        }

        // Usa fallback
        return fallback;
    }

    /**
     * Resolve múltiplas cores usando um mapeamento de defaults
     * Cada componente deve implementar getDefaultColorMapping() para definir seus defaults
     *
     * @param {Object} colorOverrides - Overrides fornecidos no config do componente
     * @param {Object} defaultMapping - Mapeamento padrão { colorKey: { themeKey, fallback, variant } }
     * @returns {Object} Objeto com cores resolvidas e variações aplicadas
     *
     * @example
     * // No componente:
     * const defaultMapping = {
     *   primary: { themeKey: 'primary', fallback: 'brand-dark', variant: 900 },
     *   accent: { themeKey: 'accent', fallback: 'brand-gold', variant: 400 }
     * };
     * this.colors = this.resolveColors(colorOverrides, defaultMapping);
     */
    resolveColors(colorOverrides = {}, defaultMapping = {}) {
        const resolved = {};

        for (const [colorKey, config] of Object.entries(defaultMapping)) {
            const { themeKey, fallback, variant } = config;

            // Resolve a cor base (override > tema > fallback)
            const colorBase = this.resolveColor(
                colorOverrides[colorKey],
                themeKey,
                fallback
            );

            // Aplica variação se especificada
            if (variant !== undefined) {
                resolved[colorKey] = this.getColorVariant(colorBase, variant);
            } else {
                resolved[colorKey] = colorBase;
            }
        }

        return resolved;
    }
}

// Exporta a classe base
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseComponent;
}

