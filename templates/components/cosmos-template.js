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

            // Utility CSS (sr-only)
            if (!document.getElementById('cosmos-util-styles')) {
                const utilStyle = document.createElement('style');
                utilStyle.id = 'cosmos-util-styles';
                utilStyle.textContent = `.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }`;
                head.appendChild(utilStyle);
            }

            // Font Awesome e Google Fonts são carregados diretamente no HTML (index.html)
            // com font-display:swap e preload dos woff2 - não precisa de fetch aqui.
            // Isso elimina os 90ms de bloqueio de fonte e reduz o CLS.

            console.log('✅ CSS injetado');
        }

        /**
         * Injeta scripts necessários
         */
        async injectScripts() {
            // AOS JS REMOVIDO - causava crash no iOS Safari
            // AOS monitora scroll events para animações, trava Safari mobile
            return Promise.resolve();
        }

        /**
         * Configura o Tailwind CSS baseado no config.js
         */
        configureTailwind() {
            if (!window.config) {
                console.error('❌ config.js não encontrado');
                return;
            }

            // Verifica se há script do Tailwind CDN na página
            const tailwindScript = document.querySelector('script[src*="tailwindcss"]');
            if (!tailwindScript) {
                console.warn('⚠️ Tailwind CSS não encontrado na página. A configuração será pulada.');
                return;
            }

            // Verifica se Tailwind está disponível (com timeout)
            let attempts = 0;
            const maxAttempts = 50; // 5 segundos máximo

            const checkTailwind = () => {
                attempts++;

                if (typeof tailwind !== 'undefined') {
                    // Cria script de configuração do Tailwind
                    const tailwindConfig = document.createElement('script');
                    tailwindConfig.textContent = `
                        tailwind.config = {
                            theme: {
                                extend: {
                                    colors: {
                                        brand: {
                                            dark: '${window.config.theme.colors.primary}',
                                            light: '${window.config.theme.colors.primaryLight || window.config.theme.colors.secondary}',
                                            cream: '${window.config.theme.colors.background}',
                                            gold: '${window.config.theme.colors.accent}',
                                            black: '#111111',
                                            gray: '#F5F5F5'
                                        },
                                        'brand-black': '#111111',
                                        'brand-gray': '#F5F5F5',
                                        accent: '${window.config.theme.colors.accent || '#00F0FF'}'
                                    },
                                    fontFamily: {
                                        serif: [${JSON.stringify(window.config.theme.fonts.primary)}],
                                        sans: [${JSON.stringify(window.config.theme.fonts.secondary)}],
                                        display: [${JSON.stringify(window.config.theme.fonts.secondary || window.config.theme.fonts.primary)}]
                                    },
                                    animation: {
                                        'slide-up': 'slideUp 0.5s ease-out forwards',
                                        'fade-in': 'fadeIn 0.3s ease-out forwards',
                                    },
                                    keyframes: {
                                        slideUp: {
                                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                                            '100%': { transform: 'translateY(0)', opacity: '1' },
                                        },
                                        fadeIn: {
                                            '0%': { opacity: '0' },
                                            '100%': { opacity: '1' },
                                        }
                                    }
                                }
                            }
                        }
                    `;
                    document.head.appendChild(tailwindConfig);
                    console.log('✅ Tailwind configurado');
                } else if (attempts < maxAttempts) {
                    // Tenta novamente após um pequeno delay
                    setTimeout(checkTailwind, 100);
                } else {
                    console.warn('⚠️ Tailwind CSS não carregou a tempo. A configuração será pulada.');
                }
            };

            // Inicia a verificação
            checkTailwind();
        }

        /**
         * Injeta Google Fonts
         */
        injectGoogleFonts() {
            if (!window.config?.theme?.fonts?.urls?.google) {
                return;
            }

            // Verifica se já existe um link de Google Fonts no DOM (carregado via HTML head)
            const existing = document.querySelector('link[href*="fonts.googleapis.com"]');
            if (existing) {
                console.log('✅ Google Fonts já carregado via HTML head - pulando injeção');
                return;
            }

            // Fallback: injeta via JS se não estiver no HTML (páginas sem o link no head)
            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = window.config.theme.fonts.urls.google;
            document.head.appendChild(fontLink);

            console.log('✅ Google Fonts injetado via JS (fallback)');
        }

        /**
         * Aplica background, cores e fontes do tema automaticamente
         */
        applyTheme() {
            if (!window.config || !window.config.theme) {
                return;
            }

            // Aplica cores e background
            if (window.config.theme.colors) {
                const bgColor = window.config.theme.colors.background || '#0f0f13';
                const textColor = window.config.theme.colors.text?.dark || '#1F2937';
                const isLight = bgColor === '#FFFFFF' || bgColor.toLowerCase() === '#ffffff' || bgColor.toLowerCase() === 'white';

                if (document.body) {
                    document.body.style.backgroundColor = bgColor;
                    document.body.style.color = isLight ? textColor : '#FFFFFF';
                }
            }

            // Aplica fontes
            if (window.config.theme.fonts) {
                // Aplica fonte primária ao body
                if (window.config.theme.fonts.primary && document.body) {
                    document.body.style.fontFamily = window.config.theme.fonts.primary;
                }
            }

            console.log('✅ Tema aplicado');
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
         * Aguarda o config ser carregado
         */
        async waitForConfig() {
            // Se config já está disponível, retorna
            if (window.config) {
                return window.config;
            }

            // Se há uma Promise de config carregando, aguarda ela
            if (window.configReady && window.configReady instanceof Promise) {
                return await window.configReady;
            }

            // Aguarda até config estar disponível (polling como fallback)
            return new Promise((resolve) => {
                const checkConfig = setInterval(() => {
                    if (window.config) {
                        clearInterval(checkConfig);
                        resolve(window.config);
                    }
                }, 50);

                // Timeout após 5 segundos
                setTimeout(() => {
                    clearInterval(checkConfig);
                    console.warn('⚠️ Timeout aguardando config.js');
                    window.config = window.config || {};
                    resolve(window.config);
                }, 5000);
            });
        }

        /**
         * Inicializa os componentes
         */
        async initializeComponents() {
            if (!window.componentRegistry) {
                console.error('❌ Component Registry não encontrado');
                return;
            }

            // Aguarda o config ser carregado
            await this.waitForConfig();

            if (!window.config) {
                console.error('❌ config.js não encontrado');
                return;
            }

            // Pega o body diretamente, sem necessidade de ID
            const body = document.body;

            console.log('🚀 Inicializando componentes...');
            // O component-registry carrega o BaseComponent automaticamente quando necessário
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

            // 0. Aguarda config ser carregado
            await this.waitForConfig();

            // 1. Aplica tema (background, cores e fontes)
            this.applyTheme();

            // 2. Injeta CSS
            this.injectCSS();

            // 3. Injeta Google Fonts
            this.injectGoogleFonts();

            // 4. Configura Tailwind
            this.configureTailwind();

            // 5. Define título da página
            this.setPageTitle();

            // 6. Scripts extras (AOS removido)
            await this.injectScripts();

            // 7. AOS REMOVIDO - causava crash no iOS Safari
            // AOS usa scroll event listeners continuamente para detectar elementos na tela

            // 8. Inicializa componentes
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

