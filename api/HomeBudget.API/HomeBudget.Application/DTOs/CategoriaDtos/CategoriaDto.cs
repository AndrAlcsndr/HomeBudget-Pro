using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.CategoriaDtos
{
    public class CategoriaDto
    {
        public Guid Id { get; set; }
        public List<Guid> IdTransacoes { get; set; } = [];

        public required string Nome { get; set; }
        public string? Descricao { get; set; }

        public TipoCategoria Finalidade { get; set; }


    }
}
