using HomeBudget.Application.DTOs;
using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace HomeBudget.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {

        private readonly ICategoriaAppService _service;

        public CategoriaController(ICategoriaAppService categoriaAppService)
        {
            _service = categoriaAppService;
        }

        /// <summary>Cria uma nova categoria</summary>
        [HttpPost]
        [ProducesResponseType(typeof(object), 201)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(typeof(ProblemDetails), 409)]
        public async Task<IActionResult> Create([FromBody] CreateCategoriaDto dto)
        {
            var result = await _service.CreateAsync(dto);
            if (!result.Success)
                return BadRequest(new ProblemDetails { Title = result.Title, Detail = result.Message });

            return Ok(result);
        }

        /// <summary>Obtem uma consulta paginada de todos as categorias do sistema </summary>
        [HttpGet("paged")]
        [ProducesResponseType(typeof(PagedResult<CategoriaRequestDto>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public async Task<IActionResult> GetPaged([FromQuery] PagedRequest request)
        {
            var result = await _service.GetPagedAsync(request);
            return Ok(result);
        }

        /// <summary>Obtem uma consulta de todas as categorias do sistema para seleção </summary>
        [HttpGet("getAllForSelect")]
        [ProducesResponseType(typeof(PagedResult<List<GenericOptionsDto>>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public async Task<IActionResult> GetAllForSelect()
        {
            var result = await _service.GetAllForSelect();
            return Ok(result);
        }

        /// <summary>Obtem uma consulta de uma categoria especifica, baseado no Id fornecido </summary>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(CategoriaDto), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public async Task<IActionResult> GetById(Guid Id)
        {
            var result = await _service.GetByIdAsync(Id);
            return Ok(result);
        }

        /// <summary>Realiza a exclusão de uma determinada categoria </summary>
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(typeof(bool), 200)]
        public async Task<IActionResult> DeleteById(Guid Id)
        {
            var result = await _service.DeleteAsync(Id);
            return Ok(result);
        }

        /// <summary>Realiza a atualização dos dados de uma determinada categoria, atraves de seu DTO </summary>
        [HttpPut("{id:guid}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        public async Task<IActionResult> Update([FromBody] UpdateCategoriaDto dto)
        {
            var result = await _service.UpdateAsync(dto);
            if (!result.Success)
                return BadRequest(new ProblemDetails { Title = result.Title, Detail = result.Message });

            return Ok(result);
        }

    }
}
