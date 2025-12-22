# Como Criar um Componente para o Registry

## 📚 Guia Completo: De HTML para Componente Reutilizável

Este guia explica como transformar qualquer HTML em um componente registrado no Component Registry.

---

## 🎯 Estrutura Básica de um Componente

Todo componente segue este padrão:

```javascript
/**
 * NomeDoComponente
 * Descrição do componente
 */

class NomeDoComponente {
    /**
     * @param {Object} data - Dados do componente
     * @param {string} data.propriedade1 - Descrição
     * @param {string} data.propriedade2 - Descrição
     */
    constructor(data) {
        // 1. Armazena as propriedades
        this.propriedade1 = data.propriedade1;
        this.propriedade2 = data.propriedade2;
    }

    /**
     * Renderiza o HTML do componente
     * @returns {string} HTML string
     */
    render() {
        return `
            <!-- Seu HTML aqui, usando ${this.propriedade1} -->
        `;
    }

    /**
     * Monta o componente no DOM
     * @param {string} targetId - ID do elemento onde será montado
     */
    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            this.attachEventListeners();
        }
    }

    /**
     * Adiciona event listeners após montar
     */
    attachEventListeners() {
        // Event listeners aqui
    }

    /**
     * Método estático para criar e montar
     * @param {Object} data - Dados do componente
     * @param {string} targetId - ID do elemento
     * @returns {NomeDoComponente} Instância do componente
     */
    static create(data, targetId) {
        const component = new NomeDoComponente(data);
        component.mount(targetId);
        return component;
    }
}

// Auto-registra no Component Registry
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('nome-do-componente', NomeDoComponente);
}
```

---

## 📋 Passo a Passo: Transformando HTML em Componente

### **PASSO 1: Analise o HTML Original**

Identifique:
- ✅ O que é **fixo** (estrutura HTML)
- ✅ O que é **dinâmico** (textos, imagens, links que podem mudar)
- ✅ **Event listeners** necessários (clicks, hovers, etc)
- ✅ **IDs únicos** que precisam de atenção

**Exemplo:**
```html
<header class="fixed w-full">
    <img src="logo.jpg" alt="Logo">
    <h1>Meu Site</h1>
    <a href="tel:123">Ligar</a>
</header>
```

**Identificando:**
- Fixo: estrutura do header, classes CSS
- Dinâmico: `logo.jpg`, `"Logo"`, `"Meu Site"`, `tel:123`

---

### **PASSO 2: Defina as Propriedades (Props)**

Liste todas as partes dinâmicas que virão do `config.js`:

```javascript
/**
 * @param {Object} data
 * @param {string} data.logoUrl - URL do logo
 * @param {string} data.logoAlt - Texto alternativo do logo
 * @param {string} data.siteName - Nome do site
 * @param {string} data.phone - Telefone de contato
 */
```

---

### **PASSO 3: Crie o Constructor**

Armazene as props recebidas:

```javascript
constructor(data) {
    this.logoUrl = data.logoUrl;
    this.logoAlt = data.logoAlt;
    this.siteName = data.siteName;
    this.phone = data.phone;
}
```

---

### **PASSO 4: Transforme HTML em Template String**

1. Copie o HTML original
2. Envolva em backticks `` ` ``
3. Substitua valores dinâmicos por `${this.propriedade}`
4. Remova IDs fixos ou torne-os únicos se necessário

**Antes:**
```html
<header class="fixed w-full">
    <img src="logo.jpg" alt="Logo">
    <h1>Meu Site</h1>
    <a href="tel:123">Ligar</a>
</header>
```

**Depois:**
```javascript
render() {
    return `
        <header class="fixed w-full">
            <img src="${this.logoUrl}" alt="${this.logoAlt}">
            <h1>${this.siteName}</h1>
            <a href="tel:${this.phone}">Ligar</a>
        </header>
    `;
}
```

---

### **PASSO 5: Adicione Event Listeners (se necessário)**

Se o componente tem interatividade (menus, botões, etc):

```javascript
attachEventListeners() {
    // Exemplo: menu mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}
```

**⚠️ IMPORTANTE:** Use `querySelector` ou IDs únicos para evitar conflitos!

---

### **PASSO 6: Implemente mount() e create()**

Esses métodos são padrão, raramente mudam:

```javascript
mount(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.innerHTML = this.render();
        this.attachEventListeners(); // Se tiver
    }
}

