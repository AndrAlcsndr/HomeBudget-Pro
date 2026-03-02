using HomeBudget.Domain.Enums;

namespace HomeBudget.Domain.Entities
{
    public class Pessoa
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public int Idade { get; set; }

        public DateTime DataCriacao { get; set; }
        public DateTime DataModificacao { get; set; }

        // uso de listagem interna para operações posteriores com os itens da lista
        public readonly List<Transacao> _transacoes = [];

        public IReadOnlyCollection<Transacao> Transacoes => _transacoes;
    }
}
