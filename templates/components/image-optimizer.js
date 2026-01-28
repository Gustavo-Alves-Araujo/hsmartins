/**
 * Image Optimizer Component
 * Otimiza imagens para web com lazy loading, webp, e responsive images
 */
class ImageOptimizer {
  constructor() {
    this.observer = null;
    this.initIntersectionObserver();
    this.supportWebP();
  }

  /**
   * Inicializa IntersectionObserver para lazy loading
   */
  initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });
    }
  }

  /**
   * Carrega imagem quando entra no viewport
   */
  loadImage(img) {
    const src = img.getAttribute('data-src');
    const srcset = img.getAttribute('data-srcset');
    
    if (src) {
      img.src = src;
    }
    if (srcset) {
      img.srcset = srcset;
    }
    
    img.classList.remove('lazy');
    img.classList.add('loaded');
  }

  /**
   * Aplica lazy loading a todas as imagens com classe 'lazy'
   */
  initLazyLoading() {
    const images = document.querySelectorAll('img.lazy');
    images.forEach((img) => {
      if (this.observer) {
        this.observer.observe(img);
      } else {
        // Fallback se IntersectionObserver não for suportado
        this.loadImage(img);
      }
    });
  }

  /**
   * Detecta suporte a WebP
   */
  supportWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
  }

  /**
   * Gera srcset responsivo para imagens
   * @param {string} baseUrl - URL base da imagem (sem extensão)
   * @param {array} sizes - Array com [width, size] pairs ex: [[320, 'sm'], [640, 'md'], [1024, 'lg']]
   * @returns {string} srcset string
   */
  generateSrcSet(baseUrl, sizes = [[320, 'sm'], [640, 'md'], [1024, 'lg'], [1920, 'xl']]) {
    return sizes.map(([width, label]) => {
      const ext = this.supportWebP() ? 'webp' : 'jpg';
      return `${baseUrl}-${label}.${ext} ${width}w`;
    }).join(', ');
  }

  /**
   * Otimiza todas as imagens de produtos no grid
   */
  optimizeProductImages() {
    const productImages = document.querySelectorAll('[data-product-image]');
    productImages.forEach((img) => {
      // Adiciona atributos de lazy loading
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      
      // Se não tem data-src, cria um
      if (!img.getAttribute('data-src') && img.src) {
        img.setAttribute('data-src', img.src);
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // pixel transparente
        img.classList.add('lazy');
      }
      
      if (this.observer) {
        this.observer.observe(img);
      }
    });
  }

  /**
   * Cria elemento picture com suporte WebP
   * @param {string} webpSrc - URL da imagem WebP
   * @param {string} fallbackSrc - URL da imagem fallback (JPG)
   * @param {string} alt - Texto alternativo
   * @returns {HTMLElement} elemento picture
   */
  createPictureElement(webpSrc, fallbackSrc, alt = '') {
    const picture = document.createElement('picture');
    
    const webpSource = document.createElement('source');
    webpSource.type = 'image/webp';
    webpSource.srcset = webpSrc;
    
    const img = document.createElement('img');
    img.src = fallbackSrc;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.classList.add('w-full', 'h-full', 'object-cover');
    
    picture.appendChild(webpSource);
    picture.appendChild(img);
    
    return picture;
  }

  /**
   * Aplica filter CSS para blur placeholder enquanto carrega
   */
  applyBlurPlaceholder(img) {
    const blurredSrc = img.src; // src atual (placeholder)
    img.style.filter = 'blur(10px)';
    
    img.onload = () => {
      img.style.filter = 'blur(0)';
      img.style.transition = 'filter 0.3s ease-out';
    };
  }

  /**
   * Comprime imagens via URL (usando serviço externo como ImageKit)
   * @param {string} imageUrl - URL da imagem
   * @param {object} options - { width, height, quality, format }
   * @returns {string} URL otimizada
   */
  getOptimizedImageUrl(imageUrl, options = {}) {
    // Exemplo usando ImageKit (descomente se usar)
    // const { width, height, quality = 80, format = 'webp' } = options;
    // return `https://ik.imagekit.io/hsmartins/tr:w-${width},h-${height},q-${quality},f-${format}/${imageUrl}`;
    
    // Para agora, apenas retorna URL original
    return imageUrl;
  }

  /**
   * Carrega imagens com native loading attribute
   */
  initNativeImageOptimization() {
    // Modern browsers suportam loading="lazy" nativamente
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }
    });
  }

  /**
   * Remove imagens fora do viewport para economizar memória
   */
  enableResourceHinting() {
    // Prefetch next images
    const firstImages = document.querySelectorAll('img[data-src]');
    firstImages.forEach((img, index) => {
      if (index < 3) { // Prefetch apenas as 3 primeiras
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = img.getAttribute('data-src');
        document.head.appendChild(link);
      }
    });
  }

  /**
   * Gera relatório de performance de imagens
   */
  getPerformanceReport() {
    const images = document.querySelectorAll('img');
    let totalSize = 0;
    let lazyImages = 0;
    let loadedImages = 0;

    images.forEach((img) => {
      if (img.classList.contains('lazy')) lazyImages++;
      if (img.classList.contains('loaded')) loadedImages++;
    });

    return {
      total: images.length,
      lazy: lazyImages,
      loaded: loadedImages,
      message: `Total: ${images.length} | Lazy: ${lazyImages} | Loaded: ${loadedImages}`
    };
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
    window.imageOptimizer.initNativeImageOptimization();
    window.imageOptimizer.initLazyLoading();
  });
} else {
  window.imageOptimizer = new ImageOptimizer();
  window.imageOptimizer.initNativeImageOptimization();
  window.imageOptimizer.initLazyLoading();
}

