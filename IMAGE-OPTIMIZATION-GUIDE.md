# Guia de Otimização de Imagens

## 📊 Diagnóstico Atual

**Problema:** Muitas imagens grandes (100+ imóveis com múltiplas fotos cada)  
**Solução:** Implementar estratégia de compressão, WebP, lazy loading e CDN

---

## 🎯 Estratégia de Otimização

### 1. Conversão para WebP

WebP oferece **25-35% de compressão** a mais que JPEG.

#### Ferramenta Online (Mais Fácil)
1. Acesse: https://squoosh.app
2. Upload da imagem
3. Configure: "WebP" no lado direito
4. Qualidade: 75-80 para fotos, 90 para logos
5. Download

#### Via FFmpeg (Batch)
```bash
# Instalar FFmpeg (se não tiver)
# macOS: brew install ffmpeg
# Linux: sudo apt install ffmpeg
# Windows: baixe em ffmpeg.org

# Converter um arquivo
ffmpeg -i foto.jpg -c:v libwebp -q:v 80 foto.webp

# Converter todo um diretório
for file in *.jpg; do
  ffmpeg -i "$file" -c:v libwebp -q:v 80 "${file%.jpg}.webp"
done
```

#### Via ImageMagick
```bash
# Instalar
# macOS: brew install imagemagick
# Linux: sudo apt install imagemagick

# Converter com compressão
convert foto.jpg -quality 80 foto.webp

# Batch
mogrify -format webp -quality 80 *.jpg
```

### 2. Compressão de JPEG

Se não converter para WebP, comprima JPEGs.

#### Ferramenta Online
- **TinyPNG**: https://tinypng.com (até 20/mês gratuito)
- **ImageOptim**: https://imageoptim.com (grátis online)
- **Compressor.io**: https://compressor.io

#### Via ImageMagick
```bash
convert foto.jpg -quality 75 foto-compressed.jpg
```

### 3. Dimensionamento de Imagens

Não envie imagens maiores que o necessário.

**Tamanhos Recomendados:**

```
Thumbnails/Grid:
- Celular: 300x200px
- Desktop: 400x300px

Imagem Principal (Modal):
- Máximo: 1200x800px

Logo:
- SVG (melhor)
- PNG: 200x100px máximo

Hero Background:
- 1920x600px (otimizado)
```

#### Script para Redimensionar
```bash
# Com ImageMagick
# Redimensiona mantendo proporção
mogrify -resize 400x300 -quality 80 -format webp *.jpg

# Com FFmpeg
for file in *.jpg; do
  ffmpeg -i "$file" -vf scale=400:300 -q:v 8 "${file%.jpg}.webp"
done
```

---

## 📁 Estrutura de Pastas Recomendada

```
/img/
├── logo.png                    (SVG ou PNG otimizado)
├── hero-bg.webp               (otimizado)
├── imoveis/
│   ├── 001/
│   │   ├── thumb.webp         (300x200)
│   │   ├── thumb.jpg          (fallback)
│   │   ├── main.webp          (800x600)
│   │   ├── main.jpg           (fallback)
│   │   ├── gallery-1.webp
│   │   ├── gallery-1.jpg
│   │   └── ...
│   ├── 002/
│   └── ...
└── icons/ (SVG)
```

---

## 🚀 Implementação no Código

### 1. Picture Elements (Suporta WebP com Fallback)

```html
<picture>
  <source srcset="imagem.webp" type="image/webp">
  <source srcset="imagem.jpg" type="image/jpeg">
  <img src="imagem.jpg" alt="Descrição" loading="lazy" decoding="async">
</picture>
```

### 2. Usando Image Optimizer

O componente `image-optimizer.js` já está integrado.

```javascript
const imageOptimizer = window.imageOptimizer;

// Ativa lazy loading automático
imageOptimizer.initLazyLoading();

// Otimizar imagens de produtos
imageOptimizer.optimizeProductImages();
```

### 3. Lazy Loading Nativo (Recomendado)

```html
<img src="imagem.jpg" loading="lazy" decoding="async" alt="Descrição">
```

Todos os navegadores modernos suportam.

### 4. Srcset Responsivo

Serve diferentes tamanhos para diferentes telas:

```html
<img
  srcset="
    imagem-sm.webp 320w,
    imagem-md.webp 640w,
    imagem-lg.webp 1024w
  "
  sizes="(max-width: 640px) 100vw, 50vw"
  src="imagem-lg.webp"
  alt="Descrição"
  loading="lazy"
>
```

---

## 📊 Checklist de Otimização

### Antes do Deploy

- [ ] Converter todas as imagens para WebP
- [ ] Manter JPEGs como fallback
- [ ] Redimensionar para tamanhos corretos
- [ ] Comprimir imagens (qualidade 75-80%)
- [ ] Adicionar lazy loading
- [ ] Implementar picture elements
- [ ] Testar em diferentes navegadores
- [ ] Testar em conexões 3G (DevTools)
- [ ] Validar com PageSpeed Insights

### Monitoramento

- [ ] Monitorar Core Web Vitals
- [ ] Acompanhar LCP (< 2.5s)
- [ ] Acompanhar CLS (< 0.1)
- [ ] Revisar relatório de performance

---

## 🔍 Teste de Performance

### Google PageSpeed Insights
```
1. Vá a: https://pagespeed.web.dev/
2. Digite: https://hsmartins.com.br
3. Analise sugestões
```

### Chrome DevTools
```
1. Abra Chrome DevTools (F12)
2. Vá a Lighthouse
3. Clique "Analyze page load"
4. Revise relatório de imagens
```

### Simulação de Conexão Lenta
```
1. DevTools > Network
2. Dropdown "Throttling" (topo)
3. Selecione "Slow 4G" ou "3G"
4. Recarregue página
5. Observe tempo de carregamento
```

---

## 💾 Hosting e CDN

### CDN Recomendado

Para distribuição rápida de imagens:

1. **Cloudflare** (Grátis + CDN)
   - Cache automático de imagens
   - Compressão automática
   - URL: https://www.cloudflare.com

2. **ImageKit** (Otimização on-the-fly)
   - Conversão automática WebP
   - Redimensionamento automático
   - URL: https://imagekit.io

3. **AWS CloudFront**
   - Cache de imagens
   - Integração com S3
   - URL: https://aws.amazon.com/cloudfront

### Exemplo com ImageKit

```html
<img
  src="https://ik.imagekit.io/seu_dominio/imoveis/001/thumb.jpg?tr=w-300,h-200,q-80,f-auto"
  alt="Imóvel"
  loading="lazy"
>
```

---

## 📈 Métricas Esperadas

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Tamanho da Página | 15MB | 3-5MB | 70% ↓ |
| Time to Interactive | 8s | 2-3s | 65% ↓ |
| LCP (Largest Contentful Paint) | 5s | < 2.5s | ✅ |
| CLS (Cumulative Layout Shift) | 0.2 | < 0.1 | ✅ |

---

## 🆘 Troubleshooting

### Problema: Imagens não carregam em alguns navegadores
**Solução:** Use picture elements com fallbacks JPEG

### Problema: WebP ainda é grande
**Solução:**
- Reduza qualidade para 70%
- Reduza dimensões
- Use outra ferramenta de compressão

### Problema: Lazy loading não funciona
**Solução:**
```javascript
// Force manual
if ('IntersectionObserver' in window) {
  imageOptimizer.initLazyLoading();
} else {
  // Fallback para navegadores antigos
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
  });
}
```

---

## 📚 Referências

- [WebP Format](https://developers.google.com/speed/webp)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Última atualização:** 28/01/2026  
**Status:** Pronto para implementação

