export class PagedResult<T> {
  items: ReadonlyArray<T>
  total: number
  page: number
  pageSize: number

  constructor(items: ReadonlyArray<T> = [], total = 0, page = 1, pageSize = 10) {
    this.items = items
    this.total = total
    this.page = page
    this.pageSize = pageSize
  }

  get totalPages(): number {
    return Math.ceil(this.total / Math.max(1, this.pageSize))
  }

  get hasNext(): boolean {
    return this.page < this.totalPages
  }

  get hasPrev(): boolean {
    return this.page > 1
  }
}
