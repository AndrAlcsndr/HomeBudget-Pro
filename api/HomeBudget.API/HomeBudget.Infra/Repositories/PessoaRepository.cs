using AutoMapper;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;
using HomeBudget.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Infra.Repositories
{
    public class PessoaRepository : IPessoaRepository<PagedRequest>
    {
       
        private readonly AppDbContext _context;


        public PessoaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Pessoa pessoa)
        {
            pessoa.Id = Guid.NewGuid();
            pessoa.DataCriacao = DateTime.UtcNow;

            await _context.PessoaDbContext.AddAsync(pessoa);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> PessoaExistente(string nome, Guid idPessoa)
        {
            return await _context.PessoaDbContext
                .Where(s =>
                    s.Nome.Normalize().Trim() == nome.Normalize().Trim()
                    && s.Id == idPessoa)
                .AnyAsync();
        }

        public async Task<Pessoa?> GetByIdAsync(Guid id)
        {
            return await _context.PessoaDbContext
                .AsNoTracking()
                .Include(u => u.Transacoes)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task UpdateAsync(Pessoa pessoa)
        {
            pessoa.DataModificacao = DateTime.UtcNow;
            _context.PessoaDbContext.Update(pessoa);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Pessoa pessoa)
        {
            _context.PessoaDbContext.Remove(pessoa);
            await _context.SaveChangesAsync();
        }


        public async Task<(IReadOnlyList<Pessoa> Items, int Total)> GetPagedAsync(PagedRequest request)
        {
            var safePage = request.Page <= 0 ? 1 : request.Page;
            var safeSize = request.PageSize <= 0 ? 20 : Math.Min(request.PageSize, 200);

            IQueryable<Pessoa> query =
                _context.PessoaDbContext
                .Include(s => s.Transacoes)
                .AsNoTracking();

            query = ApplySearchFilter(query, request.Search);
            query = ApplySorting(query, request.SortBy, request.SortDir == "asc");

            var total = await query.CountAsync();

            var items = await query
                .Skip((safePage - 1) * safeSize)
                .Take(safeSize)
                .ToListAsync();

            return (items, total);
        }

        private static IQueryable<Pessoa> ApplySearchFilter(
           IQueryable<Pessoa> query,
           string? search)
        {
            if (string.IsNullOrWhiteSpace(search))
                return query;

            var s = search.Trim();
            var like = $"%{s}%";

            return query.Where(d =>
                (d.Nome != null && EF.Functions.Like(d.Nome, like)) ||
                (d.Cpf != null && EF.Functions.Like(d.Cpf, like)));
        }



        private static IQueryable<Pessoa> ApplySorting(
          IQueryable<Pessoa> query,
          string? sortBy,
          bool asc)
        {
            var sort = sortBy?.Trim().ToLowerInvariant();

            return sort switch
            {
                "dataCriacao" => asc
                    ? query.OrderBy(d => d.DataCriacao).ThenBy(d => d.Id)
                    : query.OrderByDescending(d => d.DataCriacao).ThenBy(d => d.Id),

                "nome" => asc
                    ? query.OrderBy(d => d.Nome).ThenBy(d => d.Id)
                    : query.OrderByDescending(d => d.DataCriacao).ThenBy(d => d.Id),

                null or "" => query.OrderBy(d => d.DataCriacao),
                _ => asc
                    ? query.OrderBy(d => d.DataCriacao).ThenBy(d => d.Id)
                    : query.OrderByDescending(d => d.DataCriacao).ThenBy(d => d.Id)
            };
        }
    }
}
