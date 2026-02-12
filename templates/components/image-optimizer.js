/**
 * Image Optimizer Component
 * Otimiza imagens para web com lazy loading, webp, e responsive images
 * Versão compatível com iOS Safari
 */
class ImageOptimizer {
  constructor() {
    this.observer = null;
    this.isIOS = this.detectIOS();
    this.initIntersectionObserver();
    this.supportWebP();
  }

  /**
   * Detecta se é iOS/Safari
   */
  detectIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  /**
   * Inicializa IntersectionObserver para lazy loading
   * Com proteção específica para iOS Safari
   */
  initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      try {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            try {
              if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
              }
            } catch (e) {
              console.warn('Error processing intersection entry:', e);
              // Fallback: carrega a imagem mesmo com erro
              this.loadImage(entry.target);
            }
          });
        }, {
          rootMargin: '50px',
          threshold: 0.01 // iOS funciona melhor com threshold explícito
        });
      } catch (e) {
        console.warn('IntersectionObserver initialization failed:', e);
        this.observer = null;
      }
    }
  }

  /**
   * Carrega imagem quando entra no viewport
   * Com proteção contra erros
   */
  loadImage(img) {
    try {
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
    } catch (e) {
      console.warn('Error loading image:', e);
    }
  }

  /**
   * Aplica lazy loading a todas as imagens com classe 'lazy'
   * Com fallback robusto para iOS
   */
  initLazyLoading() {
    try {
      const images = document.querySelectorAll('img.lazy');
      images.forEach((img) => {
        if (this.observer && !this.isIOS) {
          // Para browsers modernos (exceto iOS)
          try {
            this.observer.observe(img);
          } catch (e) {
            console.warn('Failed to observe image, loading directly:', e);
            this.loadImage(img);
          }
        } else {
          // Fallback para iOS ou quando IntersectionObserver não funciona
          // Carrega imagens usando evento de scroll com throttle
          this.loadImageOnScroll(img);
        }
      });
    } catch (e) {
      console.error('Error initializing lazy loading:', e);
    }
  }

  /**
   * Carrega imagem no scroll (fallback para iOS)
   */
  loadImageOnScroll(img) {
    const checkVisibility = () => {
      try {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight + 50 && rect.bottom >= -50) {
          this.loadImage(img);
          window.removeEventListener('scroll', throttledCheck);
          window.removeEventListener('resize', throttledCheck);
          window.removeEventListener('orientationchange', throttledCheck);
        }
      } catch (e) {
        console.warn('Error checking image visibility:', e);
        this.loadImage(img);
      }
    };

    // Throttle function para iOS
    let throttleTimer;
    const throttledCheck = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        checkVisibility();
        throttleTimer = null;
      }, 100);
    };

    window.addEventListener('scroll', throttledCheck, { passive: true });
    window.addEventListener('resize', throttledCheck, { passive: true });
    window.addEventListener('orientationchange', throttledCheck, { passive: true });
    
    // Checa imediatamente também
    checkVisibility();
  }

  /**
   * Detecta suporte a WebP
   * Com proteção contra erros no iOS
   */
  supportWebP() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    } catch (e) {
      console.warn('WebP detection failed:', e);
      return false;
    }
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
   * Com proteção para iOS
   */
  optimizeProductImages() {
    try {
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
        
        if (this.observer && !this.isIOS) {
          try {
            this.observer.observe(img);
          } catch (e) {
            console.warn('Failed to observe product image:', e);
            this.loadImage(img);
          }
        } else {
          this.loadImageOnScroll(img);
        }
      });
    } catch (e) {
      console.error('Error optimizing product images:', e);
    }
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
   * Com proteção para erros
   */
  initNativeImageOptimization() {
    try {
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
    } catch (e) {
      console.warn('Error applying native image optimization:', e);
    }
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

// Auto-initialize com proteção contra erros
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      window.imageOptimizer = new ImageOptimizer();
      window.imageOptimizer.initNativeImageOptimization();
      window.imageOptimizer.initLazyLoading();
    } catch (e) {
      console.error('Failed to initialize ImageOptimizer:', e);
    }
  });
} else {
  try {
    window.imageOptimizer = new ImageOptimizer();
    window.imageOptimizer.initNativeImageOptimization();
    window.imageOptimizer.initLazyLoading();
  } catch (e) {
    console.error('Failed to initialize ImageOptimizer:', e);
  }
}

