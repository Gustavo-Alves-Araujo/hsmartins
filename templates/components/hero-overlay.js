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
            title: 'Imobiliária H.S Martins',
            titleHighlight: '',
            subtitle: 'Encontre apartamentos, casas e terrenos em Poá e região. Conte com apoio completo no financiamento (Correspondente Caixa).',
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
        const accentHex = this.getThemeColorHex('accent') || '#F39200';
        const primaryHex = this.getThemeColorHex('primary') || c.ctaPrimaryBg;
        const badgeText = this.getBestTextColor(accentHex);

        return `
            <header class="relative min-h-screen flex items-center justify-center overflow-hidden isolate bg-black pt-20 md:pt-12">

                <div class="absolute inset-0 z-0">
                    <img src="${this.backgroundImage}"
                         alt="${this.backgroundAlt}"
                         class="w-full h-full object-cover scale-100 opacity-20"
                         style="filter: blur(10px) brightness(1.1) contrast(1.0);">

                    <!-- Blur overlay com cor primária -->
                    <div class="absolute inset-0 backdrop-blur-sm" style="background-color: ${this.hexToRgba(c.ctaPrimaryBg, 0.3)};"></div>

                    <div class="absolute inset-0 opacity-25 mix-blend-overlay" style="background-color: ${c.overlay};"></div>

                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/40 opacity-60"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-30"></div>
                </div>

                <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style="background-color: ${c.titleHighlight}; opacity: 0.2; animation-duration: 4s;"></div>
                <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[130px] rounded-full pointer-events-none mix-blend-overlay" style="background-color: ${c.ctaPrimaryBg}; opacity: 0.1;"></div>

                <div class="container mx-auto px-4 md:px-6 relative z-10 text-center">

                    <div class="inline-flex items-center justify-center mb-6 md:mb-8 mt-4 md:mt-0">
                        <span class="py-2 px-4 md:py-2.5 md:px-6 rounded-full text-[9px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-[0_18px_45px_rgba(0,0,0,0.35)] border"
                              style="background-color: ${accentHex}; color: ${badgeText}; border-color: ${this.hexToRgba('#FFFFFF', 0.35)};">
                            ${this.badge}
                        </span>
                    </div>

                    <h1 class="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 tracking-tighter" style="color: ${c.title};">
                        ${this.title}
                    </h1>

                    <p class="max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl mb-10 font-medium leading-relaxed opacity-90 tracking-tight" style="color: ${c.subtitle};">
                        ${this.subtitle}
                    </p>

                    <div class="max-w-5xl mx-auto">
                        <form id="hero-imoveis-search" class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                            <div class="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 items-center">
                                <input
                                    id="hero-search-q"
                                    type="text"
                                    placeholder="Buscar por título, tipo, bairro ou cidade..."
                                    class="md:col-span-2 w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0"
                                    style="--tw-ring-color: ${c.ctaPrimaryBg};"
                                />

                                <select id="hero-search-type" class="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.ctaPrimaryBg};">
                                    <option value="all">Todos os tipos</option>
                                </select>

                                <select id="hero-search-city" class="w-full px-4 py-3 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.ctaPrimaryBg};">
                                    <option value="all">Todas as cidades</option>
                                </select>

                                <button type="submit" class="w-full px-5 py-3 rounded-xl font-extrabold uppercase tracking-widest text-xs shadow-[0_14px_28px_rgba(0,0,0,0.35)] hover:opacity-95 transition"
                                        style="background: linear-gradient(135deg, ${accentHex} 0%, ${this.darkenColor(accentHex, 0.12)} 100%); color: ${badgeText};">
                                    Pesquisar
                                </button>
                            </div>

                            <div class="mt-3 text-[11px] md:text-xs opacity-90" style="color: ${c.subtitle};">
                                Dica: ao digitar na busca, você pode refinar depois nos filtros da lista.
                            </div>
                        </form>
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
        const heroSection = document.querySelector('header.relative.min-h-screen');
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