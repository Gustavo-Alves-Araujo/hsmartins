/**
 * Product Grid Advanced Component
 * Grid de produtos avançado com cards completos, hover effects e integração com Supabase
 */

class ProductGridAdvancedComponent extends BaseComponent {
    constructor(data = {}) {
        super();
        
        const defaults = {
            id: 'imoveis',
            products: [
                { title: 'Sobrado para Venda em Poá', category: 'Alto Padrão', price: { current: 'R$ 650.000', original: 'R$ 680.000' }, rating: '4.8', installments: 'Em até 360x', badge: { text: 'Novo', style: 'new' } },
                { title: 'Casa Térrea para Venda em Poá', category: 'Conforto e Lazer', price: { current: 'R$ 380.000' }, rating: '4.5', installments: 'Em até 360x' },
                { title: 'Apartamento em Itaquaquecetuba', category: 'Oportunidade', price: { current: 'R$ 220.000', original: 'R$ 240.000' }, rating: '4.2', installments: 'Em até 360x', badge: { text: 'Desconto', style: 'discount' } },
                { title: 'Casa na Praia - Litoral Norte', category: 'Lazer e Férias', price: { current: 'R$ 950.000' }, rating: '4.9', installments: 'Em até 360x' }
            ],
            linkText: 'Ver todos os Imóveis',
            linkHref: '#',
            useSupabase: true
        };
        
        this.id = data.id || defaults.id;
        this.products = data.products || defaults.products;
        this.linkText = data.linkText !== undefined ? data.linkText : defaults.linkText;
        this.linkHref = data.linkHref || defaults.linkHref;
        this.useSupabase = data.useSupabase !== undefined ? data.useSupabase : defaults.useSupabase;
        this.isLoading = false;
        this.targetId = null;

        const bgBase = this.resolveColor(data.colors?.background, 'background', 'white');
        const primaryHex = this.resolveColorHex(data.colors?.primary, 'primary', '#005CA9');
        const accentHex = this.resolveColorHex(data.colors?.accent, 'accent', '#F39200');

        this.colors = { background: bgBase, primary: primaryHex, accent: accentHex, text: 'gray-900', textSecondary: 'gray-500' };
        // estado dos filtros
        this.filterState = {
            search: '',
            type: 'all',     // tipoimovel
            city: 'all',     // endereco_cidade
            bairro: 'all',   // endereco_bairro
            price: 'any',
            sort: 'relevance'
        };
        this._searchDebounce = null;
        this._runtimeStylesInjected = false;
        this._carouselListenersAttached = false;
        
        // Infinite scroll config
        this.itemsPerPage = 16;
        this.currentPage = 0;
        this._isLoadingMore = false;
        this._intersectionObserverSet = false;
    }

