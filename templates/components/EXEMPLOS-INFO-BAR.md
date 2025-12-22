# Exemplos de Uso do Info Bar - Componente Genérico

## 🍕 Restaurante / Padaria
```javascript
'info-bar': {
    items: [
        { icon: "fas fa-motorcycle", text: "Entrega Rápida em 30min" },
        { icon: "fas fa-map-marker-alt", text: "Rua Tibúrcio de Sousa, 1351" },
        { icon: "far fa-clock", text: "Seg-Sáb: 6h-20h | Dom: 6h-14h" }
    ],
    colors: {
        background: "brand-dark",
        text: "white",
        accent: "brand-gold"
    }
}
```

## 💻 Empresa de Software / SaaS
```javascript
'info-bar': {
    items: [
        { icon: "fas fa-code", text: "APIs RESTful & GraphQL" },
        { icon: "fas fa-cloud", text: "Cloud Native Architecture" },
        { icon: "fas fa-headset", text: "Suporte 24/7" }
    ],
    colors: {
        background: "blue-900",
        text: "white",
        accent: "cyan-400"
    }
}
```

## 🛒 E-commerce / Loja Online
```javascript
'info-bar': {
    items: [
        { icon: "fas fa-shipping-fast", text: "Frete Grátis acima de R$99" },
        { icon: "fas fa-undo-alt", text: "Troca Grátis em 30 dias" },
        { icon: "fas fa-credit-card", text: "Parcele em até 12x" }
    ],
    colors: {
        background: "purple-800",
        text: "white",
        accent: "yellow-400"
    }
}
```

## 🏥 Clínica / Consultório
```javascript
'info-bar': {
    items: [
        { icon: "fas fa-calendar-check", text: "Agendamento Online" },
        { icon: "fas fa-hospital-user", text: "Atendemos Todos os Convênios" },
        { icon: "fas fa-user-md", text: "Equipe Especializada" }
    ],
    colors: {
        background: "green-800",
        text: "white",
        accent: "green-300"
    }
}
```

## 🏋️ Academia / Fitness
```javascript
'info-bar': {
    items: [
        { icon: "fas fa-dumbbell", text: "Equipamentos Modernos" },
        { icon: "fas fa-users", text: "Aulas em Grupo" },
        { icon: "fas fa-clock", text: "Aberto 24 horas" }
    ],
    colors: {
        background: "red-900",
        text: "white",
        accent: "orange-400"
    }
}
```

## 🏨 Hotel / Hospedagem
```javascript
'info-bar': {
    items: [
        { icon: "fas fa-wifi", text: "Wi-Fi Grátis" },
        { icon: "fas fa-swimming-pool", text: "Piscina Aquecida" },
        { icon: "fas fa-concierge-bell", text: "Room Service 24h" }
    ],
    colors: {
        background: "indigo-900",
        text: "white",
        accent: "amber-400"
    }
}
```

## 🎓 Escola / Curso Online
```javascript
'info-bar': {
    items: [
        { icon: "fas fa-graduation-cap", text: "Certificado Reconhecido" },
        { icon: "fas fa-video", text: "Aulas ao Vivo" },
        { icon: "fas fa-infinity", text: "Acesso Vitalício" }
    ],
    colors: {
        background: "slate-800",
        text: "white",
        accent: "blue-400"
    }
}
```

---

## 🎯 Vantagens de Componentes Genéricos

### ✅ Mesma base de código
Todos esses exemplos usam o **MESMO** arquivo `info-bar.js`

### ✅ Fácil manutenção
Uma correção ou melhoria afeta todos os sites automaticamente

### ✅ Consistência visual
O design permanece consistente, apenas muda o conteúdo e cores

### ✅ Rapidez no desenvolvimento
Criar um novo site é só ajustar o `config.js`

### ✅ Escalabilidade
Adicione quantos itens quiser no array `items`

---

## 💡 Dica Pro

Quer adicionar mais de 3 itens? Sem problema!

```javascript
'info-bar': {
    items: [
        { icon: "fas fa-check", text: "Item 1" },
        { icon: "fas fa-check", text: "Item 2" },
        { icon: "fas fa-check", text: "Item 3" },
        { icon: "fas fa-check", text: "Item 4" },
        { icon: "fas fa-check", text: "Item 5" }
    ]
}
```

O componente automaticamente ajusta o layout! 🎉

