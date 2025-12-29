# 📚 Exemplos de Config por Nicho

Este diretório contém exemplos completos de `config.js` para diferentes nichos de negócio.

## 📋 Exemplos Disponíveis

### 🏋️ Personal Trainer
**Arquivo:** [`personal-trainer-config.js`](./personal-trainer-config.js)

Exemplo completo para personal trainers e profissionais de fitness:
- Contact top bar com horários
- Hero com imagem e estatísticas
- Info bar com serviços
- Grid de conquistas
- Cards de serviços
- Seção sobre
- Grid de planos
- Footer com contato
- Botão WhatsApp flutuante

### 🏥 Clínica / Consultório
**Arquivo:** [`clinic-config.js`](./clinic-config.js)

Exemplo para clínicas e consultórios médicos:
- Contact top bar
- Header sticky profissional
- Hero overlay cinematográfico
- Info bar com informações
- Cards de especialidades
- Seção sobre (versão clínica)
- Footer com contato
- Botão WhatsApp flutuante

### 💻 SaaS / Plataformas
**Arquivo:** [`saas-config.js`](./saas-config.js)

Exemplo para SaaS e plataformas de software:
- Navbar com gradiente
- Hero com preview de dashboard
- Social proof com logos
- Grid de features com glassmorphism
- Destaque de benefícios
- Grid de planos
- FAQ accordion
- CTA glow card
- Footer multi-coluna escuro

### 🍕 Restaurante / Delivery
**Arquivo:** [`restaurant-config.js`](./restaurant-config.js)

Exemplo para restaurantes e delivery:
- Header navigation com WhatsApp
- Hero overlay com imagem de comida
- Info bar com entrega e horário
- Cards de tipos de comida
- Grid de cardápio
- Footer com contato
- Botão WhatsApp flutuante

### 🛍️ E-commerce
**Arquivo:** [`ecommerce-config.js`](./ecommerce-config.js)

Exemplo para lojas online:
- Navbar com gradiente
- Hero com badge de frete grátis
- Info bar com benefícios
- Grid de produtos
- Social proof com marcas
- Grid de planos de assinatura
- FAQ
- Footer multi-coluna

## 🚀 Como Usar

1. **Escolha o exemplo** mais próximo do seu nicho
2. **Copie o conteúdo** do arquivo
3. **Adapte** as informações (textos, imagens, links)
4. **Personalize** as cores no tema
5. **Adicione ou remova** componentes conforme necessário

## 💡 Dicas

- Use o [Component Recommender](../catalog/component-recommender.js) para obter recomendações personalizadas
- Consulte o [catálogo de componentes](../catalog/components-catalog.json) para ver todas as opções
- Veja a [documentação completa](../docs/COMPONENTES-DISPONIVEIS.md) para entender cada componente

## 🔄 Personalização

Todos os exemplos podem ser personalizados:

- **Cores:** Modifique o objeto `theme.colors`
- **Fontes:** Ajuste `theme.fonts`
- **Componentes:** Adicione ou remova componentes conforme necessário
- **Conteúdo:** Substitua textos, imagens e links pelos seus

## 📝 Estrutura Comum

Todos os exemplos seguem esta estrutura:

```javascript
const config = {
  theme: { /* cores e fontes */ },
  'componente-1': { /* props do componente */ },
  'componente-2': { /* props do componente */ },
  // ...
  site: { /* informações do site */ }
};

window.config = config;
```

## 🎯 Próximos Passos

Após escolher e adaptar um exemplo:

1. Crie uma pasta para seu template
2. Salve o config como `config.js`
3. Crie um `index.html` básico (veja o README principal)
4. Teste localmente
5. Personalize conforme necessário

---

**Nota:** Estes são exemplos de referência. Sinta-se livre para adaptá-los completamente às suas necessidades!