    async loadFromSupabase() {
        try {
            if (typeof supabase === 'undefined') {
                await this.loadSupabaseScript();
            }

            const SUPABASE_URL = 'https://vkwczizdjhsejbpaapea.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrd2N6aXpkamhzZWpicGFhcGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDU0MzAsImV4cCI6MjA4MzQyMTQzMH0.qvWHxNAhefq253JaoVYG19izClKgLGc4ZkW5y8ladmM';
            const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const { data, error } = await supabaseClient.from('Hsmartins_Produtos').select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                // Padroniza e separa
                const products = data
                    .filter(item => item.imovel_status !== 'Inativo' && item.imovel_status !== 'inativo')
                    .map(item => ({
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        tipoimovel: item.tipoimovel,
                        subtipoimovel: item.subtipoimovel,
                        transacao: item.transacao,
                        endereco_cidade: item.endereco_cidade,
                        endereco_bairro: item.endereco_bairro,
                        ref: item.ref || '',
                        price: { current: item.price_current, original: item.price_original },
                        valor: typeof item.valor === 'number' ? item.valor : parseFloat(item.valor),
                        destacado: item.destacado === true || item.destacado === 'true' || item.destacado === 1,
                        rating: item.rating,
                        installments: item.installments,
                        badge: item.badge_text ? { text: item.badge_text, style: item.badge_style } : null,
                        imageUrl: item.image_url,
                        imagesUrls: item.images_urls ? (Array.isArray(item.images_urls) ? item.images_urls : JSON.parse(item.images_urls)) : [item.image_url]
                    }));
                // Todos os produtos juntos, sem separação por destaque
                this.products = products;
                // inicializa filtros com todos os dados
                this.applyFilters({ renderOnly: true });
                console.log(`✅ ${data.length} produtos carregados do Supabase`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao conectar com Supabase:', error);
            return false;
        }
    }

    _uniqSorted(values) {
        return [...new Set(values.filter(v => typeof v === 'string' && v.trim().length > 0).map(v => v.trim()))]
            .sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
    }

    _escapeHtml(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    injectRuntimeStyles() {
        if (this._runtimeStylesInjected) return;
        this._runtimeStylesInjected = true;
        if (typeof document === 'undefined') return;
        if (document.getElementById('product-grid-advanced-runtime-styles')) return;

        const style = document.createElement('style');
        style.id = 'product-grid-advanced-runtime-styles';
        style.textContent = `
            .hs-scrollbar-hide::-webkit-scrollbar { display: none; }
            .hs-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
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

    renderProductCard(product, primaryColor) {
        this.injectRuntimeStyles();
        const badgeHtml = product.badge ? `<span class="absolute top-3 left-3 ${product.badge.style === 'new' ? 'bg-gray-900' : 'bg-red-500'} text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10">${product.badge.text}</span>` : '';
        const images = Array.isArray(product.imagesUrls) && product.imagesUrls.length > 0
            ? product.imagesUrls.filter(Boolean)
            : [(product.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80')];
        const carouselId = product.id ? `carousel-${product.id}` : `carousel-${Math.random().toString(36).slice(2)}`;
        const slidesHtml = images.map((url, idx) => `
            <div class="w-full h-full flex-shrink-0 snap-start relative">
                <img src="${url}" class="object-cover w-full h-full" alt="${this._escapeHtml(product.title)} - foto ${idx + 1}">
            </div>
        `).join('');

        const imagesHtml = `
            <div class="relative w-full h-full">
                <div id="${carouselId}" class="hs-scrollbar-hide w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                     data-carousel
                     data-carousel-id="${carouselId}"
                     data-carousel-count="${images.length}">
                    ${slidesHtml}
                </div>

                ${images.length > 1 ? `
                    <button type="button"
                            class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur border border-white/60 shadow-sm items-center justify-center text-gray-800 hover:bg-white transition z-20"
                            data-carousel-prev="${carouselId}"
                            aria-label="Imagem anterior">
                        <i class="fas fa-chevron-left text-xs"></i>
                    </button>
                    <button type="button"
                            class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur border border-white/60 shadow-sm items-center justify-center text-gray-800 hover:bg-white transition z-20"
                            data-carousel-next="${carouselId}"
                            aria-label="Próxima imagem">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </button>

                    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/45 text-white text-[10px] font-semibold tracking-wide z-20"
                         data-carousel-indicator="${carouselId}">
                        1/${images.length}
                    </div>
                ` : ''}
            </div>
        `;
        const priceHtml = product.price ? `<div>${product.price.current ? `<span class="text-gray-900 font-bold">${product.price.current}</span>` : ''}${product.price.original ? `<span class="text-gray-400 text-sm line-through ml-2">${product.price.original}</span>` : ''}</div>` : '';
        const ratingHtml = product.rating ? `<div class="flex text-yellow-400 text-xs"><i class="fas fa-star"></i><span class="text-gray-400 ml-1">${product.rating}</span></div>` : '';
        const detailsLink = product.id ? `imovel.html?id=${product.id}` : '#';

        return `<a href="${detailsLink}" class="group relative bg-white block rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
                ${badgeHtml}
                ${imagesHtml}
            </div>
            <div class="p-4">
                ${product.tipoimovel || product.category ? `<p class="text-gray-500 text-xs mb-1">${this._escapeHtml(product.tipoimovel || product.category)}</p>` : ''}
                <h3 class="font-semibold text-lg leading-tight mb-2 transition group-hover:opacity-90" style="color: ${primaryColor};">${this._escapeHtml(product.title)}</h3>
                <div class="flex items-center justify-between">${priceHtml}${ratingHtml}</div>
                ${product.installments ? `<p class="text-xs mt-2 font-semibold" style="color: ${this.colors.accent};">${this._escapeHtml(product.installments)}</p>` : ''}
            </div>
        </a>`;
    }

    render() {
        const c = this.colors;
        if (this.isLoading) return `<section ${this.id ? `id="${this.id}"` : ''} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"><div class="text-center py-12"><i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i><p class="text-gray-600">Carregando imóveis...</p></div></section>`;
        // Barra de filtros
        const all = this.products || [];
        const tipos = this._uniqSorted(all.map(p => p.tipoimovel || p.category).filter(Boolean));
        const cidades = this._uniqSorted(all.map(p => p.endereco_cidade).filter(Boolean));
        const bairros = this._uniqSorted(all.map(p => p.endereco_bairro).filter(Boolean));

        const fs = this.filterState || {};
        const renderOptions = (items) => items.map(v => {
            const esc = this._escapeHtml(v);
            return `<option value="${esc}">${esc}</option>`;
        }).join('');

        const filterBar = `
            <div class="mb-8 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <input type="text" id="imovel-search" value="${this._escapeHtml(fs.search || '')}" placeholder="Pesquisar por título, tipo, bairro, cidade ou ref..." class="w-full md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};" />

                <select id="imovel-type" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};">
                    <option value="all">Todos os tipos</option>
                    ${renderOptions(tipos)}
                </select>

                <select id="imovel-city" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};">
                    <option value="all">Todas as cidades</option>
                    ${renderOptions(cidades)}
                </select>

                <select id="imovel-bairro" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};">
                    <option value="all">Todos os bairros</option>
                    ${renderOptions(bairros)}
                </select>

                <div class="grid grid-cols-2 gap-3 md:col-span-6">
                    <select id="imovel-price" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};">
                        <option value="any">Qualquer preço</option>
                        <option value="0-100000">Até R$100.000</option>
                        <option value="100000-300000">R$100.000 - R$300.000</option>
                        <option value="300000-600000">R$300.000 - R$600.000</option>
                        <option value="600000-1000000">R$600.000 - R$1.000.000</option>
                        <option value="1000000-999999999">Acima de R$1.000.000</option>
                    </select>
                    <select id="imovel-sort" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};">
                        <option value="relevance">Ordenar: Relevância</option>
                        <option value="price-asc">Menor preço</option>
                        <option value="price-desc">Maior preço</option>
                        <option value="title-asc">Título (A-Z)</option>
                        <option value="title-desc">Título (Z-A)</option>
                    </select>
                </div>
            </div>
        `;

        // Seção correspondente Caixa (entre destaques e lista completa)
        const caixaBlue = this.colors.primary;
        const caixaOrange = this.colors.accent;
        const caixaBlueDark = this.darkenColor(caixaBlue, 0.12);

        const caixaSection = `
            <div class="w-full rounded-2xl p-6 md:p-8 mb-12 overflow-hidden relative"
                 style="background: radial-gradient(1000px 420px at 15% 0%, ${this.hexToRgba(caixaOrange, 0.35)}, transparent 55%), linear-gradient(135deg, ${caixaBlue} 0%, ${caixaBlueDark} 100%);">
                <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(90deg, rgba(255,255,255,0.10), transparent 35%, transparent 65%, rgba(255,255,255,0.06));"></div>
                <div class="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <div class="flex-1 text-white">
                        <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-widest"
                             style="background-color: ${this.hexToRgba('#FFFFFF', 0.12)}; border: 1px solid ${this.hexToRgba('#FFFFFF', 0.18)};">
                            <i class="fas fa-university"></i>
                            Correspondente Caixa
                        </div>
                        <p class="mt-3 text-white/95 text-sm font-semibold">
                            Somos <span style="color: ${this.hexToRgba(caixaOrange, 0.98)};">Correspondente Caixa</span> e te acompanhamos do início ao fim do financiamento.
                        </p>
                        <h3 class="mt-4 text-2xl md:text-3xl font-extrabold leading-tight">Financie com segurança e agilidade</h3>
                        <p class="mt-2 text-white/90 text-base md:text-lg">
                            Simule, organize documentos e acompanhe o processo com suporte completo.
                        </p>
                        <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/95">
                            <div class="flex items-center gap-2"><i class="fas fa-check-circle"></i> Atendimento rápido</div>
                            <div class="flex items-center gap-2"><i class="fas fa-check-circle"></i> Suporte na documentação</div>
                            <div class="flex items-center gap-2"><i class="fas fa-check-circle"></i> Simulação facilitada</div>
                            <div class="flex items-center gap-2"><i class="fas fa-check-circle"></i> Acompanhamento do início ao fim</div>
                        </div>
                    </div>
                    <div class="flex-1 w-full">
                        <div class="rounded-2xl p-5 md:p-6"
                             style="background-color: ${this.hexToRgba('#FFFFFF', 0.12)}; border: 1px solid ${this.hexToRgba('#FFFFFF', 0.18)};">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                                     style="background-color: ${this.hexToRgba(caixaOrange, 0.95)}; color: #0B2B4A;">
                                    <i class="fas fa-file-signature"></i>
                                </div>
                                <div class="text-white">
                                    <div class="font-extrabold">Quer que a gente te ajude?</div>
                                    <div class="text-white/90 text-sm">Filtre os imóveis e fale conosco para orientar o financiamento.</div>
                                </div>
                            </div>
                            <div class="mt-4 text-white/85 text-sm">
                                Dica: achou um imóvel? A gente te ajuda a escolher a melhor condição e organizar os documentos.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Containers: as grids são atualizadas sem recriar os inputs (evita perder foco ao digitar)
        return `<section ${this.id ? `id="${this.id}"` : ''} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">${filterBar}${caixaSection}<div id="${this.id}-all"></div></section>`;
    }

    renderGrids() {
        const c = this.colors;
        const allEl = document.getElementById(`${this.id}-all`);
        if (!allEl) return;

        let allHtml = '';
        
        // Usa todos os produtos filtrados, sem separação
        const allProducts = this.filteredProducts || [];
        
        if (allProducts.length > 0) {
            // Infinite scroll: mostrar apenas os primeiros N items baseado na página atual
            const endIdx = Math.min(this.currentPage * this.itemsPerPage + this.itemsPerPage, allProducts.length);
            const visibleProducts = allProducts.slice(0, endIdx);
            
            allHtml = `<h2 class="text-2xl font-bold mb-6 text-gray-900">Todos os Imóveis</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" id="${this.id}-all-grid">${visibleProducts.map(product => this.renderProductCard(product, c.primary)).join('')}</div>`;
            
            // Se há mais produtos, adiciona sentinel para infinite scroll
            if (endIdx < allProducts.length) {
                allHtml += `<div id="${this.id}-scroll-sentinel" style="height: 1px; margin-top: 40px;"></div>`;
            }
        } else {
            allHtml = `<div class="py-10 text-center text-gray-600"><i class="fas fa-search text-3xl text-gray-300 mb-3"></i><div class="font-semibold">Nenhum imóvel encontrado</div><div class="text-sm text-gray-500 mt-1">Tente ajustar os filtros ou a pesquisa.</div></div>`;
        }

        allEl.innerHTML = allHtml;
        
        // Setup IntersectionObserver para infinite scroll
        this.setupInfiniteScroll();
    }

    // Aplica filtros atuais aos produtos e re-renderiza
    applyFilters(options = {}) {
        // options.renderOnly true evita dupla renderização durante load
        if (!this.products) return;
        
        // Reset pagination quando filtros mudam
        if (!options.renderOnly) {
            this.currentPage = 0;
            this._intersectionObserverSet = false;
        }
        
        const fs = this.filterState;
        let filtered = this.products.slice();
        // tipo
        if (fs.type && fs.type !== 'all') {
            const t = String(fs.type).toLowerCase();
            filtered = filtered.filter(p => (p.tipoimovel || p.category || '').toLowerCase() === t);
        }
        // cidade
        if (fs.city && fs.city !== 'all') {
            const c = String(fs.city).toLowerCase();
            filtered = filtered.filter(p => (p.endereco_cidade || '').toLowerCase() === c);
        }
        // bairro
        if (fs.bairro && fs.bairro !== 'all') {
            const b = String(fs.bairro).toLowerCase();
            filtered = filtered.filter(p => (p.endereco_bairro || '').toLowerCase() === b);
        }
        // preço
        if (fs.price && fs.price !== 'any') {
            const [minS, maxS] = fs.price.split('-');
            const min = parseFloat(minS) || 0;
            const max = parseFloat(maxS) || Number.MAX_SAFE_INTEGER;
            filtered = filtered.filter(p => {
                const v = isFinite(p.valor) ? p.valor : (typeof p.valor === 'string' ? parseFloat(p.valor.replace(/[^0-9.-]+/g, '')) : NaN);
                if (isNaN(v)) return false;
                return v >= min && v <= max;
            });
        }
        // pesquisa
        if (fs.search && fs.search.trim().length > 0) {
            const q = fs.search.trim().toLowerCase();
            filtered = filtered.filter(p => {
                const title = (p.title || '').toLowerCase();
                const cat = (p.category || '').toLowerCase();
                const tipo = (p.tipoimovel || '').toLowerCase();
                const cidade = (p.endereco_cidade || '').toLowerCase();
                const bairro = (p.endereco_bairro || '').toLowerCase();
                const ref = (p.ref || '').toLowerCase();
                return title.includes(q) || cat.includes(q) || tipo.includes(q) || cidade.includes(q) || bairro.includes(q) || ref.includes(q);
            });
        }
        // ordenar (após filtros)
        const sortMode = fs.sort || 'relevance';
        const byPrice = (a, b) => (a.valor || 0) - (b.valor || 0);
        const byTitle = (a, b) => String(a.title || '').localeCompare(String(b.title || ''), 'pt-BR', { sensitivity: 'base' });

        const sorter = (() => {
            if (sortMode === 'price-asc') return byPrice;
            if (sortMode === 'price-desc') return (a, b) => -byPrice(a, b);
            if (sortMode === 'title-asc') return byTitle;
            if (sortMode === 'title-desc') return (a, b) => -byTitle(a, b);
            // relevance: mantém destacados primeiro e depois por preço crescente (comportamento atual)
            return byPrice;
        })();

        // Ordenar todos os produtos juntos, sem separação
        this.filteredProducts = filtered.sort(sorter);

        if (!options.renderOnly) {
            this.renderGrids();
        }
    }

    attachFilterListeners() {
        try {
            const search = document.getElementById('imovel-search');
            const typeSel = document.getElementById('imovel-type');
            const citySel = document.getElementById('imovel-city');
            const bairroSel = document.getElementById('imovel-bairro');
            const priceSel = document.getElementById('imovel-price');
            const sortSel = document.getElementById('imovel-sort');
            if (search) {
                search.value = this.filterState.search || '';
                search.addEventListener('input', (e) => {
                    clearTimeout(this._searchDebounce);
                    this._searchDebounce = setTimeout(() => {
                        this.filterState.search = e.target.value || '';
                        this.applyFilters();
                    }, 250);
                });
            }
            if (typeSel) {
                typeSel.value = this.filterState.type || 'all';
                typeSel.addEventListener('change', (e) => {
                    this.filterState.type = e.target.value;
                    this.applyFilters();
                });
            }
            if (citySel) {
                citySel.value = this.filterState.city || 'all';
                citySel.addEventListener('change', (e) => {
                    this.filterState.city = e.target.value;
                    this.applyFilters();
                });
            }
            if (bairroSel) {
                bairroSel.value = this.filterState.bairro || 'all';
                bairroSel.addEventListener('change', (e) => {
                    this.filterState.bairro = e.target.value;
                    this.applyFilters();
                });
            }
            if (priceSel) {
                priceSel.value = this.filterState.price || 'any';
                priceSel.addEventListener('change', (e) => {
                    this.filterState.price = e.target.value;
                    this.applyFilters();
                });
            }
            if (sortSel) {
                sortSel.value = this.filterState.sort || 'relevance';
                sortSel.addEventListener('change', (e) => {
                    this.filterState.sort = e.target.value;
                    this.applyFilters();
                });
            }
            this.attachCarouselListeners();
        } catch (err) {
            console.warn('Erro attachFilterListeners', err);
        }
    }

    attachCarouselListeners() {
        if (this._carouselListenersAttached) return;
        this._carouselListenersAttached = true;

        // Click nas setas (desktop)
        document.addEventListener('click', (e) => {
            const prevBtn = e.target?.closest?.('[data-carousel-prev]');
            const nextBtn = e.target?.closest?.('[data-carousel-next]');
            const id = prevBtn?.getAttribute('data-carousel-prev') || nextBtn?.getAttribute('data-carousel-next');
            if (!id) return;

            e.preventDefault();
            e.stopPropagation();

            const el = document.getElementById(id);
            if (!el) return;
            const dir = prevBtn ? -1 : 1;
            const width = el.clientWidth || 300;
            el.scrollBy({ left: dir * width, behavior: 'smooth' });
        }, { passive: false });

        // Atualiza indicador (1/N) conforme scroll
        const rafMap = new Map();
        document.addEventListener('scroll', (e) => {
            const el = e.target;
            if (!el || !(el instanceof HTMLElement)) return;
            if (!el.hasAttribute('data-carousel')) return;

            const id = el.getAttribute('data-carousel-id');
            if (!id) return;
            if (rafMap.get(id)) return;
            rafMap.set(id, true);

            requestAnimationFrame(() => {
                rafMap.delete(id);
                const count = parseInt(el.getAttribute('data-carousel-count') || '1', 10) || 1;
                const idx = Math.min(count, Math.max(1, Math.round(el.scrollLeft / Math.max(1, el.clientWidth)) + 1));
                const indicator = document.querySelector(`[data-carousel-indicator="${id}"]`);
                if (indicator) indicator.textContent = `${idx}/${count}`;
            });
        }, true);
    }

    setupInfiniteScroll() {
        // Limpa observer anterior
        if (this._intersectionObserverSet) return;
        this._intersectionObserverSet = true;

        setTimeout(() => {
            const sentinel = document.getElementById(`${this.id}-scroll-sentinel`);
            if (!sentinel) {
                // Reset flag se não há sentinel (todos os produtos já foram carregados)
                this._intersectionObserverSet = false;
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this._isLoadingMore) {
                        this._isLoadingMore = true;
                        this.currentPage++;
                        this.renderGrids();
                        this._isLoadingMore = false;
                        this.attachCarouselListeners();
                    }
                });
            }, { rootMargin: '200px' });

            observer.observe(sentinel);
        }, 100);
    }

    attachHeroIntegration() {
        if (this._heroIntegrationAttached) return;
        this._heroIntegrationAttached = true;

        // Recebe busca do hero, aplica filtros e faz scroll até a seção
        window.addEventListener('imoveis:hero-search', (evt) => {
            const d = evt?.detail || {};
            this.filterState.search = d.search || '';
            this.filterState.type = d.type || 'all';
            this.filterState.city = d.city || 'all';
            this.filterState.bairro = 'all';

            // sincroniza UI dos selects sem recriar DOM
            const search = document.getElementById('imovel-search');
            const typeSel = document.getElementById('imovel-type');
            const citySel = document.getElementById('imovel-city');
            const bairroSel = document.getElementById('imovel-bairro');
            if (search) search.value = this.filterState.search;
            if (typeSel) typeSel.value = this.filterState.type;
            if (citySel) citySel.value = this.filterState.city;
            if (bairroSel) bairroSel.value = this.filterState.bairro;

            this.applyFilters();

            const section = document.getElementById(this.id) || document.getElementById(this.targetId);
            if (section) {
                const header = document.getElementById('main-header');
                const headerHeight = header ? header.offsetHeight : 80;
                const y = section.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }

    async mount(targetId) {
        this.targetId = targetId;
        const target = document.getElementById(targetId);
        if (target) {
            if (this.useSupabase) {
                this.isLoading = true;
                target.innerHTML = this.render();
                this.attachFilterListeners();
                this.attachHeroIntegration();
                const loaded = await this.loadFromSupabase();
                this.isLoading = false;
                target.innerHTML = this.render();
                this.attachFilterListeners();
                this.attachHeroIntegration();
                this.renderGrids();
                // envia opções pro hero (para popular selects dinamicamente)
                try {
                    const all = this.products || [];
                    const tipos = this._uniqSorted(all.map(p => p.tipoimovel || p.category).filter(Boolean));
                    const cidades = this._uniqSorted(all.map(p => p.endereco_cidade).filter(Boolean));
                    const bairros = this._uniqSorted(all.map(p => p.endereco_bairro).filter(Boolean));
                    window.dispatchEvent(new CustomEvent('imoveis:options', { detail: { tipos, cidades, bairros } }));
                } catch (e) {
                    // silencioso
                }
                if (!loaded) console.warn('⚠️ Usando produtos padrão');
            } else {
                target.innerHTML = this.render();
                this.attachFilterListeners();
                this.attachHeroIntegration();
                this.renderGrids();
            }
        }
    }

    static create(data, targetId) {
        const component = new ProductGridAdvancedComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('product-grid-advanced', ProductGridAdvancedComponent);
}
