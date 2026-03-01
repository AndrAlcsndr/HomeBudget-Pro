import { Tipo } from "./TipoEnum";

//Enum de exportação para o front, utilizando os mesmos valores do enum Tipo para facilitar a integração
export enum TipoCategoria
{
    Despesa = Tipo.Despesa, 
    Receita = Tipo.Receita, 
    Ambas = Tipo.Ambas
}

export const TipoCategoriaLabel: Record<Tipo, string> = {
  [Tipo.Todas]: 'Todos',
  [Tipo.Despesa]: 'Despesa',
  [Tipo.Receita]: 'Receita',
  [Tipo.Ambas]: 'Ambas',
}