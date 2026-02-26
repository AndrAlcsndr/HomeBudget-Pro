-- ===================================================================================
-- Script:     0001-0004-CriacaoTabelaPessoa.sql
-- Card:       Issue 004 - Criação da camada de serviços e repositories
-- Objetivo:   Cria��o da tabela Pessoa com todos os campos exigidos
-- Autor:      [André Alecsander Araújo Lopes]
-- Data:       [26/02/2026]
-- ===================================================================================

BEGIN TRANSACTION;

BEGIN TRY
    
     CREATE TABLE Pessoa (
        Id              UNIQUEIDENTIFIER        NOT NULL,
        Nome            varchar(200)     NOT NULL,
        Cpf             CHAR(12)          NOT NULL,
        Status          int        NOT NULL,
        Idade           int      NOT NULL,
        DataCriacao     DATE              NOT NULL,
        DataModificacao DATE              NOT NULL,
        
        CONSTRAINT PK_Pessoa PRIMARY KEY (Id)
        );

    COMMIT TRANSACTION;
    
    PRINT 'Tabela Pessoa criada com sucesso.';
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Erro ao criar tabela: ' + ERROR_MESSAGE();
    THROW;
END CATCH;