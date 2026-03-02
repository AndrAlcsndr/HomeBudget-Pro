import axios from 'axios'

import type { OperationRequest } from '../../interfaces/Operation/OperationRequest'
import type { PagedResult } from '../../interfaces/Operation/PagedResultDto'
import type { CreateTransacaoDto } from '../../interfaces/TransacaoDtos/CreateTransacaoDto'
import type { OperationResult } from '../../interfaces/Operation/OperationResult'
import type { TransacaoDto } from '../../interfaces/TransacaoDtos/TransacaoDto'
import type { UpdateTransacaoDto } from '../../interfaces/TransacaoDtos/UpdateTransacaoDto'


export class ApiTransacaoService {
  private baseUrl = '/api/transacao'
  private api = axios.create({
  baseURL: import.meta.env.VITE_API_BACK_URL,
})

  // Create
  async create(request: CreateTransacaoDto): Promise<OperationResult<TransacaoDto>> {
    const response = await this.api.post<OperationResult<TransacaoDto>>(this.baseUrl, request)
    return response.data
  }

  // GetPaged
  async getPaged(request: OperationRequest): Promise<PagedResult<TransacaoDto>> {
    const response = await this.api.get<PagedResult<TransacaoDto>>(
      `${this.baseUrl}/paged`,
      { params: request }
    )
    return response.data
  }

  // GetById
  async getById(id: string): Promise<OperationResult<TransacaoDto>> {
    const response = await this.api.get<OperationResult<TransacaoDto>>(`${this.baseUrl}/${id}`)
    return response.data
  }

  // Update
  async update(id: string, request: UpdateTransacaoDto): Promise<OperationResult<boolean>> {
    const response = await this.api.put<OperationResult<boolean>>(`${this.baseUrl}/${id}`, request)
    return response.data
  }

  // Delete
  async delete(id: string): Promise<OperationResult<boolean>> {
    const response = await this.api.delete<OperationResult<boolean>>(`${this.baseUrl}/${id}`)
    return response.data
  }
}