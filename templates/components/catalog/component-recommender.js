/**
 * Component Recommender
 * Sistema inteligente de recomendações de componentes baseado em contexto
 *
 * Uso:
 * const recommender = new ComponentRecommender();
 * const recommendations = recommender.recommendForNiche('personal-trainer', { hasPricing: true });
 * const layout = recommender.suggestLayout(recommendations);
 */

class ComponentRecommender {
    constructor() {
        this.catalog = null;
        this.loadCatalog();
    }

    /**
     * Carrega o catálogo de componentes
     */
    async loadCatalog() {
        try {
            // Em ambiente Node.js ou build-time
            if (typeof require !== 'undefined') {
                this.catalog = require('./components-catalog.json');
            } else {
                // Em ambiente browser, precisa fazer fetch
                const response = await fetch('./catalog/components-catalog.json');
                this.catalog = await response.json();
            }
        } catch (error) {
            console.warn('⚠️ Não foi possível carregar o catálogo:', error);
            this.catalog = null;
        }
    }

    /**
     * Recomenda componentes baseado no nicho e requisitos
     * @param {string} niche - Nicho do negócio (personal-trainer, saas, clinics, etc)
     * @param {Object} requirements - Requisitos adicionais
     * @param {boolean} requirements.hasPricing - Se precisa de pricing
     * @param {boolean} requirements.hasContact - Se precisa de contato destacado
     * @param {boolean} requirements.hasServices - Se precisa de serviços
     * @param {boolean} requirements.hasAbout - Se precisa de seção sobre
     * @param {string} requirements.style - Estilo preferido (modern, traditional, etc)
     * @returns {Array} Array de componentes recomendados
     */
    recommendForNiche(niche, requirements = {}) {
        if (!this.catalog) {
            console.warn('⚠️ Catálogo não carregado');
            return [];
        }

        const nicheTemplates = this.catalog.nicheTemplates || {};
        const baseRecommendations = nicheTemplates[niche]?.recommended || [];
        const optional = nicheTemplates[niche]?.optional || [];

        let recommendations = [...baseRecommendations];

        // Adiciona componentes opcionais baseado em requisitos
        if (requirements.hasPricing && !recommendations.includes('pricing-grid-highlight')) {
            recommendations.push('pricing-grid-highlight');
        }

        if (requirements.hasContact && !recommendations.includes('contact-top-bar')) {
            recommendations.unshift('contact-top-bar');
        }

        if (requirements.hasServices && !recommendations.includes('quick-service-cards')) {
            recommendations.push('quick-service-cards');
        }

        if (requirements.hasAbout && !recommendations.includes('about-image-features')) {
            recommendations.push('about-image-features');
        }

        if (requirements.hasFAQ && !recommendations.includes('faq-accordion')) {
            recommendations.push('faq-accordion');
        }

        // Filtra por estilo se especificado
        if (requirements.style) {
            recommendations = this.filterByStyle(recommendations, requirements.style);
        }

        return recommendations;
    }

    /**
     * Filtra componentes por estilo
     */
    filterByStyle(components, style) {
        if (!this.catalog) return components;

        return components.filter(componentId => {
            const component = this.catalog.components[componentId];
            if (!component) return false;

            const styleMap = {
                'modern': ['modern', 'glassmorphism', 'gradient', 'glow'],
                'traditional': ['professional', 'clean', 'compact'],
                'cinematic': ['cinematic', 'overlay'],
                'minimalist': ['minimalist', 'clean']
            };

            const allowedStyles = styleMap[style] || [];
            return allowedStyles.some(s => component.style.includes(s));
        });
    }

