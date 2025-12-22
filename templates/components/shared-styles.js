/**
 * Shared Styles Helper
 * Injeta estilos compartilhados (reset, variáveis CSS, container, botões) apenas uma vez
 */

(function() {
    'use strict';

    let sharedStylesInjected = false;

    function injectSharedStyles() {
        if (sharedStylesInjected) return;
        sharedStylesInjected = true;

        const style = document.createElement('style');
        style.id = 'shared-styles';
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

    // Injeta automaticamente quando o script é carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSharedStyles);
    } else {
        injectSharedStyles();
    }

    // Exporta função para uso manual
    if (typeof window !== 'undefined') {
        window.injectSharedStyles = injectSharedStyles;
    }
})();

