/**
 * WhatsApp Float Button Component
 * Botão flutuante fixo para WhatsApp com animação de pulso
 */

class WhatsAppFloatButtonComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.icon - Classe do ícone (padrão: fab fa-whatsapp)
     * @param {string} data.text - Texto do botão
     * @param {string} data.href - Link do botão
     * @param {string} data.color - Cor de fundo (opcional, padrão: #25D366 para WhatsApp)
     */
    constructor(data) {
        this.icon = data.icon || 'fab fa-whatsapp';
        this.text = data.text || '';
        this.href = data.href || '#';
        this.color = data.color || '#25D366';
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('whatsapp-float-button-styles')) return;

        const style = document.createElement('style');
        style.id = 'whatsapp-float-button-styles';
        style.textContent = `
            .float-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                color: white;
                padding: 15px 25px;
                border-radius: 50px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 999;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: pulse 2s infinite;
            }
            .float-btn:hover {
                transform: scale(1.05);
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
                70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
                100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
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
        const iconStyle = this.icon.includes('whatsapp') ? 'font-size: 1.5rem;' : '';

        return `
            <a href="${this.href}" class="float-btn" style="background-color: ${this.color};">
                <i class="${this.icon}" style="${iconStyle}"></i>
                ${this.text ? `<span>${this.text}</span>` : ''}
            </a>
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
     * @returns {WhatsAppFloatButtonComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new WhatsAppFloatButtonComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('whatsapp-float-button', WhatsAppFloatButtonComponent);
}

