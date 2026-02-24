using HomeBudget.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeBudget.Application.Mappings;

public class PessoaConfiguration : IEntityTypeConfiguration<Pessoa>
{
    public void Configure(EntityTypeBuilder<Pessoa> builder)
    {
        builder.ToTable("Pessoa");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Nome)
               .IsRequired()
               .HasMaxLength(150);

        builder.Property(p => p.Cpf)
               .IsRequired()
               .HasMaxLength(11)
               .IsFixedLength();

        builder.Property(p => p.Status)
               .IsRequired()
               .HasConversion<int>();

        builder.Property(p => p.DataCriacao)
               .IsRequired();

        builder.Property(p => p.DataModificacao)
               .IsRequired();

        builder.HasMany(p => p.Transacoes)
               .WithOne(t => t.Pessoa)
               .HasForeignKey(t => t.IdPessoa)
               .OnDelete(DeleteBehavior.Cascade);

        builder.Ignore(p => p.IdTransacoes);
    }
}