export class UpdatePessoaDto {
  id: string = '';
  nome: string = "";
  idade: number = 0;
  cpf: string = "";

  constructor(
    id: string = '',
    nome: string = "",
    cpf: string = "",
    idade: number = 0,
  ) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.cpf = cpf;
  }
}
