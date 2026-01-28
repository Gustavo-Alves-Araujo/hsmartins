/**
 * Category Carousel Component
 * Carrossel horizontal de categorias com imagens
 */

class CategoryCarouselComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.title - Título da seção
     * @param {Array} data.categories - Array de categorias { title: string, href: string, subtitle?: string }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            title: 'Pesquisas Mais Populares',
            categories: [
                { title: 'Sobrado para Venda em Poá', href: '#' },
                { title: 'Casa Térrea para Venda em Poá', href: '#' },
                { title: 'Apartamento para Venda em Itaquaquecetuba', href: '#' },
                { title: 'Casa para Venda em Poá', href: '#' },
                { title: 'Apartamento para Venda em São Paulo', href: '#' },
                { title: 'Terreno para Venda em Poá', href: '#' }
            ]
        };
        
        this.title = data.title || defaults.title;
        this.categories = data.categories || defaults.categories;

        // Resolve cores com contraste adequado
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'gray-50');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#6366f1');

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            title: 'gray-900'
        };
    }

    render() {
        const c = this.colors;
        const carouselId = `cat-scroll-${Math.random().toString(36).substr(2, 9)}`;

        const categoriesHtml = this.categories.map((cat, index) => {
            // Gera um gradiente único para cada categoria baseado no índice
            const gradients = [
                'from-purple-500 to-pink-500',
                'from-blue-500 to-cyan-500',
                'from-green-500 to-emerald-500',
                'from-orange-500 to-red-500',
                'from-indigo-500 to-purple-500',
                'from-teal-500 to-blue-500',
                'from-yellow-500 to-orange-500',
                'from-rose-500 to-pink-500'
            ];
            const gradient = gradients[index % gradients.length];
            
            return `
            <a href="${cat.href || '#'}" class="group min-w-[200px] h-[280px] relative rounded-2xl overflow-hidden cursor-pointer snap-start">
                <div class="absolute inset-0 bg-gradient-to-br ${gradient}"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <div class="absolute bottom-0 p-6 w-full">
                    <h3 class="text-white font-bold text-xl mb-1 group-hover:translate-x-2 transition">${cat.title}</h3>
                    ${cat.subtitle ? `
                        <p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">${cat.subtitle} &rarr;</p>
                    ` : ''}
                </div>
            </a>
        `;
        }).join('');

        return `
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div class="flex justify-between items-end mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">${this.title}</h2>
                    <div class="flex gap-2">
                        <button class="category-prev w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition" data-carousel="${carouselId}">
                            <i class="fas fa-chevron-left text-gray-500"></i>
                        </button>
                        <button class="category-next w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition" data-carousel="${carouselId}">
                            <i class="fas fa-chevron-right text-gray-500"></i>
                        </button>
                    </div>
                </div>

                <div id="${carouselId}" class="flex gap-6 overflow-x-auto hide-scroll pb-4 snap-x">
                    ${categoriesHtml}
                </div>
            </section>
        `;
    }

    attachEventListeners() {
        // Carousel navigation
        const prevBtns = document.querySelectorAll('.category-prev');
        const nextBtns = document.querySelectorAll('.category-next');

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const carouselId = btn.getAttribute('data-carousel');
                const carousel = document.getElementById(carouselId);
                if (carousel) {
                    carousel.scrollLeft -= 200;
                }
            });
        });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const carouselId = btn.getAttribute('data-carousel');
                const carousel = document.getElementById(carouselId);
                if (carousel) {
                    carousel.scrollLeft += 200;
                }
            });
        });
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            this.attachEventListeners();
        }
    }

    static create(data, targetId) {
        const component = new CategoryCarouselComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('category-carousel', CategoryCarouselComponent);
}


