using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Application.DTOs.TransacaoDtos;
using HomeBudget.Application.Interfaces;

namespace HomeBudget.Application.Services
{
    public class TransacaoAppService
    {

        private readonly ITransacaoAppService _service;

        public TransacaoAppService(ITransacaoAppService transacaoService)
        {
            _service = transacaoService;
        }

        public async Task<PagedResult<TransacaoDto>> GetPagedAsync(PagedRequest request)
        {
            var (items, total) = await _repository.GetPagedAsync(request);

            return new PagedResult<PessoaDto>
            {
                Items = items,
                Total = total,
                Page = request.Page,
                PageSize = request.PageSize
            };
        }

        public Task<OperationResult<Guid>> CreateAsync(CreateTransacaoDto dto)
        {
            return _repository.CreateAsync(dto);
        }

        public Task<OperationResult<TransacaoDto>> GetByIdAsync(Guid id)
        {
            return _repository.GetByIdAsync(id);
        }

        Task<OperationResult<bool>> DeleteAsync(Guid id)
        {
            return _repository.DeleteAsync(id);
        }
        Task<OperationResult<bool>> UpdateAsync(UpdateTransacaoDto dto)
        {
            return _repository.UpdateAsync(dto);
        }


    }
}
