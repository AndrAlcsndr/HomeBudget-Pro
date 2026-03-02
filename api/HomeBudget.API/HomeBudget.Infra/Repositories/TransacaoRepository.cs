using Azure.Core;
using HomeBudget.Application.DTOs.Pagination;
using HomeBudget.Application.DTOs.TransacaoDtos;
using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;
using HomeBudget.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Infra.Repositories
{
    public class TransacaoRepository : ITransacaoRepository<PagedRequest>
    {
        private readonly AppDbContext _context;

        public TransacaoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Transacao transacao)
        {
            await _context.Transacao.AddAsync(transacao);
            await _context.SaveChangesAsync();
        }

        public async Task<Transacao?> GetByIdAsync(Guid id)
        {
            return await _context.Transacao
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<(IReadOnlyList<Transacao> Items, int Total)> GetPagedAsync(PagedRequest request)
        {
            var safePage = request.Page <= 0 ? 1 : request.Page;
            var safeSize = request.PageSize <= 0 ? 20 : Math.Min(request.PageSize, 200);

            IQueryable<Transacao> query =
                _context.Transacao
                .Include(s => s.Pessoa)
                .Include(s => s.Categoria)
                .AsNoTracking();

            query = ApplySearchFilter(query, request.Search);
            query = ApplyTipoTransacaoFilter(query, (TipoTransacao)request.Tipo);
            query = ApplySorting(query, request.SortBy, request.SortDir == "asc");

            var total = await query.CountAsync();

            var items = await query
                .Skip((safePage - 1) * safeSize)
                .Take(safeSize)
                .ToListAsync();

            return (items, total);
        }

        private static IQueryable<Transacao> ApplySearchFilter(
           IQueryable<Transacao> query,
           string? search)
        {
            if (string.IsNullOrWhiteSpace(search))
                return query;

            var s = search.Trim();
            var like = $"%{s}%";

            return query.Where(d =>
                (d.Pessoa != null && EF.Functions.Like(d.Pessoa.Nome, like)) ||
                (d.Categoria != null && EF.Functions.Like(d.Categoria.Nome, like)) ||
                (d.Descricao != null && EF.Functions.Like(d.Descricao, like)));
        }


        private static IQueryable<Transacao> ApplySorting(
          IQueryable<Transacao> query,
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

                null or "" => query.OrderBy(d => d.DataCriacao),
                _ => asc
                    ? query.OrderBy(d => d.DataCriacao).ThenBy(d => d.Id)
                    : query.OrderByDescending(d => d.DataCriacao).ThenBy(d => d.Id)
            };
        }

        private static IQueryable<Transacao> ApplyTipoTransacaoFilter(
            IQueryable<Transacao> query,
            TipoTransacao? tipoTransacao)
        {
            bool todosTipos = tipoTransacao.HasValue && tipoTransacao.Value == (TipoTransacao)Tipo.Todas;
            return tipoTransacao.HasValue && !todosTipos
                ? query.Where(e => e.Tipo == tipoTransacao)
                : query;
        }

        public void Remove(Transacao transacao)
        {
            _context.Transacao.Remove(transacao);
            _context.SaveChanges();
        }

        public void Update(Transacao transacao)
        {
            _context.Transacao.Update(transacao);
            _context.SaveChanges();
        }


    }
}