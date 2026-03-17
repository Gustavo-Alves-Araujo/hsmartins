#!/usr/bin/env bash
# Gera os arquivos .min.js a partir dos .js fontes
# Execute após editar qualquer arquivo .js nesta pasta:
#   bash templates/components/build-min.sh
set -e
cd "$(dirname "$0")"

TERSER_OPTS='--compress "drop_console=true,pure_funcs=[console.log,console.warn,console.error,console.group,console.groupEnd,console.groupCollapsed],passes=2,drop_debugger=true" --mangle'

FILES=(
  base-component
  component-registry
  cosmos-template
  news-grid
  hero-overlay
  sticky-header-navigation
  product-grid-advanced
  faq-accordion
  footer-contact
  about-image-features
  benefits-grid
  card-grid
  cta-banner
  whatsapp-float-button
  contact-top-bar
  category-carousel
)

for name in "${FILES[@]}"; do
  src="${name}.js"
  out="${name}.min.js"
  if [[ -f "$src" ]]; then
    eval terser "$src" $TERSER_OPTS --output "$out" 2>/dev/null
    printf "✅ %-45s %6d → %6d bytes\n" "$src" "$(wc -c < "$src")" "$(wc -c < "$out")"
  fi
done

echo ""
echo "✅ Minificação concluída. Arquivos .min.js prontos para produção."
