using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.TransacaoDtos
{
    public class TransacaoDto
    {
        public Guid Id { get; set; }
        public string? Categoria { get; set; }
        public string? Pessoa { get; set; }

        public string? Descricao { get; set; }

        public TipoTransacao Tipo { get; set; }

        public double Receitas { get; set; }
        public double Despesas { get; set; }

        public double SomaReceitas { get; set; }
        public double SomaDespesas { get; set; }

        public double Saldo { get; set; }

        public DateTime DataCriacao { get; set; }
        public DateTime DataModificacao { get; set; }

    }
}
