/**
 * iOS Compatibility Layer
 * Adiciona proteções e polyfills para iOS Safari
 */

(function() {
    'use strict';

    // Detecta iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Detecta Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Log de ambiente para debug
    if (isIOS || isSafari) {
        console.log('iOS/Safari detected - Applying compatibility layer');
    }

    /**
     * Proteção global contra erros não tratados
     */
    window.addEventListener('error', function(event) {
        console.error('Global error caught:', event.error || event.message);
        // Previne que o erro quebre a página
        event.preventDefault();
        return true;
    }, { passive: false });

    /**
     * Proteção contra erros em Promises não tratadas
     */
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        // Previne que o erro quebre a página
        event.preventDefault();
    });

    /**
     * Polyfill para scrollTo com smooth behavior no iOS antigo
     */
    if (isIOS && !('scrollBehavior' in document.documentElement.style)) {
        const originalScrollTo = window.scrollTo;
        window.scrollTo = function(options) {
            if (typeof options === 'object' && options.behavior === 'smooth') {
                const start = window.pageYOffset;
                const target = options.top;
                const distance = target - start;
                const duration = 500;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Easing function
                    const ease = progress * (2 - progress);
                    
                    window.scroll(0, start + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            } else {
                originalScrollTo.call(window, options);
            }
        };
    }

    /**
     * Adiciona passive: true por padrão em eventos de scroll e touch no iOS
     */
    if (isIOS) {
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'touchend', 'wheel'];
            
            if (passiveEvents.includes(type)) {
                if (typeof options === 'object' && options !== null) {
                    if (!('passive' in options)) {
                        options.passive = true;
                    }
                } else {
                    options = { passive: true };
                }
            }
            
            return originalAddEventListener.call(this, type, listener, options);
        };
    }

    /**
     * Fix para -webkit-overflow-scrolling no iOS
     */
    if (isIOS) {
        document.addEventListener('DOMContentLoaded', function() {
            const scrollContainers = document.querySelectorAll('[data-carousel], .overflow-x-auto, .overflow-y-auto');
            scrollContainers.forEach(function(container) {
                container.style.webkitOverflowScrolling = 'touch';
            });
        });
    }

    /**
     * Previne zoom duplo-toque no iOS
     */
    if (isIOS) {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }

    /**
     * Fix para viewport height no iOS (100vh issue)
     */
    if (isIOS) {
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);
    }

    /**
     * Melhora performance do IntersectionObserver no iOS
     */
    if (isIOS && 'IntersectionObserver' in window) {
        const OriginalIntersectionObserver = window.IntersectionObserver;
        
        window.IntersectionObserver = function(callback, options) {
            // Adiciona threshold padrão para iOS
            const iosOptions = Object.assign({}, options, {
                threshold: options?.threshold || 0.01
            });
            
            // Wrapping callback com try-catch
            const safeCallback = function(entries, observer) {
                try {
                    callback(entries, observer);
                } catch (error) {
                    console.error('IntersectionObserver callback error:', error);
                }
            };
            
            return new OriginalIntersectionObserver(safeCallback, iosOptions);
        };
    }

    /**
     * Fix para requestAnimationFrame no iOS antigo
     */
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            return setTimeout(callback, 1000 / 60);
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    /**
     * Adiciona classe no body para CSS específico de iOS
     */
    if (isIOS) {
        document.documentElement.classList.add('ios');
    }
    if (isSafari) {
        document.documentElement.classList.add('safari');
    }

    console.log('iOS Compatibility Layer loaded successfully');
})();
