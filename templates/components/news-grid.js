/**
 * News Grid Component
 * Componente para exibir grid de notícias
 */

class NewsGridComponent extends BaseComponent {
    constructor(data = {}) {
        super();
        
        const defaults = {
            id: 'noticias',
            title: 'Últimas Notícias',
            subtitle: 'Fique por dentro das novidades do mercado imobiliário',
            limit: 6,
            useSupabase: true
        };
        
        this.id = data.id || defaults.id;
        this.title = data.title || defaults.title;
        this.subtitle = data.subtitle || defaults.subtitle;
        this.limit = data.limit || defaults.limit;
        this.useSupabase = data.useSupabase !== undefined ? data.useSupabase : defaults.useSupabase;
        this.news = [];
        this.isLoading = false;

        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#005CA9');
        const accentHex = this.resolveColorHex(data.colors?.accent, 'accent', '#F39200');
        
        this.colors = { primary: primaryHex, accent: accentHex };
    }

    async loadFromSupabase() {
        try {
            if (typeof supabase === 'undefined') {
                await this.loadSupabaseScript();
            }

            const SUPABASE_URL = 'https://vkwczizdjhsejbpaapea.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrd2N6aXpkamhzZWpicGFhcGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDU0MzAsImV4cCI6MjA4MzQyMTQzMH0.qvWHxNAhefq253JaoVYG19izClKgLGc4ZkW5y8ladmM';
            const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            
            const { data, error } = await supabaseClient
                .from('Hsmartins_Noticias')
                .select('*')
                .eq('status', 'publicado')
                .order('data_publicacao', { ascending: false })
                .limit(this.limit);

            if (error) throw error;

            if (data && data.length > 0) {
                this.news = data.map(item => ({
                    id: item.id,
                    titulo: item.titulo,
                    slug: item.slug || this.generateSlug(item.titulo),
                    resumo: item.resumo || '',
                    conteudo: item.conteudo,
                    imagem_principal: item.imagem_principal,
                    categoria: item.categoria || 'Geral',
                    autor: item.autor || 'H.S Martins',
                    data_publicacao: item.data_publicacao,
                    destacado: item.destacado || false
                }));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            return false;
        }
    }

    generateSlug(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });
    }

    async loadSupabaseScript() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.onload = () => setTimeout(() => resolve(), 100);
            script.onerror = () => reject();
            document.head.appendChild(script);
        });
    }

    renderNewsCard(newsItem) {
        const c = this.colors;
        const imageUrl = newsItem.imagem_principal || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';
        const newsUrl = `/noticia.html?slug=${newsItem.slug}`;
        const date = this.formatDate(newsItem.data_publicacao);

        return `
            <article class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                <a href="${newsUrl}" class="block">
                    <div class="relative aspect-video overflow-hidden bg-gray-100">
                        <img src="${imageUrl}" 
                             alt="${this._escapeHtml(newsItem.titulo)}"
                             class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                             loading="lazy"
                             decoding="async">
                        ${newsItem.destacado ? `
                            <span class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                                Destaque
                            </span>
                        ` : ''}
                        ${newsItem.categoria ? `
                            <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                                ${this._escapeHtml(newsItem.categoria)}
                            </span>
                        ` : ''}
                    </div>
                    <div class="p-6">
                        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <i class="far fa-calendar"></i>
                            <span>${date}</span>
                            <span class="mx-2">•</span>
                            <i class="far fa-user"></i>
                            <span>${this._escapeHtml(newsItem.autor)}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-gray-900 group-hover:opacity-80 transition" style="color: ${c.primary};">
                            ${this._escapeHtml(newsItem.titulo)}
                        </h3>
                        ${newsItem.resumo ? `
                            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                ${this._escapeHtml(newsItem.resumo)}
                            </p>
                        ` : ''}
                        <div class="mt-4 flex items-center text-sm font-semibold" style="color: ${c.accent};">
                            <span>Ler mais</span>
                            <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }

    _escapeHtml(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    render() {
        const c = this.colors;
        
        if (this.isLoading) {
            return `
                <section ${this.id ? `id="${this.id}"` : ''} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div class="text-center py-12">
                        <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                        <p class="text-gray-600">Carregando notícias...</p>
                    </div>
                </section>
            `;
        }

        if (this.news.length === 0) {
            return '';
        }

        return `
            <section ${this.id ? `id="${this.id}"` : ''} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-extrabold mb-4" style="color: ${c.primary};">
                        ${this.title}
                    </h2>
                    ${this.subtitle ? `
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                            ${this.subtitle}
                        </p>
                    ` : ''}
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    ${this.news.map(item => this.renderNewsCard(item)).join('')}
                </div>
                
                <div class="text-center">
                    <a href="/noticias" 
                       class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
                       style="background: linear-gradient(135deg, ${c.accent} 0%, ${this.darkenColor(c.accent, 0.12)} 100%); color: ${this.getBestTextColor(c.accent)};">
                        <span>Ver todas as notícias</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </section>
        `;
    }

    async mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            if (this.useSupabase) {
                this.isLoading = true;
                target.innerHTML = this.render();
                const loaded = await this.loadFromSupabase();
                this.isLoading = false;
                target.innerHTML = this.render();
                if (!loaded) console.warn('⚠️ Nenhuma notícia encontrada');
            } else {
                target.innerHTML = this.render();
            }
        }
    }

    static create(data, targetId) {
        const component = new NewsGridComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('news-grid', NewsGridComponent);
}

