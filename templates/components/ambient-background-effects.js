/**
 * Ambient Background Effects Component
 * Efeitos de fundo ambientais com blobs animados
 */

class AmbientBackgroundEffectsComponent extends BaseComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {Array} data.blobs - Array de blobs { color: string, size: string, position: { top, left, bottom, right }, delay: number }
     * @param {Object} data.colors - Cores customizáveis (opcional)
     */
    constructor(data) {
        super();
        this.blobs = data.blobs || [
            { color: 'purple', size: '40vw', position: { top: '-10%', left: '-10%' }, delay: 0 },
            { color: 'blue', size: '35vw', position: { bottom: '-10%', right: '-10%' }, delay: 1000 },
            { color: 'pink', size: '25vw', position: { top: '40%', left: '30%' }, delay: 700 }
        ];

        // Resolve cores do tema
        this.primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#9333EA');
        this.secondaryHex = this.resolveColorHex(data.colors?.secondary, 'secondary', '#3B82F6');
        this.accentHex = this.resolveColorHex(data.colors?.accent, 'accent', '#EC4899');
    }

    /**
     * Injeta estilos base compartilhados (apenas uma vez)
     */
    injectBaseStyles() {
        if (document.getElementById('base-styles-global')) return;

        const style = document.createElement('style');
        style.id = 'base-styles-global';
        style.textContent = `
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 24px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        this.injectBaseStyles();
        if (document.getElementById('ambient-background-effects-styles')) return;

        const style = document.createElement('style');
        style.id = 'ambient-background-effects-styles';
        style.textContent = `
            @keyframes pulse-slow {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.1); opacity: 0.2; }
            }
            .ambient-blob {
                position: absolute;
                border-radius: 50%;
                filter: blur(120px);
                animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string
     */
    render() {
        this.injectStyles();

        const blobsHtml = this.blobs.map((blob, index) => {
            const colorMap = {
                purple: this.hexToRgba(this.primaryHex, 0.3),
                blue: this.hexToRgba(this.secondaryHex, 0.2),
                pink: this.hexToRgba(this.accentHex, 0.1)
            };
            const bgColor = colorMap[blob.color] || this.hexToRgba(this.primaryHex, 0.3);
            const position = blob.position || {};
            const style = `
                width: ${blob.size};
                height: ${blob.size};
                background: ${bgColor};
                animation-delay: ${blob.delay || 0}ms;
                ${position.top ? `top: ${position.top};` : ''}
                ${position.left ? `left: ${position.left};` : ''}
                ${position.bottom ? `bottom: ${position.bottom};` : ''}
                ${position.right ? `right: ${position.right};` : ''}
            `;
            return `<div class="ambient-blob" style="${style}"></div>`;
        }).join('');

        return `
            <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                ${blobsHtml}
            </div>
        `;
    }

    /**
     * Monta o componente no DOM
     * @param {string} targetId - ID do elemento onde será montado
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            this.injectStyles();
            target.innerHTML = this.render();
        }
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {AmbientBackgroundEffectsComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new AmbientBackgroundEffectsComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('ambient-background-effects', AmbientBackgroundEffectsComponent);
}