    /**
     * Sugere layout/organização dos componentes
     * @param {Array} components - Array de IDs de componentes
     * @returns {Array} Array ordenado de componentes com posicionamento
     */
    suggestLayout(components) {
        if (!this.catalog) {
            return components.map(id => ({ id, position: 'auto' }));
        }

        const layoutOrder = {
            'top': ['contact-top-bar', 'sticky-header-navigation', 'sticky-navbar-gradient', 'header-navigation'],
            'after-header': ['hero-image-badge', 'hero-overlay', 'hero-badge-preview'],
            'after-hero': ['info-bar', 'social-proof-logos'],
            'mid-page': ['achievements-numbers-grid', 'quick-service-cards', 'about-image-features', 'about-image-features-clinical', 'features-grid-glass', 'benefit-highlight-split', 'feature-highlight', 'card-grid'],
            'mid-to-late-page': ['pricing-grid-highlight', 'plans-callout-box', 'email-signup-form'],
            'late-page': ['faq-accordion', 'cta-banner', 'cta-glow-card'],
            'bottom': ['footer-contact', 'footer-multi-column-dark', 'footer-multi-column-links'],
            'fixed-bottom-right': ['whatsapp-float-button'],
            'background': ['ambient-background-effects']
        };

        const positioned = [];
        const unpositioned = [];

        // Organiza por posição
        for (const [position, positionComponents] of Object.entries(layoutOrder)) {
            const inPosition = components.filter(id => positionComponents.includes(id));
            inPosition.forEach(id => {
                positioned.push({ id, position });
            });
        }

        // Componentes não categorizados
        components.forEach(id => {
            if (!positioned.find(p => p.id === id)) {
                unpositioned.push({ id, position: 'auto' });
            }
        });

        // Ordena pela ordem sugerida
        const allPositions = [
            ...positioned.filter(p => p.position === 'top'),
            ...positioned.filter(p => p.position === 'after-header'),
            ...positioned.filter(p => p.position === 'after-hero'),
            ...positioned.filter(p => p.position === 'mid-page'),
            ...positioned.filter(p => p.position === 'mid-to-late-page'),
            ...positioned.filter(p => p.position === 'late-page'),
            ...positioned.filter(p => p.position === 'bottom'),
            ...unpositioned,
            ...positioned.filter(p => p.position === 'fixed-bottom-right'),
            ...positioned.filter(p => p.position === 'background')
        ];

        return allPositions;
    }

    /**
     * Verifica compatibilidade entre componentes
     * @param {Array} components - Array de IDs de componentes
     * @returns {Object} Relatório de compatibilidade
     */
    checkCompatibility(components) {
        if (!this.catalog) {
            return { compatible: true, warnings: [] };
        }

        const warnings = [];
        const incompatible = [];

        for (let i = 0; i < components.length; i++) {
            const component1 = this.catalog.components[components[i]];
            if (!component1) continue;

            for (let j = i + 1; j < components.length; j++) {
                const component2 = this.catalog.components[components[j]];
                if (!component2) continue;

                // Verifica incompatibilidades
                if (component1.incompatibleWith?.includes(components[j])) {
                    incompatible.push(`${component1.id} é incompatível com ${components[j]}`);
                }

                if (component2.incompatibleWith?.includes(components[i])) {
                    incompatible.push(`${component2.id} é incompatível com ${components[i]}`);
                }

                // Verifica compatibilidades recomendadas
                if (component1.compatibleWith && !component1.compatibleWith.includes(components[j])) {
                    warnings.push(`${component1.id} pode não combinar bem com ${components[j]}`);
                }
            }
        }

        return {
            compatible: incompatible.length === 0,
            warnings,
            incompatible,
            components: components.map(id => ({
                id,
                name: this.catalog.components[id]?.name || id,
                category: this.catalog.components[id]?.category || 'unknown'
            }))
        };
    }

