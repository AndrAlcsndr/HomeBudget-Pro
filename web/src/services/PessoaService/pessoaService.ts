import axios from 'axios'

import type { PessoaDto } from '../../interfaces/PessoaDtos/PessoaDto'
import type { CreatePessoaDto } from '../../interfaces/PessoaDtos/CreatePessoaDto'
import type { FinancasPessoaFiltroDto } from '../../interfaces/PessoaDtos/FinancasPessoaFiltroDto'
import type { OperationResult } from '../../interfaces/Operation/OperationResult'
import type { UpdatePessoaDto } from '../../interfaces/PessoaDtos/UpdatePessoaDto'
import type { OperationRequest } from '../../interfaces/Operation/OperationRequest'


export class ApiPessoaService {
  private baseUrl = '/api/pessoa'
  private api = axios.create({
  baseURL: import.meta.env.VITE_API_BACK_URL,
})

  // Create
  async create(request: CreatePessoaDto): Promise<PessoaDto> {
    const response = await this.api.post<PessoaDto>(this.baseUrl, request)
    return response.data
  }

  // GetPaged
  async getPaged(request: OperationRequest): Promise<OperationResult<FinancasPessoaFiltroDto[]>> {
    const response = await this.api.get<OperationResult<FinancasPessoaFiltroDto[]>>(
      `${this.baseUrl}/paged`,
      { params: request }
    )

    return response.data
  }

  // GetById
  async getById(id: string): Promise<PessoaDto> {
    const response = await this.api.get<PessoaDto>(`${this.baseUrl}/${id}`)
    return response.data
  }

  // Update
  async update(id: string, request: UpdatePessoaDto): Promise<PessoaDto> {
    const response = await this.api.put<PessoaDto>(`${this.baseUrl}/${id}`, request)
    return response.data
  }

  // Delete
  async delete(id: string): Promise<boolean> {
    const response = await this.api.delete<boolean>(`${this.baseUrl}/${id}`)
    return response.data
  }
}