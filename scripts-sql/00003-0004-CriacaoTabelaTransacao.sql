-- ===================================================================================
-- Script:     00003-0004-CriacaoTabelaTransacao.sql
-- Card:       Issue 004 - Criação da camada de serviços e repositories
-- Objetivo:   Criacao da tabela Transacao com todos os campos exigidos
-- Autor:      [André Alecsander Araújo Lopes]
-- Data:       [26/02/2026]
-- ===================================================================================

BEGIN TRANSACTION;

BEGIN TRY
    
       CREATE TABLE Transacao (
            Id  UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
            Tipo INT NOT NULL,
            Descricao NVARCHAR(400) NULL,
            Receitas DECIMAL(18,2) NOT NULL,
            Despesas DECIMAL(18,2) NOT NULL,
            Saldo DECIMAL(18,2) NOT NULL,
            IdPessoa UNIQUEIDENTIFIER NOT NULL,
            IdCategoria UNIQUEIDENTIFIER NOT NULL
        );



    COMMIT TRANSACTION;
    PRINT 'Tabela Transacao criada com sucesso.';
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Erro ao criar tabela: ' + ERROR_MESSAGE();
    THROW;
END CATCH;