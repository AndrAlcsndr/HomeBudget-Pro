using HomeBudget.Domain.Enums;

namespace HomeBudget.Application.DTOs.CategoriaDtos
{
    public class CreateCategoriaDto
    {
        public required string Nome { get; set; }
        public required string Descricao { get; set; }

        public required TipoCategoria Finalidade { get; set; }

    }
}
