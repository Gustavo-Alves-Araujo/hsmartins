#!/usr/bin/env python3
"""
Script de Migração XML → Supabase (PostgreSQL)
Converte o arquivo XML do sistema antigo para INSERT statements SQL

Uso:
    python3 xml_to_sql.py h26_www.hsmartins.com.br.xml > imoveis_dump.sql
"""

import xml.etree.ElementTree as ET
import json
import sys
from datetime import datetime
import re

def clean_cdata(text):
    """Remove CDATA e limpa texto"""
    if not text:
        return None
    text = str(text).strip()
    if not text or text == '':
        return None
    return text

def format_price(valor):
    """Formata valor numérico para formato brasileiro"""
    if not valor:
        return None
    try:
        valor_num = float(valor)
        return f"R$ {valor_num:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
    except:
        return None

def parse_boolean(text):
    """Converte Sim/Não para boolean"""
    if not text:
        return False
    return text.lower() in ['sim', 'yes', 'true', '1']

def parse_date(date_str):
    """Converte string de data para formato PostgreSQL"""
    if not date_str:
        return None
    try:
        # Tenta vários formatos
        for fmt in ['%Y-%m-%d', '%d/%m/%Y', '%Y-%m-%d %H:%M:%S']:
            try:
                dt = datetime.strptime(date_str, fmt)
                return dt.strftime('%Y-%m-%d')
            except:
                continue
        return None
    except:
        return None

def escape_sql(text):
    """Escapa strings para SQL"""
    if text is None:
        return 'NULL'
    if isinstance(text, bool):
        return 'TRUE' if text else 'FALSE'
    if isinstance(text, (int, float)):
        return str(text)
    # Escapa aspas simples
    text = str(text).replace("'", "''")
    return f"'{text}'"

def extract_fotos(imovel):
    """Extrai URLs das fotos"""
    fotos_element = imovel.find('fotos')
    if fotos_element is None:
        return []
    
    fotos = []
    for foto in fotos_element.findall('foto'):
        url_element = foto.find('foto_url')
        if url_element is not None and url_element.text:
            url = clean_cdata(url_element.text)
            if url:
                fotos.append(url)
    
    return fotos

def extract_caracteristicas(imovel):
    """Extrai características do imóvel"""
    carac_element = imovel.find('caracteristicas')
    if carac_element is None:
        return []
    
    caracteristicas = []
    for carac in carac_element.findall('caracteristica'):
        if carac.text:
            text = clean_cdata(carac.text)
            if text:
                # Remove aspas extras
                text = text.replace("'", "").strip()
                if text:
                    caracteristicas.append(text)
    
    return caracteristicas

def determine_category(imovel):
    """Determina categoria baseada no tipo e localização"""
    tipo = clean_cdata(imovel.findtext('tipoimovel', ''))
    bairro = clean_cdata(imovel.findtext('endereco_bairro', ''))
    empreendimento = clean_cdata(imovel.findtext('empreendimento_nome', ''))
    
    if empreendimento:
        return empreendimento
    if tipo:
        return tipo
    return 'Imóvel'

def determine_badge(imovel):
    """Determina se deve ter badge baseado no status"""
    destacado = parse_boolean(clean_cdata(imovel.findtext('destacado', '')))
    status = clean_cdata(imovel.findtext('imovel_status', ''))
    
    if destacado:
        return ('Destaque', 'new')
    if status == 'Inativo':
        return ('Vendido', 'discount')
    
    return (None, None)

