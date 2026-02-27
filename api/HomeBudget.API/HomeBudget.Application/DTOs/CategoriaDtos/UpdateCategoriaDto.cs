using HomeBudget.Domain.Entities;
using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.CategoriaDtos
{
    public class UpdateCategoriaDto
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public TipoCategoria Finalidade { get; set; }
        public DateTime DataModificacao { get; set; }
        public DateTime DataCriacao { get; set; }
        public List<Transacao> Transacoes { get; set; } = [];

    }
}
