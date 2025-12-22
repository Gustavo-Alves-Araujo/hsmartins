# Component Registry - Sistema Automático de Componentes

## 🎯 O que é?

Um sistema que **detecta, carrega e monta componentes automaticamente** baseado no `config.js`.

**Zero configuração manual. Zero imports. 100% automático.**

## 📦 Como usar

### 1. No `config.js` - Componentes na raiz:

```javascript
const config = {
    // Configurações normais
    theme: { ... },
    site: { ... },

    // ========== COMPONENTES ==========
    // Qualquer chave com hífen é detectada como componente!
    // Eles são montados na ordem que aparecem aqui

    'hero-overlay': {
        badge: "Seu badge",
        title: "Seu título",
        titleHighlight: "destaque",
        subtitle: "Descrição...",
        ctaPrimary: "Botão 1",
        ctaSecondary: "Botão 2",
        backgroundImage: "https://...",
        backgroundAlt: "Alt text",
        whatsappNumber: "5511999999999",
        colors: {
            primary: 'brand-dark',
            accent: 'brand-gold',
            text: 'white'
        }
    },

    'outro-componente': {
        prop1: "valor1",
        prop2: "valor2"
    }
};
```

### 2. No `index.html` - Apenas isso:

```html
<head>
  <script src="config.js"></script>
  <script src="../components/component-registry.js"></script>
</head>

<body id="app">
  <!-- Componentes montam aqui automaticamente -->

  <script>
    document.addEventListener('DOMContentLoaded', async function () {
      // Detecta, carrega e monta tudo automaticamente!
      await componentRegistry.initFromConfig(config, document.getElementById('app'));
    });
  </script>
</body>
```

## ✨ Magia Automática!

O registry:
1. 🔍 **Detecta** componentes no config (chaves com hífen como `'hero-overlay'`)
2. 📥 **Carrega** os arquivos automaticamente (`../components/hero-overlay.js`)
3. 🎨 **Monta** na ordem que aparecem no config
4. 🎯 **Cria** os elementos target automaticamente

**Você não faz NADA manualmente!**

## 🎨 Componentes Disponíveis

### header-navigation

Menu de navegação responsivo com logo e links.

**Arquivo:** `header-navigation.js`

**Props:**
- `logoUrl`: URL do logo
- `logoAlt`: Texto alternativo do logo
- `siteName`: Nome do site
- `established`: Texto de estabelecimento (ex: "Est. 2020")
- `whatsappNumber`: Número do WhatsApp (usado como fallback)
- `links`: Objeto com links do menu
  - `about`: { text: string, href: string }
  - `services`: { text: string, href: string }
  - `location`: { text: string, href: string }
  - `cta`: { text: string, href: string, target?: string }

**Exemplo no config.js:**
```javascript
'header-navigation': {
    logoUrl: "https://...",
    logoAlt: "Logo",
    siteName: "Minha Empresa",
    established: "Est. 2020",
    whatsappNumber: "5511999999999",
    links: {
        about: {
            text: "Sobre Nós",
            href: "#about"
        },
        services: {
            text: "Nossos Serviços",
            href: "#services"
        },
        location: {
            text: "Onde Estamos",
            href: "#location"
        },
        cta: {
            text: "Fazer Pedido",
            href: "https://wa.me/5511999999999",
            target: "_blank"
        }
    }
}
```

**Nota:** Os links aceitam formato simples (string) para retrocompatibilidade:
```javascript
links: {
    about: "Sobre",  // Usa href padrão: #about
    services: "Serviços",  // Usa href padrão: #services
    // ...
}
```

---

### hero-overlay

Hero com imagem de fundo e overlay escuro customizável.

**Arquivo:** `hero-overlay.js`

**Props:**
- `badge`: Texto do badge superior
- `title`: Título principal
- `titleHighlight`: Parte destacada do título (em itálico)
- `subtitle`: Subtítulo/descrição
- `ctaPrimary`: Botão primário (objeto ou string)
  - Como objeto: { text: string, href: string, target?: string }
  - Como string: usa WhatsApp como link padrão
- `ctaSecondary`: Botão secundário (objeto ou string)
  - Como objeto: { text: string, href: string }
  - Como string: usa #services como link padrão
- `backgroundImage`: URL da imagem de fundo
- `backgroundAlt`: Texto alternativo da imagem
- `whatsappNumber`: Número do WhatsApp (usado como fallback se CTA for string)
- `colors`: Objeto com cores personalizadas
  - `primary`: Cor primária (ex: 'brand-dark', 'purple')
  - `accent`: Cor de destaque (ex: 'brand-gold', 'amber')
  - `text`: Cor do texto (ex: 'white', 'slate')

