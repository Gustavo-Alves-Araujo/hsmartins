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

