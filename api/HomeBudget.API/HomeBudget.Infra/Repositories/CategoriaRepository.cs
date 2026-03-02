using HomeBudget.Application.DTOs.CategoriaDtos;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;
using HomeBudget.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace HomeBudget.Infra.Repositories
{
    public class CategoriaRepository : ICategoriaRepository<PagedRequest>
    {
        private readonly AppDbContext _context;

        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Categoria categoria)
        {
            categoria.Id = Guid.NewGuid();
            categoria.DataCriacao = DateTime.UtcNow;

            await _context.Categoria.AddAsync(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CategoriaExistente(string nome, Guid idCategoria)
        {
            return await _context.Categoria
                //Existe e não se trata do mesmo item de inserção/update ?
                .Where(s => 
                    s.Nome.Trim() == nome.Trim() && s.Id != idCategoria)
                .AnyAsync();
        }

        public async Task<Categoria?> GetByIdAsync(Guid id)
        {
            return await _context.Categoria
                .AsNoTracking()
                .Include(u => u.Transacoes)
                .FirstOrDefaultAsync(u => u.Id == id);
        }



        public async Task UpdateAsync(Categoria categoria)
        {
            categoria.DataModificacao = DateTime.UtcNow;

            _context.Categoria.Update(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Categoria categoria)
        {
            _context.Categoria.Remove(categoria);
            await _context.SaveChangesAsync();
        }


        public async Task<(IReadOnlyList<Categoria> Items, int Total)> GetPagedAsync(PagedRequest request)
        {
            var safePage = request.Page <= 0 ? 1 : request.Page;
            var safeSize = request.PageSize <= 0 ? 20 : Math.Min(request.PageSize, 200);

            IQueryable<Categoria> query =
                _context.Categoria
                .Include(s => s.Transacoes)
                .AsNoTracking();

            query = ApplySearchFilter(query, request.Search);
            query = ApplyTipoCorrespondenciaFilter(query, (TipoCategoria)request.Tipo);
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

        private static IQueryable<Categoria> ApplyTipoCorrespondenciaFilter(
            IQueryable<Categoria> query,
            TipoCategoria? tipoCategoria)
        {
            bool todosTipos = tipoCategoria.HasValue && tipoCategoria.Value == (TipoCategoria)Tipo.Todas;
            return tipoCategoria.HasValue && !todosTipos
                ? query.Where(e => e.Finalidade == tipoCategoria)
                : query;
        }


    }
}
