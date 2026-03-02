import axios from 'axios'

import type { OperationRequest } from '../../interfaces/Operation/OperationRequest'
import type { CategoriaDto } from '../../interfaces/CategoriaDtos/CategoriaDto'
import type { CreateCategoriaDto } from '../../interfaces/CategoriaDtos/CreateCategoriaDto'
import type { UpdateCategoriaDto } from '../../interfaces/CategoriaDtos/UpdateCategoriaDto'
import type { PagedResult } from '../../interfaces/Operation/PagedResultDto'


export class ApiCategoriaService {
  private baseUrl = '/api/categoria'
  private api = axios.create({
  baseURL: import.meta.env.VITE_API_BACK_URL,
})

  // Create
  async create(request: CreateCategoriaDto): Promise<CategoriaDto> {
    const response = await this.api.post<CategoriaDto>(this.baseUrl, request)
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
  async getById(id: string): Promise<CategoriaDto> {
    const response = await this.api.get<CategoriaDto>(`${this.baseUrl}/${id}`)
    return response.data
  }

  // Update
  async update(id: string, request: UpdateCategoriaDto): Promise<CategoriaDto> {
    const response = await this.api.put<CategoriaDto>(`${this.baseUrl}/${id}`, request)
    return response.data
  }

  // Delete
  async delete(id: string): Promise<boolean> {
    const response = await this.api.delete<boolean>(`${this.baseUrl}/${id}`)
    return response.data
  }
}