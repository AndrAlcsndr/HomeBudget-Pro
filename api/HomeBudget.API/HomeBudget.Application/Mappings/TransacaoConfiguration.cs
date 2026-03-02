using HomeBudget.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HomeBudget.Infrastructure.Data.Configurations;

public class TransacaoConfiguration : IEntityTypeConfiguration<Transacao>
{
    public void Configure(EntityTypeBuilder<Transacao> builder)
    {
        builder.ToTable("Transacao");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.IdPessoa)
            .HasColumnName("IdPessoa")
            .IsRequired(); ;

        builder.Property(t => t.IdCategoria)
               .HasColumnName("IdCategoria")
               .IsRequired() ;

        builder.Property(p => p.Tipo)
              .IsRequired()
              .HasConversion<int>();

        builder.Property(c => c.Descricao)
              .HasMaxLength(400);

        // Configuração de casas decimais para receitas 
        builder.Property(t => t.Receitas)
               .HasColumnType("decimal(18,2)")
               .IsRequired();

        // Configuração de casas decimais para despesas 
        builder.Property(t => t.Despesas)
               .HasColumnType("decimal(18,2)")
               .IsRequired();

        builder.Property(t => t.Saldo)
               .HasColumnType("decimal(18,2)")
               .IsRequired();

        builder.Property(t => t.SomaDespesas)
               .HasColumnType("decimal(18,2)")
               .IsRequired();

        builder.Property(t => t.SomaReceitas)
               .HasColumnType("decimal(18,2)")
               .IsRequired();

        builder.Property(p => p.DataCriacao)
             .IsRequired();

        builder.Property(p => p.DataModificacao)
               .IsRequired();

        builder.HasOne(t => t.Pessoa)
               .WithMany(p => p.Transacoes)
               .HasForeignKey(t => t.IdPessoa)
               .HasConstraintName("FK_Transacao_Pessoa")
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.Categoria)
               .WithMany(c => c.Transacoes)
               .HasForeignKey(t => t.IdCategoria)
               .HasConstraintName("FK_Transacao_Categoria")
               .OnDelete(DeleteBehavior.Restrict);
    }
}