export class OperationResult<T> {
  success: boolean
  data: T | null
  message: string | null
  statusCode: number

  constructor(init?: Partial<OperationResult<T>>) {
    this.success = init?.success ?? false
    this.data = init?.data ?? null
    this.message = init?.message ?? null
    this.statusCode = init?.statusCode ?? 0
  }
}
