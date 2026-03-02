// Exportação do enum groupBy para organizar os dados
export enum GroupBy
{
    Pessoa,
    Categoria,
    Geral
}

export type GroupByKey = "pessoa" | "categoria" | "geral";

export const groupByMap: Record<GroupByKey, GroupBy> = {
  pessoa: GroupBy.Pessoa,
  categoria: GroupBy.Categoria,
  geral: GroupBy.Geral
};
