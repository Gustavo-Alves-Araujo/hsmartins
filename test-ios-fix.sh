#!/bin/bash

# Script de teste para validar as correções iOS
# Autor: GitHub Copilot
# Data: 2026-02-11

echo "🧪 Teste de Compatibilidade iOS - H.S Martins"
echo "=============================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verifica se os arquivos existem
echo "📁 Verificando arquivos..."

files=(
    "templates/components/ios-compatibility.js"
    "templates/components/image-optimizer.js"
    "templates/components/sticky-header-navigation.js"
    "templates/components/product-grid-advanced.js"
    "index.html"
)

all_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file - NÃO ENCONTRADO"
        all_exist=false
    fi
done

echo ""

if [ "$all_exist" = false ]; then
    echo -e "${RED}❌ Alguns arquivos estão faltando!${NC}"
    exit 1
fi

# Verifica se ios-compatibility.js está no index.html
echo "🔍 Verificando integração no index.html..."
if grep -q "ios-compatibility.js" index.html; then
    echo -e "${GREEN}✅${NC} ios-compatibility.js está carregando"
else
    echo -e "${RED}❌${NC} ios-compatibility.js NÃO está no index.html"
    exit 1
fi

# Verifica ordem de carregamento
echo "📋 Verificando ordem de carregamento..."
if grep -B5 "config.js" index.html | grep -q "ios-compatibility.js"; then
    echo -e "${GREEN}✅${NC} ios-compatibility.js carrega ANTES de config.js (correto)"
else
    echo -e "${YELLOW}⚠️${NC} Verificar ordem de carregamento"
fi

echo ""

# Verifica sintaxe JavaScript
echo "🔧 Verificando sintaxe JavaScript..."

if command -v node &> /dev/null; then
    for file in "${files[@]}"; do
        if [[ $file == *.js ]]; then
            if node -c "$file" 2>/dev/null; then
                echo -e "${GREEN}✅${NC} $file - sintaxe OK"
            else
                echo -e "${RED}❌${NC} $file - erro de sintaxe"
            fi
        fi
    done
else
    echo -e "${YELLOW}⚠️${NC} Node.js não instalado - pulando verificação de sintaxe"
fi

echo ""

# Verifica palavras-chave importantes nos arquivos
echo "🔎 Verificando implementações..."

if grep -q "isIOS" templates/components/ios-compatibility.js; then
    echo -e "${GREEN}✅${NC} Detecção de iOS implementada"
else
    echo -e "${RED}❌${NC} Detecção de iOS ausente"
fi

if grep -q "try {" templates/components/image-optimizer.js; then
    echo -e "${GREEN}✅${NC} Try-catch implementado em image-optimizer.js"
else
    echo -e "${RED}❌${NC} Try-catch ausente em image-optimizer.js"
fi

if grep -q "passive: true" templates/components/sticky-header-navigation.js; then
    echo -e "${GREEN}✅${NC} Eventos passivos em sticky-header-navigation.js"
else
    echo -e "${RED}❌${NC} Eventos passivos ausentes"
fi

if grep -q "threshold:" templates/components/product-grid-advanced.js; then
    echo -e "${GREEN}✅${NC} Threshold configurado em product-grid-advanced.js"
else
    echo -e "${YELLOW}⚠️${NC} Threshold pode estar ausente"
fi

echo ""
echo "════════════════════════════════════════════"

# Resumo
echo -e "${GREEN}✅ Verificação completa!${NC}"
echo ""
echo "📱 Próximos passos para teste no iPhone:"
echo "   1. Fazer upload dos arquivos para o servidor"
echo "   2. Abrir Safari no iPhone"
echo "   3. Acessar: https://hsmartins.siteonline.tech/index.html"
echo "   4. Testar scroll e navegação"
echo ""
echo "🔍 Para debug remoto no iPhone:"
echo "   1. Settings > Safari > Advanced > Web Inspector = ON"
echo "   2. Conectar iPhone ao Mac via USB"
echo "   3. Safari Mac > Develop > [iPhone] > [Site]"
echo ""
echo "💡 Para console no próprio iPhone:"
echo "   Adicionar no index.html (temporário):"
echo "   <script src=\"https://cdn.jsdelivr.net/npm/eruda\"></script>"
echo "   <script>eruda.init();</script>"
echo ""

# Inicia servidor local se Python estiver disponível
if command -v python3 &> /dev/null; then
    echo "🌐 Quer iniciar servidor local? (s/n)"
    read -r response
    if [[ "$response" =~ ^[Ss]$ ]]; then
        echo ""
        echo "🚀 Iniciando servidor em http://localhost:8000"
        echo "   Acesse no iPhone via: http://SEU_IP_LOCAL:8000/index.html"
        echo ""
        echo "   Para descobrir seu IP:"
        echo "   - Linux/Mac: ifconfig | grep inet"
        echo "   - Windows: ipconfig"
        echo ""
        echo "   Pressione Ctrl+C para parar"
        echo ""
        python3 -m http.server 8000
    fi
else
    echo -e "${YELLOW}ℹ️${NC} Python3 não instalado - servidor local não disponível"
fi
