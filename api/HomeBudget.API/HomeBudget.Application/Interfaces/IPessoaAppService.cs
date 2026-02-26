using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.PessoaDtos;

namespace HomeBudget.Application.Interfaces
{
    public interface IPessoaAppService
    {
        Task<OperationResult<Guid>> CreateAsync(CreatePessoaDto dto);
        Task<OperationResult<PessoaDto>> GetByIdAsync(Guid id);
        Task<OperationResult<bool>> DeleteAsync(Guid id);
        Task<OperationResult<bool>> UpdateAsync(UpdatePessoaDto dto);
        Task<PagedResult<PessoaDto>> GetPagedAsync(PagedRequest request);

    }
}
