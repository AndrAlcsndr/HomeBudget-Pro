import { empty_Guid } from "../utils/guid";

export class PessoaDto {
  id: string;
  nome: string = "";
  idade: number = 0;
  cpf: string = "";
  dataCriacaoModificacao: string = new Date().toISOString();

  constructor(
    id: string = empty_Guid,
    nome: string = "",
    idade: number = 0,
    cpf: string = "",
    dataCriacaoModificacao: string = new Date().toISOString(),
  ) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.cpf = cpf;
    this.dataCriacaoModificacao = dataCriacaoModificacao;
  }
}
