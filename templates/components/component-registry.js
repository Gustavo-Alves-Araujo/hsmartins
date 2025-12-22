/**
 * Component Registry - Sistema Automático de Componentes
 *
 * Uso no config.js:
 * components: [
 *   { type: 'hero-overlay', target: 'hero-component', props: {...} }
 * ]
 *
 * O registry carrega automaticamente os arquivos dos componentes!
 */

(function() {
    'use strict';

    class ComponentRegistry {
        constructor() {
            this.components = {};
            this.loadedScripts = new Set();
            this.componentsPath = '../components/';
        }

        /**
         * Registra um componente (chamado automaticamente pelo componente)
         */
        register(name, componentClass) {
            this.components[name] = componentClass;
            console.log(`📦 Componente '${name}' registrado`);
        }

        /**
         * Carrega dinamicamente o script de um componente
         */
        async loadComponent(type) {
            // Se já está registrado, não precisa carregar
            if (this.components[type]) {
                return true;
            }

            // Se já tentou carregar este script, não tenta novamente
            if (this.loadedScripts.has(type)) {
                return this.components[type] !== undefined;
            }

            const scriptPath = `${this.componentsPath}${type}.js`;

            return new Promise((resolve, reject) => {
                console.log(`⏳ Carregando componente '${type}'...`);

                const script = document.createElement('script');
                script.src = scriptPath;

                script.onload = () => {
                    this.loadedScripts.add(type);

                    // Aguarda um momento para o componente se auto-registrar
                    setTimeout(() => {
                        if (this.components[type]) {
                            console.log(`✅ Componente '${type}' carregado`);
                            resolve(true);
                        } else {
                            console.error(`❌ Componente '${type}' não se auto-registrou`);
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
         * Carrega múltiplos componentes em paralelo
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
         * Obtém um componente registrado
         */
        getComponent(type) {
            return this.components[type] || null;
        }

        /**
         * Cria e monta um componente
         */
        create(config) {
            const { type, target, props } = config;

            if (!type || !target) {
                console.error('❌ Erro: type e target são obrigatórios', config);
                return null;
            }

            const Component = this.getComponent(type);

            if (!Component) {
                console.error(`❌ Componente '${type}' não encontrado.`);
                console.log('Componentes disponíveis:', Object.keys(this.components));
                return null;
            }

            try {
                const instance = Component.create(props || {}, target);
                console.log(`✅ '${type}' montado em '#${target}'`);
                return instance;
            } catch (error) {
                console.error(`❌ Erro ao criar '${type}':`, error);
                return null;
            }
        }

        /**
         * Inicializa todos os componentes do config
         * Carrega automaticamente os arquivos necessários!
         */
        async initFromConfig(config) {
            if (!config?.components) {
                console.warn('⚠️ config.components não encontrado');
                return;
            }

            console.log(`🚀 Inicializando ${config.components.length} componente(s)...`);

            // Extrai os tipos únicos de componentes necessários
            const types = config.components.map(c => c.type);

            // Carrega todos os componentes necessários
            await this.loadComponents(types);

            // Monta os componentes
            console.log(`📦 Montando componentes...`);
            config.components.forEach(componentConfig => this.create(componentConfig));
        }

        /**
         * Lista componentes disponíveis
         */
        list() {
            return Object.keys(this.components);
        }
    }

    window.componentRegistry = new ComponentRegistry();

    console.log('✅ Component Registry inicializado');
})();
