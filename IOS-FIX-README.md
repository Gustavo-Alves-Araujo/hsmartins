# Correções para Compatibilidade com iOS Safari

## Problema Identificado

O site estava apresentando erro "A problem repeatedly occurred" no iPhone/iOS Safari, especialmente durante o scroll da página. Este erro não ocorria no Android.

## Causa Raiz

O iOS Safari tem limitações conhecidas com:
1. **IntersectionObserver** - Pode falhar silenciosamente ou causar crashes
2. **Eventos de scroll** - Requer eventos passivos para melhor performance
3. **Smooth scrolling** - Implementação diferente do Chrome
4. **Erros não tratados** - iOS é mais sensível a exceções JavaScript não capturadas

## Correções Aplicadas

### 1. iOS Compatibility Layer (`ios-compatibility.js`)

Novo arquivo que adiciona:
- ✅ Detecção automática de iOS/Safari
- ✅ Tratamento global de erros (error handler)
- ✅ Tratamento de promises rejeitadas
- ✅ Polyfill para smooth scroll no iOS antigo
- ✅ Eventos passivos automáticos para scroll/touch
- ✅ Proteção extra no IntersectionObserver
- ✅ Fix para viewport height (100vh issue)
- ✅ Previne zoom duplo-toque

### 2. Image Optimizer (`image-optimizer.js`)

Modificações:
- ✅ Detecta iOS e usa fallback baseado em scroll
- ✅ Try-catch em todas as operações críticas
- ✅ Throttling nos eventos de scroll para iOS
- ✅ Threshold explícito no IntersectionObserver (0.01)
- ✅ Listeners com `{ passive: true }`

### 3. Sticky Header (`sticky-header-navigation.js`)

Modificações:
- ✅ Throttling no evento de scroll
- ✅ Try-catch nos handlers de smooth scroll
- ✅ Eventos passivos

### 4. Product Grid (`product-grid-advanced.js`)

Modificações:
- ✅ Try-catch no IntersectionObserver
- ✅ Try-catch nos handlers de scroll
- ✅ Threshold explícito (0.01)
- ✅ Eventos passivos

## Como Testar

### Teste Local no iPhone

1. **Conecte via mesma rede WiFi**
   - Obtenha o IP local do seu computador
   - No iPhone, acesse: `http://SEU_IP:PORTA/index.html`

2. **Teste com simulador** (se tiver Mac)
   ```bash
   # Abrir com Safari no simulador iOS
   xcrun simctl openurl booted http://localhost:8080/index.html
   ```

3. **Teste remoto via ngrok** (recomendado)
   ```bash
   # Instalar ngrok
   npm install -g ngrok
   
   # Expor servidor local
   ngrok http 8080
   
   # Acesse a URL HTTPS fornecida pelo ngrok no iPhone
   ```

### Debug Remoto (Safari Desktop + iPhone)

1. No iPhone: Settings > Safari > Advanced > Enable "Web Inspector"
2. Conecte iPhone ao Mac via USB
3. No Mac: Safari > Develop > [Seu iPhone] > [Página]
4. Veja erros no console

### Verificações

- [ ] Página carrega sem erro branco
- [ ] Scroll funciona suavemente
- [ ] Imagens carregam durante o scroll
- [ ] Menu mobile abre/fecha
- [ ] Links âncora funcionam
- [ ] Filtros de imóveis funcionam
- [ ] Carousel de imagens funciona

## Monitoramento de Erros

Para ver erros no iPhone, adicione temporariamente no `index.html`:

```html
<script>
window.addEventListener('error', (e) => {
  alert('Erro: ' + e.message);
});
</script>
```

Ou use console remoto: https://jsconsole.com/

## Rollback

Se precisar reverter:

1. Remover `<script src="templates/components/ios-compatibility.js"></script>` do `index.html`
2. Restaurar versões anteriores dos arquivos via git:
   ```bash
   git checkout HEAD~1 templates/components/image-optimizer.js
   git checkout HEAD~1 templates/components/sticky-header-navigation.js
   git checkout HEAD~1 templates/components/product-grid-advanced.js
   ```

## Performance

As mudanças melhoram a performance no iOS:
- Eventos passivos reduzem lag no scroll
- Throttling reduz processamento
- Fallback evita uso pesado do IntersectionObserver
- Try-catch previne crashes

## Referências

- [iOS Safari Quirks](https://github.com/scottjehl/Device-Bugs/issues/2)
- [IntersectionObserver iOS Issues](https://bugs.webkit.org/show_bug.cgi?id=159475)
- [Passive Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners)
