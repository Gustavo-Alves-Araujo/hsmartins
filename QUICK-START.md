# 🚀 QUICK START - SEO & Performance

## Você implementou tudo! Agora vem o passo a passo rápido:

### ✅ Já Feito (Não precisa fazer nada!)
```
✓ Meta tags no index.html
✓ JSON-LD Schema
✓ Sitemap.xml
✓ Robots.txt
✓ .htaccess com cache e GZIP
✓ Image Optimizer
✓ Web Vitals Monitor
✓ Documentação completa
```

---

## 🎯 O que fazer AGORA (em ordem de prioridade)

### 1️⃣ OTIMIZAR IMAGENS (CRÍTICO - Demora mais)

**Por que:** A maioria do tamanho de página vem de imagens

**Como:**
1. Abra: https://squoosh.app
2. Para cada imagem dos imóveis:
   - Upload
   - Selecione "WebP" no painel direito
   - Qualidade: 75-80%
   - Download

**Ou use comando:**
```bash
# Converter todas JPGs para WebP
for file in img/imoveis/**/*.jpg; do
  ffmpeg -i "$file" -c:v libwebp -q:v 80 "${file%.jpg}.webp"
done
```

**Resultado esperado:** De 15MB → 3-5MB ✅

---

### 2️⃣ TESTAR PERFORMANCE (5 minutos)

**Local (Lighthouse):**
1. Abra `index.html` no navegador
2. F12 > Lighthouse
3. Clique "Analyze page load"
4. Revise o relatório

**Online:**
1. Vá a: https://pagespeed.web.dev/
2. Digite: https://seu-dominio.com
3. Analise sugestões

**Resultado esperado:** >85 score

---

### 3️⃣ SUBMETER NO GOOGLE (10 minutos)

**Google Search Console:**
1. Vá a: https://search.google.com/search-console
2. Clique "Adicionar propriedade"
3. Digite: `https://seu-dominio.com`
4. Valide propriedade (HTML, DNS ou Google Analytics)
5. Vá a "Sitemaps"
6. Clique "Adicionar Sitemap"
7. Digite: `sitemap.xml`
8. Clique "Enviar"

**Resultado:** Google indexará seu site em horas

---

### 4️⃣ CONFIGURAR GOOGLE ANALYTICS (5 minutos)

**Criar conta:**
1. Vá a: https://analytics.google.com
2. Clique "Iniciar"
3. Preencha dados da conta
4. Crie uma propriedade
5. Selecione "Web"
6. Copie o ID (G-XXXXXXXXXX)

**Adicionar ao index.html:**
```html
<!-- Antes de </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

### 5️⃣ ATIVAR HTTPS (Depende do host)

**Por que:** Ranking factor + Segurança

**Passos:**
1. Obter certificado SSL (Let's Encrypt é grátis)
2. Configurar no servidor/host
3. Redirecionar HTTP → HTTPS no .htaccess:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## 📊 MONITORAR PERFORMANCE

### No navegador (Console):
```javascript
webVitalsMonitor.printReport()
```

### Resultado esperado:
```
✅ LCP: 2.1s (Alvo: < 2.5s)
✅ FID: 45ms (Alvo: < 100ms)
✅ CLS: 0.08 (Alvo: < 0.1)
```

---

## 🔗 LINKS ÚTEIS

| Ferramenta | URL | O que fazer |
|-----------|-----|-----------|
| PageSpeed Insights | https://pagespeed.web.dev/ | Testar performance |
| Google Search Console | https://search.google.com/search-console | Submeter sitemap |
| Google Analytics | https://analytics.google.com | Rastrear usuários |
| Squoosh | https://squoosh.app | Converter imagens |
| TinyPNG | https://tinypng.com | Comprimir imagens |

---

## ✅ CHECKLIST DE DEPLOY

- [ ] Imagens convertidas para WebP
- [ ] Testar com PageSpeed Insights (>85 score)
- [ ] Submeter no Google Search Console
- [ ] Setup Google Analytics
- [ ] HTTPS ativado
- [ ] Atualizar URLs em config.json
- [ ] Testar em mobile (DevTools)
- [ ] Testar em 3G lento (DevTools > Network)

---

## 🎓 DOCUMENTAÇÃO COMPLETA

Se algo não ficou claro, leia:

1. **PERFORMANCE-SEO-GUIDE.md** - Tudo documentado
2. **IMAGE-OPTIMIZATION-GUIDE.md** - Passo a passo de imagens
3. **SEO-CHECKLIST.md** - Checklist completo

---

## 💡 DICAS RÁPIDAS

**Q: Minhas imagens ainda aparecem grandes?**
A: Use WebP ao invés de JPEG (25-35% menor)

**Q: Core Web Vitals ruim?**
A: Problema #1 = imagens grandes
   Problema #2 = JavaScript pesado

**Q: Quando Google indexa meu site?**
A: 2-4 semanas normalmente. Se submeter sitemap, mais rápido.

**Q: PageSpeed Score baixo?**
A: Provavelmente é imagem. Converta para WebP!

---

## 🎉 PARABÉNS!

Você tem:
- ✅ SEO técnico pronto
- ✅ Performance otimizada
- ✅ Monitoramento de vitals
- ✅ Sitemap e robots.txt
- ✅ Documentação completa

**Próximo:** Otimizar imagens e submeter no Google!

---

**Versão:** 1.0  
**Atualizado:** 28/01/2026  
**Tempo total:** ~30 minutos para completar tudo

