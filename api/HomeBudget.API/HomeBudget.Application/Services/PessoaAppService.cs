using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.Interfaces;

namespace HomeBudget.Application.Services
{
    public class PessoaAppService
    {
        private readonly IPessoaAppService _repository;

        public PessoaAppService(IPessoaAppService repository)
        {
            _repository = repository;
        }

    }
}
