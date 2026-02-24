using HomeBudget.Domain.Enums;

namespace HomeBudget.Domain.Entities
{
    public class Transacao
    {
        public int Id { get; set; }
        public int IdCategoria { get; set;  }
        public int IdPessoa { get; set; }

        public StatusTransacao Status { get; set; }

        public double Receitas { get; set; } = 0;
        public double Despesas { get; set; } = 0;

    }
}
