-- ===================================================================================
-- Script:     00002-0004-CriacaoTabelaCategoria.sql
-- Card:       Issue 004 - Criação da camada de serviços e repositories
-- Objetivo:   Criacao da tabela Categoria com todos os campos exigidos
-- Autor:      [André Alecsander Araújo Lopes]
-- Data:       [26/02/2026]
-- ===================================================================================

BEGIN TRANSACTION;

BEGIN TRY
    
       CREATE TABLE Categoria (
            Id  UNIQUEIDENTIFIER NOT NULL,
            Nome NVARCHAR(100) NOT NULL,
            Descricao NVARCHAR(400) NULL,
            Finalidade INT NOT NULL,
            DataCriacao DATETIME2 NOT NULL,
            DataModificacao DATETIME2 NOT NULL

            CONSTRAINT PK_Categoria PRIMARY KEY (Id)
        );


    COMMIT TRANSACTION;
    PRINT 'Tabela Categoria criada com sucesso.';
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Erro ao criar tabela: ' + ERROR_MESSAGE();
    THROW;
END CATCH;