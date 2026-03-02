using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.TransacaoDtos
{
    public class UpdateTransacaoDto
    {
        public Guid Id { get; set;  }
        public required Guid IdPessoa { get; set; }
        public required Guid IdCategoria { get; set; }
        public Tipo Tipo { get; set; }

        public required string Nome { get; set;  }
        public required string Descricao { get; set; } = string.Empty;


        public double Receitas { get; set; } = 0.00;
        public double Despesas { get; set; } = 0.00;
        public double Saldo { get; set; } = 0.00;
    }
}
