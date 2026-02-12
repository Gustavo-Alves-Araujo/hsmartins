-- Tabela para armazenar solicitações de financiamento
CREATE TABLE IF NOT EXISTS public."Hsmartins_Financiamentos" (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT NOT NULL,
    grau_instrucao TEXT NOT NULL,
    doc_rg_cpf TEXT,
    doc_certidao TEXT,
    doc_endereco TEXT,
    doc_ctps TEXT,
    doc_holerite TEXT,
    doc_ir TEXT,
    doc_fgts TEXT,
    status TEXT DEFAULT 'Pendente',
    data_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_financiamentos_status ON public."Hsmartins_Financiamentos"(status);
CREATE INDEX IF NOT EXISTS idx_financiamentos_data_envio ON public."Hsmartins_Financiamentos"(data_envio DESC);
CREATE INDEX IF NOT EXISTS idx_financiamentos_email ON public."Hsmartins_Financiamentos"(email);

-- Comentários
COMMENT ON TABLE public."Hsmartins_Financiamentos" IS 'Solicitações de financiamento enviadas pelo formulário';
COMMENT ON COLUMN public."Hsmartins_Financiamentos".status IS 'Status: Pendente, Em Análise, Aprovado, Recusado';

-- RLS (Row Level Security) - Permitir inserção pública
ALTER TABLE public."Hsmartins_Financiamentos" ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT público (anônimo)
CREATE POLICY "Allow public insert" ON public."Hsmartins_Financiamentos"
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Política para permitir SELECT público (anônimo) - NECESSÁRIO PARA O ADMIN
CREATE POLICY "Allow public select" ON public."Hsmartins_Financiamentos"
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Política para permitir UPDATE público (anônimo) - NECESSÁRIO PARA O ADMIN
CREATE POLICY "Allow public update" ON public."Hsmartins_Financiamentos"
    FOR UPDATE
    TO anon, authenticated
    USING (true);

-- Política para permitir DELETE público (anônimo) - NECESSÁRIO PARA O ADMIN
CREATE POLICY "Allow public delete" ON public."Hsmartins_Financiamentos"
    FOR DELETE
    TO anon, authenticated
    USING (true);