def parse_imovel(imovel):
    """Parseia um elemento <imovel> e retorna dicionário"""
    data = {}
    
    # IDs e Referência
    data['old_id'] = clean_cdata(imovel.findtext('id'))
    data['ref'] = clean_cdata(imovel.findtext('ref'))
    
    # Informações Básicas
    data['title'] = clean_cdata(imovel.findtext('titulo'))
    data['tipoimovel'] = clean_cdata(imovel.findtext('tipoimovel'))
    data['subtipoimovel'] = clean_cdata(imovel.findtext('subtipoimovel'))
    data['transacao'] = clean_cdata(imovel.findtext('transacao'))
    data['category'] = determine_category(imovel)
    
    # Valores
    valor_text = clean_cdata(imovel.findtext('valor'))
    if valor_text:
        try:
            data['valor'] = float(valor_text)
            data['price_current'] = format_price(valor_text)
        except:
            data['valor'] = None
            data['price_current'] = None
    else:
        data['valor'] = None
        data['price_current'] = 'Consulte'
    
    # Valores de condomínio e IPTU - Remove separadores de milhar
    valor_condominio = clean_cdata(imovel.findtext('valor_condominio'))
    if valor_condominio:
        valor_condominio = valor_condominio.replace('.', '').replace(',', '.')
        data['valor_condominio'] = valor_condominio
    else:
        data['valor_condominio'] = None
    
    valor_iptu = clean_cdata(imovel.findtext('valor_iptu'))
    if valor_iptu:
        valor_iptu = valor_iptu.replace('.', '').replace(',', '.')
        data['valor_iptu'] = valor_iptu
    else:
        data['valor_iptu'] = None
    
    # Áreas - Remove pontos de separador de milhar e substitui vírgula por ponto
    area_construida = clean_cdata(imovel.findtext('area_construida'))
    if area_construida:
        # Remove pontos (separador de milhar) e substitui vírgula por ponto decimal
        area_construida = area_construida.replace('.', '').replace(',', '.')
        data['area_construida'] = area_construida
    else:
        data['area_construida'] = None
    
    area_terreno = clean_cdata(imovel.findtext('area_terreno'))
    if area_terreno:
        # Remove pontos (separador de milhar) e substitui vírgula por ponto decimal
        area_terreno = area_terreno.replace('.', '').replace(',', '.')
        data['area_terreno'] = area_terreno
    else:
        data['area_terreno'] = None
    
    area_privativa = clean_cdata(imovel.findtext('area_privativa'))
    if area_privativa:
        area_privativa = area_privativa.replace('.', '').replace(',', '.')
        data['area_privativa'] = area_privativa
    else:
        data['area_privativa'] = None
    
    area_total = clean_cdata(imovel.findtext('area_total'))
    if area_total:
        area_total = area_total.replace('.', '').replace(',', '.')
        data['area_total'] = area_total
    else:
        data['area_total'] = None
    
    # Características
    data['dormitorios'] = clean_cdata(imovel.findtext('dormitorios'))
    data['banheiro'] = clean_cdata(imovel.findtext('banheiro'))
    data['suites'] = clean_cdata(imovel.findtext('suites'))
    data['vagas'] = clean_cdata(imovel.findtext('vagas'))
    data['mobiliado'] = parse_boolean(clean_cdata(imovel.findtext('mobiliado')))
    data['em_condominio'] = parse_boolean(clean_cdata(imovel.findtext('em_condominio')))
    data['ano_construcao'] = clean_cdata(imovel.findtext('ano_construcao'))
    data['aceitafinanciamento'] = parse_boolean(clean_cdata(imovel.findtext('aceitafinanciamento')))
    
    # Endereço
    data['endereco_logradouro'] = clean_cdata(imovel.findtext('endereco_logradouro'))
    data['endereco_numero'] = clean_cdata(imovel.findtext('endereco_numero'))
    data['endereco_complemento'] = clean_cdata(imovel.findtext('endereco_complemento'))
    data['endereco_cep'] = clean_cdata(imovel.findtext('endereco_cep'))
    data['endereco_bairro'] = clean_cdata(imovel.findtext('endereco_bairro'))
    data['endereco_nome_condominio'] = clean_cdata(imovel.findtext('endereco_nome_condominio'))
    data['endereco_cidade'] = clean_cdata(imovel.findtext('endereco_cidade'))
    data['endereco_estado'] = clean_cdata(imovel.findtext('endereco_estado'))
    data['endereco_pais'] = clean_cdata(imovel.findtext('endereco_pais'))
    
    # Descrição
    data['descricao'] = clean_cdata(imovel.findtext('descricao'))
    
    # Empreendimento
    data['empreendimento_estagio'] = clean_cdata(imovel.findtext('empreendimento_estagio'))
    data['empreendimento_nome'] = clean_cdata(imovel.findtext('empreendimento_nome'))
    data['empreendimento_descricao'] = clean_cdata(imovel.findtext('empreendimento_descricao'))
    
    # Mídia
    data['video'] = clean_cdata(imovel.findtext('video'))
    fotos = extract_fotos(imovel)
    data['image_url'] = fotos[0] if fotos else None
    data['images_urls'] = json.dumps(fotos) if fotos else '[]'
    
    # Características
    caracteristicas = extract_caracteristicas(imovel)
    data['caracteristicas'] = json.dumps(caracteristicas, ensure_ascii=False)
    
    # Status
    data['destacado'] = parse_boolean(clean_cdata(imovel.findtext('destacado')))
    data['imovel_status'] = clean_cdata(imovel.findtext('imovel_status'))
    data['imovel_situacao'] = clean_cdata(imovel.findtext('imovel_situacao'))
    
    # Badge
    badge_text, badge_style = determine_badge(imovel)
    data['badge_text'] = badge_text
    data['badge_style'] = badge_style
    
    # Rating e parcelas (valores padrão)
    data['rating'] = '4.5'
    if data['aceitafinanciamento']:
        data['installments'] = 'Aceita financiamento'
    else:
        data['installments'] = None
    
    # Datas
    data['data_cadastro'] = parse_date(clean_cdata(imovel.findtext('data_cadastro')))
    data_atualizado = clean_cdata(imovel.findtext('data_atualizado'))
    if data_atualizado:
        # Remove horário se tiver
        data_atualizado = data_atualizado.split(' ')[0]
        data['data_atualizado'] = parse_date(data_atualizado)
    else:
        data['data_atualizado'] = None
    
    return data

