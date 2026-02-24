using HomeBudget.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeBudget.Infrastructure.Data.Configurations;

public class CategoriaConfiguration : IEntityTypeConfiguration<Categoria>
{
    public void Configure(EntityTypeBuilder<Categoria> builder)
    {
        builder.ToTable("Categorias");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nome)
               .IsRequired()
               .HasMaxLength(100);

        builder.Property(c => c.Descricao)
               .HasMaxLength(300);

        builder.Property(c => c.DataCriacao)
               .IsRequired();

        builder.Property(c => c.DataModificacao)
               .IsRequired();

        builder.HasMany(c => c.Transacoes)
               .WithOne(t => t.Categoria)
               .HasForeignKey(t => t.IdCategoria)
               .OnDelete(DeleteBehavior.Restrict);
    }
}