using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Domain.Interfaces;

namespace HomeBudget.Application.Services
{
    public class CategoriaAppService : ICategoriaAppService
    {
        private readonly ICategoriaRepository _repository;

        public CategoriaAppService(ICategoriaRepository repository)
        {
            _repository = repository;
        }


        public async Task<PagedResult<CategoriaDto>> GetPagedAsync(PagedRequest request)
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

        public Task<OperationResult<Guid>> CreateAsync(CreateCategoriaDto dto)
        {
            return _repository.CreateAsync(dto);
        }

        public Task<OperationResult<CategoriaDto>> GetByIdAsync(Guid id)
        {
            return _repository.GetByIdAsync(id);
        }

        Task<OperationResult<bool>> DeleteAsync(Guid id)
        {
            return _repository.DeleteAsync(id);
        }
        Task<OperationResult<bool>> UpdateAsync(UpdateCategoriaDto dto)
        {
            return _repository.UpdateAsync(dto);
        }

    }
}
