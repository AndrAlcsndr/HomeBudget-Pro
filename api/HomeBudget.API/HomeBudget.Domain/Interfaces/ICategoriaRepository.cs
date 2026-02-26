using HomeBudget.Domain.Entities;

namespace HomeBudget.Domain.Interfaces
{
    public interface ICategoriaRepository
    {
        Task AddAsync(Categoria categoria);
        Task UpdateAsync(Categoria categoria);
        Task DeleteAsync(Categoria categoria);
        Task<Categoria?> GetByIdAsync(Guid id);
        Task<bool> NomeExistente(string nome);
    }
}
