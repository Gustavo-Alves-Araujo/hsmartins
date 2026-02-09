/**
 * Hero Component
 * Design Aprimorado: Cinematic Look (Foco em Clareza de Fundo e Sofisticação)
 * MANTIDA A INTERFACE E LÓGICA ORIGINAL DE PROPRIEDADES
 */

class HeroComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Hero
     */
    constructor(data = {}) {
        super();
        
        // Valores padrão do projeto HS Martins
        const defaults = {
            badge: 'Imobiliária em Poá e Região • Leilões • Venda • Financiamento',
            title: 'Há 23 anos',
            titleHighlight: '',
            subtitle: 'a H.S. Martins ajuda famílias a realizarem o sonho da casa própria.',
            ctaPrimary: { text: 'Buscar Imóveis', href: '#imoveis', target: '_self' },
            ctaSecondary: { text: 'Negocie seu Imóvel', href: '#negociar', target: '_self' },
            backgroundImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyODd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlfGVufDB8MHx8fDE3NjkyNTUyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
            backgroundAlt: 'Fachada de casa moderna',
            whatsappNumber: '551146382942'
        };
        
        this.badge = data.badge !== undefined ? data.badge : defaults.badge;
        this.title = data.title || defaults.title;
        this.titleHighlight = data.titleHighlight || defaults.titleHighlight;
        this.subtitle = data.subtitle || defaults.subtitle;

        // CTAs com suporte a objeto { text, href, target } - MANTIDO ORIGINAL
        const whatsappNumber = data.whatsappNumber || defaults.whatsappNumber;
        this.ctaPrimary = typeof data.ctaPrimary === 'string'
            ? { text: data.ctaPrimary, href: `https://wa.me/${whatsappNumber}`, target: '_blank' }
            : { ...defaults.ctaPrimary, ...data.ctaPrimary };

        this.ctaSecondary = typeof data.ctaSecondary === 'string'
            ? { text: data.ctaSecondary, href: '#services' }
            : { ...defaults.ctaSecondary, ...data.ctaSecondary };

        this.backgroundImage = data.backgroundImage || defaults.backgroundImage;
        this.backgroundAlt = data.backgroundAlt || defaults.backgroundAlt;
        this.whatsappNumber = whatsappNumber;

        // SEMPRE usa a cor primária do tema - SEM FALLBACK FIXO
        const theme = this.getGlobalTheme();
        const primaryHex = theme?.colors?.primary;

        if (!primaryHex) {
            console.warn('⚠️ Cor primária não encontrada no tema. Verifique o config.json');
        }

        // Resolve cores usando sempre a cor primária do tema
        const textBase = this.resolveColor(data.colors?.text, null, 'white');
        const textColor = textBase === 'white' ? '#ffffff' : '#000000';

        // Mapeamento usando sempre a cor primária do tema - SEM VALORES FIXOS
        // Overlay mais claro: usa versão clareada da cor primária
        this.colors = {
            overlay: primaryHex ? this.lightenColor(primaryHex, 0.6) : (primaryHex || '#1a1a2e'), // Mais claro
            badge: primaryHex, // SEMPRE cor primária do tema
            title: textColor,
            titleHighlight: primaryHex, // SEMPRE cor primária do tema
            subtitle: textColor,
            ctaPrimaryBg: primaryHex, // SEMPRE cor primária do tema
            ctaPrimaryText: textColor,
            ctaPrimaryHover: primaryHex ? this.lightenColor(primaryHex, 0.1) : primaryHex,
            ctaSecondaryBorder: textColor,
            ctaSecondaryText: textColor,
            ctaSecondaryHover: primaryHex ? this.darkenColor(primaryHex, 0.2) : primaryHex
        };
    }

    /**
     * Renderiza o HTML do componente Hero com clareza de fundo e iluminação refinada
     */
    render() {
        const c = this.colors;
        const primaryHex = this.getThemeColorHex('primary') || '#005CA9';
        const accentHex = this.getThemeColorHex('accent') || '#F39200';
        const badgeText = this.getBestTextColor(accentHex);
        const gradientBg = `linear-gradient(135deg, ${primaryHex}15 0%, ${accentHex}10 50%, ${primaryHex}15 100%)`;

        return `
            <header class="relative flex items-end overflow-hidden isolate pt-20 md:pt-12" style="min-height: 100vh; background: ${gradientBg};">

                <div class="absolute inset-0 z-0 flex items-center justify-center" style="background: ${gradientBg};">
                    <picture class="block w-full h-full">
                        <source media="(max-width: 768px)" srcset="img/image(1).png">
                        <img src="img/image.png"
                             alt="${this.backgroundAlt}"
                             class="w-full h-full hero-bg-image"
                             style="object-position: center center; min-height: 100vh; width: 100%; height: 100%;">
                    </picture>
                </div>
                
                <!-- Overlay gradiente na esquerda para destacar o conteúdo -->
                <div class="absolute inset-0 z-[1]" style="background: linear-gradient(to right, ${primaryHex} 0%, ${primaryHex}CC 25%, ${primaryHex}99 40%, ${primaryHex}66 55%, ${primaryHex}33 70%, transparent 85%); pointer-events: none;"></div>

                <div class="w-full relative z-10 pb-8 md:pb-12">
                    <div class="container mx-auto px-4 md:px-6">
                        <!-- Texto na esquerda -->
                        <div class="max-w-2xl mb-12 md:mb-8 lg:mb-12">
                            <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                                ${this.title.includes('23') || this.title.includes('Há') || this.title.includes('há') ? `
                                    <span class="block">
                                        <span class="text-white">Há </span>
                                        <span class="inline-block text-6xl md:text-7xl lg:text-8xl relative" style="background: linear-gradient(135deg, ${accentHex} 0%, #60A5FA 50%, #3B82F6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                                            23
                                        </span>
                                        <span class="text-white"> anos</span>
                                    </span>
                                ` : `
                                    <span class="block">${this.title}</span>
                                `}
                            </h1>
                            ${this.subtitle ? `
                                <p class="text-xl md:text-2xl text-white leading-relaxed">
                                    ${this.subtitle}
                                </p>
                            ` : ''}
                        </div>
                        
                        <!-- Formulário de busca -->
                        <div class="max-w-5xl mx-auto">
                            <form id="hero-imoveis-search" class="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                                <div class="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 items-center">
                                    <input
                                        id="hero-search-q"
                                        type="text"
                                        placeholder="Buscar por título, tipo, bairro, cidade ou ref..."
                                        class="md:col-span-2 w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 border border-gray-200"
                                        style="--tw-ring-color: ${c.ctaPrimaryBg};"
                                    />

                                    <select id="hero-search-type" class="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 border border-gray-200" style="--tw-ring-color: ${c.ctaPrimaryBg};">
                                        <option value="all">Todos os tipos</option>
                                    </select>

                                    <select id="hero-search-city" class="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 border border-gray-200" style="--tw-ring-color: ${c.ctaPrimaryBg};">
                                        <option value="all">Todas as cidades</option>
                                    </select>

                                    <button type="submit" class="w-full px-5 py-3 rounded-xl font-extrabold uppercase tracking-widest text-xs shadow-[0_14px_28px_rgba(0,0,0,0.35)] hover:opacity-95 transition"
                                            style="background: linear-gradient(135deg, ${accentHex} 0%, ${this.darkenColor(accentHex, 0.12)} 100%); color: ${badgeText};">
                                        Pesquisar
                                    </button>
                                </div>

                                <div class="mt-3 text-[11px] md:text-xs opacity-90 text-gray-600">
                                    Dica: ao digitar na busca, você pode refinar depois nos filtros da lista.
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <style>
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
                .hero-bg-image {
                    object-fit: contain;
                }
                @media (min-width: 769px) {
                    .hero-bg-image {
                        object-fit: cover;
                    }
                }
            </style>
        `;
    }

    /**
     * Monta o componente no DOM
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            this.attachEventListeners();
        }
    }

    /**
     * Adiciona event listeners para smooth scroll
     */
    attachEventListeners() {
        const heroSection = document.querySelector('header.relative.flex.items-end');
        if (!heroSection) return;

        // Recebe opções dinâmicas (tipo/cidade) quando o grid carregar do Supabase
        window.addEventListener('imoveis:options', (evt) => {
            try {
                const detail = evt?.detail || {};
                const { tipos = [], cidades = [] } = detail;
                const typeSel = document.getElementById('hero-search-type');
                const citySel = document.getElementById('hero-search-city');
                if (typeSel && Array.isArray(tipos)) {
                    const keepFirst = typeSel.options[0];
                    typeSel.innerHTML = '';
                    typeSel.appendChild(keepFirst);
                    tipos.forEach(v => {
                        const opt = document.createElement('option');
                        opt.value = v;
                        opt.textContent = v;
                        typeSel.appendChild(opt);
                    });
                }
                if (citySel && Array.isArray(cidades)) {
                    const keepFirst = citySel.options[0];
                    citySel.innerHTML = '';
                    citySel.appendChild(keepFirst);
                    cidades.forEach(v => {
                        const opt = document.createElement('option');
                        opt.value = v;
                        opt.textContent = v;
                        citySel.appendChild(opt);
                    });
                }
            } catch (e) {
                // silencioso
            }
        });

        // Submit do Hero -> aplica filtros no grid e faz scroll para os produtos
        const form = document.getElementById('hero-imoveis-search');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const payload = {
                    search: document.getElementById('hero-search-q')?.value || '',
                    type: document.getElementById('hero-search-type')?.value || 'all',
                    city: document.getElementById('hero-search-city')?.value || 'all'
                };
                window.dispatchEvent(new CustomEvent('imoveis:hero-search', { detail: payload }));
            });
        }
    }

    /**
     * Método estático original preservado
     */
    static create(data, targetId) {
        const component = new HeroComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra mantendo o nome original do registro
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('hero-overlay', HeroComponent);
}