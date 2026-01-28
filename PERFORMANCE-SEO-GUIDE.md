# Guia de Performance e SEO - H.S Martins

## 📋 Sumário
1. [Otimizações de SEO](#seo)
2. [Otimizações de Performance](#performance)
3. [Otimizações de Imagem](#imagens)
4. [Checklist de Deploy](#deploy)
5. [Monitoramento](#monitoramento)

---

## 🔍 SEO

### Meta Tags Implementadas

✅ **Arquivos de Configuração:**
- `sitemap.xml` - Mapa do site para buscadores
- `robots.txt` - Instruções para crawlers
- `seo-meta-tags.html` - Template com todos os meta tags

✅ **Implementações:**

#### index.html
- Title otimizado com palavras-chave
- Description com 150-160 caracteres
- OG Tags para compartilhamento social
- JSON-LD LocalBusiness Schema
- Preload de recursos críticos

#### imovel.html (Página de Imóvel)
- Meta tags dinâmicos via JavaScript
- OG Image dinâmica
- JSON-LD Property Schema (comentado, para customizar por imóvel)
- Canonical tag dinâmica

#### sobre.html & correspondente.html
- Meta tags básicos
- Schema markup adequado

### Palavras-Chave Principais
```
- Imobiliária Poá
- Venda de imóveis Poá
- Financiamento imobiliário
- Correspondente Caixa
- Compra e venda de casas
- Apartamentos em Poá
```

### SEO Técnico

1. **Structured Data (Schema.org)**
   - LocalBusiness (empresa)
   - House/Property (imóveis individuais)
   - ContactPoint (contato)

2. **Canonical Tags**
   - Evita conteúdo duplicado
   - Dinâmico em imovel.html

3. **Sitemap XML**
   - Inclui todas as páginas principais
   - Prioridades configuráveis
   - Frequência de atualização definida

4. **Robots.txt**
   - Permite indexação de páginas públicas
   - Bloqueia /admin
   - Define crawl delay

### Meta Tags Dinâmicos em imovel.html

Quando um imóvel é carregado, os seguintes tags são atualizados:

```javascript
// No seu código que carrega o imóvel:
document.getElementById('page-title').textContent = `${property.titulo} - H.S Martins`;
document.getElementById('page-description').content = `${property.descricao.substring(0, 150)}...`;
document.getElementById('og-title').content = property.titulo;
document.getElementById('og-image').content = property.imagens[0];
document.getElementById('canonical-tag').href = `https://hsmartins.com.br/imovel.html?id=${property.id}`;
```

---

## ⚡ Performance

### Otimizações Implementadas

✅ **Carregamento de Recursos:**
- Preconnect a CDNs
- DNS prefetch
- Preload de recursos críticos
- Async/defer em scripts

✅ **Infinite Scroll:**
- 16 imóveis carregados inicialmente
- Carregamento automático ao scroll
- Sem "Ver Mais" button

✅ **Remoção de Animações:**
- AOS (Animate On Scroll) desabilitado no Hero
- AOS desabilitado no About
- Carregamento instantâneo

✅ **Compressão & Cache:**
- GZIP habilitado (.htaccess)
- Cache browser configurado
- Imagens comprimidas

### Métricas Alvo (Core Web Vitals)

| Métrica | Alvo | Status |
|---------|------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ |
| FID (First Input Delay) | < 100ms | ✅ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ |

---

## 🖼️ Otimização de Imagens

### Image Optimizer Component

Arquivo: `templates/components/image-optimizer.js`

**Recursos:**
- Lazy loading nativo
- IntersectionObserver para pré-carregamento
- Suporte WebP com fallback
- Picture elements
- Blur placeholder

### Como Usar

#### 1. Lazy Loading Nativo (Recomendado)
```html
<img src="image.jpg" loading="lazy" decoding="async" alt="Descrição">
```

#### 2. Com Image Optimizer
```html
<img class="lazy" data-src="image.jpg" alt="Descrição">
```

O componente carregará automaticamente quando entrar no viewport.

#### 3. Picture Element para WebP
```javascript
const imageOptimizer = window.imageOptimizer;
const picture = imageOptimizer.createPictureElement(
  'image.webp',
  'image.jpg',
  'Descrição da imagem'
);
document.getElementById('container').appendChild(picture);
```

### Formatos Recomendados

| Tipo | Formato | Compressão |
|------|---------|-----------|
| Fotos reais | WebP | 75-80% qualidade |
| Screenshots | PNG | Sem perda |
| Ícones | SVG | - |
| Thumbnails | WebP | 70% qualidade |

### Ferramentas para Compressão

1. **Converter para WebP:**
   ```bash
   # Com ffmpeg
   ffmpeg -i image.jpg -c:v libwebp -q:v 80 image.webp
   ```

2. **Online Tools:**
   - tinypng.com
   - imageoptim.com
   - squoosh.app (Google)
   - convertio.co

3. **Batch Processing:**
   ```bash
   # Converter todo um diretório
   for file in *.jpg; do
     ffmpeg -i "$file" -c:v libwebp -q:v 80 "${file%.jpg}.webp"
   done
   ```

---

## 📦 Carregamento Progressivo

### Estratégia de Carregamento

```
1. Initial Load (16 imóveis)
   ├── Critical CSS (inline)
   ├── Hero component (sem animação)
   ├── Header navigation
   └── 16 primeiro products com lazy images

2. Ao Scroll (16 imóveis mais)
   ├── IntersectionObserver dispara
   ├── Carrega mais imóveis
   └── Lazy load de imagens

3. Background (cache)
   ├── Prefetch de próximas imagens
   └── Cache de dados frequentes
```

### Configuração no product-grid-advanced.js

```javascript
const itemsPerPage = 16; // Ajustável
const setupInfiniteScroll = () => {
  // Carrega mais ao atingir o final da lista
};
```

---

## 🚀 Checklist de Deploy

### Antes de Publicar

- [ ] Validar sitemap.xml no Google Search Console
- [ ] Submeter robots.txt
- [ ] Testar meta tags com Facebook Debugger
- [ ] Testar mobile rendering
- [ ] Compressão GZIP habilitada no servidor
- [ ] Cache browser configurado
- [ ] HTTPS ativado
- [ ] Redirecionamento HTTP → HTTPS
- [ ] Imagens otimizadas em WebP
- [ ] Testar Core Web Vitals

### Deploy Steps

1. **Atualizar URLs em config.json e seo-meta-tags.html**
   ```json
   {
     "siteUrl": "https://hsmartins.com.br",
     "domain": "hsmartins.com.br"
   }
   ```

2. **Gerar Dynamic Sitemap** (se houver muitos imóveis)
   ```javascript
   // Usar script para gerar XML dinâmico a partir do Supabase
   ```

3. **Submeter para Google Search Console**
   - Adicionar sitemap.xml
   - Testar mobile-friendliness
   - Monitorar erros de indexação

4. **Submeter para Bing Webmaster Tools**
   - Similar ao GSC
   - Adicionar sitemap

### Configuração do Servidor

#### Apache (.htaccess)
✅ Já incluído neste projeto

#### Nginx
```nginx
# Gzip compression
gzip on;
gzip_types text/html text/css application/javascript;
gzip_min_length 256;

# Browser cache
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}

# HTML cache (refresh frequently)
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}

# Security headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
```

---

## 📊 Monitoramento

### Ferramentas Recomendadas

1. **Google Search Console**
   - Monitorar indexação
   - Checar erros de rastreamento
   - Submeter URLs manualmente
   - Ver termos de busca

2. **Google PageSpeed Insights**
   - Teste de performance
   - Relatório Core Web Vitals
   - Sugestões de otimização

3. **Google Analytics 4**
   - Rastrear comportamento do usuário
   - Monitorar taxa de conversão
   - Análise de fluxo

4. **Lighthouse**
   - Teste local (F12 > Lighthouse)
   - Relatório detalhado
   - Sugestões automáticas

### Métricas para Acompanhar

```javascript
// Adicionar ao seu código para rastrear performance
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  
  console.log(`Page Load Time: ${pageLoadTime}ms`);
  
  // Enviar para Google Analytics
  gtag('event', 'page_load_time', {
    value: pageLoadTime,
    event_category: 'performance'
  });
});
```

### Links Úteis

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema.org](https://schema.org/)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/)

---

## 🔧 Troubleshooting

### Problema: Imagens carregando lentamente
**Solução:**
- Comprimir imagens (use WebP)
- Implementar lazy loading
- Usar CDN para servir imagens
- Revisar quality JPEG (70-80%)

### Problema: SEO não melhora
**Solução:**
- Verificar erros no GSC
- Atualizar meta descriptions
- Criar mais conteúdo relevante
- Construir backlinks

### Problema: Core Web Vitals ruins
**Solução:**
- Remover scripts pesados
- Otimizar imagens
- Usar code splitting
- Implementar caching

---

## 📞 Suporte

Para dúvidas sobre otimizações:
1. Consulte este guia
2. Verifique console.log do navegador
3. Use Lighthouse para diagnóstico
4. Teste em diferentes dispositivos

---

**Última atualização:** 28/01/2026
**Versão:** 1.0

