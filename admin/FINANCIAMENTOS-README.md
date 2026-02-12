# Configuração do Sistema de Financiamentos

## 1. Criar a Tabela no Supabase

Execute o SQL em `financiamentos-schema.sql` no SQL Editor do Supabase:

```bash
Supabase Dashboard > SQL Editor > New Query
```

Cole o conteúdo do arquivo `financiamentos-schema.sql` e execute.

## 2. Configurar o Storage (Bucket)

1. Acesse: **Supabase Dashboard > Storage**
2. Clique em **New bucket**
3. Configure:
   - **Name**: `financiamento-docs`
   - **Public**: ✅ Marque como público
   - **File size limit**: 10 MB
   - **Allowed MIME types**: `application/pdf`

4. Clique em **Create bucket**

## 3. Configurar Políticas do Storage

Vá em **Storage > financiamento-docs > Policies** e crie:

### Política 1: Allow public upload
```sql
CREATE POLICY "Allow public upload" ON storage.objects
FOR INSERT TO anon
WITH CHECK (bucket_id = 'financiamento-docs');
```

### Política 2: Allow public read
```sql
CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT TO anon
USING (bucket_id = 'financiamento-docs');
```

### Política 3: Allow authenticated delete
```sql
CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'financiamento-docs');
```

## 4. Estrutura da Tabela

A tabela `Hsmartins_Financiamentos` armazena:

- **Informações do Cliente**: nome, telefone, email, grau de instrução
- **URLs dos Documentos**: Links públicos dos PDFs no Storage
- **Status**: Pendente, Em Análise, Aprovado, Recusado
- **Metadados**: data_envio, observações, timestamps

## 5. Fluxo de Uso

### Cliente (financiamento.html):
1. Preenche formulário
2. Faz upload dos PDFs
3. Sistema salva PDFs no Storage
4. Sistema grava registro na tabela com URLs dos PDFs
5. Mostra confirmação de envio

### Admin (admin/index.html):
1. Acessa aba "Financiamentos"
2. Visualiza cards com todas as solicitações
3. Pode baixar cada PDF clicando nos links
4. Altera status conforme análise
5. Pode excluir solicitações

## 6. URLs de Acesso

- **Formulário**: `https://seusite.com/financiamento.html`
- **Admin**: `https://seusite.com/admin/index.html`

## 7. Segurança

✅ **Implementado**:
- RLS habilitado na tabela
- Apenas usuários anônimos podem INSERIR
- Apenas usuários autenticados podem LER/ATUALIZAR
- Storage público apenas para leitura
- Upload limitado a 10MB por arquivo
- Apenas arquivos PDF permitidos

## 8. Validações

O formulário valida:
- Campos obrigatórios preenchidos
- Formato de e-mail
- Telefone
- Todos os PDFs obrigatórios enviados
- Tamanho dos arquivos

## 9. Observações Importantes

⚠️ **IMPORTANTE**: 
- O bucket `financiamento-docs` DEVE ser criado ANTES de usar o formulário
- Certifique-se de que as políticas de Storage estão corretas
- A tabela deve ser criada com o schema fornecido
- A senha do admin permanece `123123`

## 10. Troubleshooting

**Erro ao fazer upload**:
- Verifique se o bucket existe
- Verifique as políticas de Storage
- Confirme que o arquivo é PDF e menor que 10MB

**Erro ao salvar no banco**:
- Verifique se a tabela foi criada
- Confirme que o RLS está configurado
- Veja os logs do navegador (F12 > Console)

**Solicitações não aparecem no admin**:
- Confirme que está logado no admin
- Verifique se está na aba "Financiamentos"
- Recarregue a página

## 11. Manutenção

**Limpeza de arquivos antigos**:
```sql
-- Deletar registros com mais de 1 ano
DELETE FROM "Hsmartins_Financiamentos" 
WHERE data_envio < NOW() - INTERVAL '1 year';
```

**Consultar estatísticas**:
```sql
-- Total de solicitações por status
SELECT status, COUNT(*) as total
FROM "Hsmartins_Financiamentos"
GROUP BY status;
```
