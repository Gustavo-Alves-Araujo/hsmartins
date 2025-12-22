/**
 * Base Component
 * Classe base para todos os componentes com funcionalidades compartilhadas
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
}

// Exporta a classe base
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseComponent;
}

