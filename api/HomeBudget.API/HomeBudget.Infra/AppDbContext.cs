using HomeBudget.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomeBudget.Infra
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {}

        public DbSet<Pessoa> PessoaDbContext { get; set; }
        public DbSet<Categoria> CategoriaDbContext { get; set; }
        public DbSet<Transacao> TransacaoDbContext { get; set; }

       


    }
}
