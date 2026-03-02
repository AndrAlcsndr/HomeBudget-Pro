export class UpdatePessoaDto {
  id: string = '';
  nome: string = "";
  idade: number = 0;
  cpf: string = "";
  dataCriacao: string = new Date().toISOString();

  constructor(
    id: string = '',
    nome: string = "",
    cpf: string = "",
    idade: number = 0,
    dataCriacao: string = new Date().toISOString(),
  ) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.cpf = cpf;
    this.dataCriacao = dataCriacao
  }
}
