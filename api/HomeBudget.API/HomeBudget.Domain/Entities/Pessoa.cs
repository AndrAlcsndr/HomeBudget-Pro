using HomeBudget.Domain.Enums;

namespace HomeBudget.Domain.Entities
{
    public class Pessoa
    {
        public Guid Id { get; set; }
        public List<int> IdTransacoes { get; set; } = [];
        public required string Nome { get; set; }
        public required string Cpf { get; set; }
        public StatusPessoa Status { get; set; }

        public DateTime DataCriacao { get; set; }
        public DateTime DataModificacao { get; set; }

        public List<Transacao> Transacoes = [];
    }
}
