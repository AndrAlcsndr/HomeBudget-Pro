export class FinancasPessoaFiltroDto {
  nome: string = "";
  idade: number = 0;
  cpf: string = "";
  dataCriacaoModificacao: string = new Date().toISOString();

  constructor(
    nome: string = "",
    cpf: string = "",
    dataCriacaoModificacao: string = new Date().toISOString(),
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataCriacaoModificacao = dataCriacaoModificacao;
  }
}
