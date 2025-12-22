# Component Registry - Sistema de Registro de Componentes

## 🎯 O que é?

Um sistema que **carrega e inicializa componentes automaticamente** através do `config.js`. Você não precisa importar os componentes manualmente no HTML!

## 📦 Como usar

### 1. No `index.html` - apenas isso:

```html
<head>
  <!-- Config -->
  <script src="config.js"></script>

  <!-- Component Registry (ele carrega os componentes automaticamente!) -->
  <script src="../components/component-registry.js"></script>
</head>

<body>
  <!-- Elementos onde os componentes serão montados -->
  <div id="hero-component"></div>

  <script>
    document.addEventListener('DOMContentLoaded', async function () {
      // Carrega e monta TODOS os componentes automaticamente
      await componentRegistry.initFromConfig(config);
    });
  </script>
</body>
```

### 2. No `config.js`:

```javascript
const config = {
    // ... outras configurações

    components: [
        {
            type: 'hero-overlay',           // Nome do componente
            target: 'hero-component',       // ID do elemento onde será montado
            props: {                        // Propriedades do componente
                badge: "Seu badge",
                title: "Seu título",
                titleHighlight: "destaque",
                // ... outras props
                colors: {
                    primary: 'brand-dark',
                    accent: 'brand-gold',
                    text: 'white'
                }
            }
        }
        // Adicione mais componentes aqui
    ]
};
```

## ✨ Magia!

O registry automaticamente:
1. 🔍 Lê o `config.components`
2. 📥 Carrega os arquivos necessários (`../components/hero-overlay.js`)
3. ⏳ Aguarda o componente se auto-registrar
4. 🎨 Monta o componente no DOM

**Você não precisa importar nenhum componente manualmente!**

## 🎨 Componentes Disponíveis

### hero-overlay

Hero com imagem de fundo e overlay escuro customizável.

**Props:**
- `badge`: Texto do badge superior
- `title`: Título principal
- `titleHighlight`: Parte destacada do título (em itálico)
- `subtitle`: Subtítulo/descrição
- `ctaPrimary`: Texto do botão primário
- `ctaSecondary`: Texto do botão secundário
- `backgroundImage`: URL da imagem de fundo
- `backgroundAlt`: Texto alternativo da imagem
- `whatsappNumber`: Número do WhatsApp (formato: 5511999999999)
- `colors`: Objeto com cores personalizadas
  - `primary`: Cor primária (ex: 'brand-dark', 'purple')
  - `accent`: Cor de destaque (ex: 'brand-gold', 'amber')
  - `text`: Cor do texto (ex: 'white', 'slate')

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

