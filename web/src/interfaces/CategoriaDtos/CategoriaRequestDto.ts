import { TipoCategoria } from "../../enums/TipoCategoriaEnum";

export class CategoriaRequestDto {
  nome: string = "";
  descricao: string = "";
  finalidade: number = TipoCategoria.Despesa;
  dataCriacaoModificacao: string = new Date().toISOString();

  constructor(
    nome: string = "",
    descricao: string = "",
    finalidade: number = TipoCategoria.Despesa,
    dataCriacaoModificacao: string = new Date().toISOString(),
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.finalidade = finalidade;
    this.dataCriacaoModificacao = dataCriacaoModificacao;
  }
}
