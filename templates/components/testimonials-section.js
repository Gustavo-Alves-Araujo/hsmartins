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
        this.tag = data.tag || '';
        this.overallRating = data.overallRating || {};

        // Aceita tanto 'reviews' quanto 'testimonials'
        const reviewsData = data.reviews || data.testimonials || [];

        // Normaliza os dados: mapeia 'author' para 'name', 'review'/'quote' para 'text', adiciona avatar padrão se necessário
        this.reviews = reviewsData.map(item => ({
            avatar: item.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.author || item.name || '') + '&background=random',
            name: item.name || item.author || '',
            rating: item.rating || 5,
            verified: item.verified !== undefined ? item.verified : false,
            text: item.text || item.review || item.quote || '',
            pet: item.pet || null, // Armazena info do pet se disponível
            role: item.role || null // Armazena role/cargo se disponível
        }));

        // SEMPRE usa a cor primária do tema global - SEM FALLBACK FIXO
        const theme = this.getGlobalTheme();
        const primaryHex = theme?.colors?.primary;

        if (!primaryHex) {
            console.warn('⚠️ Cor primária não encontrada no tema. Verifique o config.json');
        }

        // Resolve cores com contraste adequado
        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryBase = this.resolveColor(data.colors?.primary, 'primary', 'green');
        const useHex = primaryHex && primaryHex.startsWith('#');

        // Calcula variações se for hex
        const badgeBgHex = useHex ? this.lightenColor(primaryHex, 0.9) : null;
        const cardBgHex = useHex ? this.lightenColor(primaryHex, 0.95) : null;
        const badgeTextHex = useHex ? primaryHex : null;

        this.colors = {
            background: bgBase,
            primary: primaryHex,
            primaryBase: primaryBase,
            title: 'gray-900',
            text: 'gray-600',
            badgeBg: useHex ? '' : this.getColorVariant(primaryBase, 100),
            badgeText: useHex ? '' : this.getColorVariant(primaryBase, 600),
            cardBg: useHex ? '' : this.getColorVariant(primaryBase, 50),
            badgeBgHex: badgeBgHex,
            badgeTextHex: badgeTextHex,
            cardBgHex: cardBgHex,
            useHex: useHex
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
        const reviewsHtml = this.reviews.map(review => {
            const cardBgStyle = c.useHex
                ? `style="background-color: ${c.cardBgHex};"`
                : '';
            const cardBgClass = c.useHex
                ? 'p-6 rounded-2xl border border-gray-100'
                : `bg-${c.cardBg} p-6 rounded-2xl border border-gray-100`;

            return `
            <div class="${cardBgClass}" ${cardBgStyle}>
                <div class="flex items-center gap-4 mb-4">
                    <img src="${review.avatar}" alt="${review.name}" class="w-12 h-12 rounded-full object-cover">
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900">${review.name}</h4>
                        ${review.pet ? `<p class="text-xs text-gray-500 mt-0.5">${review.pet}</p>` : ''}
                        ${review.role ? `<p class="text-xs text-gray-500 mt-0.5">${review.role}</p>` : ''}
                        <div class="flex text-yellow-400 text-xs mt-1">
                            ${this.renderStars(review.rating)}
                        </div>
                    </div>
                    ${review.verified ? `
                        <div class="ml-auto text-green-600 text-xs flex items-center gap-1 whitespace-nowrap">
                            <i class="fas fa-check-circle"></i> Compra Verificada
                        </div>
                    ` : ''}
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">"${review.text}"</p>
            </div>
        `;
        }).join('');

        return `
            <section class="bg-white py-16 border-t border-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        ${this.tag ? `
                            <div class="inline-block px-3 py-1 rounded-full ${c.useHex ? '' : `bg-${c.badgeBg} text-${c.badgeText}`} text-xs font-bold uppercase tracking-widest mb-4" ${c.useHex ? `style="background-color: ${c.badgeBgHex}; color: ${c.badgeTextHex};"` : ''}>
                                ${this.tag}
                            </div>
                        ` : ''}
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


