using HomeBudget.Domain.Entities;

namespace HomeBudget.Domain.Interfaces
{
    public interface ICategoriaRepository<T> where T : class
    {
        Task AddAsync(Categoria categoria);
        Task UpdateAsync(Categoria categoria);
        Task DeleteAsync(Categoria categoria);
        Task<Categoria?> GetByIdAsync(Guid id);
        Task<List<Categoria>> GetAllForSelect();
        Task<(IReadOnlyList<Categoria> Items, int Total)> GetPagedAsync(T request);
        Task<bool> CategoriaExistente(string nome, Guid idCategoria);
    }
}
