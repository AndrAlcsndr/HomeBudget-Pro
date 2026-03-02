using HomeBudget.Domain.Entities;

namespace HomeBudget.Domain.Interfaces
{
    public interface ITransacaoRepository<T> where T: class
    {
        Task<(IReadOnlyList<Transacao> Items, int Total)> GetPagedAsync(T request);

        Task<Transacao?> GetByIdAsync(Guid id); 

        Task AddAsync(Transacao transacao);

        void Update(Transacao transacao);

        void Remove(Transacao transacao);
    }
}