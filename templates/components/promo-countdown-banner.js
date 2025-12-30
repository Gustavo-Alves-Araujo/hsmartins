/**
 * Promo Countdown Banner Component
 * Banner promocional com countdown e cupom de desconto
 */

class PromoCountdownBannerComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.emoji - Emoji ou ícone
     * @param {string} data.title - Título do banner
     * @param {string} data.description - Descrição
     * @param {string} data.couponCode - Código do cupom
     * @param {Object} data.countdown - { hours: number, minutes: number, seconds: number } ou null para auto
     * @param {Object} data.colors - Cores customizáveis
     */
    constructor(data) {
        super();
        this.emoji = data.emoji || '🎉';
        this.title = data.title || '';
        this.description = data.description || '';
        this.couponCode = data.couponCode || '';
        this.countdown = data.countdown || null; // null = auto countdown

        // Resolve cores com contraste adequado (fundo colorido, texto branco)
        const bgHex = this.resolveColorHex(data.colors?.background, 'primary', '#16a34a');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#16a34a');
        const primaryDarkHex = this.darkenColor(primaryHex, 0.15);

        this.colors = {
            background: bgHex,
            primary: primaryHex,
            primaryDark: primaryDarkHex,
            text: '#FFFFFF', // Sempre branco em fundo colorido
            textSecondary: this.hexToRgba('#FFFFFF', 0.8)
        };
    }

    render() {
        const c = this.colors;
        const countdownId = `countdown-${Math.random().toString(36).substr(2, 9)}`;

        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div class="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-lg relative overflow-hidden group" style="background: linear-gradient(to right, ${c.primary}, ${c.primaryDark});">
                    <!-- Decorative Circles -->
                    <div class="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition"></div>
                    <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>

                    <div class="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                        <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
                            ${this.emoji}
                        </div>
                        <div>
                            ${this.title ? `<h3 class="text-2xl font-bold mb-1">${this.title}</h3>` : ''}
                            ${this.description ? `<p class="text-primary-100" style="color: ${c.textSecondary};">${this.description}</p>` : ''}
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row items-center gap-6 mt-6 md:mt-0 relative z-10">
                        ${this.countdown !== false ? `
                            <div class="text-center">
                                <p class="text-xs uppercase tracking-widest text-primary-200 mb-1" style="color: ${c.textSecondary};">Expira em</p>
                                <div class="flex gap-2 font-mono font-bold text-xl" id="${countdownId}">
                                    <span class="bg-white/10 p-2 rounded">00</span>:
                                    <span class="bg-white/10 p-2 rounded">00</span>:
                                    <span class="bg-white/10 p-2 rounded">00</span>
                                </div>
                            </div>
                        ` : ''}
                        ${this.couponCode ? `
                            <div class="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-1 pr-1 border border-white/20">
                                <span class="px-4 font-mono font-bold tracking-wider">${this.couponCode}</span>
                                <button class="copy-coupon-btn bg-white px-4 py-2 rounded shadow-sm hover:bg-gray-50 transition font-medium text-sm" style="color: ${c.primaryDark};" data-code="${this.couponCode}">
                                    Copiar
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Copy coupon button
        const copyBtns = document.querySelectorAll('.copy-coupon-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.getAttribute('data-code');
                if (code) {
                    navigator.clipboard.writeText(code).then(() => {
                        const originalText = btn.innerText;
                        btn.innerText = 'Copiado!';
                        setTimeout(() => {
                            btn.innerText = originalText;
                        }, 2000);
                    });
                }
            });
        });

        // Auto countdown
        const countdownEls = document.querySelectorAll('[id^="countdown-"]');
        countdownEls.forEach(el => {
            const updateCountdown = () => {
                const now = new Date();
                const hours = String(23 - now.getHours()).padStart(2, '0');
                const minutes = String(59 - now.getMinutes()).padStart(2, '0');
                const seconds = String(59 - now.getSeconds()).padStart(2, '0');

                el.innerHTML = `
                    <span class="bg-white/10 p-1.5 rounded">${hours}</span>:
                    <span class="bg-white/10 p-1.5 rounded">${minutes}</span>:
                    <span class="bg-white/10 p-1.5 rounded">${seconds}</span>
                `;
            };
            setInterval(updateCountdown, 1000);
            updateCountdown();
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
        const component = new PromoCountdownBannerComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('promo-countdown-banner', PromoCountdownBannerComponent);
}

