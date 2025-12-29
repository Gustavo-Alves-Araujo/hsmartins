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
         * Loga erro de componente de forma detalhada
         */
        logComponentError(type, stage, error, props = null) {
            console.group(`🔴 ERRO NO COMPONENTE '${type}' - ${stage}`);
            console.error('Tipo do componente:', type);
            console.error('Estágio da falha:', stage);
            console.error('Erro:', error.message || error);
            console.error('Stack trace:', error.stack);
            if (props) {
                console.error('Props utilizadas:', props);
            }
            console.error('Erro completo:', error);
            console.groupEnd();
        }

        /**
         * Registra um componente (chamado automaticamente pelo componente)
         */
        register(name, componentClass) {
            try {
                if (!componentClass) {
                    throw new Error(`Tentativa de registrar componente '${name}' com classe null ou undefined`);
                }

                if (typeof componentClass !== 'function') {
                    throw new Error(`Tentativa de registrar componente '${name}' com valor que não é uma classe/função`);
                }

                // Verifica se o componente tem o método estático create
                if (typeof componentClass.create !== 'function') {
                    console.warn(`⚠️ Componente '${name}' registrado mas não possui método estático 'create()'. Ele pode falhar ao ser montado.`);
                }

                this.components[name] = componentClass;
                console.log(`📦 Componente '${name}' registrado`);
            } catch (error) {
                this.logComponentError(name, 'REGISTER', error);
            }
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

            // Verifica se o script já está sendo carregado ou já foi adicionado ao DOM
            const existingScript = document.querySelector(`script[src="${this.componentsPath}base-component.js"]`);
            if (existingScript) {
                // Script já existe, aguarda ele carregar
                return new Promise((resolve) => {
                    if (typeof BaseComponent !== 'undefined') {
                        resolve(true);
                        return;
                    }
                    const checkInterval = setInterval(() => {
                        if (typeof BaseComponent !== 'undefined') {
                            clearInterval(checkInterval);
                            resolve(true);
                        }
                    }, 50);
                    // Timeout após 5 segundos
                    setTimeout(() => {
                        clearInterval(checkInterval);
                        resolve(false);
                    }, 5000);
                });
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
                if (!this.components[type]) {
                    this.logComponentError(type, 'LOAD - Script carregado mas componente não registrado', new Error('Componente não se auto-registrou após o script ser carregado'));
                }
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

                    // Aguarda um pouco para o script executar e registrar o componente
                    setTimeout(() => {
                        if (this.components[type]) {
                            console.log(`✅ '${type}' carregado`);
                            resolve(true);
                        } else {
                            const error = new Error(`Componente '${type}' não se auto-registrou após carregar o script '${scriptPath}'. Verifique se o arquivo contém: window.componentRegistry.register('${type}', NomeDoComponente);`);
                            this.logComponentError(type, 'LOAD - Auto-registro falhou', error);
                            resolve(false);
                        }
                    }, 50); // Aumentado para 50ms para dar tempo do script executar
                };

                script.onerror = (error) => {
                    this.loadedScripts.add(type);
                    const loadError = new Error(`Falha ao carregar script do componente: ${scriptPath}. Verifique se o arquivo existe e está acessível.`);
                    this.logComponentError(type, 'LOAD - Erro ao carregar script', loadError);
                    reject(loadError);
                };

                document.head.appendChild(script);
            });
        }

        /**
         * Carrega múltiplos componentes
         */
        async loadComponents(types) {
            const uniqueTypes = [...new Set(types)];
            const results = await Promise.allSettled(
                uniqueTypes.map(type => this.loadComponent(type))
            );

            // Verifica se algum componente falhou ao carregar
            const failures = results
                .map((result, index) => ({ result, type: uniqueTypes[index] }))
                .filter(({ result }) => result.status === 'rejected' || result.value === false);

            if (failures.length > 0) {
                console.group('⚠️ Alguns componentes falharam ao carregar:');
                failures.forEach(({ type, result }) => {
                    if (result.status === 'rejected') {
                        this.logComponentError(type, 'LOAD', result.reason);
                    } else {
                        console.warn(`❌ Componente '${type}' não foi carregado corretamente`);
                    }
                });
                console.groupEnd();
            }

            return failures.length === 0;
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

            const targetId = `component-${type}-${this.mountedComponents.length}`;
            const componentProps = props || {};

            try {
                // Verifica se Component.create existe
                if (typeof Component.create !== 'function') {
                    throw new Error(`Component.create não é uma função. O componente '${type}' pode não ter o método estático create().`);
                }

                // Cria o elemento target
                const targetElement = document.createElement('div');
                targetElement.id = targetId;

                // Adiciona ao container (ou body)
                const mountPoint = container || document.body;
                mountPoint.appendChild(targetElement);

                // Tenta criar e montar o componente
                let instance;
                try {
                    // Cria a instância do componente (chama create que faz new Component e mount)
                    instance = Component.create(componentProps, targetId);

                    // Verifica se a instância foi criada
                    if (!instance) {
                        throw new Error('Component.create() retornou null ou undefined');
                    }
                } catch (createError) {
                    // Remove o elemento target se o componente não foi montado
                    if (targetElement.parentNode) {
                        targetElement.parentNode.removeChild(targetElement);
                    }
                    throw new Error(`Falha ao criar componente: ${createError.message}`, { cause: createError });
                }

                // Verifica se o componente foi renderizado (há conteúdo no target)
                setTimeout(() => {
                    if (targetElement.innerHTML.trim() === '') {
                        console.warn(`⚠️ Componente '${type}' foi criado mas não renderizou conteúdo em '#${targetId}'`);
                    }
                }, 100);

                this.mountedComponents.push({
                    type,
                    targetId,
                    instance,
                    element: targetElement
                });

                console.log(`✅ '${type}' montado em '#${targetId}'`);
                return instance;
            } catch (error) {
                // Loga o erro de forma detalhada
                this.logComponentError(type, 'MOUNT', error, componentProps);

                // Tenta remover o elemento target se foi criado
                try {
                    const failedElement = document.getElementById(targetId);
                    if (failedElement && failedElement.parentNode) {
                        failedElement.parentNode.removeChild(failedElement);
                    }
                } catch (cleanupError) {
                    // Ignora erros na limpeza
                }

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
            const mountResults = [];
            for (const { type, props } of componentsData) {
                const result = this.mount(type, props, container);
                mountResults.push({ type, success: result !== null });
            }

            // Mostra resumo da montagem
            const successful = mountResults.filter(r => r.success).length;
            const failed = mountResults.filter(r => !r.success).length;

            if (failed > 0) {
                console.group('⚠️ Resumo da montagem de componentes:');
                console.log(`✅ Sucesso: ${successful} componente(s)`);
                console.log(`❌ Falhas: ${failed} componente(s)`);
                mountResults
                    .filter(r => !r.success)
                    .forEach(r => console.error(`  - ${r.type} falhou ao montar`));
                console.groupEnd();
            } else {
                console.log(`✅ Todos os ${successful} componentes foram montados com sucesso!`);
            }

            // Inicializa ícones Lucide após todos os componentes serem montados
            if (typeof lucide !== 'undefined') {
                try {
                    lucide.createIcons();
                    console.log('✅ Ícones Lucide inicializados');
                } catch (error) {
                    console.warn('⚠️ Erro ao inicializar ícones Lucide:', error);
                }
            }
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
