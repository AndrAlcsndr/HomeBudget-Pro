using AutoMapper;
using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.TransacaoDtos;
using HomeBudget.Application.Interfaces;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Interfaces;

namespace HomeBudget.Application.Services
{
    public class TransacaoAppService : ITransacaoAppService
    {
        private readonly ITransacaoRepository<PagedRequest> _repository;
        private readonly IMapper _mapper;

        public TransacaoAppService(
            ITransacaoRepository<PagedRequest> repository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<PagedResult<TransacaoDto>> GetPagedAsync(PagedRequest request)
        {
            var (items, total) = await _repository.GetPagedAsync(request);

            var dtos = _mapper.Map<IEnumerable<TransacaoDto>>(items);

            return new PagedResult<TransacaoDto>
            {
                Items = _mapper.Map<List<TransacaoDto>>(items),
                Total = total,
                Page = request.Page,
                PageSize = request.PageSize
            };
        }

        public async Task<OperationResult<Guid>> CreateAsync(CreateTransacaoDto dto)
        {
            try
            {
                var entity = _mapper.Map<Transacao>(dto);

                await _repository.AddAsync(entity);

                return OperationResult<Guid>.Ok(entity.Id);
            }
            catch (Exception ex)
            {
                return OperationResult<Guid>.Fail($"Erro ao criar transação: {ex.Message}");
            }
        }

        public async Task<OperationResult<TransacaoDto>> GetByIdAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity == null)
                return OperationResult<TransacaoDto>.Fail("Transação não encontrada.");

            var dto = _mapper.Map<TransacaoDto>(entity);

            return OperationResult<TransacaoDto>.Ok(dto);
        }

        public async Task<OperationResult<bool>> DeleteAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity == null)
                return OperationResult<bool>.Fail("Transação não encontrada.");

            _repository.Remove(entity);

            return OperationResult<bool>.Ok(true);
        }

        public async Task<OperationResult<bool>> UpdateAsync(UpdateTransacaoDto dto)
        {
            var entity = await _repository.GetByIdAsync(dto.Id);

            if (entity == null)
                return OperationResult<bool>.Fail("Transação não encontrada.");

            _mapper.Map(dto, entity);

            _repository.Update(entity);

            return OperationResult<bool>.Ok(true);
        }
    }
}