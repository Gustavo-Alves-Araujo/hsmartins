# 🏠 Página de Detalhes do Imóvel - Estilo Airbnb

## ✨ Funcionalidades Implementadas

### 📸 Galeria de Imagens
- **Grid de fotos** estilo Airbnb (5 imagens visíveis)
- **Modal em tela cheia** para visualizar todas as fotos
- **Navegação** por setas (← →) ou teclado
- **Thumbnails** na parte inferior do modal
- **Contador** de imagens (1/20, 2/20...)
- **Indicador** de "+15 fotos" quando houver mais de 5

### 📋 Informações Detalhadas
- **Título** e categoria do imóvel
- **Avaliação** com estrelas
- **Cards informativos** (tipo, localização, número de fotos)
- **Descrição** completa
- **Características** em grid com ícones
- **Seção de localização** (placeholder para mapa)

### 💰 Box de Reserva/Contato (Sticky)
- **Preço** destacado com preço original riscado
- **Parcelamento** em destaque
- **Formulário de contato**:
  - Nome completo
  - WhatsApp
  - Email
  - Mensagem
- **Botões de ação**:
  - "Entrar em Contato" (azul)
  - "Chamar no WhatsApp" (verde)
- **Sticky** (acompanha scroll)

### 🔗 Navegação
- **Header** com menu
- **Imóveis relacionados** no final
- **Footer** com redes sociais
- **Links** dos cards levam para `/imovel.html?id={uuid}`

## 🎨 Design Moderno

### Inspiração Airbnb:
- Grid de galeria característico
- Typography clean e espaçada
- Shadows e borders suaves
- Hover effects elegantes
- Cores neutras com acentos
- Mobile-first responsive

### Paleta de Cores:
- **Principal**: Branco (#FFFFFF)
- **Texto**: Gray-900
- **Acentos**: Blue-600, Green-600
- **Borders**: Gray-300
- **Hover**: Gray-50

## 📱 Responsividade

### Desktop (> 1024px):
- Grid 2 colunas (conteúdo + sidebar)
- Galeria em grid 4x2
- Sidebar sticky

### Tablet (768px - 1024px):
- Layout adaptado
- Galeria reduzida

### Mobile (< 768px):
- Layout em coluna única
- Galeria em carrossel
- Sidebar não-sticky

## 🚀 Como Usar

### 1. Navegação Normal
Clique em qualquer card de imóvel no site:
```
index.html → clica no card → imovel.html?id=abc123
```

### 2. Link Direto
Compartilhe o link específico:
```
https://seusite.com/imovel.html?id=abc123-def-456
```

### 3. Integração com Admin
Ao criar/editar no `/admin`, o ID é gerado automaticamente pelo Supabase.

## 🔧 Personalização

### Alterar Número do WhatsApp
No arquivo `imovel.html`, linha ~296:
```javascript
href="https://wa.me/5511999999999?text=..."
```
Substitua `5511999999999` pelo número real.

### Adicionar Mapa Real
Substitua a seção "Localização" com iframe do Google Maps:
```html
<iframe 
    src="https://www.google.com/maps/embed?pb=..." 
    width="100%" 
    height="400" 
    frameborder="0"
></iframe>
```

### Customizar Características
No arquivo `imovel.html`, seção "Características" (~234):
```javascript
<div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
    <i class="fas fa-check-circle text-green-600 text-xl"></i>
    <span class="text-gray-700">Sua característica</span>
</div>
```

## 📊 Estrutura de Dados

### URL Parameter:
```
?id=550e8400-e29b-41d4-a716-446655440000
```

### Dados Carregados do Supabase:
```json
{
  "id": "uuid",
  "title": "Sobrado para Venda",
  "category": "Alto Padrão",
  "price_current": "R$ 650.000,00",
  "price_original": "R$ 680.000,00",
  "rating": "4.8",
  "installments": "Em até 360x",
  "badge_text": "Novo",
  "badge_style": "new",
  "image_url": "url-primeira-imagem",
  "images_urls": ["url1", "url2", "url3", ...]
}
```

## ⌨️ Atalhos de Teclado

### Na Galeria Modal:
- **→** (seta direita): Próxima imagem
- **←** (seta esquerda): Imagem anterior
- **ESC**: Fechar modal

## 🎯 Próximas Melhorias (Opcional)

### 1. Carrossel Automático
```javascript
setInterval(() => {
    nextImage();
}, 3000);
```

### 2. Zoom nas Imagens
Adicionar biblioteca como PhotoSwipe ou GLightbox.

### 3. Compartilhamento Social
```html
<button onclick="compartilhar()">
    <i class="fas fa-share-alt"></i> Compartilhar
</button>
```

### 4. Favoritos
Salvar imóveis favoritos no localStorage:
```javascript
localStorage.setItem('favoritos', JSON.stringify([id1, id2]));
```

### 5. Tour Virtual 360°
Integrar Matterport ou similar para tour virtual.

### 6. Calculadora de Financiamento
Modal com simulação de parcelas.

### 7. Agendamento de Visita
Calendário interativo para marcar visitas.

## 🐛 Troubleshooting

### Imagem não carrega
- Verifique se `images_urls` está em formato JSON no banco
- Confirme que o bucket Supabase é público
- Teste a URL da imagem diretamente no navegador

### ID não encontrado
- Verifique se o UUID está correto na URL
- Confirme que o registro existe no Supabase
- Veja o console (F12) para erros

### Galeria não abre
- Limpe o cache (Ctrl+Shift+R)
- Verifique se há erros no console
- Confirme que há imagens no array

### Layout quebrado no mobile
- Force o viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Teste em modo responsivo do DevTools

## 📝 Arquivos Criados/Modificados

1. **`imovel.html`** ✨ NOVO
   - Página completa de detalhes
   - Modal de galeria
   - Formulário de contato
   - Sistema de navegação

2. **`templates/components/product-grid-advanced.js`** 📝 ATUALIZADO
   - Adicionado `id` do produto
   - Cards agora são links `<a href="imovel.html?id={id}">`
   - Botão "Ver Detalhes" navega para página

## 🎬 Demo Flow

1. **Usuário acessa** `index.html`
2. **Vê grid de imóveis** com cards
3. **Clica em um card** → redireciona para `imovel.html?id=xxx`
4. **Página carrega** dados do Supabase
5. **Vê galeria** com 5+ fotos
6. **Clica "Mostrar todas"** → modal abre
7. **Navega pelas fotos** com setas
8. **Fecha modal** (ESC ou X)
9. **Rola a página** → sidebar acompanha (sticky)
10. **Preenche formulário** e envia
11. **Ou clica WhatsApp** → abre conversa
12. **Vê imóveis relacionados** no final
13. **Clica em relacionado** → nova página de detalhes

---

**Design inspirado no Airbnb** ✈️  
**Desenvolvido para HS Martins Imóveis** 🏠
