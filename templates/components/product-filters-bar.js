/**
 * Product Filters Bar Component
 * Barra de filtros e tabs para produtos
 */

class ProductFiltersBarComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.tabs - Array de tabs { text: string, active?: boolean, href?: string }
     * @param {Array} data.filters - Array de filtros ativos { text: string, removable?: boolean, highlight?: boolean }
     * @param {Object} data.sortOptions - Opções de ordenação { current: string, options: Array<{ text: string, value: string }> }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.tabs = data.tabs || [];
        this.filters = data.filters || [];
        this.sortOptions = data.sortOptions || {};

        // Resolve cores com contraste adequado
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            text: 'gray-900',
            textSecondary: 'gray-500',
            border: 'gray-100'
        };
    }

    render() {
        const c = this.colors;
        const tabsHtml = this.tabs.map(tab => {
            const activeClass = tab.active
                ? 'text-lg font-bold text-gray-900 pb-4 -mb-4.5'
                : 'text-lg font-medium text-gray-500 hover:text-gray-900 pb-4 whitespace-nowrap transition';
            const borderStyle = tab.active ? `style="border-bottom: 2px solid ${c.primary};"` : '';
            return `<button class="${activeClass} whitespace-nowrap" ${borderStyle}>${tab.text}</button>`;
        }).join('');

        const filtersHtml = this.filters.map(filter => {
            const highlightClass = filter.highlight
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600';
            return `
                <span class="px-3 py-1 ${highlightClass} text-xs font-medium rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition">
                    ${filter.text}
                    ${filter.removable !== false ? '<i class="fas fa-times"></i>' : ''}
                </span>
            `;
        }).join('');

        const sortOptionsHtml = this.sortOptions.options ? this.sortOptions.options.map(opt => `
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">${opt.text}</a>
        `).join('') : '';

        return `
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8" id="produtos">
                <div class="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <!-- Tabs -->
                    <div class="flex gap-8 mb-4 md:mb-0 overflow-x-auto w-full md:w-auto">
                        ${tabsHtml}
                    </div>

                    <!-- Sort & Filter Toggle -->
                    <div class="flex items-center gap-3">
                        <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-gray-300 bg-white transition">
                            <i class="fas fa-filter text-gray-400"></i> Filtros
                        </button>
                        ${this.sortOptions.options ? `
                            <div class="relative group">
                                <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-gray-300 bg-white transition">
                                    <span>${this.sortOptions.current || 'Relevância'}</span>
                                    <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
                                </button>
                                <div class="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                    ${sortOptionsHtml}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Filter Tags (Chips) -->
                ${this.filters.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mb-8">
                        ${filtersHtml}
                        <button class="text-xs text-primary-600 font-medium hover:underline ml-2">Limpar todos</button>
                    </div>
                ` : ''}
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
        const component = new ProductFiltersBarComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('product-filters-bar', ProductFiltersBarComponent);
}

