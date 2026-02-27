using AutoMapper;
﻿using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Application.Interfaces;
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
                Items = items,
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
