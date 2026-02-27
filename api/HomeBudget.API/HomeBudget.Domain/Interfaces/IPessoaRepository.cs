using HomeBudget.Domain.Entities;

namespace HomeBudget.Domain.Interfaces
{
    public interface IPessoaRepository<T> where T : class
    {
        Task AddAsync(Pessoa pessoa);
        Task UpdateAsync(Pessoa pessoa);
        Task DeleteAsync(Pessoa pessoa);
        Task<Pessoa?> GetByIdAsync(Guid id);
        Task<bool> PessoaExistente(string nome);

        Task<(IReadOnlyList<Pessoa> Items, int Total)> GetPagedAsync(T request);
    }
}
