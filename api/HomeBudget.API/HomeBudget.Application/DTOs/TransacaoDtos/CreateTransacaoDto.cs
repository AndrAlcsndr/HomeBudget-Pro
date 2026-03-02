using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.TransacaoDtos
{
    public class CreateTransacaoDto
    {
        public Guid Id { get; set; }
        public Guid? IdCategoria { get; set; }
        public Guid? IdPessoa { get; set; }

        public TipoTransacao Tipo { get; set; }

        public string Descricao { get; set; } = string.Empty;
        public double Receitas { get; set; } = 0.00;
        public double Despesas { get; set; } = 0.00;
        public double Saldo { get; set; } = 0.00;
    }
}
