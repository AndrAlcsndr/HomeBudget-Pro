import { TipoTransacao } from "../../enums/TipoTransacaoEnum";

export class TransacaoDto {
  id: string;
  categoria: string;
  pessoa: string;
  descricao: string;
  tipo: TipoTransacao;
  receitas: number;
  despesas: number;

  constructor(
    id: string,
    categoria: string,
    pessoa: string,
    descricao: string,
    tipo: TipoTransacao,
    receitas: number,
    despesas: number
  ) {
    this.id = id;
    this.categoria = categoria;
    this.pessoa = pessoa;
    this.descricao = descricao;
    this.tipo = tipo;
    this.receitas = receitas;
    this.despesas = despesas;
  }
}