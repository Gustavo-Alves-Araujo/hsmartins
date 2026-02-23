-- Migration: Adicionar campos da segunda pessoa no financiamento
-- Tabela: Hsmartins_Financiamentos
-- Data: 2025

-- Dados pessoais da segunda pessoa
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS nome_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS telefone_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS email_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS grau_instrucao_2 TEXT;

-- Documentos da segunda pessoa
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS doc_rg_cpf_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS doc_certidao_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS doc_endereco_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS doc_ctps_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS doc_holerite_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS doc_ir_2 TEXT;
ALTER TABLE "Hsmartins_Financiamentos" ADD COLUMN IF NOT EXISTS doc_fgts_2 TEXT;
