/**
 * Email Signup Form Component
 * Formulário de inscrição por email com checkbox de termos
 */

class EmailSignupFormComponent {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.title - Título da seção
     * @param {string} data.placeholder - Placeholder do input
     * @param {string} data.buttonText - Texto do botão
     * @param {string} data.termsText - Texto dos termos
     */
    constructor(data) {
        this.title = data.title || '';
        this.placeholder = data.placeholder || 'Seu melhor e-mail';
        this.buttonText = data.buttonText || 'Inscrever';
        this.termsText = data.termsText || '';
    }

    /**
     * Injeta estilos no head se ainda não foram injetados
     */
    injectStyles() {
        if (document.getElementById('email-signup-form-styles')) return;

        const style = document.createElement('style');
        style.id = 'email-signup-form-styles';
        style.textContent = `
            .newsletter {
                padding: 60px 0;
                background: var(--secondary);
                color: white;
                text-align: center;
            }
            .newsletter h2 {
                color: white;
                margin-bottom: 20px;
            }
            .newsletter-form {
                max-width: 500px;
                margin: 20px auto;
                display: flex;
                gap: 10px;
            }
            .newsletter-form input {
                flex: 1;
                padding: 15px;
                border-radius: 50px;
                border: none;
                outline: none;
            }
            .check-terms {
                font-size: 0.8rem;
                margin-top: 15px;
                color: #ccc;
            }
            @media (max-width: 992px) {
                .newsletter-form { flex-direction: column; }
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
        return `
            <section class="newsletter">
                <div class="container">
                    <h2>${this.title}</h2>
                    <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Obrigado por se inscrever!');">
                        <input type="email" placeholder="${this.placeholder}" required>
                        <button type="submit" class="btn btn-primary">${this.buttonText}</button>
                    </form>
                    ${this.termsText ? `
                        <p class="check-terms">
                            <input type="checkbox" checked disabled> ${this.termsText}
                        </p>
                    ` : ''}
                </div>
            </section>
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
     * @returns {EmailSignupFormComponent} Instância do componente
     */
    static create(data, targetId) {
        const component = new EmailSignupFormComponent(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('email-signup-form', EmailSignupFormComponent);
}

