import { Tipo } from "./TipoEnum";

//Enum de exportação para o front, utilizando os mesmos valores do enum Tipo para facilitar a integração
export enum TipoTransacao
{
    Despesa = Tipo.Despesa, 
    Receita = Tipo.Receita, 
}

export const TipoTransacaoLabel: Record<TipoTransacao, string> = {
  [Tipo.Despesa]: 'Despesa',
  [Tipo.Receita]: 'Receita'
}