import type { TipoTransacao } from "../../enums/TipoTransacaoEnum";

export class UpdateTransacaoDto {
  id: string;
  idPessoa: string;
  idCategoria: string;
  tipo: TipoTransacao;
  nome: string;
  descricao: string;
  receitas: number;
  despesas: number;
  saldo: number;

  constructor(
    id: string,
    idPessoa: string,
    idCategoria: string,
    tipo: TipoTransacao,
    nome: string,
    descricao: string,
    receitas: number = 0.0,
    despesas: number = 0.0,
    saldo: number = 0.0
  ) {
    this.id = id;
    this.idPessoa = idPessoa;
    this.idCategoria = idCategoria;
    this.tipo = tipo;
    this.nome = nome;
    this.descricao = descricao;
    this.receitas = receitas;
    this.despesas = despesas;
    this.saldo = saldo;
  }
}