# 🎨 Guia de Contraste e Acessibilidade de Cores

## ⚠️ REGRA FUNDAMENTAL: SEMPRE VERIFICAR CONTRASTE

**NUNCA criar uma configuração de cores sem garantir contraste adequado entre texto e fundo.**

---

## 📏 Padrões WCAG 2.1 (Web Content Accessibility Guidelines)

### Ratios Mínimos de Contraste

| Tipo de Texto | Nível AA (Mínimo) | Nível AAA (Recomendado) |
|--------------|-------------------|-------------------------|
| **Texto Normal** (< 18pt) | **4.5:1** | **7:1** |
| **Texto Grande** (≥ 18pt ou 14pt bold) | **3:1** | **4.5:1** |
| **Elementos UI** (botões, ícones) | **3:1** | **3:1** |

---

## 🚨 ERROS COMUNS A EVITAR

### ❌ NUNCA FAÇA:

1. **Texto escuro em fundo escuro**
   ```
   ❌ Texto #4B5563 em fundo #0A4D68
   ```

2. **Texto claro em fundo claro**
   ```
   ❌ Texto #6B7280 em fundo #F8FAFB
   ```

3. **Cores complementares de mesma luminosidade**
   ```
   ❌ Azul #088395 em fundo Ciano #05BFDB
   ```

4. **Texto colorido em fundo colorido**
   ```
   ❌ Verde #10B981 em fundo Azul #0A4D68 (contraste insuficiente)
   ```

---

## ✅ COMBINAÇÕES SEGURAS

### Para Fundos Escuros

```
FUNDO ESCURO (#0A4D68, #1F2937, #111827)
├─ ✅ Texto Branco (#FFFFFF) - Contraste ~12:1
├─ ✅ Texto Cinza Muito Claro (#F9FAFB) - Contraste ~11:1
├─ ✅ Texto Cinza Claro (#E5E7EB) - Contraste ~9:1
└─ ❌ Texto Cinza Médio (#6B7280) - Contraste ~3:1 (INSUFICIENTE)
```

### Para Fundos Claros

```
FUNDO CLARO (#FFFFFF, #F8FAFB, #F3F4F6)
├─ ✅ Texto Preto (#000000) - Contraste ~21:1
├─ ✅ Texto Cinza Escuro (#1F2937) - Contraste ~15:1
├─ ✅ Texto Cinza Médio (#4B5563) - Contraste ~9:1
└─ ❌ Texto Cinza Claro (#9CA3AF) - Contraste ~2.8:1 (INSUFICIENTE)
```

### Para Fundos Coloridos (Médios)

```
FUNDO COLORIDO (#088395, #3B82F6, #8B5CF6)
├─ ✅ Texto Branco (#FFFFFF) - Verificar contraste > 4.5:1
├─ ✅ Texto Preto (#000000) - Verificar contraste > 4.5:1
└─ ❌ Texto Colorido - SEMPRE verificar com calculadora
```

---

## 🛠️ FERRAMENTAS PARA VERIFICAR CONTRASTE

1. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
2. **Coolors Contrast Checker**: https://coolors.co/contrast-checker
3. **Color Contrast Analyzer (CCA)**: Desktop app
4. **Chrome DevTools**: Inspetor de acessibilidade

---

## 📋 CHECKLIST ANTES DE CRIAR CONFIG

### ✓ Verificações Obrigatórias

- [ ] **Títulos**: Contraste ≥ 4.5:1 com o fundo
- [ ] **Subtítulos**: Contraste ≥ 4.5:1 com o fundo
- [ ] **Texto corrido**: Contraste ≥ 4.5:1 com o fundo
- [ ] **Links**: Contraste ≥ 4.5:1 com o fundo E diferenciável
- [ ] **Botões (texto)**: Contraste ≥ 4.5:1 com fundo do botão
- [ ] **Botões (borda)**: Contraste ≥ 3:1 com fundo da página
- [ ] **Ícones**: Contraste ≥ 3:1 com o fundo
- [ ] **Badges/Tags**: Contraste ≥ 4.5:1
- [ ] **Placeholders**: Contraste ≥ 4.5:1 (idealmente)

---

## 🎯 REGRAS ESPECÍFICAS POR COMPONENTE

