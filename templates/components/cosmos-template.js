/**
 * Cosmos Template - Sistema de Templates Automático
 * Injeta automaticamente CSS, configura Tailwind e inicializa componentes
 */

(function() {
    'use strict';

    class CosmosTemplate {
        constructor() {
            this.initialized = false;
        }

        /**
         * Injeta links CSS no head
         */
        injectCSS() {
            const head = document.head;

            // Font Awesome
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            head.appendChild(fontAwesome);

            // AOS CSS
            const aosCss = document.createElement('link');
            aosCss.rel = 'stylesheet';
            aosCss.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
            head.appendChild(aosCss);

            console.log('✅ CSS injetado');
        }

        /**
         * Injeta scripts necessários
         */
        async injectScripts() {
            // AOS JS
            return new Promise((resolve) => {
                const aosScript = document.createElement('script');
                aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
                aosScript.onload = () => {
                    console.log('✅ AOS carregado');
                    resolve();
                };
                document.head.appendChild(aosScript);
            });
        }

        /**
         * Configura o Tailwind CSS baseado no config.js
         */
        configureTailwind() {
            if (!window.config) {
                console.error('❌ config.js não encontrado');
                return;
            }

            // Cria script de configuração do Tailwind
            const tailwindConfig = document.createElement('script');
            tailwindConfig.textContent = `
                tailwind.config = {
                    theme: {
                        extend: {
                            colors: {
                                brand: {
                                    dark: '${window.config.theme.colors.primary}',
                                    light: '${window.config.theme.colors.primaryLight}',
                                    cream: '${window.config.theme.colors.background}',
                                    gold: '${window.config.theme.colors.accent}'
                                }
                            },
                            fontFamily: {
                                serif: [${JSON.stringify(window.config.theme.fonts.primary)}],
                                sans: [${JSON.stringify(window.config.theme.fonts.secondary)}]
                            }
                        }
                    }
                }
            `;
            document.head.appendChild(tailwindConfig);

            console.log('✅ Tailwind configurado');
        }

        /**
         * Injeta Google Fonts
         */
        injectGoogleFonts() {
            if (!window.config?.theme?.fonts?.urls?.google) {
                return;
            }

            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = window.config.theme.fonts.urls.google;
            document.head.appendChild(fontLink);

            console.log('✅ Google Fonts injetado');
        }

        /**
         * Define o título da página
         */
        setPageTitle() {
            if (window.config?.site?.title) {
                document.title = window.config.site.title;
                console.log(`✅ Título: ${window.config.site.title}`);
            }
        }

        /**
         * Inicializa os componentes
         */
        async initializeComponents() {
            if (!window.componentRegistry) {
                console.error('❌ Component Registry não encontrado');
                return;
            }

            if (!window.config) {
                console.error('❌ config.js não encontrado');
                return;
            }

            // Pega o body diretamente, sem necessidade de ID
            const body = document.body;

            console.log('🚀 Inicializando componentes...');
            await window.componentRegistry.initFromConfig(window.config, body);
            console.log('✅ Componentes inicializados');
        }

        /**
         * Inicializa o template completo
         */
        async init() {
            if (this.initialized) {
                console.warn('⚠️ Template já inicializado');
                return;
            }

            console.log('🎨 Cosmos Template - Inicializando...');

            // 1. Injeta CSS
            this.injectCSS();

            // 2. Injeta Google Fonts
            this.injectGoogleFonts();

            // 3. Configura Tailwind
            this.configureTailwind();

            // 4. Define título da página
            this.setPageTitle();

            // 5. Injeta e aguarda scripts
            await this.injectScripts();

            // 6. Inicializa AOS
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    once: true,
                    offset: 100
                });
                console.log('✅ AOS inicializado');
            }

            // 7. Inicializa componentes
            await this.initializeComponents();

            this.initialized = true;
            console.log('🎉 Cosmos Template pronto!');

            // Dispara evento customizado
            window.dispatchEvent(new CustomEvent('cosmos-template-ready'));
        }
    }

    // Cria instância global
    window.cosmosTemplate = new CosmosTemplate();

    // Auto-inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cosmosTemplate.init();
        });
    } else {
        // DOM já está pronto
        window.cosmosTemplate.init();
    }

})();

