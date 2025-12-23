/**
 * Component Registry - Sistema Automático de Componentes
 *
 * Uso no config.js (componentes na raiz):
 * const config = {
 *   'hero-overlay': { badge: '...', title: '...' },
 *   'outro-componente': { prop1: '...', prop2: '...' }
 * }
 *
 * O script detecta, carrega e monta automaticamente na ordem!
 */

(function() {
    'use strict';

    class ComponentRegistry {
        constructor() {
            this.components = {};
            this.loadedScripts = new Set();
            this.componentsPath = '../components/';
            this.mountedComponents = [];
        }

        /**
         * Registra um componente (chamado automaticamente pelo componente)
         */
        register(name, componentClass) {
            this.components[name] = componentClass;
            console.log(`📦 Componente '${name}' registrado`);
        }

        /**
         * Verifica se uma chave do config é um componente
         * (se tem hífen no nome, provavelmente é um componente)
         */
        isComponentKey(key, config) {
            return key.includes('-') && !key.startsWith('_') && typeof config[key] === 'object';
        }

        /**
         * Detecta todos os componentes no config
         */
        detectComponents(config) {
            const components = [];

            for (const key in config) {
                if (this.isComponentKey(key, config)) {
                    components.push({
                        type: key,
                        props: config[key]
                    });
                }
            }

            return components;
        }

        /**
         * Carrega o BaseComponent se ainda não foi carregado
         */
        async ensureBaseComponent() {
            if (typeof BaseComponent !== 'undefined') {
                return true;
            }

            return new Promise((resolve) => {
                const baseScript = document.createElement('script');
                baseScript.src = `${this.componentsPath}base-component.js`;
                baseScript.onload = () => {
                    console.log('✅ Base Component carregado');
                    resolve(true);
                };
                baseScript.onerror = () => {
                    console.warn('⚠️ Base Component não encontrado, componentes podem não funcionar corretamente');
                    resolve(false);
                };
                document.head.appendChild(baseScript);
            });
        }

        /**
         * Carrega dinamicamente o script de um componente
         */
        async loadComponent(type) {
            if (this.components[type]) {
                return true;
            }

            if (this.loadedScripts.has(type)) {
                return this.components[type] !== undefined;
            }

            // Garante que BaseComponent está carregado antes de carregar outros componentes
            await this.ensureBaseComponent();

            const scriptPath = `${this.componentsPath}${type}.js`;

            return new Promise((resolve, reject) => {
                console.log(`⏳ Carregando '${type}'...`);

                const script = document.createElement('script');
                script.src = scriptPath;

                script.onload = () => {
                    this.loadedScripts.add(type);

                    setTimeout(() => {
                        if (this.components[type]) {
                            console.log(`✅ '${type}' carregado`);
                            resolve(true);
                        } else {
                            console.error(`❌ '${type}' não se auto-registrou`);
                            resolve(false);
                        }
                    }, 10);
                };

                script.onerror = () => {
                    this.loadedScripts.add(type);
                    console.error(`❌ Erro ao carregar '${scriptPath}'`);
                    reject(new Error(`Falha ao carregar ${scriptPath}`));
                };

                document.head.appendChild(script);
            });
        }

        /**
         * Carrega múltiplos componentes
         */
        async loadComponents(types) {
            const uniqueTypes = [...new Set(types)];
            const promises = uniqueTypes.map(type => this.loadComponent(type));

            try {
                await Promise.all(promises);
                return true;
            } catch (error) {
                console.error('❌ Erro ao carregar componentes:', error);
                return false;
            }
        }

        /**
         * Cria automaticamente um elemento target e monta o componente
         */
        mount(type, props, container = null) {
            const Component = this.components[type];

            if (!Component) {
                console.error(`❌ Componente '${type}' não encontrado`);
                return null;
            }

            try {
                // Cria um ID único para este componente
                const targetId = `component-${type}-${this.mountedComponents.length}`;

                // Cria o elemento target
                const targetElement = document.createElement('div');
                targetElement.id = targetId;

                // Adiciona ao container (ou body)
                const mountPoint = container || document.body;
                mountPoint.appendChild(targetElement);

                // Monta o componente
                const instance = Component.create(props || {}, targetId);

                this.mountedComponents.push({
                    type,
                    targetId,
                    instance,
                    element: targetElement
                });

                console.log(`✅ '${type}' montado em '#${targetId}'`);
                return instance;
            } catch (error) {
                console.error(`❌ Erro ao montar '${type}':`, error);
                return null;
            }
        }

        /**
         * Inicializa automaticamente detectando componentes no config
         */
        async initFromConfig(config, container = null) {
            if (!config) {
                console.error('❌ Config não fornecido');
                return;
            }

            console.log('🔍 Detectando componentes no config...');

            // Detecta componentes automaticamente
            const componentsData = this.detectComponents(config);

            if (componentsData.length === 0) {
                console.warn('⚠️ Nenhum componente detectado no config');
                return;
            }

            console.log(`🚀 ${componentsData.length} componente(s) detectado(s):`, componentsData.map(c => c.type));

            // Carrega todos os componentes necessários
            const types = componentsData.map(c => c.type);
            await this.loadComponents(types);

            // Monta os componentes na ordem que aparecem no config
            console.log('📦 Montando componentes...');
            for (const { type, props } of componentsData) {
                this.mount(type, props, container);
            }

            // Inicializa ícones Lucide após todos os componentes serem montados
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
                console.log('✅ Ícones Lucide inicializados');
            }

            console.log('🎉 Todos os componentes montados!');
        }

        /**
         * Define o caminho dos componentes (opcional)
         */
        setComponentsPath(path) {
            this.componentsPath = path;
        }

        /**
         * Lista componentes carregados
         */
        list() {
            return Object.keys(this.components);
        }

        /**
         * Obtém componentes montados
         */
        getMounted() {
            return this.mountedComponents;
        }
    }

    window.componentRegistry = new ComponentRegistry();

    console.log('✅ Component Registry inicializado');
})();
