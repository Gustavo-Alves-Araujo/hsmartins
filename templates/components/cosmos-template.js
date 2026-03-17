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
        /**
         * Configura o Tailwind CSS baseado no config.js
         * O config já foi declarado globalmente em tailwindConfig (ver index.html head)
         * Aqui apenas fazemos o fallback se o CDN ainda não carregou
         */
        configureTailwind() {
            if (!window.config) return;

            const configObj = {
                theme: {
                    extend: {
                        colors: {
                            brand: {
                                dark: window.config.theme.colors.primary,
                                light: window.config.theme.colors.primaryLight || window.config.theme.colors.secondary,
                                cream: window.config.theme.colors.background,
                                gold: window.config.theme.colors.accent,
                                black: '#111111',
                                gray: '#F5F5F5'
                            },
                            'brand-black': '#111111',
                            'brand-gray': '#F5F5F5',
                            accent: window.config.theme.colors.accent || '#00F0FF'
                        },
                        fontFamily: {
                            serif: [window.config.theme.fonts.primary],
                            sans: [window.config.theme.fonts.secondary],
                            display: [window.config.theme.fonts.secondary || window.config.theme.fonts.primary]
                        }
                    }
                }
            };

            if (typeof tailwind !== 'undefined') {
                tailwind.config = configObj;
            } else {
                // Tailwind ainda não carregou (async) - expoe no window para o CDN usar
                window.__tailwindConfig = configObj;
                // Polling rápido: máx 2s, intervalo 50ms
                let attempts = 0;
                const check = () => {
                    if (typeof tailwind !== 'undefined') {
                        tailwind.config = configObj;
                    } else if (++attempts < 40) {
                        setTimeout(check, 50);
                    }
                };
                setTimeout(check, 50);
            }
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
         * Inicializa os componentes em 3 ondas para minimizar trabalho da thread principal:
         * - Onda 1 (imediata): cabeçalho + hero (críticos para LCP)
         * - Onda 2 (próximo tick): grid de imóveis (acima da dobra, mas não LCP)
         * - Onda 3 (requestIdleCallback): todos os demais (abaixo da dobra)
         */
        async initializeComponents() {
            if (!window.componentRegistry) return;
            await this.waitForConfig();
            if (!window.config) return;

            const registry = window.componentRegistry;
            const body = document.body;
            const allComponents = registry.detectComponents(window.config);

            // Define prioridades
            const CRITICAL   = new Set(['sticky-header-navigation', 'hero-overlay']);
            const DEFERRED   = new Set(['product-grid-advanced']);
            // Todo o resto é IDLE

            const critical  = allComponents.filter(c =>  CRITICAL.has(c.type));
            const deferred  = allComponents.filter(c =>  DEFERRED.has(c.type));
            const idle      = allComponents.filter(c => !CRITICAL.has(c.type) && !DEFERRED.has(c.type));

            // --- Onda 1: críticos ---
            if (critical.length) {
                await registry.loadComponents(critical.map(c => c.type));
                for (const { type, props } of critical) registry.mount(type, props, body);
            }

            // --- Onda 2: deferred (após próximo frame) ---
            if (deferred.length) {
                await new Promise(r => setTimeout(r, 0));
                await registry.loadComponents(deferred.map(c => c.type));
                for (const { type, props } of deferred) registry.mount(type, props, body);
            }

            // --- Onda 3: idle (quando o browser tiver tempo) ---
            if (idle.length) {
                const rIC = window.requestIdleCallback || (fn => setTimeout(fn, 200));
                rIC(async () => {
                    await registry.loadComponents(idle.map(c => c.type));
                    for (const { type, props } of idle) registry.mount(type, props, body);
                    window.dispatchEvent(new CustomEvent('cosmos-template-ready'));
                });
            } else {
                window.dispatchEvent(new CustomEvent('cosmos-template-ready'));
            }
        }

        /**
         * Inicializa o template completo
         */
        async init() {
            if (this.initialized) return;

            await this.waitForConfig();
            this.applyTheme();
            this.injectCSS();
            this.injectGoogleFonts();
            this.configureTailwind();
            this.setPageTitle();
            await this.injectScripts();
            await this.initializeComponents();

            this.initialized = true;
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

