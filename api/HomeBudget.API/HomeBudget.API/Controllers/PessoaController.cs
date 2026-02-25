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
            return result.ToActionResult(this, id =>
                CreatedAtAction(nameof(GetById), new { id }, new { id })
            );
        }

        /// <summary>Obtem uma consulta paginada de todos as pessoas do sistema, e suas finanças</summary>
        [HttpGet("paged")]
        [ProducesResponseType(typeof(PagedResult<FinancasPessoaFiltroDto>), 200)]
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
            var result = await _service.GetById(Id);
            return Ok(result);
        }

        /// <summary>Realiza a exclusão de um determinado usuário </summary>
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(typeof(PessoaDto), 200)]
        public async Task<IActionResult> DeleteById(Guid Id)
        {
            var result = await _service.DeleteById(Id);
            return Ok(result);
        }

        /// <summary>Realiza a atualização dos dados de um determinado usuario, atraves de seu DTO </summary>
        [HttpPut("{id:guid}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(typeof(ProblemDetails), 400)]
        public async Task<IActionResult> Update([FromBody] UpdatePessoaDto dto)
        {
            var result = await _service.UpdateAsync(dto);
            return result.ToActionResult(this);
        }


    }
}
