using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.TransacaoDtos;

namespace HomeBudget.Application.Interfaces
{
    public interface ITransacaoAppService
    {
        Task<PagedResult<TransacaoDto>> GetPagedAsync(PagedRequest request);
        Task<OperationResult<Guid>> CreateAsync(CreateTransacaoDto dto);
        Task<OperationResult<TransacaoDto>> GetByIdAsync(Guid id);
        Task<OperationResult<bool>> DeleteAsync(Guid id);
        Task<OperationResult<bool>> UpdateAsync(UpdateTransacaoDto dto);
    }
}
