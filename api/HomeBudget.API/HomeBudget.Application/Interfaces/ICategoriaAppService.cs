using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Application.DTOs.Pagination;

namespace HomeBudget.Application.Interfaces
{
    public interface ICategoriaAppService
    {
        Task<OperationResult<Guid>> CreateAsync(CreateCategoriaDto dto);
        Task<OperationResult<CategoriaDto>> GetByIdAsync(Guid id);
        Task<OperationResult<bool>> DeleteAsync(Guid id);
        Task<OperationResult<bool>> UpdateAsync(UpdateCategoriaDto dto);
        Task<PagedResult<CategoriaDto>> GetPagedAsync(PagedRequest request);
    }
}
