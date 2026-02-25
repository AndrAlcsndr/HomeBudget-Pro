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


        [HttpGet("paged")]
        [ProducesResponseType(typeof(PagedResult<FinancasPessoaFiltroDto>), 200)]
        public async Task<IActionResult> GetPaged([FromQuery] PagedRequest request)
        {
            var result = await _service.GetPagedAsync(request);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(PessoaDto), 200)]
        [ProducesResponseType(typeof(ProblemDetails), 404)]
        public async Task<IActionResult> GetById(Guid Id)
        {
            var result = await _service.GetById(Id);
            return Ok(result);
        }



    }
}
