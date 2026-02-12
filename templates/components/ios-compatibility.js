/**
 * iOS Compatibility Layer - DESABILITADO
 * Apenas handler de erros global, mais nada
 */

(function() {
    'use strict';

    // Apenas proteção global contra erros
    window.addEventListener('error', function(event) {
        console.error('Error:', event.error || event.message);
        event.preventDefault();
        return true;
    });

    window.addEventListener('unhandledrejection', function(event) {
        console.error('Promise rejection:', event.reason);
        event.preventDefault();
    });

    console.log('iOS Compatibility: Apenas error handlers');
})();
