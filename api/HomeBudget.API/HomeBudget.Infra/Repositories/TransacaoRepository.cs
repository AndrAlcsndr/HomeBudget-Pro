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
            transacao.Id = new Guid();
            transacao.DataCriacao = DateTime.UtcNow;

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
            query = ApplyGrouping(query, request.GroupBy);

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

        private static IQueryable<Transacao> ApplyGrouping(IQueryable<Transacao> query, GroupByEnum groupBy)
        {
            return groupBy switch
            {
                GroupByEnum.Pessoa =>
                    query.OrderBy(t => t.Pessoa!.Nome),

                GroupByEnum.Categoria =>
                    query.OrderBy(t => t.Categoria!.Nome),

                GroupByEnum.Geral => query.OrderBy(t => t.DataCriacao),
                _ => throw new NotImplementedException(),
            };
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

        public async Task DeleteAsync(Transacao transacao)
        {
            _context.Transacao.Remove(transacao);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Transacao transacao)
        {
            transacao.DataModificacao = DateTime.UtcNow;

            _context.Transacao.Update(transacao);
            await _context.SaveChangesAsync();
        }


    }
}