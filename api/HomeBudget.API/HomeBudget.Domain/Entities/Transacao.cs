using HomeBudget.Domain.Enums;

namespace HomeBudget.Domain.Entities
{
    public class Transacao
    {
        public Guid Id { get; set; }
        public Guid? IdCategoria { get; set;  }
        public Guid? IdPessoa { get; set; }

        public TipoTransacao Tipo { get; set; }

        public string Descricao { get; set; }  = string.Empty;
        public double Receitas { get; set; } = 0.00;
        public double Despesas { get; set; } = 0.00;
        public double Saldo { get; set; } = 0.00;

        public DateTime DataCriacao { get; set;  }
        public DateTime DataModificacao { get; set;  }


        public Pessoa? Pessoa { get; set; }
        public Categoria? Categoria { get; set; }


    }
}
