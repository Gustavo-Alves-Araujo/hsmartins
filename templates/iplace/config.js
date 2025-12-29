// Cria uma Promise para o config ser carregado
window.configReady = (async function() {
  try {
    const response = await fetch('./config.json');
    const config = await response.json();
    window.config = config;
    return config;
  } catch (error) {
    console.error('❌ Erro ao carregar config.json:', error);
    window.config = {};
    return {};
  }
})();