**Exemplo no config.js (formato completo):**
```javascript
'hero-overlay': {
    badge: "Desde 2020",
    title: "Bem-vindo",
    titleHighlight: "ao futuro",
    subtitle: "Descrição...",
    ctaPrimary: {
        text: "Fazer Pedido",
        href: "https://wa.me/5511999999999",
        target: "_blank"
    },
    ctaSecondary: {
        text: "Explorar Produtos",
        href: "#products"
    },
    backgroundImage: "https://...",
    backgroundAlt: "Imagem",
    whatsappNumber: "5511999999999",
    colors: {
        primary: 'brand-dark',
        accent: 'brand-gold',
        text: 'white'
    }
}
```

**Exemplo no config.js (formato simplificado - retrocompatível):**
```javascript
'hero-overlay': {
    badge: "Desde 2020",
    title: "Bem-vindo",
    titleHighlight: "ao futuro",
    subtitle: "Descrição...",
    ctaPrimary: "Fazer Pedido",  // String - usa WhatsApp automaticamente
    ctaSecondary: "Explorar",    // String - usa #services automaticamente
    backgroundImage: "https://...",
    backgroundAlt: "Imagem",
    whatsappNumber: "5511999999999",
    colors: {
        primary: 'brand-dark',
        accent: 'brand-gold',
        text: 'white'
    }
}
```

---

## 🔧 API do Component Registry

### Métodos Disponíveis

#### `componentRegistry.create(config)`
Cria um componente individual:
```javascript
componentRegistry.create({
    type: 'hero-overlay',
    target: 'hero-component',
    props: { /* ... */ }
});
```

#### `componentRegistry.createMany(componentsArray)`
Cria múltiplos componentes:
```javascript
componentRegistry.createMany([
    { type: 'hero-overlay', target: 'hero', props: {} },
    { type: 'outro', target: 'outro', props: {} }
]);
```

#### `componentRegistry.initFromConfig(config)`
Inicializa componentes a partir do config.js (recomendado):
```javascript
componentRegistry.initFromConfig(config);
```

#### `componentRegistry.getInstance(target)`
Obtém a instância de um componente montado:
```javascript
const heroInstance = componentRegistry.getInstance('hero-component');
```

#### `componentRegistry.listAvailable()`
Lista todos os componentes disponíveis:
```javascript
const available = componentRegistry.listAvailable();
// ['hero-overlay', 'outro-componente']
```

#### `componentRegistry.destroy(target)`
Remove um componente do DOM:
```javascript
componentRegistry.destroy('hero-component');
```

#### `componentRegistry.register(type, ComponentClass, path)`
Registra um novo tipo de componente:
```javascript
componentRegistry.register('meu-componente', MeuComponente, '../components/meu-componente.js');
```

## 🆕 Como adicionar novos componentes

### 1. Crie o arquivo do componente

Exemplo: `templates/components/meu-componente.js`

```javascript
class MeuComponente {
    constructor(data) {
        this.titulo = data.titulo;
        // ... outras props
    }

    render() {
        return `
            <div>
                <h1>${this.titulo}</h1>
            </div>
        `;
    }

    mount(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = this.render();
        }
    }

    static create(data, targetId) {
        const component = new MeuComponente(data);
        component.mount(targetId);
        return component;
    }
}
```

### 2. Registre no Component Registry

Edite `component-registry.js`:

```javascript
this.componentMap = {
    'hero-overlay': {
        class: HeroComponent,
        path: '../components/hero-overlay.js'
    },
    'meu-componente': {  // Adicione aqui
        class: MeuComponente,
        path: '../components/meu-componente.js'
    }
};
```

### 3. Use no config.js

```javascript
components: [
    {
        type: 'meu-componente',
        target: 'meu-target',
        props: {
            titulo: 'Meu Título'
        }
    }
]
```

## ✨ Vantagens

✅ **Menos código repetitivo** - Configure uma vez no config.js
✅ **Centralizado** - Todas as configurações em um só lugar
✅ **Reutilizável** - Mesmo componente em múltiplos templates
✅ **Escalável** - Fácil adicionar novos componentes
✅ **Type-safe** - Validação automática de tipos e props
✅ **Debug facilitado** - Logs automáticos de erros e sucessos

## 📝 Exemplo Completo

```javascript
// config.js
const config = {
    components: [
        {
            type: 'hero-overlay',
            target: 'hero',
            props: {
                title: "Bem-vindo",
                titleHighlight: "ao futuro",
                // ... outras props
            }
        }
    ]
};
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <script src="config.js"></script>
    <script src="../components/hero-overlay.js"></script>
    <script src="../components/component-registry.js"></script>
</head>
<body>
    <div id="hero"></div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            componentRegistry.initFromConfig(config);
        });
    </script>
</body>
</html>
```

## 🐛 Debug

O Component Registry exibe logs no console:

- ✅ `Componente 'hero-overlay' criado e montado em '#hero-component'`
- ❌ `Erro: componente 'xyz' não encontrado no registry`
- ⚠️ `Nenhum componente encontrado em config.components`

Abra o console do navegador (F12) para ver os logs.

