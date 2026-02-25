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
    }
}
