import { TipoCategoria } from "../../enums/TipoCategoriaEnum";
import { empty_Guid } from "../../utils/guid";

export class CreateCategoriaDto {
  id: string;
  nome: string = "";
  descricao: string = "";
  finalidade: number = TipoCategoria.Despesa;

  constructor(
    id: string = empty_Guid,
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
