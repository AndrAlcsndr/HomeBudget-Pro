export class OperationRequest {
  page: number
  pageSize: number
  search?: string
  sortBy?: string
  sortDir?: string
  tipo?: string
  dataInicial?: Date
  dataFinal?: Date

  constructor(init?: Partial<OperationRequest>) {
    this.page = init?.page ?? 1
    this.pageSize = init?.pageSize ?? 20
    this.search = init?.search
    this.sortBy = init?.sortBy
    this.sortDir = init?.sortDir
    this.tipo = init?.tipo
    this.dataInicial = init?.dataInicial
    this.dataFinal = init?.dataFinal
  }
}
