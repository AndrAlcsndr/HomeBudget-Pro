import { empty_Guid } from "../../utils/guid";

export class CreatePessoaDto {
  id: string = empty_Guid;
  nome: string = "";
  idade: number = 0;
  cpf: string = "";

  constructor(
    nome: string = "",
    cpf: string = "",
    idade: number = 0,
  ) {
    this.nome = nome;
    this.idade = idade;
    this.cpf = cpf;
  }
}
