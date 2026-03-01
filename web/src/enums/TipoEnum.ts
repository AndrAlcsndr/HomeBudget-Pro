// Exportação do enum Tipo para ser utilizado de forma geral
export enum Tipo
{
    Todas = -1,
    Despesa,
    Receita,
    Ambas
}

export const TipoLabel: Record<Tipo, string> = {
  [Tipo.Todas]: 'Todos',
  [Tipo.Despesa]: 'Despesa',
  [Tipo.Receita]: 'Receita',
  [Tipo.Ambas]: 'Ambas',
}