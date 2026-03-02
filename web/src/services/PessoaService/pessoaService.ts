import axios from 'axios'

import type { PessoaDto } from '../../interfaces/PessoaDtos/PessoaDto'
import type { CreatePessoaDto } from '../../interfaces/PessoaDtos/CreatePessoaDto'
import type { OperationResult } from '../../interfaces/Operation/OperationResult'
import type { UpdatePessoaDto } from '../../interfaces/PessoaDtos/UpdatePessoaDto'
import type { OperationRequest } from '../../interfaces/Operation/OperationRequest'
import type { PagedResult } from '../../interfaces/Operation/PagedResultDto'


export class ApiPessoaService {
  private baseUrl = '/api/pessoa'
  private api = axios.create({
  baseURL: import.meta.env.VITE_API_BACK_URL,
})

  // Create
  async create(request: CreatePessoaDto): Promise<OperationResult<PessoaDto>> {
    const response = await this.api.post<OperationResult<PessoaDto>>(this.baseUrl, request)
    return response.data
  }

  // GetPaged
  async getPaged(request: OperationRequest): Promise<PagedResult<PessoaDto>> {
    const response = await this.api.get<PagedResult<PessoaDto>>(
      `${this.baseUrl}/paged`,
      { params: request }
    )
    return response.data
  }

  // GetById
  async getById(id: string): Promise<OperationResult<PessoaDto>> {
    const response = await this.api.get<OperationResult<PessoaDto>>(`${this.baseUrl}/${id}`)
    return response.data
  }

  // Update
  async update(id: string, request: UpdatePessoaDto): Promise<OperationResult<boolean>> {
    const response = await this.api.put<OperationResult<boolean>>(`${this.baseUrl}/${id}`, request)
    return response.data
  }

  // Delete
  async delete(id: string): Promise<OperationResult<boolean>> {
    const response = await this.api.delete<OperationResult<boolean>>(`${this.baseUrl}/${id}`)
    return response.data
  }
}