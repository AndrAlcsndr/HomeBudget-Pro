using AutoMapper;
using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Application.Interfaces;
using HomeBudget.Application.Validators;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Interfaces;

namespace HomeBudget.Application.Services
{
    public class PessoaAppService : IPessoaAppService
    {
        private readonly IPessoaRepository<PagedRequest> _repository;
        private readonly IMapper _mapper;

        public PessoaAppService(IPessoaRepository<PagedRequest> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<PagedResult<PessoaDto>> GetPagedAsync(PagedRequest request)
        {
            var (items, total) = await _repository.GetPagedAsync(request);

            return new PagedResult<PessoaDto>
            {
                Items = _mapper.Map<List<PessoaDto>>(items),
                Total = total,
                Page = request.Page,
                PageSize = request.PageSize
            };
        }

        public async Task<OperationResult<Guid>> CreateAsync(CreatePessoaDto dto)
        {
            if (dto == null)
                return OperationResult<Guid>.Fail("Dados inválidos.");

            var (flowControl, validationResult) = await ValidarDadosBasicosPessoa(dto);

            if (!flowControl)
                return OperationResult<Guid>.Fail(validationResult.Message!);

            var novaPessoa = _mapper.Map<Pessoa>(dto);

            try
            {
                await _repository.AddAsync(novaPessoa);

                return OperationResult<Guid>.Ok(
                    novaPessoa.Id,
                    "Pessoa criada com sucesso.");
        }
            catch (Exception ex)
            {
                return OperationResult<Guid>.Fail(
                    $"Erro ao criar pessoa: {ex.Message}");
            }
        }

        public async Task<OperationResult<PessoaDto>> GetByIdAsync(Guid id)
        {
            var pessoa = await _repository.GetByIdAsync(id);

            if (pessoa == null)
                return OperationResult<PessoaDto>.Fail("Pessoa não encontrada.");

            var dto = _mapper.Map<PessoaDto>(pessoa);

            return OperationResult<PessoaDto>.Ok(dto);
        }

        public async Task<OperationResult<List<GenericOptionsDto>>> GetAllForSelect()
        {
            var pessoas = await _repository.GetAllForSelect();

            if (pessoas == null || pessoas.Count == 0)
                return OperationResult<List<GenericOptionsDto>>.Fail("Sem registros de pessoa para exibir.");

            var dtos = _mapper.Map<List<GenericOptionsDto>>(pessoas);

            return OperationResult<List<GenericOptionsDto>>.Ok(dtos);
        }

        public async Task<OperationResult<bool>> DeleteAsync(Guid id)
        {
            var pessoa = await _repository.GetByIdAsync(id);

            if (pessoa == null)
                return OperationResult<bool>.Fail("Pessoa não encontrada.");

            await _repository.DeleteAsync(pessoa);

            return OperationResult<bool>.Ok(true, "Cadastro deletado com sucesso.");
        }

        public async Task<OperationResult<bool>> UpdateAsync(UpdatePessoaDto dto)
        {
            try
            {
                if (dto == null)
                    return OperationResult<bool>.Fail("Dados inválidos.");

                var createDto = _mapper.Map<CreatePessoaDto>(dto);

                var (flowControl, validationResult) = await ValidarDadosBasicosPessoa(createDto);

                if (!flowControl)
                    return OperationResult<bool>.Fail(validationResult.Message!);

                var pessoa = _mapper.Map<Pessoa>(dto);
                await _repository.UpdateAsync(pessoa);


                return  OperationResult<bool>.Ok(true, "Dados atualizados com sucesso.");
        }
            catch (Exception ex)
            {
                return OperationResult<bool>.Fail(
                    $"Erro ao atualizar pessoa: {ex.Message}");
            }      }

        private async Task<(bool flowControl, OperationResult<bool> value)>
            ValidarDadosBasicosPessoa(CreatePessoaDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Nome))
                return (false, OperationResult<bool>.Fail("Nome é obrigatório."));

            if (string.IsNullOrWhiteSpace(dto.Cpf))
                return (false, OperationResult<bool>.Fail("CPF é obrigatório."));

            if (!CpfValidator.IsValid(dto.Cpf))
                return (false, OperationResult<bool>.Fail("CPF Inválido."));

            if (await _repository.PessoaExistente(dto.Nome, dto.Id))
                return (flowControl: false, value: OperationResult<bool>.Fail("Outro cadastro já possui este nome."));

            if (await _repository.CpfExistente(dto.Cpf, dto.Id))
                return (flowControl: false, value: OperationResult<bool>.Fail("Outro cadastro já possui este nome."));

            if (dto.Nome.Length > 200)
                return (false, OperationResult<bool>.Fail("Nome muito longo."));

            return (true, OperationResult<bool>.Ok(true));
        }
    }
}
