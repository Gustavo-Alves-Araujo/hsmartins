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
     * Obtém o valor hexadecimal real da cor do tema
     * @param {string} themeKey - Chave do tema ('primary', 'secondary', 'tertiary', 'accent', 'background')
     * @returns {string|null} Valor hexadecimal (ex: '#16A34A') ou null
     */
    getThemeColorHex(themeKey) {
        const theme = this.getGlobalTheme();
        if (!theme || !theme.colors) {
            return null;
        }

        const colorValue = theme.colors[themeKey];
        if (!colorValue) {
            return null;
        }

        // Se é hexadecimal, retorna direto
        if (typeof colorValue === 'string' && colorValue.startsWith('#')) {
            return colorValue;
        }

        // Se é um objeto com propriedades (ex: text.dark), tenta obter o hex
        if (typeof colorValue === 'object' && colorValue !== null) {
            // Tenta obter de propriedades comuns
            if (colorValue.hex) return colorValue.hex;
            if (colorValue.value) return colorValue.value;
        }

        return null;
    }

    /**
     * Resolve uma cor hexadecimal: usa override se fornecido, senão infere do tema
     * @param {string} override - Cor hexadecimal fornecida no override (pode ser null/undefined)
     * @param {string} themeKey - Chave do tema para inferir ('primary', 'secondary', 'tertiary', 'accent', 'background')
     * @param {string} fallback - Fallback hexadecimal caso não encontre no tema (ex: '#16A34A')
     * @returns {string} Cor hexadecimal resolvida
     */
    resolveColorHex(override, themeKey, fallback) {
        // Se há override, usa ele
        if (override !== null && override !== undefined) {
            // Se é hexadecimal, retorna direto
            if (typeof override === 'string' && override.startsWith('#')) {
                return override;
            }
        }

        // Tenta obter do tema
        const themeHex = this.getThemeColorHex(themeKey);
        if (themeHex) {
            return themeHex;
        }

        // Usa fallback
        return fallback;
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

    /**
     * Escurece uma cor hexadecimal
     * @param {string} hex - Cor hexadecimal
     * @param {number} amount - Quantidade (0-1)
     * @returns {string} Cor escurecida
     */
    darkenColor(hex, amount) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
        const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * (1 - amount)));
        const b = Math.max(0, Math.floor((num & 0x0000FF) * (1 - amount)));
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }

    /**
     * Clareia uma cor hexadecimal
     * @param {string} hex - Cor hexadecimal
     * @param {number} amount - Quantidade (0-1)
     * @returns {string} Cor clareada
     */
    lightenColor(hex, amount) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
        const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * amount));
        const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * amount));
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }

    /**
     * Converte hexadecimal para rgba
     * @param {string} hex - Cor hexadecimal
     * @param {number} alpha - Opacidade (0-1)
     * @returns {string} rgba string
     */
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
     * Converte hexadecimal para RGB
     * @param {string} hex - Cor hexadecimal
     * @returns {Array} [r, g, b]
     */
    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    /**
     * Calcula a luminosidade relativa de uma cor (0-1)
     * @param {string} hex - Cor hexadecimal
     * @returns {number} Luminosidade (0 = preto, 1 = branco)
     */
    getLuminance(hex) {
        const rgb = this.hexToRgb(hex);
        const [r, g, b] = rgb.map(val => {
            val = val / 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * Calcula o ratio de contraste entre duas cores (WCAG)
     * @param {string} color1 - Cor hexadecimal
     * @param {string} color2 - Cor hexadecimal
     * @returns {number} Ratio de contraste
     */
    getContrastRatio(color1, color2) {
        const lum1 = this.getLuminance(color1);
        const lum2 = this.getLuminance(color2);
        const lighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);
        return (lighter + 0.05) / (darker + 0.05);
    }

    /**
     * Verifica se há contraste suficiente (WCAG AA mínimo 4.5:1)
     * @param {string} textColor - Cor do texto
     * @param {string} backgroundColor - Cor de fundo
     * @param {number} minRatio - Ratio mínimo (padrão: 4.5 para WCAG AA)
     * @returns {boolean}
     */
    hasEnoughContrast(textColor, backgroundColor, minRatio = 4.5) {
        return this.getContrastRatio(textColor, backgroundColor) >= minRatio;
    }

    /**
     * Obtém a melhor cor de texto (branco ou preto) para um fundo dado
     * @param {string} backgroundColor - Cor de fundo hexadecimal
     * @param {number} minRatio - Ratio mínimo de contraste (padrão: 4.5)
     * @returns {string} '#FFFFFF' ou '#000000'
     */
    getBestTextColor(backgroundColor, minRatio = 4.5) {
        const whiteContrast = this.getContrastRatio('#FFFFFF', backgroundColor);
        const blackContrast = this.getContrastRatio('#000000', backgroundColor);

        // Se ambas têm contraste suficiente, escolhe a com maior contraste
        if (whiteContrast >= minRatio && blackContrast >= minRatio) {
            return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
        }

        // Se apenas uma tem contraste suficiente, usa ela
        if (whiteContrast >= minRatio) return '#FFFFFF';
        if (blackContrast >= minRatio) return '#000000';

        // Se nenhuma tem contraste suficiente, usa a com maior contraste disponível
        return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
    }

    /**
     * Verifica se uma cor é clara (para detectar tema claro)
     * @param {string} hex - Cor hexadecimal
     * @returns {boolean} true se a cor for clara
     */
    isLightColor(hex) {
        if (!hex || !hex.startsWith('#')) return false;
        const color = hex.substring(1);
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        // Calcula luminância relativa
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5;
    }
}

// Exporta a classe base
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseComponent;
}