### `header-navigation`
```javascript
✅ CORRETO:
colors: {
  background: "brand-dark",  // #0A4D68
  text: "white",             // #FFFFFF - Contraste ~12:1
  ctaBackground: "brand-cyan", // #05BFDB
  ctaText: "brand-dark"      // #0A4D68 - Contraste ~8:1
}

❌ ERRADO:
colors: {
  background: "brand-dark",
  text: "brand-light",  // ❌ Contraste insuficiente!
}
```

### `hero-overlay`
```javascript
✅ CORRETO:
colors: {
  background: "dark-with-overlay",  // Fundo escuro
  title: "white",                   // #FFFFFF
  subtitle: "gray-100",             // #F3F4F6
  badge: {
    background: "white/10",         // Semi-transparente
    text: "white"                   // #FFFFFF
  }
}
```

### `info-bar`
```javascript
✅ CORRETO:
colors: {
  background: "brand-dark",   // #0A4D68
  text: "white",              // #FFFFFF - Contraste ~12:1
  accent: "brand-cyan"        // #05BFDB - Contraste ~8:1
}

❌ ERRADO:
colors: {
  background: "brand-dark",
  text: "gray-400",  // ❌ Contraste ~2:1 - INSUFICIENTE!
}
```

### `card-grid`
```javascript
✅ CORRETO:
colors: {
  background: "white",           // #FFFFFF
  titleColor: "gray-900",        // #111827 - Contraste ~16:1
  subtitleColor: "gray-600",     // #4B5563 - Contraste ~9:1
  cardOverlay: "black/80",       // rgba(0,0,0,0.8)
  cardText: "white"              // #FFFFFF sobre overlay escuro
}

❌ ERRADO:
colors: {
  background: "brand-cyan",      // #05BFDB (fundo claro/médio)
  subtitleColor: "brand-blue",   // #088395 ❌ Contraste insuficiente!
}
```

### `feature-highlight`
```javascript
✅ CORRETO:
colors: {
  background: "white",
  titleColor: "gray-900",        // #111827
  bodyColor: "gray-600",         // #4B5563
  badgeBackground: "brand-cyan/10",  // Fundo suave
  badgeText: "brand-dark"        // #0A4D68
}
```

### `cta-banner`
```javascript
✅ CORRETO:
colors: {
  background: "brand-dark",   // #0A4D68
  title: "white",             // #FFFFFF
  subtitle: "gray-100",       // #F3F4F6
  buttonText: "white"         // Sempre branco em botões coloridos
}

❌ ERRADO:
colors: {
  background: "brand-cyan",   // #05BFDB (fundo médio)
  title: "brand-light",       // ❌ Contraste insuficiente!
}
```

### `footer-contact`
```javascript
✅ CORRETO (Fundo Claro):
colors: {
  background: "gray-50",      // #F9FAFB
  titleColor: "gray-900",     // #111827
  textColor: "gray-600",      // #4B5563
  iconColor: "brand-dark"     // #0A4D68
}

✅ CORRETO (Fundo Escuro):
colors: {
  background: "gray-900",     // #111827
  titleColor: "white",        // #FFFFFF
  textColor: "gray-300",      // #D1D5DB
  iconColor: "brand-cyan"     // #05BFDB
}

❌ ERRADO:
colors: {
  background: "brand-cyan",   // #05BFDB (fundo médio)
  textColor: "gray-500",      // ❌ Contraste ~2.5:1 INSUFICIENTE!
}
```

---

## 🎨 PALETAS PRÉ-APROVADAS

### Paleta Profissional (Consultórios, Corporativo)

```javascript
// FUNDOS ESCUROS
{
  background: '#0A4D68',  // Azul escuro
  text: '#FFFFFF',        // Branco
  accent: '#05BFDB',      // Ciano - usar com texto escuro
  muted: '#E5E7EB'        // Cinza claro
}

// FUNDOS CLAROS
{
  background: '#F8FAFB',  // Cinza muito claro
  text: '#1F2937',        // Cinza escuro
  accent: '#0A4D68',      // Azul escuro
  muted: '#6B7280'        // Cinza médio
}
```

### Paleta Quente (Restaurantes, Padarias)

```javascript
// FUNDOS ESCUROS
{
  background: '#48191B',  // Marrom escuro
  text: '#FFFFFF',        // Branco
  accent: '#D4AF37',      // Dourado - usar com texto escuro
  muted: '#F9F7F2'        // Creme
}

// FUNDOS CLAROS
{
  background: '#F9F7F2',  // Creme
  text: '#48191B',        // Marrom escuro
  accent: '#D4AF37',      // Dourado - verificar contraste
  muted: '#6D2B2E'        // Marrom médio
}
```

