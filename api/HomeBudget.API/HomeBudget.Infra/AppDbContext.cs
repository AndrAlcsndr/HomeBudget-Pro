    using HomeBudget.Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    namespace HomeBudget.Infra
    {
        public class AppDbContext : DbContext
        {

            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
            {}

            public DbSet<Pessoa> Pessoa { get; set; }
            public DbSet<Categoria> Categoria { get; set; }
            public DbSet<Transacao> Transacao { get; set; }


            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
                base.OnModelCreating(modelBuilder);
            }

            public void RemoveEntityContext<TEntity>(TEntity entity) where TEntity : class
            {
                if (entity is not null)
                    Set<TEntity>().Remove(entity);
            }


        }
    }
