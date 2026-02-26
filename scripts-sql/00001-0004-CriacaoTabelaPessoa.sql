-- ===================================================================================
-- Script:     0001-0004-CriacaoTabelaPessoa.sql
-- Card:       Issue 004 - Criação da camada de serviços e repositories
-- Objetivo:   Cria��o da tabela Pessoa com todos os campos exigidos
-- Autor:      [André Alecsander Araújo Lopes]
-- Data:       [26/02/2026]
-- ===================================================================================

BEGIN TRANSACTION;

BEGIN TRY
    
    COMMIT TRANSACTION;
    PRINT '';
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    PRINT 'Erro ao criar tabela: ' + ERROR_MESSAGE();
    THROW;
END CATCH;