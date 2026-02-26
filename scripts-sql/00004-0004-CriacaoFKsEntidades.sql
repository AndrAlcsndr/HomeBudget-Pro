-- ===================================================================================
-- Script:     00004-0004-CriacaoFKsEntidades.sql
-- Card:       Issue 004 - Criação da camada de serviços e repositories
-- Objetivo:   Criacao das Foreign Keys das entidades
-- Autor:      [André Alecsander Araújo Lopes]
-- Data:       [26/02/2026]
-- ===================================================================================

BEGIN TRY

    -- FK Transacao -> Pessoa
    IF NOT EXISTS (
        SELECT 1
        FROM sys.foreign_keys
        WHERE name = 'FK_Transacao_Pessoa'
    )
    BEGIN
        ALTER TABLE Transacao
        ADD CONSTRAINT FK_Transacao_Pessoa
        FOREIGN KEY (IdPessoa)
        REFERENCES Pessoa(Id)
        ON DELETE NO ACTION;

        PRINT 'FK_Transacao_Pessoa criada.';
    END

    -- FK Transacao -> Categoria
    IF NOT EXISTS (
        SELECT 1
        FROM sys.foreign_keys
        WHERE name = 'FK_Transacao_Categoria'
    )
    BEGIN
        ALTER TABLE Transacao
        ADD CONSTRAINT FK_Transacao_Categoria
        FOREIGN KEY (IdCategoria)
        REFERENCES Categoria(Id)
        ON DELETE NO ACTION;

        PRINT 'FK_Transacao_Categoria criada.';
    END

    PRINT 'Verificação de FKs concluída com sucesso.';

END TRY
BEGIN CATCH
    PRINT 'Erro ao criar/verificar FKs: ' + ERROR_MESSAGE();
END CATCH;