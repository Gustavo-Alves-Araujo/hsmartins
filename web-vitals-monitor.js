/**
 * Web Vitals Monitor
 * Monitora Core Web Vitals e envia relatórios
 * Ref: https://web.dev/vitals/
 */

class WebVitalsMonitor {
  constructor() {
    this.vitals = {
      lcp: null,    // Largest Contentful Paint
      fid: null,    // First Input Delay
      cls: null     // Cumulative Layout Shift
    };
    this.init();
  }

  /**
   * Inicializa monitoramento de Web Vitals
   */
  init() {
    // Largest Contentful Paint
    this.observeLCP();
    
    // First Input Delay (use PerformanceObserver)
    this.observeFID();
    
    // Cumulative Layout Shift
    this.observeCLS();
    
    // Page Load Time
    this.observePageLoadTime();
  }

  /**
   * Monitora Largest Contentful Paint (LCP)
   * Alvo: < 2.5 segundos
   */
  observeLCP() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
        this.checkLCPThreshold();
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP monitoring não suportado', e);
    }
  }

  /**
   * Monitora First Input Delay (FID)
   * Alvo: < 100 milissegundos
   */
  observeFID() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (entry.processingDuration > 0) {
            this.vitals.fid = entry.processingDuration;
            this.checkFIDThreshold();
          }
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID monitoring não suportado', e);
    }
  }

  /**
   * Monitora Cumulative Layout Shift (CLS)
   * Alvo: < 0.1
   */
  observeCLS() {
    let clsValue = 0;
    
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.vitals.cls = clsValue;
            this.checkCLSThreshold();
          }
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS monitoring não suportado', e);
    }
  }

  /**
   * Monitora tempo total de carregamento da página
   */
  observePageLoadTime() {
    if (document.readyState === 'complete') {
      this.logPageLoadTime();
    } else {
      window.addEventListener('load', () => this.logPageLoadTime());
    }
  }

  /**
   * Log do tempo de carregamento
   */
  logPageLoadTime() {
    if (performance && performance.timing) {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const dns = perfData.domainLookupEnd - perfData.domainLookupStart;
      const tcp = perfData.connectEnd - perfData.connectStart;
      const ttfb = perfData.responseStart - perfData.navigationStart;
      const dom = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      
      console.table({
        'Total Load Time': `${pageLoadTime}ms`,
        'DNS Lookup': `${dns}ms`,
        'TCP Connection': `${tcp}ms`,
        'Time to First Byte (TTFB)': `${ttfb}ms`,
        'DOM Content Loaded': `${dom}ms`
      });
      
      this.logToAnalytics('page_load_time', {
        total: pageLoadTime,
        dns,
        tcp,
        ttfb,
        dom
      });
    }
  }

  /**
   * Verifica se LCP está dentro do alvo
   */
  checkLCPThreshold() {
    const threshold = 2500; // 2.5s em ms
    const status = this.vitals.lcp <= threshold ? '✅' : '⚠️';
    console.log(`${status} LCP: ${this.vitals.lcp.toFixed(0)}ms (Alvo: < 2500ms)`);
  }

  /**
   * Verifica se FID está dentro do alvo
   */
  checkFIDThreshold() {
    const threshold = 100; // 100ms
    const status = this.vitals.fid <= threshold ? '✅' : '⚠️';
    console.log(`${status} FID: ${this.vitals.fid.toFixed(0)}ms (Alvo: < 100ms)`);
  }

  /**
   * Verifica se CLS está dentro do alvo
   */
  checkCLSThreshold() {
    const threshold = 0.1;
    const status = this.vitals.cls <= threshold ? '✅' : '⚠️';
    console.log(`${status} CLS: ${this.vitals.cls.toFixed(3)} (Alvo: < 0.1)`);
  }

  /**
   * Retorna relatório de Web Vitals
   */
  getReport() {
    return {
      lcp: {
        value: this.vitals.lcp,
        status: this.vitals.lcp ? (this.vitals.lcp <= 2500 ? 'good' : 'poor') : 'pending',
        threshold: 2500
      },
      fid: {
        value: this.vitals.fid,
        status: this.vitals.fid ? (this.vitals.fid <= 100 ? 'good' : 'poor') : 'pending',
        threshold: 100
      },
      cls: {
        value: this.vitals.cls,
        status: this.vitals.cls ? (this.vitals.cls <= 0.1 ? 'good' : 'poor') : 'pending',
        threshold: 0.1
      }
    };
  }

  /**
   * Log para Google Analytics
   */
  logToAnalytics(eventName, eventData) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        ...eventData,
        event_category: 'web_vitals'
      });
    } else {
      console.log(`Analytics Event: ${eventName}`, eventData);
    }
  }

  /**
   * Exibe relatório no console
   */
  printReport() {
    const report = this.getReport();
    console.table(report);
  }

  /**
   * Detecta problemas de performance
   */
  diagnose() {
    const report = this.getReport();
    const issues = [];

    if (report.lcp.value && report.lcp.value > 2500) {
      issues.push('❌ LCP lento: Otimize imagens e recursos críticos');
    }
    
    if (report.fid.value && report.fid.value > 100) {
      issues.push('❌ FID alto: Reduza JavaScript de bloqueio');
    }
    
    if (report.cls.value && report.cls.value > 0.1) {
      issues.push('❌ CLS alto: Adicione reserva de espaço para elementos dinâmicos');
    }

    if (issues.length === 0) {
      console.log('✅ Todos os Web Vitals estão bons!');
    } else {
      console.warn('Problemas de Performance detectados:');
      issues.forEach(issue => console.warn(issue));
    }

    return issues;
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.webVitalsMonitor = new WebVitalsMonitor();
  });
} else {
  window.webVitalsMonitor = new WebVitalsMonitor();
}

// Diagnóstico automático após 5 segundos de carregamento
setTimeout(() => {
  if (window.webVitalsMonitor) {
    window.webVitalsMonitor.diagnose();
  }
}, 5000);

