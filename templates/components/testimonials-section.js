/**
 * Testimonials Section Component
 * Seção de avaliações/testimonials com cards de clientes
 */

class TestimonialsSectionComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.title - Título da seção
     * @param {Object} data.overallRating - { value: string, stars: number, reviewCount: string }
     * @param {Array} data.reviews - Array de reviews { avatar: string, name: string, rating: number, verified?: boolean, text: string }
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.title = data.title || 'O que dizem nossos clientes';
        this.overallRating = data.overallRating || {};
        this.reviews = data.reviews || [];

        // Resolve cores com contraste adequado
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#6366f1');

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            title: 'gray-900',
            text: 'gray-600'
        };
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHtml = '';

        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }

        return starsHtml;
    }

    render() {
        const c = this.colors;
        const reviewsHtml = this.reviews.map(review => `
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div class="flex items-center gap-4 mb-4">
                    <img src="${review.avatar}" alt="${review.name}" class="w-12 h-12 rounded-full object-cover">
                    <div>
                        <h4 class="font-bold text-gray-900">${review.name}</h4>
                        <div class="flex text-yellow-400 text-xs">
                            ${this.renderStars(review.rating)}
                        </div>
                    </div>
                    ${review.verified ? `
                        <div class="ml-auto text-green-600 text-xs flex items-center gap-1">
                            <i class="fas fa-check-circle"></i> Compra Verificada
                        </div>
                    ` : ''}
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">"${review.text}"</p>
            </div>
        `).join('');

        return `
            <section class="bg-white py-16 border-t border-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">${this.title}</h2>
                        ${this.overallRating.value ? `
                            <div class="flex justify-center items-center gap-2">
                                <span class="text-4xl font-bold text-gray-900">${this.overallRating.value}</span>
                                <div class="flex flex-col items-start">
                                    <div class="flex text-yellow-400 text-sm">
                                        ${this.renderStars(this.overallRating.stars || 5)}
                                    </div>
                                    ${this.overallRating.reviewCount ? `
                                        <span class="text-gray-500 text-sm">${this.overallRating.reviewCount}</span>
                                    ` : ''}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${reviewsHtml}
                    </div>
                </div>
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
        const component = new TestimonialsSectionComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('testimonials-section', TestimonialsSectionComponent);
}

