using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;
using HomeBudget.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace HomeBudget.Infra.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _context;

        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Categoria categoria)
        {
            categoria.Id = Guid.NewGuid();

            await _context.CategoriaDbContext.AddAsync(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> NomeExistente(string nome)
        {
            return await _context.CategoriaDbContext
                .Where(s => 
                    s.Nome.Normalize().Trim() == nome.Normalize().Trim())
                .AnyAsync();
        }

        public async Task<Categoria?> GetByIdAsync(Guid id)
        {
            return await _context.CategoriaDbContext
                .AsNoTracking()
                .Include(u => u.Transacoes)
                .FirstOrDefaultAsync(u => u.Id == id);
        }



        public async Task UpdateAsync(Categoria categoria)
        {
            _context.CategoriaDbContext.Update(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Categoria categoria)
        {
            _context.CategoriaDbContext.Remove(categoria);
            await _context.SaveChangesAsync();
        }


        public async Task<(IReadOnlyList<Categoria> Items, int Total)> GetPagedAsync(PagedRequest request)
        {
            var safePage = request.Page <= 0 ? 1 : request.Page;
            var safeSize = request.PageSize <= 0 ? 20 : Math.Min(request.PageSize, 200);

            IQueryable<Categoria> query =
                _context.CategoriaDbContext
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

        private static IQueryable<Categoria> ApplySearchFilter(
           IQueryable<Categoria> query,
           string? search)
        {
            if (string.IsNullOrWhiteSpace(search))
                return query;

            var s = search.Trim();
            var like = $"%{s}%";

            return query.Where(d =>
                (d.Nome != null && EF.Functions.Like(d.Nome, like)) ||
                (d.Descricao != null && EF.Functions.Like(d.Descricao, like)));
        }


        private static IQueryable<Categoria> ApplyTipoFilter(
          IQueryable<Categoria> query,
          TipoCategoria? tipo)
        {
            bool allStatus = tipo == (TipoCategoria)Tipo.Todas;
            return tipo.HasValue && !allStatus
                ? query.Where(d => d.Finalidade == tipo.Value)
                : query;
        }

        private static IQueryable<Categoria> ApplySorting(
          IQueryable<Categoria> query,
          string? sortBy,
          bool asc)
        {
            var sort = sortBy?.Trim().ToLowerInvariant();

            return sort switch
            {
                "dataCriacao" => asc
                    ? query.OrderBy(d => d.DataCriacao).ThenBy(d => d.Id)
                    : query.OrderByDescending(d => d.DataCriacao).ThenBy(d => d.Id),

                "descricao" => asc
                    ? query.OrderBy(d => d.Descricao).ThenBy(d => d.Id)
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
