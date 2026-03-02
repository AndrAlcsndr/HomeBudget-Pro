import { TipoTransacao } from "../../enums/TipoTransacaoEnum";
import { empty_Guid } from "../../utils/guid";

export class CreateTransacaoDto {
  id: string = empty_Guid;
  idCategoria?: string;
  idPessoa?: string;
  tipo: TipoTransacao;
  descricao: string;
  receitas: number;
  despesas: number;

  constructor(
    tipo: TipoTransacao = TipoTransacao.Receita,
    descricao: string = '',
    receitas: number = 0.0,
    despesas: number = 0.0,
    idCategoria?: string,
    idPessoa?: string
  ) {
    this.tipo = tipo;
    this.descricao = descricao;
    this.receitas = receitas;
    this.despesas = despesas;
    this.idCategoria = idCategoria;
    this.idPessoa = idPessoa;
  }
}