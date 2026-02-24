namespace HomeBudget.Domain.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public List<int> IdTransacoes { get; set; } = [];

        public required string Nome { get; set; }
        public string ? Descricao { get; set;  }

        public DateTime DataCriacao { get; set; }
        public DateTime DataModificacao { get; set; }

        public List<Transacao> Transacoes { get; set; } = [];

    }
}
