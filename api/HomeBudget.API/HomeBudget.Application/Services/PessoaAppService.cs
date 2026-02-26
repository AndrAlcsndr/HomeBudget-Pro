using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Domain.Interfaces;

namespace HomeBudget.Application.Services
{
    public class PessoaAppService
    {
        private readonly IPessoaRepository _repository;

        public PessoaAppService(IPessoaRepository repository)
        {
            _repository = repository;
        }

        public async Task<PagedResult<PessoaDto>> GetPagedAsync(PagedRequest request)
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

        public Task<OperationResult<Guid>> CreateAsync(CreatePessoaDto dto)
        {
            return _repository.CreateAsync(dto);
        }

        public Task<OperationResult<PessoaDto>> GetByIdAsync(Guid id)
        {
            return _repository.GetByIdAsync(id);
        }

        Task<OperationResult<bool>> DeleteAsync(Guid id)
        {
            return _repository.DeleteAsync(id);
        }
        Task<OperationResult<bool>> UpdateAsync(UpdatePessoaDto dto)
        {
            return _repository.UpdateAsync(dto);
        }
    }
}
