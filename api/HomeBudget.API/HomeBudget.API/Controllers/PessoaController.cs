using HomeBudget.Application.DTOs;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.PessoaDtos;
using HomeBudget.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HomeBudget.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {

        private readonly IPessoaAppService _service;

        public PessoaController(IPessoaAppService pessoaService)
        {
            _service = pessoaService;
        }

        /// <summary>Cria uma nova pessoa</summary>
        [HttpPost]
        [ProducesResponseType(typeof(object), 201)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        [ProducesResponseType(typeof(ProblemDetails), 409)]
        public async Task<IActionResult> Create([FromBody] CreatePessoaDto dto)
        {
            var result = await _service.CreateAsync(dto);
            if (!result.Success)
                return BadRequest(new ProblemDetails { Title = result.Title, Detail = result.Message });

            return Ok(result);
        }

        /// <summary>Obtem uma consulta paginada de todos as pessoas do sistema, e suas finanças</summary>
        [HttpGet("paged")]
        [ProducesResponseType(typeof(PagedResult<PessoaDto>), 200)]
        public async Task<IActionResult> GetPaged([FromQuery] PagedRequest request)
        {
            var result = await _service.GetPagedAsync(request);
            return Ok(result);
        }

        /// <summary>Obtem uma consulta um usuário especifico, baseado no Id fornecido </summary>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(PessoaDto), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public async Task<IActionResult> GetById(Guid Id)
        {
            var result = await _service.GetByIdAsync(Id);
            return Ok(result);
        }

        /// <summary>Obtem todas as pessoas do sistema para seleção </summary>
        [HttpGet("getAllForSelect")]
        [ProducesResponseType(typeof(List<GenericOptionsDto>), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public async Task<IActionResult> GetAllForSelect()
        {
            var result = await _service.GetAllForSelect();
            return Ok(result);
        }

        /// <summary>Realiza a exclusão de um determinado usuário </summary>
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public async Task<IActionResult> DeleteById(Guid Id)
        {
            var result = await _service.DeleteAsync(Id);
            return Ok(result);
        }

        /// <summary>Realiza a atualização dos dados de um determinado usuario, atraves de seu DTO </summary>
        [HttpPut("{id:guid}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        public async Task<IActionResult> Update([FromBody] UpdatePessoaDto dto)
        {
            var result = await _service.UpdateAsync(dto);
            if (!result.Success)
                return BadRequest(new ProblemDetails { Title = result.Title, Detail = result.Message });

            return Ok(result);
        }


    }
}
