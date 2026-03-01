import { TipoCategoria, TipoCategoriaLabel } from "../../enums/TipoCategoriaEnum";
import { empty_Guid } from "../../utils/guid";

export class CategoriaDto {
  id: string;
  nome: string = "";
  descricao: string = "";
  finalidade: string = TipoCategoriaLabel[TipoCategoria.Despesa];
  dataCriacaoModificacao: string = new Date().toISOString();

  constructor(
    id: string = empty_Guid,
    nome: string = "",
    descricao: string = "",
    finalidade: string = TipoCategoriaLabel[TipoCategoria.Despesa],
    dataCriacaoModificacao: string = new Date().toISOString(),
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.finalidade = finalidade;
    this.dataCriacaoModificacao = dataCriacaoModificacao;
  }
}
