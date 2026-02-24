namespace HomeBudget.Domain.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public int IdPessoa { get; set;  }

        public int IdTransacoes { get; set; }

        public required string Nome { get; set; }
        public string ? Descricao { get; set;  }

        public DateTime DataCriacao { get; set; }
        public DateTime DataModificacao { get; set; }

    }
}
