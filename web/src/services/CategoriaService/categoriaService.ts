import axios from 'axios'

import type { OperationRequest } from '../../interfaces/Operation/OperationRequest'
import type { CategoriaDto } from '../../interfaces/CategoriaDtos/CategoriaDto'
import type { CreateCategoriaDto } from '../../interfaces/CategoriaDtos/CreateCategoriaDto'
import type { UpdateCategoriaDto } from '../../interfaces/CategoriaDtos/UpdateCategoriaDto'
import type { PagedResult } from '../../interfaces/Operation/PagedResultDto'
import type { OperationResult } from '../../interfaces/Operation/OperationResult'


export class ApiCategoriaService {
  private baseUrl = '/api/categoria'
  private api = axios.create({
  baseURL: import.meta.env.VITE_API_BACK_URL,
})

  // Create
  async create(request: CreateCategoriaDto): Promise<OperationResult<CategoriaDto>> {
    const response = await this.api.post<OperationResult<CategoriaDto>>(this.baseUrl, request)
    return response.data
  }

  // GetPaged
  async getPaged(request: OperationRequest): Promise<PagedResult<CategoriaDto>> {
    const response = await this.api.get<PagedResult<CategoriaDto>>(
      `${this.baseUrl}/paged`,
      { params: request }
    )

    return response.data
  }

  // GetById
  async getById(id: string): Promise<OperationResult<CategoriaDto>> {
    const response = await this.api.get<OperationResult<CategoriaDto>>(`${this.baseUrl}/${id}`)
    return response.data
  }

  // Update
  async update(id: string, request: UpdateCategoriaDto): Promise<OperationResult<boolean>> {
    const response = await this.api.put<OperationResult<boolean>>(`${this.baseUrl}/${id}`, request)
    return response.data
  }

  // Delete
  async delete(id: string): Promise<OperationResult<boolean>> {
    const response = await this.api.delete<OperationResult<boolean>>(`${this.baseUrl}/${id}`)
    return response.data
  }
}