import { TipoCategoria } from "../../enums/TipoCategoriaEnum";

export class UpdateCategoriaDto {
  id: string;
  nome: string = "";
  descricao: string = "";
  finalidade: number = TipoCategoria.Despesa;

  constructor(
    id: string = "",
    nome: string = "",
    descricao: string = "",
    finalidade: number = TipoCategoria.Despesa,
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.finalidade = finalidade;
  }
}
