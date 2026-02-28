#!/usr/bin/env python3
"""Generate the complete sitemap.xml with all properties"""
import json, re, unicodedata, urllib.request

SUPABASE_URL = 'https://vkwczizdjhsejbpaapea.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrd2N6aXpkamhzZWpicGFhcGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDU0MzAsImV4cCI6MjA4MzQyMTQzMH0.qvWHxNAhefq253JaoVYG19izClKgLGc4ZkW5y8ladmM'

def slugify(text):
    text = unicodedata.normalize('NFD', text or '')
    text = re.sub(r'[\u0300-\u036f]', '', text)
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

# Fetch all properties
url = f'{SUPABASE_URL}/rest/v1/Hsmartins_Produtos?select=id,ref,tipoimovel,endereco_cidade,endereco_bairro,endereco_estado,imovel_status&order=ref'
req = urllib.request.Request(url, headers={
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}'
})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read())

active = [d for d in data if (d.get('imovel_status') or '').lower() != 'inativo']

sitemap = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

    <!-- Homepage -->
    <url>
        <loc>https://hsmartins.com.br/</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- Imóveis à Venda -->
    <url>
        <loc>https://hsmartins.com.br/imovel/venda</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>

    <!-- Sobre -->
    <url>
        <loc>https://hsmartins.com.br/sobre</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Correspondente Caixa -->
    <url>
        <loc>https://hsmartins.com.br/correspondente</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Notícias -->
    <url>
        <loc>https://hsmartins.com.br/noticias</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Contato -->
    <url>
        <loc>https://hsmartins.com.br/contato</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Depoimentos -->
    <url>
        <loc>https://hsmartins.com.br/pagina/depoimentos</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- Pré-cadastro Minha Casa Minha Vida -->
    <url>
        <loc>https://hsmartins.com.br/pagina/pre-cadastro-minha-casa-minha-vida</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>

    <!-- Aprovação de Renda -->
    <url>
        <loc>https://hsmartins.com.br/pagina/aprovacao-de-renda</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>

    <!-- Notícias - Artigos -->
    <url>
        <loc>https://hsmartins.com.br/noticias/novas-condicoes-de-financiamento-24331</loc>
        <lastmod>2023-07-05</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/sou-casado-posso-financiar-um-imovel-sozinho-23197</loc>
        <lastmod>2022-05-27</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/nao-consigo-pagar-o-financiamento-da-minha-casa-o-que-faco-23097</loc>
        <lastmod>2022-04-22</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/casa-propria-fgts-podera-ser-usado-para-quitar-ate-12-parcelas-de-financiamento-atrasado-23096</loc>
        <lastmod>2022-04-20</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/tenho-um-imovel-quitado-posso-financiar-outro-23066</loc>
        <lastmod>2022-04-12</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/dicas-para-comprar-um-imovel-antes-dos-30-23060</loc>
        <lastmod>2022-04-07</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/4-dicas-para-recemcasados-conquistarem-o-1o-imovel-23059</loc>
        <lastmod>2022-04-07</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/novo-conceito-de-moradia-e-aposta-para-reaquecer-o-mercado-imobiliario-23058</loc>
        <lastmod>2022-04-07</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/10-fatores-que-valorizam-o-imovel-23057</loc>
        <lastmod>2022-04-07</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/3-dicas-para-valorizar-seu-imovel-e-ter-sucesso-na-hora-da-venda-23056</loc>
        <lastmod>2022-04-07</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/credito-imobiliario-o-que-e-e-como-funciona-23055</loc>
        <lastmod>2022-02-03</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/como-organizar-seu-orcamento-para-comprar-o-imovel-dos-seus-sonhos-23054</loc>
        <lastmod>2022-02-02</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://hsmartins.com.br/noticias/casa-ou-apartamento-saiba-qual-e-o-melhor-lugar-para-comecar-uma-familia-23053</loc>
        <lastmod>2022-01-01</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>

    <!-- Imóveis Individuais (90 imóveis) -->
'''

for item in active:
    ref = item.get('ref', '')
    tipo = slugify(item.get('tipoimovel', ''))
    cidade = slugify(item.get('endereco_cidade', ''))
    estado = slugify(item.get('endereco_estado', '')) or 'sp'
    bairro = slugify(item.get('endereco_bairro', ''))
    slug = f'{tipo}-venda-{cidade}-{estado}-{bairro}'
    prop_url = f'https://hsmartins.com.br/imovel/{ref}/{slug}'
    sitemap += f'''    <url>
        <loc>{prop_url}</loc>
        <lastmod>2026-02-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
'''

sitemap += '''
</urlset>
'''

with open('/home/axolutions/projetos/cosmos-lp-generator/sitemap.xml', 'w') as f:
    f.write(sitemap)

total_urls = sitemap.count('<url>')
print(f'Sitemap gerado com {total_urls} URLs ({len(active)} imóveis + páginas estáticas + notícias)')
