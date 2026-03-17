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
        this._carouselListenersAttached = false;
        
        // Renderização progressiva para performance
        this.itemsPerPage = 20; // Renderiza 20 por vez
        this.currentPage = 0;
        this._isLoadingMore = false;
        this._intersectionObserverSet = false;
        this._renderTimeout = null;
    }

    async loadFromSupabase() {
        try {
            const SUPABASE_URL = 'https://vkwczizdjhsejbpaapea.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrd2N6aXpkamhzZWpicGFhcGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDU0MzAsImV4cCI6MjA4MzQyMTQzMH0.qvWHxNAhefq253JaoVYG19izClKgLGc4ZkW5y8ladmM';
            const _headers = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` };
            const resp = await fetch(`${SUPABASE_URL}/rest/v1/Hsmartins_Produtos?select=*`, { headers: _headers });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const data = await resp.json();

            if (data && data.length > 0) {
                // Padroniza e separa
                const productsMap = new Map();
                
                data
                    .filter(item => item.imovel_status !== 'Inativo' && item.imovel_status !== 'inativo')
                    .forEach(item => {
                        // Usa ID como chave para evitar duplicatas
                        const productId = item.id || `${item.title}_${item.endereco_cidade}_${item.ref}`;
                        
                        if (!productsMap.has(productId)) {
                            productsMap.set(productId, {
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
                                valor: this._parsePrice(item.valor),
                                destacado: item.destacado === true || item.destacado === 'true' || item.destacado === 1,
                                rating: item.rating,
                                installments: item.installments,
                                badge: item.badge_text ? { text: item.badge_text, style: item.badge_style } : null,
                                imageUrl: (item.image_url && typeof item.image_url === 'string' && item.image_url.startsWith('http')) ? item.image_url.replace(/^http:\/\//i, 'https://') : null,
                                imagesUrls: (item.images_urls ? (Array.isArray(item.images_urls) ? item.images_urls : JSON.parse(item.images_urls)) : [item.image_url]).map(u => u && typeof u === 'string' && u.startsWith('http') ? u.replace(/^http:\/\//i, 'https://') : null).filter(Boolean)
                            });
                        }
                    });
                
                // Converte Map para Array
                const products = Array.from(productsMap.values());
                
                // Todos os produtos juntos, sem separação por destaque
                this.products = products;
                // inicializa filtros com todos os dados
                this.applyFilters({ renderOnly: true });
                console.log(`✅ ${products.length} produtos únicos carregados do Supabase (${data.length} total, ${data.length - products.length} duplicatas removidas)`);
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

    _parsePrice(value) {
        // Converte valor para número, tratando diferentes formatos
        if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
            return value;
        }
        if (typeof value === 'string') {
            // Remove caracteres não numéricos exceto ponto e vírgula
            const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');
            const parsed = parseFloat(cleaned);
            if (!isNaN(parsed) && isFinite(parsed)) {
                return parsed;
            }
        }
        // Se não conseguir parsear, retorna 0 (será ordenado por último)
        return 0;
    }

    _escapeHtml(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }



    renderProductCard(product, primaryColor) {
        const badgeHtml = product.badge ? `<span class="absolute top-3 left-3 ${product.badge.style === 'new' ? 'bg-gray-900' : 'bg-red-500'} text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10">${product.badge.text}</span>` : '';
        
        // SIMPLIFICADO: Apenas 1 imagem por card para evitar crash no iOS
        // O carrossel com todas as imagens estava causando crash no Safari/iOS
        // pois carregava centenas de imagens no DOM simultaneamente
        const _isValidUrl = u => u && typeof u === 'string' && u.startsWith('http');
        const _validFirst = Array.isArray(product.imagesUrls) && product.imagesUrls.find(_isValidUrl);
        let firstImage = _validFirst || (_isValidUrl(product.imageUrl) ? product.imageUrl : null)
            || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';
        // Optimize Supabase images: o endpoint /render/image/ é pago (Pro plan).
        // No free tier causa NS_BINDING_ABORTED. Usamos a URL original /object/public/
        // e convertemos para HTTPS. O browser carrega o formato original (PNG/JPEG/WebP).
        if (firstImage && firstImage.includes('supabase.co/storage/')) {
            // Garante HTTPS e remove query params extras
            firstImage = firstImage.replace(/^http:\/\//i, 'https://').split('?')[0];
        }
        
        const totalImages = Array.isArray(product.imagesUrls) ? product.imagesUrls.filter(Boolean).length : 1;

        const imageHtml = `
            <div class="relative w-full h-full">
                <img src="${firstImage}" 
                     class="object-cover w-full h-full" 
                     alt="${this._escapeHtml(product.title)}"
                     width="400" height="533"
                     loading="lazy"
                     decoding="async"
                     onerror="this.onerror=null;this.src='/img/placeholder.svg'"
                     data-product-image>
                ${totalImages > 1 ? `
                    <div class="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/50 text-white text-[10px] font-semibold z-10">
                        <i class="fas fa-images mr-1"></i>${totalImages} fotos
                    </div>
                ` : ''}
            </div>
        `;

        const priceHtml = product.price ? `<div>${product.price.current ? `<span class="text-gray-900 font-bold">${product.price.current}</span>` : ''}${product.price.original ? `<span class="text-gray-500 text-sm line-through ml-2">${product.price.original}</span>` : ''}</div>` : '';
        const ratingHtml = product.rating ? `<div class="flex text-yellow-400 text-xs"><i class="fas fa-star" aria-hidden="true"></i><span class="text-gray-600 ml-1">${product.rating}</span></div>` : '';
        // Gera link limpo /imovel/{ref}/{slug}
        const _slugify = (t) => (t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
        const _ref = product.ref || '';
        const _tipo = _slugify(product.tipoimovel) || 'imovel';
        const _cidade = _slugify(product.endereco_cidade) || 'poa';
        const _estado = _slugify(product.endereco_estado) || 'sp';
        const _bairro = _slugify(product.endereco_bairro);
        const _slug = _bairro ? `${_tipo}-venda-${_cidade}-${_estado}-${_bairro}` : `${_tipo}-venda-${_cidade}-${_estado}`;
        const detailsLink = _ref ? `/imovel/${_ref}/${_slug}` : (product.id ? `/imovel.html?id=${product.id}` : '#');

        return `<a href="${detailsLink}" class="group relative bg-white block rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
            <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
                ${badgeHtml}
                ${imageHtml}
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
            <div class="mb-8">
                <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <label for="imovel-search" class="sr-only">Pesquisar imóveis</label>
                    <input type="text" id="imovel-search" value="${this._escapeHtml(fs.search || '')}" placeholder="Pesquisar por título, tipo, bairro, cidade ou ref..." class="w-full md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};" aria-label="Pesquisar imóveis" />

                    <label for="imovel-type" class="sr-only">Tipo de imóvel</label>
                    <select id="imovel-type" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};" aria-label="Tipo de imóvel">
                        <option value="all">Todos os tipos</option>
                        ${renderOptions(tipos)}
                    </select>

                    <label for="imovel-city" class="sr-only">Cidade</label>
                    <select id="imovel-city" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};" aria-label="Cidade">
                        <option value="all">Todas as cidades</option>
                        ${renderOptions(cidades)}
                    </select>

                    <label for="imovel-bairro" class="sr-only">Bairro</label>
                    <select id="imovel-bairro" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};" aria-label="Bairro">
                        <option value="all">Todos os bairros</option>
                        ${renderOptions(bairros)}
                    </select>

                    <button type="button" id="imovel-search-btn" class="w-full px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]" style="background: linear-gradient(135deg, ${c.accent} 0%, ${this.darkenColor(c.accent, 0.12)} 100%); color: ${this.getBestTextColor(c.accent)};">
                        <i class="fas fa-search mr-2"></i>
                        Pesquisar
                    </button>
                </div>
                
                <div class="grid grid-cols-2 gap-3 mt-4">
                    <label for="imovel-price" class="sr-only">Faixa de preço</label>
                    <select id="imovel-price" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};" aria-label="Faixa de preço">
                        <option value="any">Qualquer preço</option>
                        <option value="0-100000">Até R$100.000</option>
                        <option value="100000-300000">R$100.000 - R$300.000</option>
                        <option value="300000-600000">R$300.000 - R$600.000</option>
                        <option value="600000-1000000">R$600.000 - R$1.000.000</option>
                        <option value="1000000-999999999">Acima de R$1.000.000</option>
                    </select>
                    <label for="imovel-sort" class="sr-only">Ordenar por</label>
                    <select id="imovel-sort" class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2" style="--tw-ring-color: ${c.primary};" aria-label="Ordenar por">
                        <option value="relevance">Ordenar: Relevância</option>
                        <option value="price-asc">Menor preço</option>
                        <option value="price-desc">Maior preço</option>
                        <option value="title-asc">Título (A-Z)</option>
                        <option value="title-desc">Título (Z-A)</option>
                    </select>
                </div>
            </div>
        `;

        // Containers: as grids são atualizadas sem recriar os inputs (evita perder foco ao digitar)
        return `<section ${this.id ? `id="${this.id}"` : ''} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">${filterBar}<div id="${this.id}-all"></div><div id="${this.id}-caixa-section"></div></section>`;
    }

    renderGrids() {
        const c = this.colors;
        const allEl = document.getElementById(`${this.id}-all`);
        if (!allEl) return;

        // Limpa timeout anterior se existir
        if (this._renderTimeout) {
            clearTimeout(this._renderTimeout);
            this._renderTimeout = null;
        }

        // Usa todos os produtos filtrados
        const allProducts = this.filteredProducts || [];
        
        if (allProducts.length === 0) {
            allEl.innerHTML = `<div class="py-10 text-center text-gray-600"><i class="fas fa-search text-3xl text-gray-300 mb-3"></i><div class="font-semibold">Nenhum imóvel encontrado</div><div class="text-sm text-gray-500 mt-1">Tente ajustar os filtros ou a pesquisa.</div></div>`;
            return;
        }

        // Remove duplicatas por ID antes de renderizar
        const uniqueProducts = [];
        const seenIds = new Set();
        for (const product of allProducts) {
            const productId = product.id || product.title;
            if (!seenIds.has(productId)) {
                seenIds.add(productId);
                uniqueProducts.push(product);
            }
        }

        // Renderiza todos os produtos de uma vez (mais simples e evita duplicação)
        const allHtml = `<h2 class="text-2xl font-bold mb-6 text-gray-900">Todos os Imóveis <span class="text-sm font-normal text-gray-500">(${uniqueProducts.length})</span></h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" id="${this.id}-all-grid">${uniqueProducts.map(product => this.renderProductCard(product, c.primary)).join('')}</div>`;
        
        allEl.innerHTML = allHtml;
        
        // Renderiza seção Correspondente Caixa após os produtos
        this.renderCaixaSection();
        
        // Otimiza imagens após renderização
        this.optimizeImages();
    }

    renderCaixaSection() {
        const caixaEl = document.getElementById(`${this.id}-caixa-section`);
        if (!caixaEl) return;

        const caixaBlue = this.colors.primary;
        const caixaOrange = this.colors.accent;
        const caixaBlueDark = this.darkenColor(caixaBlue, 0.12);

        const caixaSection = `
            <div class="w-full rounded-2xl p-6 md:p-8 mb-12 mt-12 overflow-hidden relative"
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

        caixaEl.innerHTML = caixaSection;
    }

    optimizeImages() {
        // Versão simplificada - usa apenas lazy loading nativo
        const images = document.querySelectorAll(`#${this.id}-all-grid img[data-product-image]`);
        images.forEach((img) => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
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
                const v = this._parsePrice(p.valor);
                // Ignora produtos sem preço válido na filtragem
                if (v === 0) return false;
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
        
        // Função melhorada para ordenação por preço
        const byPrice = (a, b) => {
            const valA = this._parsePrice(a.valor);
            const valB = this._parsePrice(b.valor);
            // Se ambos são 0 (sem preço), mantém ordem original
            if (valA === 0 && valB === 0) return 0;
            // Produtos sem preço vão para o final
            if (valA === 0) return 1;
            if (valB === 0) return -1;
            return valA - valB;
        };
        
        const byTitle = (a, b) => {
            const titleA = String(a.title || '').trim();
            const titleB = String(b.title || '').trim();
            return titleA.localeCompare(titleB, 'pt-BR', { sensitivity: 'base' });
        };

        const sorter = (() => {
            if (sortMode === 'price-asc') return byPrice;
            if (sortMode === 'price-desc') return (a, b) => byPrice(b, a); // Inverte para descendente
            if (sortMode === 'title-asc') return byTitle;
            if (sortMode === 'title-desc') return (a, b) => byTitle(b, a); // Inverte para descendente
            // relevance: ordena por preço crescente (sem lógica de destaque)
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
            const searchBtn = document.getElementById('imovel-search-btn');
            const typeSel = document.getElementById('imovel-type');
            const citySel = document.getElementById('imovel-city');
            const bairroSel = document.getElementById('imovel-bairro');
            const priceSel = document.getElementById('imovel-price');
            const sortSel = document.getElementById('imovel-sort');
            
            // Função para aplicar filtros
            const applyFiltersHandler = () => {
                if (search) this.filterState.search = search.value || '';
                if (typeSel) this.filterState.type = typeSel.value || 'all';
                if (citySel) this.filterState.city = citySel.value || 'all';
                if (bairroSel) this.filterState.bairro = bairroSel.value || 'all';
                if (priceSel) this.filterState.price = priceSel.value || 'any';
                if (sortSel) this.filterState.sort = sortSel.value || 'relevance';
                this.applyFilters();
            };
            
            // Botão de pesquisa
            if (searchBtn) {
                searchBtn.addEventListener('click', applyFiltersHandler);
            }
            
            // Enter no campo de busca também pesquisa
            if (search) {
                search.value = this.filterState.search || '';
                search.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        applyFiltersHandler();
                    }
                });
            }
            
            // Inicializa valores dos selects
            if (typeSel) typeSel.value = this.filterState.type || 'all';
            if (citySel) citySel.value = this.filterState.city || 'all';
            if (bairroSel) bairroSel.value = this.filterState.bairro || 'all';
            if (priceSel) priceSel.value = this.filterState.price || 'any';
            if (sortSel) {
                sortSel.value = this.filterState.sort || 'relevance';
                // Ordenação aplica automaticamente
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
        // Carrossel removido dos cards para evitar crash no iOS
        // As imagens completas são exibidas na página individual (imovel.html)
    }

    setupInfiniteScroll() {
        // DESABILITADO - Causava problemas no iOS
        // Carrega todos os produtos de uma vez (mais simples e estável)
        console.log('Infinite scroll disabled - loading all products at once');
        return;
    }

    attachHeroIntegration() {
        if (this._heroIntegrationAttached) return;
        this._heroIntegrationAttached = true;

        // Recebe busca do hero, aplica filtros e faz scroll até a seção
        window.addEventListener('imoveis:hero-search', (evt) => {
            try {
                const d = evt?.detail || {};
                this.filterState.search = d.search || '';
                this.filterState.type = d.type || 'all';
                this.filterState.city = d.city || 'all';
                this.filterState.bairro = d.bairro || 'all';

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

                // Scroll DESABILITADO - causava problemas no iOS
                // O navegador faz scroll nativo automaticamente
            } catch (err) {
                console.warn('Error in hero integration:', err);
            }
        });
    }

    /**
     * Atualiza os selects de filtro com as opções carregadas do Supabase
     * sem recriar o DOM (evita reflow forçado)
     */
    _updateFilterSelects() {
        const all = this.products || [];
        const tipos = this._uniqSorted(all.map(p => p.tipoimovel || p.category).filter(Boolean));
        const cidades = this._uniqSorted(all.map(p => p.endereco_cidade).filter(Boolean));
        const bairros = this._uniqSorted(all.map(p => p.endereco_bairro).filter(Boolean));

        const populate = (selId, values) => {
            const sel = document.getElementById(selId);
            if (!sel) return;
            const firstOpt = sel.options[0];
            // Usa DocumentFragment para mínimo de reflow
            const frag = document.createDocumentFragment();
            values.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v;
                opt.textContent = v;
                frag.appendChild(opt);
            });
            // Remove todas exceto a primeira, depois adiciona novas (1 reflow)
            while (sel.options.length > 1) sel.remove(1);
            sel.appendChild(frag);
        };

        populate('imovel-type', tipos);
        populate('imovel-city', cidades);
        populate('imovel-bairro', bairros);

        // Hero selects também
        const heroTypeSel = document.getElementById('hero-search-type');
        const heroCitySel = document.getElementById('hero-search-city');
        const heroBairroSel = document.getElementById('hero-search-bairro');
        if (heroTypeSel || heroCitySel || heroBairroSel) {
            window.dispatchEvent(new CustomEvent('imoveis:options', { detail: { tipos, cidades, bairros } }));
        } else {
            // Hero ainda não montado - dispatch de qualquer forma, o hero captura quando montar
            window.dispatchEvent(new CustomEvent('imoveis:options', { detail: { tipos, cidades, bairros } }));
        }
    }

    async mount(targetId) {
        this.targetId = targetId;
        const target = document.getElementById(targetId);
        if (!target) return;

        if (this.useSupabase) {
            // Renderiza UMA VEZ com o layout final (barra de filtros + divs de grid vazios)
            // Evita o double innerHTML que forçava reflow e causava perda de estado dos inputs
            this.isLoading = false;
            target.innerHTML = this.render();
            this.attachFilterListeners();
            this.attachHeroIntegration();

            // Mostra loading APENAS no container do grid (não destrói a barra de filtros)
            const allEl = document.getElementById(`${this.id}-all`);
            if (allEl) {
                allEl.innerHTML = `<div class="text-center py-12"><div class="inline-block w-8 h-8 border-4 border-gray-200 rounded-full animate-spin" style="border-top-color:${this.colors.primary}"></div><p class="text-gray-500 mt-3 text-sm">Carregando imóveis...</p></div>`;
            }

            // Carrega dados
            const loaded = await this.loadFromSupabase();

            // Atualiza selects em-place (sem recriar o DOM inteiro → zero reflow)
            this._updateFilterSelects();

            // Renderiza os grids de produtos
            this.renderGrids();

            if (!loaded) console.warn('⚠️ Usando produtos padrão');
        } else {
            target.innerHTML = this.render();
            this.attachFilterListeners();
            this.attachHeroIntegration();
            this.renderGrids();
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
