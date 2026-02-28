using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.TransacaoDtos;
using HomeBudget.Application.Interfaces;

namespace HomeBudget.Application.Services
{
    public class TransacaoAppService : ITransacaoAppService
    {

        public async Task<PagedResult<TransacaoDto>> GetPagedAsync(PagedRequest request)
        {
            //var (items, total) = await _repository.GetPagedAsync(request);

            return new PagedResult<TransacaoDto>
            {
                Resultados = [],
                Total = 0,
                Page = request.Page,
                PageSize = request.PageSize
            };
        }

        public Task<OperationResult<Guid>> CreateAsync(CreateTransacaoDto dto)
        {
            return Task.FromResult(
               OperationResult<Guid>.Fail(string.Empty)
               );
        }

        public Task<OperationResult<TransacaoDto>> GetByIdAsync(Guid id)
        {
            //return _repository.GetByIdAsync(id);

            return Task.FromResult(
                OperationResult<TransacaoDto>.Fail(string.Empty)
                );
        }

        public Task<OperationResult<bool>> DeleteAsync(Guid id)
        {
            //return _repository.DeleteAsync(id);
            return Task.FromResult(
                OperationResult<bool>.Fail(string.Empty)
                );
        }
        public Task<OperationResult<bool>> UpdateAsync(UpdateTransacaoDto dto)
        {
            // return _repository.UpdateAsync(dto);
            return Task.FromResult(
                OperationResult<bool>.Fail(string.Empty)
                );
        }


    }
}
