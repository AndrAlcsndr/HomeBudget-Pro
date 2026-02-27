using AutoMapper;
using HomeBudget.Application.Common;
using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.Interfaces;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;
using HomeBudget.Domain.Interfaces;

namespace HomeBudget.Application.Services
{
    public class CategoriaAppService : ICategoriaAppService
    {
        private readonly ICategoriaRepository<PagedRequest> _repository;
        private readonly IMapper _mapper;

        public CategoriaAppService(ICategoriaRepository<PagedRequest> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<PagedResult<CategoriaRequestDto>> GetPagedAsync(PagedRequest request)
        {
            //var (items, total) = await _repository.GetPagedAsync(request);

            return new PagedResult<CategoriaRequestDto>
            {
                Resultados = [],
                Total = 0,
                Page = request.Page,
                PageSize = request.PageSize
            };
        }

        public async Task<OperationResult<Guid>> CreateAsync(CreateCategoriaDto dto)
        {
            (bool flowControl, OperationResult<bool> value) = await ValidarDadosBasicosCategoria(dto);
            if (!flowControl)
            {
                return OperationResult<Guid>.Fail(value.Message!);
            }

            var newCategoria = _mapper.Map<Categoria>(dto);

            try
            {
                await _repository.AddAsync(newCategoria);
                return OperationResult<Guid>.Ok(newCategoria.Id, "Categoria criada com sucesso.");

            }
            catch (Exception ex)
            {
                return OperationResult<Guid>.Fail($"Ocorreu um erro ao criar a categoria, {ex.Message}. Tente novamente mais tarde.");

            }

        }

        


        private async Task<(bool flowControl, OperationResult<bool> value)> ValidarDadosBasicosCategoria(CreateCategoriaDto createDto)
        {
            if (string.IsNullOrWhiteSpace(createDto.Nome))
                return (flowControl: false, value: OperationResult<bool>.Fail("Nome de cadastro é obrigatório."));

            // Verificação de concorrencia
            if (await _repository.CategoriaExistente(createDto.Nome, createDto.Id))
                return (flowControl: false, value: OperationResult<bool>.Fail("Outro cadastro já possui este nome."));

            if (createDto.Descricao?.Length > 400)
                return (flowControl: false, value: OperationResult<bool>.Fail("Quantidade de caracteres além do permitido."));

            if (string.IsNullOrWhiteSpace(createDto.Descricao))
                return (flowControl: false, value: OperationResult<bool>.Fail("Campo descrição obrigatório."));

            if (!Enum.IsDefined(typeof(TipoCategoria), createDto.Finalidade))
                return (flowControl: false, value: OperationResult<bool>.Fail("Nenhuma finalidade para a categoria estabelecida."));

            return (flowControl: true, value: OperationResult<bool>.Ok(true));
        }

        public async Task<OperationResult<CategoriaDto>> GetByIdAsync(Guid id)
        {
            var categoria = await _repository.GetByIdAsync(id);

            if (categoria is null)
                return OperationResult<CategoriaDto>.Fail("Categoria não encontrada.");

            return OperationResult<CategoriaDto>.Ok(_mapper.Map<CategoriaDto>(categoria));
        }

        public async Task<OperationResult<bool>> DeleteAsync(Guid id)
        {
            var categoria = await _repository.GetByIdAsync(id);
            if (categoria is null)
                return OperationResult<bool>.Fail("Categoria não encontrada.");

            await _repository.DeleteAsync(categoria);

            return OperationResult<bool>.Ok(true);
        }


        public async Task<OperationResult<bool>> UpdateAsync(UpdateCategoriaDto dto)
        {
            try
            {
                var categoriaValidation = _mapper.Map<CreateCategoriaDto>(dto);
                (bool flowControl, OperationResult<bool> value) = await ValidarDadosBasicosCategoria(categoriaValidation);
                if (!flowControl)
                {
                    return value!;
                }

                var categoria = _mapper.Map<Categoria>(dto);

                await _repository.UpdateAsync(categoria);

                return OperationResult<bool>.Ok(true, "Categoria atualizada com sucesso.");
        }
            catch (Exception ex)
        {
                return OperationResult<bool>.Fail($"Ocorreu um erro ao atualizar a categoria, {ex.Message}. Tente novamente mais tarde.");
        }

    }
}
}
