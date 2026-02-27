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

        public async Task<bool> NomeExistente(string nome, Guid idPessoa)
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


    }
}