def generate_insert(data):
    """Gera comando INSERT para o imóvel"""
    columns = [
        'old_id', 'ref', 'title', 'tipoimovel', 'subtipoimovel', 'transacao',
        'category', 'valor', 'price_current', 'price_original', 'valor_condominio',
        'valor_iptu', 'area_construida', 'area_terreno', 'dormitorios', 'banheiro',
        'suites', 'vagas', 'mobiliado', 'em_condominio', 'ano_construcao',
        'aceitafinanciamento', 'endereco_logradouro', 'endereco_numero',
        'endereco_complemento', 'endereco_cep', 'endereco_bairro',
        'endereco_nome_condominio', 'endereco_cidade', 'endereco_estado',
        'endereco_pais', 'descricao', 'empreendimento_estagio',
        'empreendimento_nome', 'empreendimento_descricao', 'video', 'image_url',
        'images_urls', 'caracteristicas', 'destacado', 'imovel_status',
        'imovel_situacao', 'badge_text', 'badge_style', 'rating', 'installments',
        'data_cadastro', 'data_atualizado'
    ]
    
    values = []
    for col in columns:
        val = data.get(col)
        values.append(escape_sql(val))
    
    cols_str = ', '.join(columns)
    vals_str = ', '.join(values)
    
    return f"INSERT INTO public.\"Hsmartins_Produtos\" ({cols_str})\nVALUES ({vals_str});\n"

def main():
    if len(sys.argv) < 2:
        print("Uso: python3 xml_to_sql.py arquivo.xml", file=sys.stderr)
        sys.exit(1)
    
    xml_file = sys.argv[1]
    
    print("-- ============================================")
    print("-- Migração de Imóveis - HS Martins")
    print(f"-- Gerado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("-- ============================================\n")
    print("-- ATENÇÃO: Execute o schema-completo.sql antes deste arquivo!\n")
    print("BEGIN;\n")
    
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    count = 0
    ativos = 0
    
    for imovel in root.findall('imovel'):
        try:
            data = parse_imovel(imovel)
            if data['title']:  # Só insere se tiver título
                print(generate_insert(data))
                count += 1
                if data['imovel_status'] != 'Inativo':
                    ativos += 1
        except Exception as e:
            old_id = imovel.findtext('id', 'unknown')
            print(f"-- ERRO no imóvel ID {old_id}: {str(e)}", file=sys.stderr)
            continue
    
    print("\nCOMMIT;\n")
    print(f"-- Total de imóveis inseridos: {count}")
    print(f"-- Imóveis ativos: {ativos}")
    print(f"-- Imóveis inativos: {count - ativos}")

if __name__ == '__main__':
    main()
