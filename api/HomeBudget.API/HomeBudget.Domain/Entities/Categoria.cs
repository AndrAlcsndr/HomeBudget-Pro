using HomeBudget.Domain.Enums;

namespace HomeBudget.Domain.Entities
{
    public class Categoria
    {
        public Guid Id { get; set; }
        public List<Guid> IdTransacoes { get; set; } = [];

        public required string Nome { get; set; }
        public string ? Descricao { get; set;  }

        public TipoCategoria Finalidade { get; set; }

        public DateTime DataCriacao { get; set; }
        public DateTime DataModificacao { get; set; }

        public List<Transacao> Transacoes { get; set; } = [];

    }
}