---

## 🔧 PROCESSO DE VALIDAÇÃO

### Antes de Finalizar Qualquer Config:

1. **Listar todas as combinações texto/fundo**
   ```
   Exemplo:
   - Hero: título branco (#FFFFFF) em fundo escuro (#0A4D68)
   - Hero: subtítulo cinza (#E5E7EB) em fundo escuro (#0A4D68)
   - Card: título escuro (#1F2937) em fundo branco (#FFFFFF)
   - etc...
   ```

2. **Verificar CADA combinação em calculadora de contraste**
   - Usar WebAIM ou similar
   - Anotar o ratio
   - Confirmar que atende WCAG AA (mínimo 4.5:1)

3. **Documentar no config.js**
   ```javascript
   // Exemplo de documentação inline:
   colors: {
     background: "brand-dark",  // #0A4D68
     text: "white",             // #FFFFFF - Contraste: 11.8:1 ✓
     muted: "gray-300"          // #D1D5DB - Contraste: 7.2:1 ✓
   }
   ```

---

## 🚀 TEMPLATES DE CORES SEGUROS

### Template: Fundo Escuro Forte

```javascript
colors: {
  background: '#0A4D68',    // ou #1F2937, #111827
  title: '#FFFFFF',         // Contraste: ~12:1 ✓
  subtitle: '#F3F4F6',      // Contraste: ~10:1 ✓
  body: '#E5E7EB',          // Contraste: ~8:1 ✓
  muted: '#D1D5DB',         // Contraste: ~6:1 ✓
  accent: '#05BFDB',        // Para elementos, não texto
}
```

### Template: Fundo Claro

```javascript
colors: {
  background: '#FFFFFF',    // ou #F9FAFB, #F3F4F6
  title: '#111827',         // Contraste: ~16:1 ✓
  subtitle: '#1F2937',      // Contraste: ~14:1 ✓
  body: '#4B5563',          // Contraste: ~9:1 ✓
  muted: '#6B7280',         // Contraste: ~5:1 ✓
  accent: '#0A4D68',        // Para elementos destaque
}
```

### Template: Fundo Colorido Médio (CUIDADO!)

```javascript
// Se PRECISO usar fundo colorido médio:
colors: {
  background: '#05BFDB',    // Ciano médio
  // REGRA: Testar AMBOS branco e preto
  title: '#111827',         // Verificar contraste!
  subtitle: '#1F2937',      // Verificar contraste!
  // OU
  title: '#FFFFFF',         // Verificar contraste!
  subtitle: '#F3F4F6',      // Verificar contraste!
}
// SEMPRE validar antes de usar!
```

---

## 📱 CONSIDERAÇÕES MOBILE

- Telas de celular frequentemente usadas sob sol direto
- **Aumentar contraste em 20%** para mobile se possível
- Evitar cinzas médios (#9CA3AF, #6B7280) em textos pequenos
- Preferir sempre branco/preto em fundos coloridos

---

## ♿ ACESSIBILIDADE ALÉM DO CONTRASTE

1. **Não usar APENAS cor para comunicar informação**
   - ✅ Ícone + cor para status
   - ❌ Apenas cor para status

2. **Links devem ser distinguíveis**
   - Sublinhado OU
   - Contraste extra de 3:1 com texto normal

3. **Estados de foco visíveis**
   - Outline com contraste mínimo de 3:1

4. **Texto em imagens**
   - Sempre ter alternativa textual
   - Usar overlay escuro se necessário

---

## 🎓 RESUMO EXECUTIVO

### 3 Regras de Ouro

1. **BRANCO em ESCURO** = Sempre seguro ✅
2. **ESCURO em BRANCO** = Sempre seguro ✅
3. **COLORIDO em COLORIDO** = Sempre verificar! ⚠️

### Atalho Mental Rápido

```
"Posso ler este texto facilmente em uma sala iluminada?"
"Posso ler este texto em um celular sob o sol?"

Se a resposta for NÃO → Contraste insuficiente!
```

---

## 🔗 RECURSOS ADICIONAIS

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://accessible-colors.com/)
- [Who Can Use](https://www.whocanuse.com/)

---

**ÚLTIMA ATUALIZAÇÃO**: Dezembro 2024

**OBRIGATÓRIO**: Consultar este guia antes de criar QUALQUER configuração de cores.

