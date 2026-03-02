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
    constructor(data = {}) {
        // Valores padrão do projeto HS Martins
        const defaults = {
            icon: 'fab fa-whatsapp',
            text: 'Fale Conosco',
            href: 'https://wa.me/551146382942?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20imóveis.',
            color: '#25D366'
        };
        
        this.icon = data.icon || defaults.icon;
        this.text = data.text || defaults.text;
        this.href = data.href || defaults.href;
        this.color = data.color || defaults.color;
    }

    /**
     * Injeta estilos base compartilhados (apenas uma vez)
     */
    injectBaseStyles() {
        if (document.getElementById('base-styles-global')) return;

        const style = document.createElement('style');
        style.id = 'base-styles-global';
        style.textContent = `
            :root {
                --primary: #16A34A;
                --primary-dark: #15803d;
                --primary-light: #dcfce7;
                --secondary: #2c3e50;
                --text-body: #555;
                --light-bg: #f9fdf7;
                --white: #ffffff;
                --shadow: 0 10px 30px rgba(0,0,0,0.08);
                --radius: 20px;
            }
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            html {
                scroll-behavior: smooth;
            }
            body {
                font-family: 'Nunito', sans-serif;
                color: var(--text-body);
                background-color: var(--white);
                line-height: 1.6;
                overflow-x: hidden;
            }
            h1, h2, h3, h4 {
                font-family: 'Poppins', sans-serif;
                color: var(--secondary);
                font-weight: 700;
            }
            a {
                text-decoration: none;
                color: inherit;
                transition: 0.3s;
            }
            ul {
                list-style: none;
            }
            img {
                max-width: 100%;
                height: auto;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 12px 30px;
                border-radius: 50px;
                font-weight: 700;
                cursor: pointer;
                border: none;
                transition: all 0.3s ease;
                text-align: center;
                gap: 10px;
            }
            .btn-primary {
                background-color: var(--primary);
                color: white;
                box-shadow: 0 4px 15px rgba(22, 163, 74, 0.4);
            }
            .btn-primary:hover {
                background-color: var(--primary-dark);
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(22, 163, 74, 0.6);
            }
            .btn-outline {
                border: 2px solid var(--secondary);
                color: var(--secondary);
                background: transparent;
            }
            .btn-outline:hover {
                background: var(--secondary);
                color: white;
            }
            .btn-secondary {
                background: var(--secondary);
                color: white;
            }
            .btn-hero {
                padding: 15px 40px;
                font-size: 1.1rem;
                box-shadow: 0 10px 25px rgba(22, 163, 74, 0.5);
            }
            .btn-hero:hover {
                box-shadow: 0 15px 35px rgba(22, 163, 74, 0.7);
                transform: translateY(-3px);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        this.injectBaseStyles();
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
            <a href="${this.href}" class="float-btn" style="background-color: ${this.color};" aria-label="${this.text} pelo WhatsApp">
                <i class="${this.icon}" style="${iconStyle}" aria-hidden="true"></i>
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

