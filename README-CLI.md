# 🚀 Cosmos LP Generator - CLI com IA

CLI para gerar templates de landing pages automaticamente usando inteligência artificial.

## 📋 Pré-requisitos

1. **Node.js** (versão 18 ou superior)
2. **Chave API da OpenAI** (obtenha em https://platform.openai.com/api-keys)

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure sua chave API da OpenAI:

**Linux/Mac:**
```bash
export OPENAI_API_KEY="sua-chave-aqui"
```

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="sua-chave-aqui"
```

**Windows (CMD):**
```cmd
set OPENAI_API_KEY=sua-chave-aqui
```

Para tornar permanente, adicione ao seu `~/.bashrc`, `~/.zshrc` ou variáveis de ambiente do sistema.

## 🎯 Como Usar

Execute o gerador:

```bash
npm run generate
```

Ou diretamente:

```bash
node generate-template.js
```

O programa irá solicitar que você descreva seu negócio. Exemplos:

```
Personal trainer em São Paulo, telefone 11 98765-4321, especializado em treino funcional e emagrecimento
```

```
Clínica odontológica Dr. João Silva, localizada em Belo Horizonte, cor azul, telefone 31 98765-4321
```

```
Restaurante Sabor & Arte, delivery, cor laranja, telefone 11 3333-4444
```

```
E-commerce de produtos fitness, loja FitShop, cor preta, várias marcas
```

## 📝 Formato do Input

Descreva de forma natural:
- **Profissão/Nicho**: O que você faz? (ex: personal trainer, dentista, restaurante)
- **Nome do Negócio**: Nome da empresa/pessoa
- **Localização**: Cidade, estado (se relevante)
- **Contato**: Telefone, WhatsApp (se disponível)
- **Características**: Cores preferidas, diferenciais, especialidades

A IA irá:
1. Identificar o nicho automaticamente
2. Selecionar componentes apropriados
3. Gerar configuração completa com tema, cores e conteúdo
4. Criar arquivos `config.js` e `index.html`

## 📁 Estrutura Gerada

Após a geração, será criada uma pasta em `templates/[nome-do-template]/`:

```
templates/
  └── [nome-do-template]/
      ├── config.js      # Configuração completa do template
      └── index.html     # HTML base do template
```

## 🧪 Testando o Template

Para testar o template gerado:

1. Entre na pasta do template:
```bash
cd templates/[nome-do-template]
```

2. Inicie um servidor HTTP local:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Node.js (com http-server):**
```bash
npx http-server -p 8000
```

3. Acesse no navegador:
```
http://localhost:8000
```

## ⚙️ Configuração

### Variáveis de Ambiente

- `OPENAI_API_KEY`: (obrigatório) Sua chave API da OpenAI

### Modelo de IA

Por padrão, o sistema usa `gpt-4o-mini` (rápido e econômico). Para alterar, edite o arquivo `generate-template.js`:

```javascript
model: 'gpt-4o-mini',  // Altere para 'gpt-4' para melhor qualidade (mais caro)
```

## 📊 O que a IA Gera

A IA gera automaticamente:

- ✅ **Tema completo** com cores e fontes apropriadas
- ✅ **8-10+ componentes** selecionados inteligentemente
- ✅ **Conteúdo** em português brasileiro
- ✅ **Configurações** de contato, redes sociais, serviços
- ✅ **Layouts** otimizados para o nicho
- ✅ **Cores** harmoniosas baseadas no nicho ou preferências

## 🔍 Exemplos de Nichos Suportados

- 🏋️ Personal Trainer / Fitness
- 🦷 Odontologia / Clínicas
- 🍕 Restaurantes / Delivery
- 🛒 E-commerce / Lojas
- 💼 SaaS / Software
- 🏢 Empresarial / Corporativo
- 🐾 Veterinária
- E muito mais!

## ⚠️ Notas Importantes

1. **Custos da API**: Cada geração consome tokens da OpenAI. O `gpt-4o-mini` é econômico (~$0.15 por template).

2. **Qualidade**: O template gerado é um ponto de partida. Você pode editar `config.js` manualmente para ajustar.

3. **Pasta Existente**: Se a pasta já existir, o sistema perguntará se deseja sobrescrever.

4. **Validação**: Sempre teste o template gerado antes de usar em produção.

## 🐛 Troubleshooting

### Erro: "OPENAI_API_KEY não encontrada"
Configure a variável de ambiente conforme instruções acima.

### Erro: "Chave API inválida"
Verifique se a chave está correta e tem créditos disponíveis.

### Template não renderiza corretamente
- Verifique se está usando um servidor HTTP (não `file://`)
- Verifique o console do navegador para erros
- Certifique-se que os caminhos dos componentes estão corretos

## 📚 Documentação Adicional

- [Como Criar Componentes](./templates/components/docs/COMO-CRIAR-COMPONENTE.md)
- [Componentes Disponíveis](./templates/components/docs/COMPONENTES-DISPONIVEIS.md)
- [Guia de Contraste de Cores](./templates/components/docs/GUIA-CONTRASTE-CORES.md)

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas!

---

**Desenvolvido com ❤️ usando OpenAI GPT-4**

