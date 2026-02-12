/**
 * Image Optimizer Component - DESABILITADO
 * Não faz NADA - deixa o navegador fazer tudo nativamente
 */
class ImageOptimizer {
  constructor() {
    console.log('ImageOptimizer: DESABILITADO - navegador faz tudo');
  }

  initLazyLoading() {
    // Não faz nada
  }

  supportWebP() {
    return false;
  }

  generateSrcSet() {
    return '';
  }

  optimizeProductImages() {
    // Não faz nada
  }

  createPictureElement() {
    return null;
  }

  initNativeImageOptimization() {
    // Não faz nada
  }
}

// NÃO auto-initialize
window.imageOptimizer = new ImageOptimizer();

