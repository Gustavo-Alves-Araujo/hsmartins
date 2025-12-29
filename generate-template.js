#!/usr/bin/env node

import readline from 'readline';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cores para o terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// Interface readline para input do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

// Lê o guia de template generation
async function loadTemplateGuide() {
  try {
    const guidePath = path.join(__dirname, 'templates', 'components', 'catalog', 'GERADOR-TEMPLATES-IA.md');
    const guideContent = await fs.readFile(guidePath, 'utf-8');
    return guideContent;
  } catch (error) {
    log.warn('Não foi possível carregar o guia de templates, usando instruções básicas');
    return '';
  }
}

// Lê o catálogo de componentes
async function loadComponentsCatalog() {
  try {
    const catalogPath = path.join(__dirname, 'templates', 'components', 'catalog', 'components-catalog.json');
    const catalogContent = await fs.readFile(catalogPath, 'utf-8');
    return JSON.parse(catalogContent);
  } catch (error) {
    log.error('Erro ao carregar catálogo de componentes');
    throw error;
  }
}

// Lê exemplo de config para referência
async function loadExampleConfig() {
  try {
    const examplePath = path.join(__dirname, 'templates', 'personal-trainer', 'config.js');
    const exampleContent = await fs.readFile(examplePath, 'utf-8');
    return exampleContent;
  } catch (error) {
    log.warn('Não foi possível carregar exemplo de config');
    return '';
  }
}

