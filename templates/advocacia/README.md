# Template Advocacia

Template profissional para escritórios de advocacia desenvolvido com o sistema Cosmos LP Generator.

## 🎨 Características

- **Design Profissional**: Paleta de cores elegante com azul escuro e dourado
- **Responsivo**: Adaptado para todos os dispositivos
- **Componentes Automáticos**: Sistema de componentes que se montam automaticamente
- **SEO Friendly**: Estrutura otimizada para mecanismos de busca

## 🎯 Áreas de Atuação Incluídas

1. **Direito Civil** - Contratos, família, sucessões
2. **Direito Trabalhista** - Defesa dos direitos trabalhistas
3. **Direito Empresarial** - Consultoria empresarial
4. **Direito Criminal** - Defesa criminal
5. **Direito Tributário** - Planejamento tributário
6. **Direito Imobiliário** - Questões imobiliárias

## 📝 Personalização

### Cores do Tema

Edite o arquivo `config.js` na seção `theme.colors`:

```javascript
theme: {
  colors: {
    primary: '#1E3A5F',    // Azul escuro principal
    secondary: '#2C5282',   // Azul médio
    tertiary: '#3A6BA0',   // Azul claro
    accent: '#D4AF37',      // Dourado
    background: '#F7F9FC'   // Fundo claro
  }
}
```

### Informações do Escritório

Atualize as informações em `config.js`:

- **Nome do Escritório**: `site.name`
- **OAB**: `site.established` e `header-navigation.established`
- **Endereço**: `footer-contact.address`
- **Telefone**: `footer-contact.contact.phone`
- **Email**: `footer-contact.contact.email`
- **WhatsApp**: `whatsappNumber` em vários componentes

### Imagens

Substitua as URLs das imagens por suas próprias:

- **Hero**: `hero-overlay.backgroundImage`
- **Cards**: `card-grid.items[].image`
- **Feature Highlight**: `feature-highlight.image`

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um servidor local
2. Os componentes serão carregados automaticamente
3. Personalize o `config.js` conforme necessário

## 📱 Integração

O template está pronto para integração com:
- WhatsApp Business
- Google Maps
- Redes Sociais (LinkedIn, Instagram, Facebook)

## ⚖️ Conformidade

- Estrutura preparada para informações de OAB
- Seções para áreas de atuação
- Espaço para diferenciais e credenciais