static create(data, targetId) {
    const component = new NomeDoComponente(data);
    component.mount(targetId);
    return component;
}
```

---

### **PASSO 7: Auto-registre o Componente**

No final do arquivo, sempre adicione:

```javascript
if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('nome-do-componente', NomeDoComponente);
}
```

O nome deve ter **hífen** (kebab-case): `'header-nav'`, `'hero-overlay'`, etc.

---

### **PASSO 8: Configure no config.js**

Adicione o componente na raiz do config com as props:

```javascript
const config = {
    // ... outras configs

    'nome-do-componente': {
        logoUrl: "https://...",
        logoAlt: "Logo",
        siteName: "Meu Site",
        phone: "11999999999"
    }
};
```

---

## 🎨 Exemplo Completo: Header Component

### HTML Original:
```html
<nav class="fixed w-full">
    <img src="logo.jpg" alt="Logo">
    <span>Meu Site</span>
    <a href="tel:123">Ligar</a>
    <button id="menu-btn">Menu</button>
    <div id="mobile-menu" class="hidden">
        <a href="#about">Sobre</a>
    </div>
</nav>
```

### Componente Final:

```javascript
/**
 * Header Navigation Component
 */
class HeaderComponent {
    constructor(data) {
        this.logoUrl = data.logoUrl;
        this.logoAlt = data.logoAlt;
        this.siteName = data.siteName;
        this.phone = data.phone;
        this.menuItems = data.menuItems || [];
    }

    render() {
        const menuItemsHtml = this.menuItems
            .map(item => `<a href="${item.href}">${item.text}</a>`)
            .join('');

        return `
            <nav class="fixed w-full">
                <img src="${this.logoUrl}" alt="${this.logoAlt}">
                <span>${this.siteName}</span>
                <a href="tel:${this.phone}">Ligar</a>
                <button class="menu-toggle">Menu</button>
                <div class="mobile-menu hidden">
                    ${menuItemsHtml}
                </div>
            </nav>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
            this.attachEventListeners();
        }
    }

    attachEventListeners() {
        const target = document.getElementById(targetId);
        const menuBtn = target.querySelector('.menu-toggle');
        const mobileMenu = target.querySelector('.mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    static create(data, targetId) {
        const component = new HeaderComponent(data);
        component.mount(targetId);
        return component;
    }
}

if (typeof window !== 'undefined' && window.componentRegistry) {
    window.componentRegistry.register('header-nav', HeaderComponent);
}
```

### No config.js:

```javascript
const config = {
    'header-nav': {
        logoUrl: "logo.jpg",
        logoAlt: "Logo da empresa",
        siteName: "Minha Empresa",
        phone: "11999999999",
        menuItems: [
            { href: "#about", text: "Sobre" },
            { href: "#contact", text: "Contato" }
        ]
    }
};
```

---

## ✅ Checklist Final

Antes de considerar o componente pronto:

- [ ] Todas as partes dinâmicas viram props
- [ ] Constructor armazena todas as props
- [ ] render() retorna HTML válido com interpolação
- [ ] mount() monta no target corretamente
- [ ] attachEventListeners() (se necessário) funciona
- [ ] static create() está implementado
- [ ] Auto-registro no final do arquivo
- [ ] Config.js tem as props necessárias
- [ ] Testado no navegador

---

## 🐛 Dicas de Debug

### O componente não aparece?
1. Verifique o console: logs do registry
2. Confirme que o nome no config bate com o registro
3. Verifique se há erros de sintaxe no render()

### Event listeners não funcionam?
1. Use `querySelector` relativo ao target
2. Certifique-se que attachEventListeners() é chamado no mount()
3. Verifique se os elementos existem antes de adicionar listeners

### Estilos não aplicam?
1. Confirme que as classes Tailwind estão corretas
2. Verifique se o componente está montado no DOM (inspecione)

---

## 🚀 Próximos Passos

1. Leia esta documentação
2. Veja o exemplo do `hero-overlay.js`
3. Transforme seu HTML em componente
4. Teste e itere
5. Reutilize em outros templates!

---

## 📝 Convenções de Nomenclatura

- **Arquivo:** `nome-do-componente.js` (kebab-case)
- **Classe:** `NomeDoComponenteComponent` (PascalCase + Component)
- **Registro:** `'nome-do-componente'` (kebab-case, mesmo do arquivo)
- **Config:** `'nome-do-componente': { props }` (kebab-case)

Exemplo:
- Arquivo: `header-navigation.js`
- Classe: `HeaderNavigationComponent`
- Registro: `'header-navigation'`
- Config: `'header-navigation': { ... }`