    /**
     * Gera um config.js completo baseado em recomendações
     * @param {string} niche - Nicho do negócio
     * @param {Object} requirements - Requisitos
     * @param {Object} userData - Dados do usuário (nome, telefone, etc)
     * @returns {Object} Config completo
     */
    generateConfig(niche, requirements = {}, userData = {}) {
        const recommendations = this.recommendForNiche(niche, requirements);
        const layout = this.suggestLayout(recommendations);
        const compatibility = this.checkCompatibility(recommendations);

        if (!compatibility.compatible) {
            console.warn('⚠️ Componentes incompatíveis detectados:', compatibility.incompatible);
        }

        // Estrutura base do config
        const config = {
            theme: {
                colors: {
                    primary: userData.primaryColor || '#16A34A',
                    secondary: userData.secondaryColor || '#22C55E',
                    tertiary: userData.tertiaryColor || '#10B981',
                    accent: userData.accentColor || '#F97316',
                    background: userData.backgroundColor || '#FFFFFF',
                    text: {
                        dark: '#1F2937',
                        medium: '#4B5563',
                        light: '#9CA3AF',
                        white: '#FFFFFF'
                    }
                },
                fonts: {
                    primary: userData.primaryFont || '"Poppins", sans-serif',
                    secondary: userData.secondaryFont || '"Inter", sans-serif',
                    urls: {
                        google: userData.googleFontsUrl || 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap'
                    }
                }
            },
            site: {
                title: userData.siteTitle || 'Meu Site',
                name: userData.siteName || 'Meu Site',
                established: userData.established || '',
                logoAlt: userData.logoAlt || 'Logo',
                logoUrl: userData.logoUrl || ''
            }
        };

        // Adiciona componentes na ordem sugerida
        layout.forEach(({ id }) => {
            const component = this.catalog?.components[id];
            if (component) {
                // Gera estrutura básica do componente
                config[id] = this.generateComponentConfig(id, component, userData);
            }
        });

        return {
            config,
            metadata: {
                niche,
                components: recommendations,
                layout,
                compatibility,
                generatedAt: new Date().toISOString()
            }
        };
    }

    /**
     * Gera configuração básica para um componente
     */
    generateComponentConfig(componentId, component, userData) {
        const baseConfig = {};

        // Configurações comuns baseadas em props requeridas
        if (component.requiredProps.includes('infoItems')) {
            baseConfig.infoItems = [
                { icon: 'fas fa-phone-alt', text: userData.phone || '(11) 99999-9999' },
                { icon: 'fas fa-map-marker-alt', text: userData.address || 'Endereço' }
            ];
        }

        if (component.requiredProps.includes('socialLinks')) {
            baseConfig.socialLinks = [
                { icon: 'fab fa-instagram', href: userData.instagram || 'https://instagram.com' },
                { icon: 'fab fa-facebook-f', href: userData.facebook || 'https://facebook.com' }
            ];
        }

        if (component.requiredProps.includes('title')) {
            baseConfig.title = userData.siteName || 'Título';
        }

        if (component.requiredProps.includes('links')) {
            baseConfig.links = {
                about: { text: 'Sobre', href: '#sobre' },
                services: { text: 'Serviços', href: '#servicos' },
                contact: { text: 'Contato', href: '#contato' }
            };
        }

        // Configurações específicas por componente
        if (componentId === 'hero-image-badge') {
            baseConfig.tag = 'Bem-vindo';
            baseConfig.title = 'Seu Título';
            baseConfig.titleHighlight = 'Destaque';
            baseConfig.description = 'Descrição do seu negócio';
            baseConfig.imageUrl = userData.heroImage || 'https://via.placeholder.com/800x600';
        }

        if (componentId === 'pricing-grid-highlight') {
            baseConfig.title = 'Nossos Planos';
            baseConfig.plans = [
                { name: 'Básico', price: 'R$ 100', period: '/mês', features: [], highlighted: false },
                { name: 'Premium', price: 'R$ 200', period: '/mês', features: [], highlighted: true }
            ];
        }

        return baseConfig;
    }

    /**
     * Lista todos os componentes disponíveis
     */
    listAllComponents() {
        if (!this.catalog) return [];
        return Object.values(this.catalog.components).map(c => ({
            id: c.id,
            name: c.name,
            category: c.category,
            tags: c.tags,
            niches: c.niches
        }));
    }

    /**
     * Busca componentes por tag ou categoria
     */
    searchComponents(query) {
        if (!this.catalog) return [];

        const searchTerm = query.toLowerCase();
        return Object.values(this.catalog.components).filter(component => {
            return (
                component.name.toLowerCase().includes(searchTerm) ||
                component.description.toLowerCase().includes(searchTerm) ||
                component.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                component.category.toLowerCase().includes(searchTerm)
            );
        }).map(c => ({
            id: c.id,
            name: c.name,
            category: c.category,
            description: c.description
        }));
    }
}

// Exporta para uso em diferentes ambientes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentRecommender;
}

if (typeof window !== 'undefined') {
    window.ComponentRecommender = ComponentRecommender;
}

