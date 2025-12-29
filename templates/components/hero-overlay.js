/**
 * Hero Component
 * Design Aprimorado: Cinematic Look (Foco em Clareza de Fundo e Sofisticação)
 * MANTIDA A INTERFACE E LÓGICA ORIGINAL DE PROPRIEDADES
 */

class HeroComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados necessários para o Hero
     */
    constructor(data) {
        super();
        this.badge = data.badge;
        this.title = data.title;
        this.titleHighlight = data.titleHighlight;
        this.subtitle = data.subtitle;

        // CTAs com suporte a objeto { text, href, target } - MANTIDO ORIGINAL
        this.ctaPrimary = typeof data.ctaPrimary === 'string'
            ? { text: data.ctaPrimary, href: `https://wa.me/${data.whatsappNumber}`, target: '_blank' }
            : { text: 'Fazer Pedido', href: `https://wa.me/${data.whatsappNumber}`, target: '_blank', ...data.ctaPrimary };

        this.ctaSecondary = typeof data.ctaSecondary === 'string'
            ? { text: data.ctaSecondary, href: '#services' }
            : { text: 'Explorar', href: '#services', ...data.ctaSecondary };

        this.backgroundImage = data.backgroundImage;
        this.backgroundAlt = data.backgroundAlt;
        this.whatsappNumber = data.whatsappNumber;

        // RESOLUÇÃO DE CORES ORIGINAL - MANTIDA INTEGRALMENTE
        const primaryBase = this.resolveColor(data.colors?.primary, 'primary', 'brand-dark');
        const accentBase = this.resolveColor(data.colors?.accent, 'accent', 'brand-gold');
        const textBase = this.resolveColor(data.colors?.text, null, 'white');

        // Mapeamento original de chaves do objeto this.colors
        this.colors = {
            overlay: this.getColorVariant(primaryBase, 900),
            badge: this.getColorVariant(accentBase, 400),
            title: this.getColorVariant(textBase, 100),
            titleHighlight: this.getColorVariant(accentBase, 400),
            subtitle: this.getColorVariant(textBase, 200),
            ctaPrimaryBg: this.getColorVariant(accentBase, 500),
            ctaPrimaryText: this.getColorVariant(primaryBase, 900),
            ctaPrimaryHover: this.getColorVariant(accentBase, 400),
            ctaSecondaryBorder: this.getColorVariant(textBase, 100),
            ctaSecondaryText: this.getColorVariant(textBase, 100),
            ctaSecondaryHover: this.getColorVariant(primaryBase, 800)
        };
    }

    /**
     * Renderiza o HTML do componente Hero com clareza de fundo e iluminação refinada
     */
    render() {
        const c = this.colors;

        return `
            <header class="relative min-h-screen flex items-center justify-center overflow-hidden isolate bg-black pt-12">

                <div class="absolute inset-0 z-0">
                    <img src="${this.backgroundImage}"
                         alt="${this.backgroundAlt}"
                         class="w-full h-full object-cover scale-100 opacity-70"
                         style="filter: blur(10px) brightness(0.8) contrast(1.1);">

                    <div class="absolute inset-0 bg-${c.overlay} opacity-50 mix-blend-multiply"></div>

                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 opacity-90"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 opacity-40"></div>
                </div>

                <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-${c.titleHighlight}/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style="animation-duration: 4s;"></div>
                <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-${c.ctaPrimaryBg}/10 blur-[130px] rounded-full pointer-events-none mix-blend-overlay"></div>

                <div class="container mx-auto px-6 relative z-10 text-center">

                    <div class="inline-flex items-center justify-center mb-8" data-aos="fade-down" data-aos-duration="1000">
                        <span class="py-2 px-6 rounded-full text-${c.badge} text-[10px] md:text-xs font-black uppercase tracking-[0.4em] backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                            ${this.badge}
                        </span>
                    </div>

                    <h1 class="text-5xl md:text-7xl lg:text-8xl text-${c.title} font-black leading-[1.05] mb-8 tracking-tighter" data-aos="zoom-out" data-aos-duration="1200">
                        ${this.title} <br>
                        <span class="italic font-serif text-${c.titleHighlight} opacity-100 relative inline-block">
                            ${this.titleHighlight}
                            <svg class="absolute -bottom-2 left-0 w-full h-2 text-${c.titleHighlight}/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p class="text-${c.subtitle} max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl mb-12 font-medium leading-relaxed opacity-90 tracking-tight" data-aos="fade-up" data-aos-delay="400">
                        ${this.subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row justify-center items-center gap-6" data-aos="fade-up" data-aos-delay="600">

                        <a href="${this.ctaPrimary.href}"
                           ${this.ctaPrimary.target ? `target="${this.ctaPrimary.target}"` : ''}
                           class="group relative px-12 py-5 bg-${c.ctaPrimaryBg} text-${c.ctaPrimaryText} font-black rounded-2xl
                                  hover:scale-105 hover:bg-${c.ctaPrimaryHover} transition-all duration-500 flex items-center justify-center gap-3
                                  shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden">

                            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

                            <i class="fab fa-whatsapp text-xl relative z-10"></i>
                            <span class="relative z-10 uppercase tracking-widest text-xs">${this.ctaPrimary.text}</span>
                        </a>

                        <a href="${this.ctaSecondary.href}"
                           class="group px-12 py-5 text-${c.ctaSecondaryText} font-bold rounded-2xl
                                  border border-white/20 bg-white/5 backdrop-blur-md
                                  hover:bg-white/10 hover:border-white/40 transition-all duration-500
                                  text-xs uppercase tracking-widest flex items-center gap-2">
                            ${this.ctaSecondary.text}
                            <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                        </a>
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
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    once: true
                });
                AOS.refresh();
            }
        }
    }

    /**
     * Adiciona event listeners para smooth scroll
     */
    attachEventListeners() {
        const heroSection = document.querySelector('header.relative.min-h-screen');
        if (!heroSection) return;

        // Smooth scroll para links de âncora dentro do hero
        const anchorLinks = heroSection.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        // Calcula offset para compensar header fixo (se houver)
                        const header = document.getElementById('main-header');
                        const headerHeight = header ? header.offsetHeight : 80;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
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