// Gera config.js usando OpenAI
async function generateConfigWithAI(userPrompt, apiKey) {
  log.info('Gerando configuração com IA...');

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const templateGuide = await loadTemplateGuide();
  const componentsCatalog = await loadComponentsCatalog();
  const exampleConfig = await loadExampleConfig();

  const systemPrompt = `Você é uma IA especializada em gerar templates completos para o sistema Cosmos LP Generator.

${templateGuide}

Você deve gerar APENAS o conteúdo JavaScript do objeto config, sem comentários explicativos, sem markdown, sem código blocks. Apenas o código JavaScript válido que pode ser executado diretamente.

IMPORTANTE:
- Gerar um objeto config completo e válido
- Incluir theme com colors e fonts
- Incluir site com title e name
- Incluir NO MÍNIMO 8-10 componentes diferentes
- Todos os componentes devem ter todas as requiredProps preenchidas
- Use informações do prompt do usuário quando disponíveis
- Complete com valores padrão apropriados quando necessário
- Todos os textos em português brasileiro
- Garanta contraste adequado em todos os componentes
- Use Font Awesome para ícones (fas fa-* ou fab fa-*)
- URLs devem ser completas (https://)
- Telefones no formato brasileiro: (XX) XXXXX-XXXX
- WhatsApp numbers no formato internacional: 55XXXXXXXXXXX

O objeto config deve começar com: const config = {
E terminar com: };

window.config = config;`;

  const userMessage = `Gere um config.js completo para: "${userPrompt}"

Use o catálogo de componentes para referência:
${JSON.stringify(componentsCatalog.nicheTemplates, null, 2)}

${exampleConfig ? `Exemplo de estrutura:\n${exampleConfig.substring(0, 500)}...` : ''}

Gere APENAS o código JavaScript do objeto config, sem markdown, sem código blocks, sem explicações. Apenas o código válido.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 8000,
    });

    let configCode = completion.choices[0].message.content.trim();

    // Remove markdown code blocks se existirem
    configCode = configCode.replace(/^```javascript\n?/g, '').replace(/^```js\n?/g, '').replace(/^```\n?/g, '').replace(/```$/g, '').trim();

    // Garante que começa com const config = {
    if (!configCode.startsWith('const config')) {
      log.warn('O código gerado não começa corretamente, tentando corrigir...');
    }

    // Garante que termina com window.config = config;
    if (!configCode.includes('window.config = config;')) {
      if (configCode.endsWith('};')) {
        configCode += '\n\nwindow.config = config;';
      } else if (configCode.endsWith('}')) {
        configCode += ';\n\nwindow.config = config;';
      }
    }

    return configCode;
  } catch (error) {
    if (error.status === 401) {
      throw new Error('Chave API inválida. Verifique sua OPENAI_API_KEY.');
    } else if (error.status === 429) {
      throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
    } else {
      throw new Error(`Erro ao gerar configuração: ${error.message}`);
    }
  }
}

// Gera o HTML padrão
function generateHTML() {
  return `<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="config.js"></script>

  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script src="/templates/components/component-registry.js"></script>

  <script src="/templates/components/cosmos-template.js"></script>
</head>

<body class="antialiased">
  <!-- Componentes serão montados automaticamente aqui -->
</body>

</html>`;
}

// Cria nome de pasta baseado no prompt
function generateFolderName(userPrompt) {
  // Tenta extrair nome do negócio ou usa uma versão sanitizada do prompt
  const lower = userPrompt.toLowerCase();

  // Mapeia alguns padrões comuns
  if (lower.includes('dentista') || lower.includes('odontolog')) {
    return 'clinica-dentista';
  } else if (lower.includes('restaurante') || lower.includes('comida')) {
    return 'restaurante';
  } else if (lower.includes('personal trainer') || lower.includes('fitness')) {
    return 'personal-trainer';
  } else if (lower.includes('ecommerce') || lower.includes('loja')) {
    return 'ecommerce';
  } else if (lower.includes('saas') || lower.includes('software')) {
    return 'saas';
  } else if (lower.includes('veterinari') || lower.includes('vet')) {
    return 'clinica-veterinaria';
  }

  // Gera um nome genérico baseado no prompt
  const sanitized = userPrompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);

  return sanitized || 'novo-template';
}

// Função principal
async function main() {
  log.title('🚀 Cosmos LP Generator - Gerador de Templates com IA');

  // Verifica API Key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    log.error('OPENAI_API_KEY não encontrada!');
    log.info('Por favor, defina a variável de ambiente:');
    log.info('  export OPENAI_API_KEY="sua-chave-aqui"');
    log.info('\nOu no Windows:');
    log.info('  set OPENAI_API_KEY=sua-chave-aqui');
    process.exit(1);
  }

  try {
    // Solicita input do usuário
    log.info('Descreva seu negócio: profissão, nicho, diferencial, etc.');
    log.info('Exemplo: "Personal trainer em São Paulo, telefone 11 98765-4321, especializado em treino funcional"');

    const userPrompt = await question('\n> ');

    if (!userPrompt.trim()) {
      log.error('Prompt não pode estar vazio!');
      rl.close();
      process.exit(1);
    }

    log.info(`\nAnalisando: "${userPrompt}"`);

    // Gera o nome da pasta
    const folderName = generateFolderName(userPrompt);
    const templatePath = path.join(__dirname, 'templates', folderName);

    // Verifica se a pasta já existe
    try {
      await fs.access(templatePath);
      log.warn(`Pasta "${folderName}" já existe!`);
      const overwrite = await question('Deseja sobrescrever? (s/N): ');
      if (overwrite.toLowerCase() !== 's') {
        log.info('Operação cancelada.');
        rl.close();
        process.exit(0);
      }
    } catch {
      // Pasta não existe, tudo bem
    }

    // Cria a pasta
    await fs.mkdir(templatePath, { recursive: true });
    log.success(`Pasta criada: templates/${folderName}/`);

    // Gera config.js
    log.info('Gerando config.js...');
    const configCode = await generateConfigWithAI(userPrompt, apiKey);

    const configPath = path.join(templatePath, 'config.js');
    await fs.writeFile(configPath, configCode, 'utf-8');
    log.success(`config.js criado!`);

    // Gera index.html
    log.info('Gerando index.html...');
    const htmlContent = generateHTML();
    const htmlPath = path.join(templatePath, 'index.html');
    await fs.writeFile(htmlPath, htmlContent, 'utf-8');
    log.success(`index.html criado!`);

    log.title('✅ Template gerado com sucesso!');
    log.info(`📁 Localização: templates/${folderName}/`);
    log.info(`\nPara testar, abra o arquivo index.html em um servidor web.`);
    log.info(`Exemplo com Python: cd templates/${folderName} && python3 -m http.server 8000`);

  } catch (error) {
    log.error(`Erro: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Executa
main();

