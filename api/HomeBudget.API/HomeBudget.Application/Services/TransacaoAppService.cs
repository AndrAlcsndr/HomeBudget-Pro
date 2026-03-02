using AutoMapper;
using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.TransacaoDtos;
using HomeBudget.Application.Interfaces;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;
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
                var transacaoDto = _mapper.Map<TransacaoDto>(dto);
                CalcularSaldo(transacaoDto, entity);

                await _repository.AddAsync(entity);

                return OperationResult<Guid>.Ok(entity.Id);
            }
            catch (Exception ex)
            {
                return OperationResult<Guid>.Fail($"Erro ao criar transação: {ex.Message}");
            }
        }

        private static void CalcularSaldo(TransacaoDto dto, Transacao entity)
        {
            entity.SomaReceitas = dto.Receitas;
            entity.SomaDespesas = dto.Despesas;
            var valorTransacao = entity.SomaReceitas - entity.SomaDespesas;

            entity.Saldo = entity.Tipo == TipoTransacao.Receita
                ? valorTransacao : valorTransacao;
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

            await _repository.DeleteAsync(entity);

            return OperationResult<bool>.Ok(true);
        }

        public async Task<OperationResult<bool>> UpdateAsync(UpdateTransacaoDto dto)
        {
            var entity = await _repository.GetByIdAsync(dto.Id);

            if (entity == null)
                return OperationResult<bool>.Fail("Transação não encontrada.");

            _mapper.Map(dto, entity);

            var transacaoDto = _mapper.Map<TransacaoDto>(dto);
            CalcularSaldo(transacaoDto, entity);

            await _repository.UpdateAsync(entity);

            return OperationResult<bool>.Ok(true);
        }
    }
}